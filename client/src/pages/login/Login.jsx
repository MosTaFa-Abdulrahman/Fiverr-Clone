import "./login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("auth/login", {
        username,
        password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Username... "
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password..."
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        {error && <h2 className="myError">{error}</h2>}
      </form>
    </div>
  );
}

export default Login;
