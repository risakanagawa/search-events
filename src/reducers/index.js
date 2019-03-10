import { combineReducers } from "redux";
import CategoryReducer from './CategoryReducer';
import MeetupsReducer from './MeetupsReducer';
import SearchReducer from './SearchReduer';
import MapReducer from './MapReducer';


export default combineReducers({
  meetups : MeetupsReducer,
  categories: CategoryReducer,
  searchOptions: SearchReducer,
  map : MapReducer,
});
