import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./screens/Login/Login";
import SignUp from "./screens/SignUp/SignUp";
import { routing } from "./routing";
import { Dashboard } from "./screens/Dashboard/container/Dashboard";
import { RecoilRoot } from "recoil";

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={routing.login} />} />
          <Route path={routing.login} element={<Login />} />
          <Route path={routing.signup} element={<SignUp />} />
          <Route path={routing.dashboard} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
