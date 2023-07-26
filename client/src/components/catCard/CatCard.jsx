import "./catCard.scss";
import { NavLink } from "react-router-dom";

// From Home Page
function CatCard({ item }) {
  return (
    <NavLink to={`/gigs?cat=${item.cat}`}>
      <div className="catCard">
        <img src={item.img} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </NavLink>
  );
}

export default CatCard;
