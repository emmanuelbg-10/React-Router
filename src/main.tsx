import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import About from "./routes/About";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Error from "./routes/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "contacts/:contactid",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
