import express from "express";
import { TaskController } from "./../controllers/index.js";
import { TaskValidation } from "../validations/index.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

//GET POST api/v1/task
router
  .route("/")
  .get(TaskController.GetAllTask)
  .post(TaskValidation.AddTask, validate, TaskController.AddTask);

//PUT & DELETE api/v1/task/:id
router
  .route("/:id")
  .put(TaskValidation.UpdateTask, validate, TaskController.UpdateTask)
  .delete(TaskValidation.DeleteTask, validate, TaskController.DeleteTask);

export default router;
