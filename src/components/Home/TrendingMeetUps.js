import React from "react";
import { Card, Icon, Image, Container } from "semantic-ui-react";
import { connect } from "react-redux";

import { fetchTrendingMeetups } from "../../actions";
import noimage from '../../images/noimage.jpg'


class TrendingMeetUps extends React.Component {
  componentDidMount() {
    this.props.fetchTrendingMeetups();
  }

  renderList() {
    return this.props.trendingMeetups && this.props.trendingMeetups.map(meetup => {
      const photo = meetup.photo_url ? meetup.photo_url : noimage;
      let eventTime = new Date(meetup.created);
      const YYYY = eventTime.getFullYear();
      const MM = eventTime.toLocaleString('en-us', { month: 'long' });
      return (
        <div className="four wide column" key={meetup.id}>
          <Card style={{height: '400px'}}>
          <Image src={photo}  style={{ height: '200px'}} />
            <Card.Content>
              <Card.Header>
              <a href={meetup.event_url}>{meetup.name}</a>
              </Card.Header>
              <Card.Meta>Joined in {MM}, {YYYY}</Card.Meta>
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
