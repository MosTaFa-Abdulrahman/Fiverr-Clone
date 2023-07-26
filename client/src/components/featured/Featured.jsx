import "./featured.scss";
import man from "../../images/man.png";
import search from "../../images/search.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [field, setField] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    navigate(`/gigs?search=${field}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src={search} alt="" />
              <input
                type="text"
                placeholder="Search... 🧐"
                onChange={(e) => setField(e.target.value)}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Web Development</button>
            <button>Logo Design</button>
          </div>
        </div>
        <div className="right">
          <img src={man} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
