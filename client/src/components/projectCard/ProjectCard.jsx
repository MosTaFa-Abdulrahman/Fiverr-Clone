import "./projectCard.scss";
import { NavLink } from "react-router-dom";

// From Home Page
function ProjectCard({ item }) {
  return (
    <NavLink to="/" className="link">
      <div className="projectCard">
        <img src={item.img} alt="" />
        <div className="info">
          <img src={item.pp} alt="" />
          <div className="texts">
            <h2>{item.cat}</h2>
            <span>{item.username}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default ProjectCard;
