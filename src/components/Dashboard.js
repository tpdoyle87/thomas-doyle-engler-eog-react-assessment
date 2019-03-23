import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import moment from 'moment'
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LinearProgress from "@material-ui/core/LinearProgress"
import { withStyles } from "@material-ui/core/styles";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);
const styles = {
  card: {
    margin: "5% 25%"
  }
};

class Dashboard extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    if (this.props.metric === null) return <LinearProgress />;
    return (
      <Card className={this.props.classes.card}>
        <CardHeader title="Dashboard" />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="Temperature: " />
              <ListItemText
                className="list-item-right"
                primary={`${this.props.metric}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Latitude:" />
              <ListItemText
                className="list-item-right"
                primary={`${this.props.lat}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Longitude:" />
              <ListItemText
                className="list-item-right"
                primary={`${this.props.lng}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Received:" />
              <ListItemText
                className="list-item-right"
                primary={
                  `${parseInt((moment() - this.props.timestamp) /  1000)} second(s) ago`
                  }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }
};

const mapState = (state) => {
  const {
    timestamp,
    lat,
    lng,
    metric
  } = state.drone
  return {
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