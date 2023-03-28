import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteTask, fetchTasks } from "../actions/todoAction";
import ShareTask from "./ShareTask";
import Button from "react-bootstrap/Button";
import EditTask from "./EditTask";
import { fetchFolders } from "../actions/folderAction";

const TodoItem = ({ task, setEditSuccess }) => {
  const dispatch = useDispatch();
  const [showShare, setShowShare] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const userLogin = useSelector(state => state.userLogin);
  const  {userInfo }  = userLogin;

  const handleComplete = () => {
    dispatch(completeTask(task._id));
  };

  const handleShare = () => {
    setShowShare(true);
  };

  const handleEdit = () => {
    setShowEdit(true);
  };

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchFolders());
  }, [showEdit, showShare, dispatch]);



  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      dispatch(deleteTask(task._id));
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h3 className="card-title mb-3">{task.title}</h3>
        <p className="card-text mb-2">{task.description}</p>
        <p className="card-text mb-2">Due date: {new Date(task.dueDate).toLocaleDateString("en-CA")}</p>
        <p className="card-text mb-2">Priority: {task.priority}</p>
        <p className="card-text mb-2">Assigned To: {task.assignedTo[0]?.name}</p>
        {!task.completed && <Button variant="primary" className="m-2" onClick={handleComplete} style={{ backgroundColor: "#007bff" }}>Mark Complete</Button>}
        <Button variant="primary"  className="mr-2"  onClick={handleShare}  stlye={{backgroundColor: "linear-gradient(to right, #e53935, #e35d5b)" }}>Share Task</Button>
        { userInfo?.user.role === "admin" && <Button variant="warning" className="mr-2" onClick={handleEdit} > Edit </Button> }
        { userInfo?.user.role === "admin" && <Button variant="danger"  className="m-2"  onClick={handleDelete} > Delete </Button>}
        {showShare && <ShareTask task={task} setShowShare={setShowShare} />}
        {showEdit && <EditTask task={task} setShowModal={setShowEdit} />}
        {task.completed && <p className="card-text text-success mb-2">Completed</p>}
      </div>
    </div>
  );
};

export default TodoItem;
