import React from "react";
import Login from "./Pages/Login";
import User from "./Pages/Student/User";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin/Admin";
import AdminRoute from "./Pages/Admin/AdminRoute";
import UserRoute from "./Pages/Student/UserRoute";
import { ExeatProvider } from "./ExeatContext";
import NotFound from "./Pages/NotFound";
const App = () => {
  return (
    <>
      <ExeatProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route element={<UserRoute />}>
              <Route exact path="/student/*" element={<User />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route exact path="/admin/*" element={<Admin />} />
            </Route>
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ExeatProvider>
    </>
  );
};

export default App;
