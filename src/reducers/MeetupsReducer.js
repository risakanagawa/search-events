
const initialState = {
  trendingMeetups : [],
  upcomingMeetups : [],
  // selectedMeetup : null 
};


export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TREND":
      return {
        ...state,
        trendingMeetups: action.payload,
        searchOptions : action.options
      };
    case "FETCH_UPCOMING":
    return {
      ...state,
      upcomingMeetups: action.payload,
      searchOptions : action.options
    };
    // case "SELECTED_ITEM":
    // return {
    //   selectedMeetup : action.payload
    // };
    default:
      return state;
  }
};
