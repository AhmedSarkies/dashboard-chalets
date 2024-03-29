import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  Dashboard,
  SubAdmins,
  Messages,
  Settings,
  Slider,
  TermsAndConditions,
  Chalets,
  Form,
  Brokers,
  BookChalets,
} from "../components";

const RoutesHome = () => (
  <Routes>
    <Route path="*" element={<Navigate to="chalets/dashboard" />} />
    <Route path="/chalets" element={<Home />}>
      <Route path="*" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="sub-admins" element={<SubAdmins />} />
      <Route path="messages" element={<Messages />} />
      <Route path="settings" element={<Settings />} />
      <Route path="slider" element={<Slider />} />
      <Route path="terms&conditions" element={<TermsAndConditions />} />
      <Route path="chalets" element={<Chalets />} />
      <Route path="add-chalet" element={<Form />} />
      <Route path="edit-chalet/:id" element={<Form />} />
      <Route
        path="broker/add-broker-chalet/:registrationCode"
        element={<Form />}
      />
      <Route path="brokers" element={<Brokers />} />
      <Route path="chalets-brokers/:id" element={<Chalets />} />
      <Route path="book-chalets" element={<BookChalets />} />
    </Route>
  </Routes>
);

export default RoutesHome;
