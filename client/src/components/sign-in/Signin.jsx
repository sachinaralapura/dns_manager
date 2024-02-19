import LeftSide from "./LeftSide";
import "./css/signin.css";
import "./css/form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    axios
      .post("http://localhost:3001/dnsmanager/login", user)
      .then((response) => {
        if (response.data.message === "success")
          navigate("/dashboard", { state: { id: response.data.user._id } });
        else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Signin">
      <LeftSide></LeftSide>
      <div className="wrapper">
        <div>
          <h2>Sign In</h2>
          <p>Sign in to your account</p>

          {/* <div className="sign-in-through">
          <div className="">
            <img alt="google" src={glogo} width={15}></img>
            Sign in with Google
          </div>
          <div>
            <img alt="apple" src={alogo} width={15}></img>
            Sign in with apple
          </div>
        </div> */}
          <br></br>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <p>Email Address</p>
              <input
                type="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p>Password</p>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <a>Forget password?</a>
              <button type="submit">Sign in</button>
            </form>
            <p>
              Dont have an account ? <Link to={"/"}>Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
