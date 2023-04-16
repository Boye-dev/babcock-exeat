import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import NotFound from "../NotFound";
import ApplyExeat from "./ApplyExeat";
import ExeatStatus from "./ExeatStatus";
import Profile from "./Profile";
import SingleExeat from "./SingleExeat";

const User = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="exeat-status" replace />} />
        <Route exact path="exeat-status" element={<ExeatStatus />} />
        <Route exact path="apply-for-exeat" element={<ApplyExeat />} />
        <Route exact path="exeat-status/:id" element={<SingleExeat />} />
        <Route exact path="profile" element={<Profile />} />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default User;
