import React from "react";
import { connect } from "react-redux";
import { Icon, Button, Item } from "semantic-ui-react";

import { fetchMeetups, setActiveMarker } from "../../actions";
import SearchBar from "../Common/SearchBar";
import noimage from "../../images/noimage.jpg";

class MeetupList extends React.Component {
  componentDidMount() {
    this.props.fetchMeetups({ 
      text: this.props.searchOptions.text, 
      categoryId: this.props.searchOptions.categoryId 
    });
  }

  onSearchSubmit = (options) => {
    this.props.setActiveMarker({
      selectedMeetup: {},
      activeMarker: null,
      showingInfoWindow: false
    });
    this.props.fetchMeetups(options);
  };

  onMeetupSelectedFromList = (meetup) => {
    this.props.setActiveMarker({
      selectedMeetup: meetup,
      showingInfoWindow: true,
      activeMarker: null
    });
  }

  renderList() {
    return this.props.meetups && this.props.meetups.map(meetup => {
      let eventTime = new Date(meetup.time);
      const YYYY = eventTime.getFullYear();
      const MM = ("00" + (eventTime.getMonth() + 1)).slice(-2);
      const dd = ("00" + eventTime.getDate()).slice(-2);
      const hh = ('0' + eventTime.getHours()).slice(-2);
      const mm = ('0' + eventTime.getMinutes()).slice(-2);
      const eventStartDate =  YYYY + "/" + MM + "/" + dd + ' ,' + hh + ':' + mm;
      return (
        <Item id={meetup.id} key={meetup.id} onClick={e => this.onMeetupSelectedFromList(meetup)}>
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
  return {
    meetups: state.meetups.meetups,
    selectedMeetup : state.map.selectedMeetup,
    searchOptions : state.searchOptions
  };
};

export default connect(
  mapStateToProps,
  { fetchMeetups, setActiveMarker }
)(MeetupList);
