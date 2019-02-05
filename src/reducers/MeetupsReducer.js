const initialState = {
  trendingMeetups : [],
  upcomingMeetups : []
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
    default:
      return state;
  }
};
