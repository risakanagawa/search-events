
const initialState = {
  trendingMeetups : [],
  upcomingMeetups : [],
  meetups: [],
  selectedMeetup : null 
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
        upcomingMeetups: !action.payload ? [] : action.payload.slice(0, 4),
        searchOptions : action.options
      };
    case "FETCH_MEETUPS":
      return {
        ...state,
        meetups: action.payload,
      }
    default:
      return state;
  }
};
