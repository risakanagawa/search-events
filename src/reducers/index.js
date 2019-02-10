import { combineReducers } from "redux";
import CategoryReducer from './CategoryReducer';
import MeetupsReducer from './MeetupsReducer';
import SearchReducer from './SearchReduer';
import SelectedItem from './SelectedItem';

export default combineReducers({
  meetups : MeetupsReducer,
  categories: CategoryReducer,
  search_terms: SearchReducer,
  selectedMeetup : SelectedItem
});
