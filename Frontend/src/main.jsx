import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routers/router";
import { RouterProvider } from "react-router";
import { AuthProvider } from './Contexts/AuthContext';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
