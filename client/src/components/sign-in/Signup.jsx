import LeftSide from "./LeftSide";
import "./css/signin.css";
import "./css/form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    axios
      .post("http://localhost:3001/dnsmanager/register/", newUser)
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="Signin">
      <LeftSide />
      <div className="wrapper">
        <div>
          <h2>Sign up</h2>
          <p>Sign up to your account</p>

          <br></br>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <p>Name</p>
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <p>Email Address</p>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <p>Password</p>
              <input
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <button type="submit">Sign up</button>
            </form>
            <p>
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
