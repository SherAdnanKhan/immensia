import axios from "axios";
import {
  FOLDER_LIST_REQUEST,
  FOLDER_LIST_SUCCESS,
  FOLDER_LIST_FAIL,
  FOLDER_CREATE_REQUEST,
  FOLDER_CREATE_SUCCESS,
  FOLDER_CREATE_FAIL,
} from "../constants/folderConstants";

export const fetchFolders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FOLDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.get("/api/tasks/folders", config);

    dispatch({ type: FOLDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOLDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createFolder = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: FOLDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.post("/api/tasks/folders", { name }, config);

    dispatch({ type: FOLDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOLDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};