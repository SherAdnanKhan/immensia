import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFolder, fetchFolders } from "../actions/folderAction";
import { FOLDER_CREATE_RESET } from "../constants/folderConstants";

const FolderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { success } = useSelector((state) => state.folderList);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createFolder(name));
    setName("");
  };

  useEffect(() => {
    if(success){
      dispatch({ type: FOLDER_CREATE_RESET });
      dispatch(fetchFolders());
      navigate("/");
    }
  }, [navigate, success, dispatch]);


  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="container" style={{ marginTop: "40px", minHeight: "calc(100vh - 40px)" }}>
       <h2>Create New To-Do</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Folder Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Folder
        </button>
      </form>
    </div>
  );
};

export default FolderForm;
