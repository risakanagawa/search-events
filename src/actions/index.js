  // Axios doesn't support calling other domains from the client side.
import axios from "axios";
const jsonp = require('jsonp');
const queryString = require('query-string');

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
  const queryParams ={
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
  const trendingMeetupUrl = `${meetupsUrl}&${queryString.stringify(queryParams)}`;
  jsonp(trendingMeetupUrl, null, (err, data) => {
  if (err) {
    console.error(err.message);
  } else {
    dispatch({
      type: "FETCH_TREND",
      payload: data.results,
      options: options
    });
  }
});
};

export const fetchMeetups = (options = {}) => async dispatch => {
  const queryParams ={
    sign: true,
    key: "483d53f5080354478142a1f0535841",
    country: "ca",
    city: "vancouver",
    page: "30",
    text_format:  "plain",
    text: options.text,
    ...(options.categoryId && {category: options.categoryId})
  };

  const fetchMeetupList = `${meetupsUrl}&${queryString.stringify(queryParams)}`;
  jsonp(fetchMeetupList, null, (err, data) => {
  if (err) {
    console.error(err.message);
  } else {
    dispatch({
      type: "FETCH_MEETUPS",
      payload: data.results,
      options: options
    });}
});
};

export const fetchUpcomingMeetups = (options = {}) => async dispatch => {
  let currentTime = new Date();
  const milliseconds = currentTime.getTime();
  const queryParams = {
    sign: true,
    key: "483d53f5080354478142a1f0535841",
    country: "ca",
    city: "vancouver",
    time: milliseconds + ",1w",
    radius: 20,
    text_format:  "plain",
    text: options.text,
    category: options.categoryId
  };

  const upcomingMeetups = `${meetupsUrl}&${queryString.stringify(queryParams)}`;
  jsonp(upcomingMeetups, null, (err, data) => {
  if (err) {
    console.error('err.message');
  } else {
    dispatch({
      type: "FETCH_UPCOMING",
      payload: data.results,
      options: options
    });  }
});
};

export const fetchCategories = () => async dispatch => {
  const queryParams = {
    sign: true,
    key: "483d53f5080354478142a1f0535841",
    country: "ca",
    city: "vancouver"
  }
  const categoriesUrl = `https://api.meetup.com/2/categories?${queryString.stringify(queryParams)}`;
  jsonp(categoriesUrl, null, (err, data) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(data);
    dispatch({ type: "FETCH_CATEGORY", payload: data.results || [] });
  }
});
};

