import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Auth from "../layouts/Auth";
import Login from "../pages/auth/Login";
import Chat from "../pages/Chat";
import BulkMessage from "../pages/BulkMessage";
import TemplateMessage from "../pages/TemplatesMessage";
import Users from "../pages/Users";
import ImageGallery from "../pages/ImageGallery";
import { ProtectedRoute } from "../context/AuthContext";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true, // matches exactly '/auth'
          element: <Navigate to="/home" replace={true} />, // redirects to '/auth/login'
        },
        {
          path: "home",
          element: <ProtectedRoute><Home /></ProtectedRoute>,
        },
        {
          path: "chat",
          element: <ProtectedRoute><Chat /></ProtectedRoute>,
        },
        {
          path: "profile",
          element: <ProtectedRoute><Profile /></ProtectedRoute>,
        },
        {
          path: "settings",
          element: <ProtectedRoute><Settings /></ProtectedRoute>,
        },
        {
          path: "bulk_message",
          element: <ProtectedRoute><BulkMessage /></ProtectedRoute>,
        },
        {
          path: "template_message",
          element: <ProtectedRoute><TemplateMessage /></ProtectedRoute>,
        },
        {
          path: "users",
          element: <ProtectedRoute><Users /></ProtectedRoute>,
        },
        {
          path: "image_gallery",
          element: <ProtectedRoute><ImageGallery /></ProtectedRoute>,
        },
      ],
    },
   {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        index: true, // matches exactly '/auth'
        element: <Navigate to="login" replace={true} />, // redirects to '/auth/login'
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  ],
  {
    basename: "/whatsapp_admin",
  }
);

export default router;
