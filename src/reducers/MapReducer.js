const initialState = {
  showingInfoWindow: false,
  activeMarker: null,
  selectedMeetup: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_MARKER":
      return {
        ...state,
        showingInfoWindow: action.payload.showingInfoWindow,
        activeMarker: action.payload.activeMarker,
        selectedMeetup: action.payload.selectedMeetup
      };
    default:
      return state;
  }
};
