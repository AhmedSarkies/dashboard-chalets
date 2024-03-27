import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginLayout, Login } from "../components";

const RoutesLogin = () => (
  <Routes>
    <Route path="/" element={<LoginLayout />}>
      <Route
        path=""
        element={<Navigate to="/chalets/login" replace={true} />}
      />
      <Route
        path="*"
        element={<Navigate to="/chalets/login" replace={true} />}
      />
      <Route
        path="chalets"
        element={<Navigate to="/chalets/login" replace={true} />}
      />
      <Route path="chalets/login" element={<Login />} />
    </Route>
  </Routes>
);

export default RoutesLogin;
