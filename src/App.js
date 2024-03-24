import React, { useEffect } from "react";
import Cookies from "js-cookie";
/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import locale from "./utils/locale";
import {
  LoginLayout,
  Login,
  Home,
  Dashboard,
  SubAdmins,
  Messages,
  Settings,
  Slider,
  TermsAndConditions,
  Chalets,
  AddChalet,
  Brokers,
  BookChalets,
} from "./components";

const App = () => {
  const lng = Cookies.get("i18next") || "ar";

  useEffect(() => {
    document.documentElement.lang = lng;
  }, [lng]);

  return (
    <div className="App">
      <Routes>
        {/* <Route
          path="/"
          element={<Navigate to="/chalets/login" replace={true} />}
        /> */}
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
          {/* <Route path="chalets/forget-password" element={<ForgetPassword />} /> */}
        </Route>
        <Route path="/chalets" element={<Home />}>
          <Route path="*" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sub-admins" element={<SubAdmins />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="slider" element={<Slider />} />
          <Route path="terms&conditions" element={<TermsAndConditions />} />
          <Route path="chalets">
            <Route path="" element={<Chalets />} />
            <Route path="add-chalet" element={<AddChalet />} />
          </Route>
          <Route path="brokers" element={<Brokers />} />
          <Route path="book-chalets" element={<BookChalets />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
