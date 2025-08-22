import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import ObservedActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ObservedActivityForm from "../../features/activities/form/ActivityForm";
import ObservedActivityDetails from "../../features/activities/details/ActivityDetails";
import ObservedApp from "../layout/App";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ObservedApp />,
    children: [
      { path: "activities", element: <ObservedActivityDashboard /> },
      { path: "activities/:id", element: <ObservedActivityDetails /> },
      {
        path: "createActivity",
        element: <ObservedActivityForm key="create" />,
      },
      { path: "manage/:id", element: <ObservedActivityForm key="manage" /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
      { path: "server-error", element: <ServerError /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
