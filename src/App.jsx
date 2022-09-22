import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { HomePage, NotFoundPage, Register, Login, Dashboard, ForgotPassword, SendPayment, Movements, LoadAccount, NewOrder } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {
  // Hooks para establecer la authentication
  const [isAuthenticated, setisAuthenticated] = useState(false);

  // Funcion para saber si esta authenticated
  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:8888/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      // Condicional para mostrar el dashboard siempre y cuando se tenga el token activo
      parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />

          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route path="/register" element={<Register setAuth={setAuth} />} />

          <Route path="/forgotPassword" element={<ForgotPassword />} />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/dashboard/sendPayment"
            element={
              isAuthenticated ? (
                <SendPayment setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/dashboard/movements"
            element={
              isAuthenticated ? (
                <Movements setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/dashboard/loadAccount"
            element={
              isAuthenticated ? (
                <LoadAccount setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/dashboard/order"
            element={
              isAuthenticated ? (
                <NewOrder setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
