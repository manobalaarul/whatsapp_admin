import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Auth from "../layouts/Auth";
import Login from "../pages/auth/Login";
import Chat from "../pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },{
     path: "/auth",
    element: <Auth />,
    children:[
      {
        path:"login",
        element: <Login/>
      }
    ]
  }
 
]);

export default router;