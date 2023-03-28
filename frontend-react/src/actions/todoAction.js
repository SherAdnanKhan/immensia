import axios from "axios";
import { GET_TASKS_BY_FOLDER_FAIL, GET_TASKS_BY_FOLDER_REQUEST, GET_TASKS_BY_FOLDER_SUCCESS } from "../constants/folderConstants";
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  COMPLETE_TASK_REQUEST,
  COMPLETE_TASK_SUCCESS,
  COMPLETE_TASK_FAILURE,
  SHARE_TASK_REQUEST,
  SHARE_TASK_SUCCESS,
  SHARE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  EDIT_TASK_FAILURE,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_REQUEST,
} from "../constants/todoConstants";
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "../constants/userConstants";

const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST });

const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const fetchTasks = () => {
  return async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    dispatch(fetchTasksRequest());
    try {
      const { data } = await axios.get("/api/tasks", config);
      dispatch(fetchTasksSuccess(data));
    } catch (error) {
      dispatch(fetchTasksFailure(error.message));
    }
  };
};

const createTaskRequest = () => ({ type: CREATE_TASK_REQUEST });

const createTaskSuccess = (task) => ({
  type: CREATE_TASK_SUCCESS,
  payload: task,
});

const createTaskFailure = (error) => ({
  type: CREATE_TASK_FAILURE,
  payload: error,
});

export const createTask = (taskData) => {
  return async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    dispatch(createTaskRequest());
    try {
      const { data } = await axios.post("/api/tasks", taskData, config);
      dispatch(createTaskSuccess(data));
    } catch (error) {
      dispatch(createTaskFailure(error.message));
    }
  };
};

export const deleteTaskRequest = () => {
  return { type: DELETE_TASK_REQUEST };
};

export const deleteTaskSuccess = (taskId) => {
  return { type: DELETE_TASK_SUCCESS, payload: taskId };
};

export const deleteTaskFailure = (error) => {
  return { type: DELETE_TASK_FAILURE, payload: error };
};

export const deleteTask = (taskId) => {
  return async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    dispatch(deleteTaskRequest());
    try {
      await axios.delete(`/api/tasks/${taskId}`, config);
      dispatch(deleteTaskSuccess(taskId));
    } catch (error) {
      dispatch(deleteTaskFailure(error.message));
    }
  };
};

const completeTaskRequest = () => ({ type: COMPLETE_TASK_REQUEST });

const completeTaskSuccess = (task) => ({
  type: COMPLETE_TASK_SUCCESS,
  payload: task,
});

const completeTaskFailure = (error) => ({
  type: COMPLETE_TASK_FAILURE,
  payload: error,
});

export const completeTask = (taskId) => {
  return async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    dispatch(completeTaskRequest());
    try {
      const { data } = await axios.get(`/api/tasks/${taskId}/complete`, config);
      dispatch(completeTaskSuccess(data));
    } catch (error) {
      dispatch(completeTaskFailure(error.message));
    }
  };
};

const editTaskRequest = () => ({ type: EDIT_TASK_REQUEST });

const editTaskSuccess = () => ({ type: EDIT_TASK_SUCCESS });

const editTaskFailure = (error) => ({
  type: EDIT_TASK_FAILURE,
  payload: error,
});

export const editTask = (taskId, updatedTask) => {
  return async (dispatch, getState) => {
    const { userLogin: { userInfo }} = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}`}};

    dispatch(editTaskRequest());
    try {
      const { data } = await axios.put(`/api/tasks/${taskId}`, updatedTask, config);
      dispatch(editTaskSuccess(data));
    } catch (error) {
      dispatch(editTaskFailure(error.message));
    }
  };
};

const shareTaskRequest = () => ({ type: SHARE_TASK_REQUEST });

const shareTaskSuccess = () => ({ type: SHARE_TASK_SUCCESS });

const shareTaskFailure = (error) => ({
  type: SHARE_TASK_FAILURE,
  payload: error,
});

export const shareTask = (taskId, userId) => {
  return async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    dispatch(shareTaskRequest());
    try {
      await axios.post(`/api/tasks/${taskId}/share`, { userId }, config);
      dispatch(shareTaskSuccess());
    } catch (error) {
      dispatch(shareTaskFailure(error.message));
    }
  };
};

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    dispatch(fetchUsersRequest());
    try {
      const { data } = await axios.get("/api/users", config);
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};


export const getTasksByFolder = (folder) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_BY_FOLDER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.get(`/api/tasks/folders/${folder}`, config);

    dispatch({ type: GET_TASKS_BY_FOLDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TASKS_BY_FOLDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};