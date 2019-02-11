// import MeetUp from "../api/MeetUp";
import axios from "axios";

const meetupsUrl = "https://api.meetup.com/2/open_events?&photo-host=public";


export const setSearchOptions =({ text, categoryId }) => dispatch => {
  dispatch({ type: "SEARCH_TERM", payload: { text, categoryId } });
}

export const setSelectedMeetup = meetup => dispatch => {
  dispatch({ type: "SELECTED_ITEM", payload: meetup });
}

export const setActiveMarker = meetup => dispatch => {
  dispatch({ type: "SET_ACTIVE_MARKER", payload: meetup });
}

export const fetchTrendingMeetups = (options = {}) => async dispatch => {
  const response = await axios.get(meetupsUrl, {
    method: "get",
    params: {
      sign: true,
      key: "483d53f5080354478142a1f0535841",
      country: "ca",
      city: "vancouver",
      page: "4",
      desc: true,
      text_format:  "plain",
      text: options.text,
      category: options.categoryId
    }
  });
  dispatch({
    type: "FETCH_TREND",
    payload: response.data.results,
    options: options
  });
};

export const fetchMeetups = (options = {}) => async dispatch => {
  const response = await axios.get(meetupsUrl, {
    method: "get",
    params: {
      sign: true,
      key: "483d53f5080354478142a1f0535841",
      country: "ca",
      city: "vancouver",
      desc: true,
      text_format:  "plain",
      text: options.text,
      ...(options.categoryId && {category: options.categoryId})
    }
  });
  dispatch({
    type: "FETCH_MEETUPS",
    payload: response.data.results,
    options: options
  });
};

export const fetchUpcomingMeetups = (options = {}) => async dispatch => {
  let currentTime = new Date();
  const milliseconds = currentTime.getTime();
  const response = await axios.get(meetupsUrl, {
    method: "get",
    params: {
      sign: true,
      key: "483d53f5080354478142a1f0535841",
      country: "ca",
      city: "vancouver",
      time: milliseconds + ",1w",
      radius: 20,
      text_format:  "plain",
      text: options.text,
      category: options.categoryId
    }
  });
  dispatch({
    type: "FETCH_UPCOMING",
    payload: response.data.results,
    options: options
  });
};

export const fetchCategories = () => async dispatch => {
  const response = await axios.get("https://api.meetup.com/2/categories", {
    method: "get",
    params: {
      sign: true,
      key: "483d53f5080354478142a1f0535841",
      country: "ca",
      city: "vancouver"
    }
  });
  dispatch({ type: "FETCH_CATEGORY", payload: response.data.results || [] });
};

