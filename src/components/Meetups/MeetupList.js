import React from "react";
import { connect } from "react-redux";
import { Icon, Button, Item } from "semantic-ui-react";

import { fetchUpcomingMeetups, getSelectedItem } from "../../actions";
import SearchBar from "../Common/SearchBar";
import noimage from "../../images/noimage.jpg";

class MeetupList extends React.Component {
  onSearchSubmit = (value, category) => {
    this.props.fetchUpcomingMeetups({ text: value, category: category });
  };

  onSelected = (meetup) => {
      this.props.getSelectedItem(meetup);

  }

  renderList() {
    return this.props.upcomingMeetups.map(meetup => {
      let eventTime = new Date(meetup.time);
      const YYYY = eventTime.getFullYear();
      const MM = ("00" + (eventTime.getMonth() + 1)).slice(-2);
      const dd = ("00" + eventTime.getDate()).slice(-2);
      const hh = ('0' + eventTime.getHours()).slice(-2);
      const mm = ('0' + eventTime.getMinutes()).slice(-2);
      const eventStartDate =  YYYY + "/" + MM + "/" + dd + ' ,' + hh + ':' + mm;
      return (
        <Item id={meetup.id} key={meetup.id} onClick={e => this.onSelected(meetup)}>
          <Item.Image
            size="small"
            src={meetup.photo_url ? meetup.photo_url : noimage}
          />
          <Item.Content className="middle aligned content">
            <Item.Header as="a">{meetup.name}</Item.Header>
            <Item.Meta>
              <span className="startdate">{eventStartDate}</span>
            </Item.Meta>
            <Item.Description>{meetup.group.name}</Item.Description>
            <Item.Extra>
              <Icon color="green" name="check" /> {meetup.yes_rsvp_count}Going
              <Button floated="right">
                <a href={meetup.event_url}>Check</a>
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    return (
      <div className="meetup-lists">
        <SearchBar onSubmit={this.onSearchSubmit} />
        <Item.Group divided>{this.renderList()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    upcomingMeetups: state.meetups.upcomingMeetups,
    options: state.categories,
    selectedMeetup : state.selected_item
  };
};

export default connect(
  mapStateToProps,
  { fetchUpcomingMeetups, getSelectedItem }
)(MeetupList);
