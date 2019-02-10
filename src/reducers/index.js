import { combineReducers } from "redux";
import CategoryReducer from './CategoryReducer';
import MeetupsReducer from './MeetupsReducer';
import SearchReducer from './SearchReduer';

export default combineReducers({
  meetups : MeetupsReducer,
  categories: CategoryReducer,
  search_terms: SearchReducer,
});
