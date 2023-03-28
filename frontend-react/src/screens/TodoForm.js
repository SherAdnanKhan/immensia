import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from "../actions/todoAction";
import { CREATE_TASK_RESET } from "../constants/todoConstants";

const TodoForm = ({folders}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.userList);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignedTo: "",
    folder: "", 
  });


  useEffect(() => {
    if(success){
      dispatch({ type: CREATE_TASK_RESET });
      navigate("/");
    }
  }, [navigate, success, dispatch]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTask(formData));
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      assignedTo: "",
      folder: "", 
    });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      assignedTo: "",
      folder: "", 
    });
  };

  return (
    <div className="container" style={{ marginTop: "40px", minHeight: "calc(100vh - 40px)" }}>
      <h2>Create New To-Do</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            min={new Date().toISOString().slice(0, 10)}
            className="form-control"
            id="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            name="priority"
            className="form-control"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="folder">Folder:</label>
          <select
            name="folder"
            className="form-control"
            id="folder"
            value={formData.folder}
            onChange={handleChange}
          >
            <option value="">Select folder</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignedTo">Assign to:</label>
          <select
            name="assignedTo"
            className="form-control"
            id="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary mr-2">
            Create To-Do
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
