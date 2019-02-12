import React from "react";
import { connect } from "react-redux";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { setActiveMarker } from "../../actions";

import icon from "../../images/marker.svg";

let markers = [];

let markersRendered = false;

class MapContainer extends React.Component {
  onMarkerClick = (props, marker, e) => {
    this.props.setActiveMarker({
      selectedMeetup: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.props.map.showingInfoWindow) {
      this.props.setActiveMarker({
        showingInfoWindow: false,
        activeMarker: null,
        selectedMeetup: {}
      });
    }
  };

  onMarkerMounted = element => {
    if (!element) return;
    markers.push(element.marker);
  };

  render() {
    let activeMarker = this.props.map.activeMarker; // It's from the Redux store.
    if (!activeMarker && this.props.map.selectedMeetup) {
      // It's coming from the list of meetups.
      activeMarker = markers.find(marker => {
        return marker.meetupId === this.props.map.selectedMeetup.id;
      });
    }

    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: 49.28273, lng: -123.120735 }}
        zoom={14}
        style={{ height: "100vh" }}
        onClick={this.onMapClicked}
      >
        {this.props.meetups &&
          this.props.meetups.map((meetup, index) => {
            const lat = meetup.venue
              ? meetup.venue.lat
              : meetup.group.group_lat;
            const lon = meetup.venue
              ? meetup.venue.lon
              : meetup.group.group_lon;
            const marker = (
              <Marker
                {...meetup}
                ref={this.onMarkerMounted}
                onClick={this.onMarkerClick}
                title={meetup.name}
                key={meetup.id}
                meetupId={meetup.id}
                position={{ lat: lat, lng: lon }}
                icon={icon}
              />
            );
            if (this.props.meetups.length - 1 === index) {
              markersRendered = true;
            }
            return marker;
          })}
        {this.props.map.selectedMeetup && (
          <InfoWindow
            marker={activeMarker}
            visible={this.props.map.showingInfoWindow}
            >
              <p>{this.props.map.selectedMeetup.name}</p>

          </InfoWindow>
        )}
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
    meetups: state.meetups.meetups,
    selectedMeetup: state.meetups.selectedMeetup,
    searchOptions: state.searchOptions,
    map: state.map
  };
};

export default connect(
  mapStateToProps,
  { setActiveMarker }
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyBLNCkCZMaNZ2U9h_JwOJqXm1kIde8C71k"
  })(MapContainer)
);
