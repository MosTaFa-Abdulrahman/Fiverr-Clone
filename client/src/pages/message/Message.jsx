import "./message.scss";
import { NavLink, useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";

function Message() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const queryClient = new QueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["message"],
    queryFn: () =>
      publicRequest
        .get(`message/get/${id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return publicRequest.post("message/add", message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["message"]);
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="head">
          <NavLink to="/messages">Messages</NavLink> {currentUser.username}
        </span>

        {isLoading ? (
          "Wait For Loading !!"
        ) : error ? (
          "Error !~~!"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.2.1502113374.1686874194&semt=sph"
                  alt=""
                />
                <p>{m?.desc}</p>
              </div>
            ))}
          </div>
        )}

        <form className="Write" onSubmit={handleAdd}>
          <textarea type="text" placeholder="Write a message 🥰" required />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Message;
