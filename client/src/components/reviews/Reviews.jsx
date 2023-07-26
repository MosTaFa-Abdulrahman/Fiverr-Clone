import "./reviews.scss";
import Review from "../review/Review";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";

// From Gig Page
function Reviews({ gigId }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = new QueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["review"],
    queryFn: () =>
      publicRequest
        .get(`review/get/${gigId}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return publicRequest.post(`review/create`, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["review"]);
    },
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>

      {isLoading
        ? "Wait For Loading !!"
        : error
        ? "Error !~~!"
        : data.map((review) => <Review review={review} key={review._id} />)}

      {currentUser ? (
        <div className="add">
          <h3>Add a review</h3>
          <form action="" className="addForm" onSubmit={handleAddReview}>
            <input
              type="text"
              placeholder="ADD Your Review Please 🥰"
              required
            />
            <select name="" id="" required>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>Send</button>
          </form>
        </div>
      ) : (
        "You must create account to add your review 🧐"
      )}
    </div>
  );
}

export default Reviews;
