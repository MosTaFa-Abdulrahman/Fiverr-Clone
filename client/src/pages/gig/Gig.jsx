import "./gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import starImg from "../../images/star.png";
import greencheckImg from "../../images/greencheck.png";
import recycleImg from "../../images/recycle.png";
import clockImg from "../../images/clock.png";
import { NavLink, useParams } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();

  // Get Single Gig
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      publicRequest
        .get(`gig/get/${id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      publicRequest
        .get(`user/get/${userId}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        "Wait For Loading !~~!"
      ) : error ? (
        "Error !!!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="head">Darsh {">"} Graphics & Design</span>
            <h1>{data.title}</h1>

            {isLoadingUser ? (
              "Wait For Loading !!"
            ) : errorUser ? (
              "Error !!!"
            ) : (
              <div className="user">
                <img src={dataUser?.img} alt="" className="pp" />
                <span>{dataUser?.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src={starImg} alt="" key={i} />
                      ))}
                    <span>
                      {Math.round(data.totalStars / data.starNumber)}{" "}
                    </span>
                  </div>
                )}
              </div>
            )}

            <Slider slidesToShow={1} arrowsScroll={1} className="slider" dots>
              {data.images.map((img) => (
                <img src={img} key={img} alt="" />
              ))}
            </Slider>

            <h2>About This Gig</h2>
            <p>{data.desc}</p>

            {isLoadingUser ? (
              "Wait For Loading !!"
            ) : error ? (
              "Error !~!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>

                <div className="user">
                  <img src={dataUser?.img} alt="" />
                  <div className="info">
                    <span>{dataUser?.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src={starImg} alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>

                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser?.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">
                        {format(dataUser?.createdAt)}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Phone</span>
                      <span className="desc">{dataUser?.phone}</span>
                    </div>
                  </div>

                  <hr />

                  <p>{dataUser?.desc}</p>
                </div>
              </div>
            )}

            <Reviews gigId={id} />
          </div>

          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2> {data.price} $</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src={clockImg} alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src={recycleImg} alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src={greencheckImg} alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {currentUser ? (
              <NavLink to={`/payment/${id}`}>
                <button>Continue</button>
              </NavLink>
            ) : (
              "You Must Create Account To Pay 🧐"
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
