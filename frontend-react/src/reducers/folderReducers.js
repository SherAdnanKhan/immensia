import { FOLDER_CREATE_FAIL, FOLDER_CREATE_REQUEST, FOLDER_CREATE_RESET, FOLDER_CREATE_SUCCESS, FOLDER_LIST_FAIL, FOLDER_LIST_REQUEST, FOLDER_LIST_SUCCESS } from "../constants/folderConstants";

const folderReducer = (state = { folders: [] }, action) => {
    switch (action.type) {
      case FOLDER_LIST_REQUEST:
        return { loading: true, folders: [] };
      case FOLDER_LIST_SUCCESS:
        return { loading: false, folders: action.payload };
      case FOLDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      case FOLDER_CREATE_REQUEST:
        return { loading: true };
      case FOLDER_CREATE_SUCCESS:
        return { loading: false, success: true };
      case FOLDER_CREATE_RESET:
        return { ...state, success: false };
      case FOLDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default folderReducer;
  