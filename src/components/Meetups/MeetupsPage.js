import React from "react";
import {Grid, Segment } from "semantic-ui-react";

import MeetupList from "./MeetupList";
import Map from "./MeetupMap";

class MeetupPage extends React.Component {
  render() {
    return (
      <div>
          <Grid style={{margin:0}}>
            <Grid.Column width={6}>
              <MeetupList />
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
