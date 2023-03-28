import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, getTasksByFolder } from "../actions/todoAction";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [editSuccess, setEditSuccess] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { folders } = useSelector((state) => state.folderList);

  const handleFolderSelect = (e) => {
    setSelectedFolder(e.target.value);
  };

  useEffect(() => {
    if (selectedFolder) {
      dispatch(getTasksByFolder(selectedFolder));
    } else {
      dispatch(fetchTasks());
    }
  }, [dispatch, selectedFolder, editSuccess]);

  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <h1 style={{ fontSize: "3rem" }}>My To-Do List</h1>
      <div className="form-group">
        <label htmlFor="priority">Filter by folder:</label>
        <select
          className="form-control-sm"
          id="folder-select"
          value={selectedFolder}
          onChange={handleFolderSelect}
        >
          <option value="">All</option>
          {folders.map((folder) => (
            <option key={folder._id} value={folder._id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TodoItem
              key={task._id}
              task={task}
              setEditSuccess={setEditSuccess}
            />
          ))
        ) : (
          <p style={{ fontSize: "1.2rem" }}>You have no tasks at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
