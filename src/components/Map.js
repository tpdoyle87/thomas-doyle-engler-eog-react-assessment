import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import GoogleMapReact from 'google-map-react';
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
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

const classes = "pin bounce"

const AnyReactComponent = () => {
  return (
    <div>
      <div className={classes}></div>
      <div className="pulse"></div>
    </div>
    );
  }

const styles = {
  card: {
    margin: "5% 25%"
  }
};

class Map extends Component {
  ComponentWillMount() {
    this.props.onLoad()
  }

  render() {
    if (this.props.metric == null) return <LinearProgress />
    return (
      <Card className={this.props.classes.card}>
        <CardHeader title="Google Map Visualization" />
        <CardContent>
          <div className="map-container">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY} }
              center={[this.props.lat, this.props.lng]}
              defaultZoom={4}
              yesIWantToUseGoogleMapApiInternals={true}

            >
              <AnyReactComponent
                lat={this.props.lat}
                lng={this.props.lng}
              />
            </GoogleMapReact>
          </div>
        </CardContent>
      </Card>
    );
  }
};

const mapState = (state) => {
  const {
    metric,
    lat,
    lng
  } = state.drone;
  return {
    metric,
    lat,
    lng,
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE_LOCATION
    })
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Map))
