import { BrowserRouter, Route,Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./screens/Login/Login";
import SignUp from "./screens/SignUp/SignUp";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}