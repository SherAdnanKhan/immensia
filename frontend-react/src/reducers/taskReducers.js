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
    DELETE_TASK_SUCCESS,
    EDIT_TASK_SUCCESS,
    CREATE_TASK_RESET,
  } from "../constants/todoConstants";
  
  const initialState = {
    tasks: [],
    loading: false,
    error: null,
    success: false,
  };
  
  const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TASKS_REQUEST:
      case CREATE_TASK_REQUEST:
      case COMPLETE_TASK_REQUEST:
      case SHARE_TASK_REQUEST:
      case GET_TASKS_BY_FOLDER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_TASKS_SUCCESS:
      case GET_TASKS_BY_FOLDER_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: action.payload,
        };
      case CREATE_TASK_SUCCESS:
        return {
          ...state,
          loading: false, 
          success: true,
          tasks: [...state.tasks, action.payload],
        };
        case CREATE_TASK_RESET:
          return {
            ...state,
            success: false,
          };
        case EDIT_TASK_SUCCESS:
          const updatedTasks = state.tasks.map(task =>
            task._id === action.payload._id ? action.payload : task
          );
          return {
            ...state,
            loading: false,
            success: true,
            tasks: updatedTasks
          };
        case DELETE_TASK_SUCCESS:
          const filteredTasks = state.tasks.filter(
            task => task._id !== action.payload
          );
          return {
            ...state,
            loading: false,
            tasks: filteredTasks
          };
      case COMPLETE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          ),
        };
      case SHARE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case FETCH_TASKS_FAILURE:
      case CREATE_TASK_FAILURE:
      case COMPLETE_TASK_FAILURE:
      case SHARE_TASK_FAILURE:
      case GET_TASKS_BY_FOLDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export { tasksReducer };
  