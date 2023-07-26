import "./myGigs.scss";
import { NavLink } from "react-router-dom";
import deleteImg from "../../images/delete.png";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";

function MyGigs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = new QueryClient();

  // Get All myGigs by using (((gig/get?userId=${currentUser._id})))
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      publicRequest
        .get(`gig/get?userId=${currentUser._id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return publicRequest.delete(`gig/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "Wait For Loading !"
      ) : error ? (
        "Error !~~!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>{currentUser.isSeller ? "My Gigs" : "Orders"}</h1>
            {currentUser.isSeller && (
              <NavLink to="/add">
                <button>Add Gig</button>
              </NavLink>
            )}
          </div>
          <table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>

              {data.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className="image" src={gig.cover} alt="" />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src={deleteImg}
                      alt=""
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
