import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shareTask } from "../actions/todoAction";

const ShareTask = ({ task, setShowShare }) => {
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { users } = useSelector((state) => state.userList);

  const handleChange = (event) => {
    const options = event.target.options;
    let selectedUserIds = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedUserIds.push(options[i].value);
      }
    }
    setSelectedUsers(selectedUserIds);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(shareTask(task._id, selectedUsers));
    setSelectedUsers([]);
    setShowShare(false);
  };

  // Find shared users
  const sharedUsers = users.filter((user) => task.sharedWith.includes(user._id));

  return (
    <div className="p-3">
      <h3>Share Task
        <button type="button" className="close" onClick={() => setShowShare(false)}>
              <span>&times;</span>
        </button>
      </h3>
      {sharedUsers.length > 0 && (
        <div className="mb-2">
          <p className="mb-1 font-weight-bold">Currently shared with:</p>
          {sharedUsers.map((user) => (
            <p key={user._id} className="mb-1">
              {user.name}
            </p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select name="user" className="form-control" value={selectedUsers} onChange={handleChange}>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Share
        </button>
      </form>
    </div>
  );
};

export default ShareTask;
