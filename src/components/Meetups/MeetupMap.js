import React from "react";
import { connect } from "react-redux";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: 49.28273, lng: -123.120735 }}
        zoom={14}
        style={{ height: "100vh" }}
      >
        {console.log(this.props)}
        {this.props.places &&
          this.props.places.map(place => {
            const lat = place.venue ? place.venue.lat : place.group.group_lat;
            const lon = place.venue ? place.venue.lon : place.group.group_lon;
            return (
              <Marker
                onClick={this.onToggleOpen}
                title={place.name}
                key={place.id}
                position={{ lat: lat, lng: lon }}>
                    <InfoWindow >
                        <h3>{place.name}</h3>
                    </InfoWindow>
              </Marker>
            );
          })}
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return { places: state.meetups.upcomingMeetups };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: "AIzaSyBLNCkCZMaNZ2U9h_JwOJqXm1kIde8C71k"
  })(MapContainer)
);
