export default (state = null, action) => {
    switch (action.type) {
      case "SELECTED_ITEM":
      return {
        selectedMeetup : action.payload
      };
      default:
        return state;
    }
  };