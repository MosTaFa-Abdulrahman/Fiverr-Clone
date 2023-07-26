import "./review.scss";
import starImg from "../../images/star.png";
import likeImg from "../../images/like.png";
import disLikeImg from "../../images/dislike.png";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";

// From Reviews Component
function Review({ review }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      publicRequest
        .get(`user/get/${review.userId}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  return (
    <div className="review">
      {isLoading ? (
        "Wait For Loading !!"
      ) : error ? (
        "Error !~~!"
      ) : (
        <div className="user">
          <img
            className="pp"
            src={
              data.img ||
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.2.1502113374.1686874194&semt=sph"
            }
            alt=""
          />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              {data.country === "US" ? (
                <img
                  src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                  alt=""
                />
              ) : "" ? (
                data.country === "UK"
              ) : (
                <img
                  src="https://img.freepik.com/premium-vector/united-kingdom-flag-with-original-rgb-color-vector-illustration-design_249240-209.jpg?size=626&ext=jpg&ga=GA1.2.1502113374.1686874194&semt=ais"
                  alt=""
                />
              )}

              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src={starImg} alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src={likeImg} alt="" />
        <span>Yes</span>
        <img src={disLikeImg} alt="" />
        <span>No</span>
      </div>
    </div>
  );
}

export default Review;
