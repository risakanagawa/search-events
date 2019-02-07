import React from "react";
import { connect } from "react-redux";
import { Icon, Image, Item } from "semantic-ui-react";

import { fetchUpcomingMeetups } from "../../actions";
import SearchBar from "../Common/SearchBar";
import noimage from "../../images/noimage.jpg";

class MeetupList extends React.Component {
  onSearchSubmit = (value, category) => {
    this.props.fetchUpcomingMeetups({ text: value, category: category });
  };

  renderList() {
    return this.props.upcomingMeetups.map(meetup => {
      return (
        <div className="meetup-list" key={meetup.id}>
          <Item.Group>
            <Item>
              <Item.Image
                size="small"
                src={meetup.photo_url ? meetup.photo_url : noimage}
              />

              <Item.Content>
                <Item.Header as="a">{meetup.name}</Item.Header>
                <Item.Description>{meetup.group.name}</Item.Description>
                <Item.Extra>
                  <Icon color="green" name="check" /> {meetup.yes_rsvp_count}{" "}
                  Going
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
      );
    });
  }

  render() {
    return (
      <div
        className="meetup-lists"
        style={{ height: "100vh", overflowY: "scroll" }}
      >
        <SearchBar onSubmit={this.onSearchSubmit} />
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    upcomingMeetups: state.meetups.upcomingMeetups,
    options: state.categories
  };
};

export default connect(
  mapStateToProps,
  { fetchUpcomingMeetups }
)(MeetupList);
