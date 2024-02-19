import "./css/LeftSide.css";
import logo from "./logo.png";
function LeftSide() {
  return (
    <div className="container">
      <img alt="logo" src={logo} width={30} />
      <h1>DNS Manager</h1>
    </div>
  );
}

export default LeftSide;
