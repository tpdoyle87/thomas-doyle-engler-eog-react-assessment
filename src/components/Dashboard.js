/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import { CardHeader, styles } from "../styles/sharedStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

<<<<<<< HEAD
=======
//
>>>>>>> 5007b6c405cdc6f46f3ee055b456427c05ba5b5e
class Dashboard extends Component {

  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    if (this.props.loading) return <LinearProgress />;
    return (
      <Card className={this.props.classes.card}>
        <CardHeader title="Dashboard" />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="Temperature: " />
              <ListItemText
                className={this.props.classes.goRight}
                primary={`${this.props.metric}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Latitude:" />
              <ListItemText
                className={this.props.classes.goRight}
                primary={`${this.props.lat}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Longitude:" />
              <ListItemText
                className={this.props.classes.goRight}
                primary={`${this.props.lng}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Received:" />
              <ListItemText
                className={this.props.classes.goRight}
                primary={
                  `${Math.round((Date.now() - this.props.timestamp) / 1000)} second(s) ago`}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }
}

const mapState = (state) => {
  const {
    loading,
    timestamp,
    lat,
    lng,
    metric
  } = state.drone;
  return {
    loading,
    timestamp,
    lat,
    lng,
    metric
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
  dispatch({
     type: actions.FETCH_DRONE_LOCATION
  })
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Dashboard));
