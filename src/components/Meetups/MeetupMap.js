import React from "react";
import { connect } from "react-redux";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    let meetupPopupDom;
    if (this.state.meetupPopup) {
      meetupPopupDom = (
        <InfoWindow 
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>{this.state.meetupPopup.name}</div>
        </InfoWindow>
      );
      console.log('qqq');
      console.log(meetupPopupDom);
    }

    let activeMarker;
    let visible;
    let selectedPlace;
    let position;
    if (this.props.selectedMeetup) {
      
      visible = true;
      selectedPlace = this.props.selectedMeetup;
      console.log('selectedPlace');
      console.log(selectedPlace);
      const lat = selectedPlace.venue ? selectedPlace.venue.lat : selectedPlace.group.group_lat;
      const lon = selectedPlace.venue ? selectedPlace.venue.lon : selectedPlace.group.group_lon;
      position = { lat, lng: lon };
    } else {
      activeMarker = this.state.activeMarker;
      visible = this.state.showingInfoWindow;
      selectedPlace = this.state.selectedPlace;
    }
    
    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: 49.28273, lng: -123.120735 }}
        zoom={14}
        style={{ height: "100vh" }}
        onClick={this.onMapClicked}
      >
        {this.props.places &&
          this.props.places.map((place) => {
            const lat = place.venue ? place.venue.lat : place.group.group_lat;
            const lon = place.venue ? place.venue.lon : place.group.group_lon;
            const selectedMeetup = this.props.selectedMeetup;
            const marker = (
              <Marker
                onClick={this.onMarkerClick}
                title={place.name}
                key={place.id}
                position={{ lat: lat, lng: lon }}
              />
            );
            // if (selectedMeetup && selectedMeetup.id === place.id) {
            //   console.log('HAAAAA');
            //   console.log(marker);
            //   activeMarker = marker;
            //   visible = true;
            //   selectedPlace = place;
            // }
            return marker;
          })}
          <InfoWindow
            marker={activeMarker}
            visible={visible}
            position={position}
          >
              <div>
                <h1>{selectedPlace.name}</h1>
              </div>
          </InfoWindow>
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.meetups.upcomingMeetups,
    selectedMeetup: state.meetups.selectedMeetup
  }
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: "AIzaSyBLNCkCZMaNZ2U9h_JwOJqXm1kIde8C71k"
  })(MapContainer)
);
