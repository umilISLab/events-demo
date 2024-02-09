import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import Login from "./components/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthGuard>
        <Login />
      </AuthGuard>
    ),
    errorElement: <>Error Page</>,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
    errorElement: <>Error Page</>,
  },
  // {
  //   path: "/main",
  //   element: (
  //     <AuthGuard>
  //       <App />
  //     </AuthGuard>
  //   ),
  //   errorElement: <>Error Page</>,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
  // </React.StrictMode>,
);
