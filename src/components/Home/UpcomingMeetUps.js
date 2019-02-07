import React from "react";
import { Card, Icon, Image, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchUpcomingMeetups } from "../../actions";

class UpcomingMeetups extends React.Component {
  componentDidMount() {
    this.props.fetchUpcomingMeetups();
  }


  renderList() {
    return this.props.upcomingMeetups.map(meetup => {
      const photo = meetup.photo_url ? meetup.photo_url : 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg';
      return (
        <div className="four wide column" key={meetup.id}>
          <Card style={{height: '400px'}}>
          <Image src={ meetup.photo_url ? meetup.photo_url : 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }  style={{ height: '200px'}} />
            <Card.Content>
              <Card.Header>
              <a href={meetup.event_url}>{meetup.name}</a>
              </Card.Header>
              <Card.Meta>Joined in 2016</Card.Meta>
              <Card.Description>
                Daniel is a comedian living in Nashville.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="check" />
                {meetup.yes_rsvp_count} Going
            </Card.Content>
          </Card>
        </div>
      );
    });
  }

  render() {
    return (
      <Container>
        <h1>Upcoming Events in Vancouver</h1>
        <div className="ui grid">{this.renderList()}</div>
      </ Container>
    );
  }
}

const mapStateToProps = state => {
  return { upcomingMeetups: state.meetups.upcomingMeetups };
};

export default connect(
  mapStateToProps,
  { fetchUpcomingMeetups }
)(UpcomingMeetups);