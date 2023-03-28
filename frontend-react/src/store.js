import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducers, userDetailReducers, userReducer, userUpdateReducers } from './reducers/userReducers';
import { tasksReducer } from "./reducers/taskReducers";
import folderReducer from './reducers/folderReducers';


const reducer = combineReducers({
  userLogin: authReducers, userDetails: userDetailReducers,
  userUpdate: userUpdateReducers,
  tasks: tasksReducer,
  userList: userReducer,
  folderList: folderReducer,
});
const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
