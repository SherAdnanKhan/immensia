import {
    FETCH_USERS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_UPDATE_FAIL, USER_UPDATE_PROFILE_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS
} from "../constants/userConstants";

const initialState = {
    loading: false, error: '', userInfo: {}
}
export const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

export const userDetailReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return {  ...state, loading: false, error: action.payload };
        case USER_DETAILS_RESET:
            return { user: {} };
        default:
            return state;
    }
}

export const userUpdateReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { ...state, loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state;
    }
}

const initialUsersState = {
    loading: false,
    users: [],
    error: null,
  };

export const userReducer = (state = initialUsersState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
          error: null,
        };
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          loading: false,
          users: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };