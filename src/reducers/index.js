import { combineReducers } from "redux";
import CategoryReducer from './CategoryReducer';
import MeetupsReducer from './MeetupsReducer';

export default combineReducers({
  meetups : MeetupsReducer,
  categories: CategoryReducer,
});
