import "./messages.scss";
import { NavLink } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import { format } from "timeago.js";

function Messages() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = new QueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversation"],
    queryFn: () =>
      publicRequest
        .get("conversation/get")
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return publicRequest.put(`conversation/update/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversation"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Wait For Loading !!"
      ) : error ? (
        "Error !~~!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>

              {data.map((c) => (
                <tr
                  className={
                    ((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                  <td>
                    <NavLink to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 90)}...
                    </NavLink>
                  </td>
                  <td>{format(c.updatedAt)}</td>
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Messages;
