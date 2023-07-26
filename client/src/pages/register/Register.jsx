import "./register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import upload from "../../upload";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    img: "",
    desc: "",
    isSeller: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      await publicRequest.post("auth/register", { ...user, img: url });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleCreate}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username... "
            required
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email..."
            required
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="Password... "
            onChange={handleChange}
          />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Country... "
            required
            onChange={handleChange}
          />

          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button type="submit">Register</button>
        </div>

        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+20 11 50 33 61 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A Short Description OF Yourself"
            name="desc"
            id=""
            rows="10"
            cols="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
