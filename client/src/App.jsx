// import Signin from "./components/sign-in/Signin";
import Signup from "./components/sign-in/Signup";
import Signin from "./components/sign-in/Signin";
import DashBoard from "./components/Dashboard/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Signin />}></Route>
        <Route path="/dashboard" element={<DashBoard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
