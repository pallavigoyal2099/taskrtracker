import httpStatus from "http-status";
import { TaskModel } from "../models/index.js";

export const AddTask = async (body) => {
  try {
    const { title, description } = body;

    await TaskModel.Task.create({
      title,
      description,
    });
    return {
      msg: "Task Created",
      code: httpStatus.CREATED,
      success: true,
    };
  } catch (error) {
    return {
      msg: error.message,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
    };
  }
};
export const GetAllTask = async () => {
  try {
    const AllTask = await TaskModel.Task.find({});
    return {
      msg: "Task Fetched",
      code: httpStatus.OK,
      success: true,
      AllTask,
      total: AllTask.length,
    };
  } catch (error) {
    return {
      msg: error.message,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      AllTask: [],
      total: 0,
    };
  }
};

export const UpdateTask = async (id, status) => {
  try {
    const existTask = await TaskModel.Task.findByIdAndUpdate(id, {
      $set: {
        status: status,
      },
    });
    if (!existTask) {
      return {
        msg: "Task Not Found",
        code: httpStatus.NOT_FOUND,
        success: false,
      };
    }

    if (existTask.status === "Done") {
      return {
        msg: "Task Already Completed",
        code: httpStatus.BAD_REQUEST,
        success: false,
      };
    }

    return {
      msg: "Task Updated",
      code: httpStatus.OK,
      success: true,
    };
  } catch (error) {
    return {
      msg: error.message,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
    };
  }
};

export const DeleteTask = async (id) => {
  try {
    const existTask = await TaskModel.Task.findByIdAndDelete(id);
    if (!existTask) {
      return {
        msg: "Task Not Found",
        code: httpStatus.NOT_FOUND,
        success: false,
      };
    }

    return {
      msg: "Task Deleted",
      code: httpStatus.OK,
      success: true,
    };
  } catch (error) {
    return {
      msg: error.message,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
    };
  }
};
