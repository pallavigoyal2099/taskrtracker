import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { toast } from "react-toastify";
import { useAddTaskMutation } from "../redux/query/Task";
const AddTask = () => {
  const [AddTask, responseAddTask] = useAddTaskMutation();

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  const onSubmitHandler = async (e, { resetForm }) => {
    try {
      const { data, error } = await AddTask(e);
      if (error) {
        toast.error(error.data.msg);
      }
      toast.success("Todo added! ");

      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ title: "", description: "", status: "To Do" }}
        onSubmit={onSubmitHandler}
      >
        <Form className="container col-sm-10">
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <Field
              name="title"
              type="text"
              className="form-control"
              placeholder="Add Task"
            />
            <ErrorMessage name="title" component="p" className="text-danger" />
          </div>
          <div className="mb-3">
            <label className="form-label">Task Status</label>
            <Field class="form-select" name="status" component="select">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Field>
            <ErrorMessage name="title" component="p" className="text-danger" />
          </div>
          <div className="mb-3">
            <label className="form-label">Task Description</label>
            <Field
              name="description"
              as="textarea"
              className="form-control"
              rows={8}
              placeholder="Write some description...."
            />
            <ErrorMessage
              name="description"
              component="p"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              disabled={responseAddTask.isLoading}
              className="btn btn-danger"
            >
              {responseAddTask.isLoading ? "Submit..." : "Submit"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AddTask;
