import { body, param } from "express-validator";

export const AddTask = [
  body("title")
    .isString()
    .withMessage("Title must be a String")
    .notEmpty()
    .withMessage("Title is Required"),
  body("description")
    .isString()
    .withMessage("Description must be a String")
    .notEmpty()
    .withMessage("Description is Required"),
];
export const UpdateTask = [
  param("id")
    .isString()
    .withMessage("ID must be a String")
    .isMongoId()
    .withMessage("enter valid mongoid"),
  body("status")
    .isString()
    .withMessage("Status must be a string")
    .notEmpty()
    .withMessage("Status is required")
    .matches(/^(To Do|In Progress|Done)$/i)
    .withMessage('Status must be one of "To Do", "In Progress", or "Done"'),
];
export const DeleteTask = [
  param("id")
    .isString()
    .withMessage("ID must be a String")
    .isMongoId()
    .withMessage("enter valid mongoid"),
];

const MONGO_ID = [
  param("id")
    .isString()
    .withMessage("ID must be a String")
    .isMongoId()
    .withMessage("enter valid mongoid"),
];

// module.exports = {
//   AddTask,
//   MONGO_ID,
// };
