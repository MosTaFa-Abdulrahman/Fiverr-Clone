import "./add.scss";
import { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useNavigate } from "react-router-dom";
import upload from "../../upload";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";

function Add() {
  const [coverFile, setCoverFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async (e) => {
    setUploading(true);
    try {
      const cover = await upload(coverFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const mutation = useMutation({
    mutationFn: (gig) => {
      return publicRequest.post("gig/create", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myGigs");
  };

  //console.log(state); // For debug

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>

        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title... "
              onChange={handleChange}
            />

            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>

            <label htmlFor="">Description</label>
            <textarea
              placeholder="Brief descriptions to introduce your service to customers"
              rows="10"
              cols="5"
              name="desc"
              onChange={handleChange}
            ></textarea>

            <button onClick={handleCreate}>Create</button>
          </div>

          <div className="details">
            <label htmlFor="">Short Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="Short-Title... "
              onChange={handleChange}
            />

            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>

            <label htmlFor="">Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="Featured ..." />
              <button type="submit">ADD</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="">Delivery Time Day</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
