import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Image, Container } from "semantic-ui-react";

import { fetchUpcomingMeetups } from "../../actions";
import SearchBar from '../Common/SearchBar'

class MeetupList extends React.Component {
  //get this.props.state

  renderList() {
    return this.props.upcomingMeetups.map(meetup => {
      return (
        <div className='meetup-lists' key={meetup.id}>
          <Card style={{width: '100%'}}>
            <Image  src={
                meetup.photo_url ? meetup.photo_url : "https://react.semantic-ui.com/images/avatar/large/daniel.jpg" }size="small" />
            <Card.Content header={meetup.name} />
            <Card.Content extra>
              <Icon name="user" />
              {meetup.yes_rsvp_count} Going
            </Card.Content>
          </Card>
        </div>
      );
    });
  }

  render() {
    return (<div>
        <SearchBar />
        {this.renderList()}</div>);
  }
}

const mapStateToProps = state => {
  return { upcomingMeetups: state.meetups.upcomingMeetups };
};

export default connect(
  mapStateToProps,
  { fetchUpcomingMeetups }
)(MeetupList);
