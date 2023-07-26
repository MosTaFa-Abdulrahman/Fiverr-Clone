import "./navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../../requestMethod";

function Navbar() {
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await publicRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/" className="link">
            <span className="text">Darsh 🚀</span>
          </NavLink>
        </div>

        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          {!currentUser && (
            <NavLink to="/register" className="link">
              <span>Register</span>
            </NavLink>
          )}
          <span>English</span>

          {!currentUser?.isSeller && <span>Become a Seller</span>}
          <NavLink to="/login" className="link">
            {!currentUser && <button>Join</button>}
          </NavLink>
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={
                  currentUser.img ||
                  "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_640.png"
                }
                alt=""
              />
              <span>{currentUser.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <NavLink to="/myGigs" className="link">
                        <span>MY Gigs</span>
                      </NavLink>
                      <NavLink to="/add" className="link">
                        <span>Add New Gig</span>
                      </NavLink>
                    </>
                  )}
                  <NavLink to="/orders" className="link">
                    <span>Orders</span>
                  </NavLink>
                  <NavLink to="/messages" className="link">
                    <span>Messages</span>
                  </NavLink>
                  <span onClick={handleLogout}>Logout</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
