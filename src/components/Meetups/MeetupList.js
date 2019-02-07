import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Image } from "semantic-ui-react";

import { fetchUpcomingMeetups } from "../../actions";
import SearchBar from "../Common/SearchBar";
// import CategoryOption from "../Home/CategoryOption";

class MeetupList extends React.Component {
  //get this.props.state
  onSearchSubmit =( value, category) => {
    console.log(this.props.options);
    this.props.fetchUpcomingMeetups({ text: value, category : category });
  };

  renderList() {
    return this.props.upcomingMeetups.map(meetup => {
      return (
        <div className="meetup-lists" key={meetup.id}>
          <Card style={{ width: "100%" }}>
            <Image
              src={
                meetup.photo_url
                  ? meetup.photo_url
                  : "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              }
              size="small"
            />
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
    return (
      <div className="meetup-map-list">
        {/* <CategoryOption /> */}
        <SearchBar
          onSubmit={this.onSearchSubmit}
        />
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    upcomingMeetups: state.meetups.upcomingMeetups,
    options: state.categories
  };
};

export default connect(
  mapStateToProps,
  { fetchUpcomingMeetups }
)(MeetupList);
