import "./orders.scss";
import messageImg from "../../images/message.png";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../requestMethod";
import { useNavigate } from "react-router-dom";

function Orders() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: () =>
      publicRequest
        .get("order/get")
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err.message)),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await publicRequest.get(`conversation/get/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 400) {
        const res = await publicRequest.post("conversation/create", {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isLoading ? (
        "Wait For Loading !!"
      ) : error ? (
        "Error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>

          <table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    <img
                      className="message"
                      src={messageImg}
                      alt=""
                      onClick={() => handleContact(order)}
                    />
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

export default Orders;
