import "./gigs.scss";
import downImg from "../../images/down.png";
import GigCard from "../../components/gigCard/GigCard";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      publicRequest
        .get(
          `gig/get${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [refetch, sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="head">Darsh {">"} Graphics & Design</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Darsh's AI artists
        </p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="number" placeholder="min" ref={minRef} />
            <input type="number" placeholder="max" ref={maxRef} />
            <button onClick={apply}>Apply</button>
          </div>

          <div className="right">
            <span className="sortBy">Sort By:: </span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src={downImg} alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading
            ? "Wait For Loading !!"
            : error
            ? "Error !~~!"
            : data.map((gig) => <GigCard item={gig} key={gig._id} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
