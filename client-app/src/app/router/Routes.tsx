import { createBrowserRouter, type RouteObject } from "react-router-dom";
import ObservedActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ObservedActivityForm from "../../features/activities/form/ActivityForm";
import ObservedActivityDetails from "../../features/activities/details/ActivityDetails";
import ObservedApp from "../layout/App";

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
    ],
  },
];

export const router = createBrowserRouter(routes);
