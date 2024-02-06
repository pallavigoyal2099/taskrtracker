import React, { useState } from "react";

import Modal from "react-modal";
import "./Task.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "13rem",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Modal.setAppElement("#yourAppElement");
const Task = ({ data, UpdateTaskHandler, DeleteTaskHandler, index }) => {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(data.status);
  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "black";
      case "In Progress":
        return "orange";
      case "Done":
        return "green";
      default:
        return "black"; // Default color if status is unknown
    }
  };

  return (
    <div className="card task-card">
      <div className="card-header task-header">
        <h5 className="task-header-title">
          #{index + 1} {data.title}
        </h5>
        <h6
          className="task-header-title"
          style={{ color: getStatusColor(data.status) }}
        >
          {data.status}
        </h6>
      </div>

      <div className="card-body task-body">
        <div>
          <p className="card-text">{data.description}</p>
        </div>
        <div className="task-btns">
          <button
            onClick={() => DeleteTaskHandler(data._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-warning btn-sm update-btn"
            disabled={data.status === "Done"}
          >
            Update
          </button>
        </div>
      </div>
      {openModal && (
        <Modal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="heading">Update task</div>
          <form>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div className="modal-btns">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setOpenModal(false)}
              >
                close
              </button>
              <button
                onClick={() => UpdateTaskHandler(data._id, status)}
                type="submit"
                className="btn btn-danger"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Task;
