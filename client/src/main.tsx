import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)