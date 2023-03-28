import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../actions/todoAction";

const EditTask = ({ task, setShowModal }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userList);
  const { folders } = useSelector((state) => state.folderList);

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    completed: task.completed,
    assignedTo: task.assignedTo,
    folder: task.folder,
  });

  useEffect(() => {
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: task.completed,
      assignedTo: task.assignedTo,
      folder: task.folder,
    });
  }, [task]);

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editTask(task._id, formData));
    setShowModal(false);
  };

  console.log(task.assignedTo[0]?._id);
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit To-Do</h5>
          <button
            type="button"
            className="close"
            onClick={() => setShowModal(false)}
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
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
                className="form-control"
                id="dueDate"
                min={new Date().toISOString().slice(0, 10)}
                value={new Date(formData.dueDate).toLocaleDateString("en-CA")}
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
                value={task.assignedTo[0]?._id}
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

            {task.completed && (
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="completed"
                    id="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="completed">
                    Completed
                  </label>
                </div>
              </div>
            )}
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-2">
                Update To-Do
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
