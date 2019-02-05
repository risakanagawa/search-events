import React from "react";
import { withRouter } from "react-router";
import { fetchUpcomingMeetups } from "../../actions";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import Footer from "../Common/Footer";
import SearchBar from "../Common/SearchBar";
import CategoryOption from "./CategoryOption";
import TrendingMeetUps from "./TrendingMeetUps";
import UpcomingMeetUps from "./UpcomingMeetUps";
import "./homepage.css";

class HomePage extends React.Component {
  onSearchSubmit = value => {
    this.props.fetchUpcomingMeetups({ text: value });
    this.props.history.push("/meetups");
  };

  render() {
    return (
      <div>
        <div className="banner">
          <Grid className='ui container'>
            <Grid.Column width={8}>
              <h1 className="heading">
                Search Hot Events in Vancouver, Canada!
              </h1>
            </Grid.Column>
            <Grid.Column width={8} className='search-right' style={{display : 'flex', justifyContent: 'center', alignItems: 'center', flexDirection : 'column'}}>
              <CategoryOption />
              <SearchBar onSubmit={this.onSearchSubmit} />
            </Grid.Column>
          </Grid>
        </div>
        <div className="ui container top-contents">
          <TrendingMeetUps />
          <UpcomingMeetUps />
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUpcomingMeetups }
)(withRouter(HomePage));
