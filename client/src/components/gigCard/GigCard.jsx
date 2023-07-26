import "./gigCard.scss";
import { NavLink } from "react-router-dom";
import starImage from "../../images/star.png";
import { publicRequest } from "../../requestMethod";
import heartImage from "../../images/heart.png";
import { useQuery } from "@tanstack/react-query";

// From Gigs Page
function GigCard({ item }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigUser"],
    queryFn: () =>
      publicRequest
        .get(`user/get/${item.userId}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  return (
    <div className="gigCard">
      <NavLink to={`/gig/${item._id}`} className="link">
        <img src={item.cover} alt="" />
      </NavLink>

      <div className="info">
        {isLoading ? (
          "Wait For Loading !!"
        ) : error ? (
          "Error !~~!"
        ) : (
          <div className="user">
            <img src={data.img} alt="" />
            <span>{data.username}</span>
          </div>
        )}
        <p>{item.desc}</p>
        <div className="star">
          <img src={starImage} alt="" />
          <span>
            {!isNaN(item.totalStars / item.starNumber) &&
              Math.round(item.totalStars / item.starNumber)}
          </span>
        </div>
      </div>

      <hr />

      <div className="details">
        <img src={heartImage} alt="" />
        <div className="price">
          <span>STARTING AT</span>
          <h2>{item.price}$</h2>
        </div>
      </div>
    </div>
  );
}

export default GigCard;
