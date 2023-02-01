import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SidebarAdmin from "../../Components/SidebarAdmin";
import NotFound from "../NotFound";
import Approved from "./Approved";
import Declined from "./Declined";
import ExeatApplications from "./ExeatApplications";
import SingleExeat from "./SingleExeat";
const Admin = () => {
  return (
    <>
      <SidebarAdmin />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="exeat-applications" replace />}
        />
        <Route
          exact
          path="exeat-applications"
          element={<ExeatApplications />}
        />
        <Route exact path="exeat-applications/:id" element={<SingleExeat />} />
        <Route exact path="declined/:id" element={<SingleExeat />} />
        <Route exact path="approved/:id" element={<SingleExeat />} />
        <Route exact path="declined" element={<Declined />} />
        <Route exact path="approved" element={<Approved />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Admin;
