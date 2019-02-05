import React from "react";
import { Card, Icon, Image, Container } from "semantic-ui-react";
import { fetchTrendingMeetups } from "../../actions";
import { connect } from "react-redux";

class TrendingMeetUps extends React.Component {
  componentDidMount() {
    this.props.fetchTrendingMeetups();
  }

  renderList() {
    console.log(this.props);
    console.log('trending');
    return this.props.trendingMeetups && this.props.trendingMeetups.map(meetup => {
      return (
        <div className="four wide column" key={meetup.id}>
          <Card style={{height: '400px'}}>
          <Image src={ meetup.photo_url ? meetup.photo_url : 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg' }  size='large' />
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
        <h1>Trending Events in Vancouver</h1>
        <div className="ui grid">{this.renderList()}</div>
      </ Container>
    );
  }
}

const mapStateToProps = state => {
  return { trendingMeetups: state.meetups.trendingMeetups };
};

export default connect(
  mapStateToProps,
  { fetchTrendingMeetups }
)(TrendingMeetUps);
