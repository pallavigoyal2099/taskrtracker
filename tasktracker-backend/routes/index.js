import express from "express";
import TaskRoutes from "./Task.routes.js";

const router = express.Router();

const routes = [
  {
    path: "/task",
    route: TaskRoutes,
  },
];

routes.forEach((route) => {
  console.log("im here");
  return router.use(route.path, route.route);
});

export default router;
