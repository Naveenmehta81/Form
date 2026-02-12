import { useState } from "react";
import React from "react";
import Form from "./Form.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Loginpage.jsx";
import Register from "./pages/registration.jsx";
import ProtectedRoute from "./Authentication/ProtectedRoute.jsx";

import "./App.css";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />|
          <Route path="/register" element={<Register />} />
          {/* here we use protected route */}
          <Route path="/forgot-password" element= {<ForgotPassword/>}></Route>
          <Route path="/reset-password/:token" element = {<ResetPassword/>} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
