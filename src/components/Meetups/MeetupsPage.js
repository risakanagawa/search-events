import React from "react";
import {Grid, Segment } from "semantic-ui-react";

import MeetupList from "./MeetupList";
import Map from "./MeetupMap";

class MeetupPage extends React.Component {
  render() {
    return (
      <div>
        <Segment>
          <Grid relaxed="very">
            <Grid.Column width={5}>
              <MeetupList />
            </Grid.Column>
            <Grid.Column width={11}>
              <Map />
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default MeetupPage;
