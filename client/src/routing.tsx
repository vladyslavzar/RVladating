import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Registration from "./pages/registration/Registration";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/reg",
    element: <Registration />,
  },
]);
