import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import "./Home.css";
import {
  useGetAllTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../redux/query/Task";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading, isError, refetch } = useGetAllTaskQuery();
  const [status, setStatus] = useState("All tasks");
  const [updateTask, _updateTaskResponse] = useUpdateTaskMutation();
  const [deleteTask, _deleteTaskResponse] = useDeleteTaskMutation();

  const UpdateTaskHandler = async (id, status) => {
    try {
      const { data, error } = await updateTask({ id, status });

      // console.log({data,error});
      if (error) {
        toast.error(error.data?.msg);
        return;
      }

      await refetch();
      toast.success("todo updated");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const DeleteTaskHandler = async (id) => {
    try {
      const { data, error } = await deleteTask(id);

      if (error) {
        toast.error(error.data?.msg);
        return;
      }

      await refetch();
      toast.success("todo Deleted");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const filteredTasks =
    data && data.AllTask
      ? data.AllTask.filter((task) => {
          if (status === "All tasks") {
            return true; // Show all tasks
          } else {
            return task.status === status; // Filter tasks based on selected status
          }
        })
      : [];
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div className="error">An error occured!</div>;
  }

  return (
    <div className="main-container">
      <Link
        className="btn btn-outline-success ms-1 add-btn"
        aria-current="page"
        to="/add"
      >
        Add Task
      </Link>
      <div className="mb-3">
        <label className="form-label">Task Status Filter</label>
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="form-select"
          name="status"
          component="select"
        >
          <option value="All tasks">All tasks</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="container">
        <div className="row">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((cur, i) => {
              return (
                <Task
                  data={cur}
                  index={i}
                  key={i}
                  UpdateTaskHandler={UpdateTaskHandler}
                  DeleteTaskHandler={DeleteTaskHandler}
                />
              );
            })
          ) : (
            <>
              <tr>
                <td colSpan={4}>No tasks found!</td>
              </tr>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
