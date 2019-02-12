import React from "react";
import {Grid } from "semantic-ui-react";

import MeetupList from "./MeetupList";
import Map from "./MeetupMap";

import './meetup.css';

class MeetupPage extends React.Component {

  render() {
    return (
      <div>
          <Grid style={{margin:0}}>
            <Grid.Column width={6} className="meetup-list">
              <MeetupList style={{ height: "100vh", overflowY: "scroll" }} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Map />
            </Grid.Column>
          </Grid>
      </div>
    );
  }
}

export default MeetupPage;
