/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import { CardHeader, styles } from "../styles/sharedStyles";
import GoogleMapReact from "google-map-react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";


const Marker = () => {
  return (
      <div className="pin"></div>
    );
  };

class Map extends Component {
  ComponentWillMount() {
    this.props.onLoad();
  }

  render() {
    if (this.props.loading) return <LinearProgress />;
    return (
      <Card className={this.props.classes.card}>
        <CardHeader title="Google Map Visualization" />
        <CardContent>
          <div className={this.props.classes.mapContainer}>
            <GoogleMapReact
              // eslint-disable-next-line no-undef
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY} }
              center={[this.props.lat, this.props.lng]}
              defaultZoom={4}
              yesIWantToUseGoogleMapApiInternals={true}

            >

              <Marker
                lat={this.props.lat}
                lng={this.props.lng}
              />
            </GoogleMapReact>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const mapState = (state) => {
  const {
    loading,
    metric,
    lat,
    lng
  } = state.drone;
  return {
    loading,
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

export default connect(mapState, mapDispatch)(withStyles(styles)(Map));
