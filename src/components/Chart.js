/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";

import LinearProgress from "@material-ui/core/LinearProgress";
import { CardHeader, styles} from "../styles/sharedStyles";
import { LineChart, CartesianGrid, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";



class Chart extends Component {
  render() {
    const chartData = [];
    const { data }   = this.props.data;
    for (let i = 0; i < data.length; i++) {
      chartData.push({
        timestamp: moment(data[i].timestamp).format("MMM DD YYYY, HH:mm:ss"),
        metric: data[i].metric
      });
    }
    if (this.props.loading) return <LinearProgress />;
    return(
      <Card className={this.props.classes.card}>
        <CardHeader title="Chart Visualization" />
        <CardContent>
          <LineChart width={450} height={250} data={chartData} iconSize={6} >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={[236, 322]}/>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="metric" stroke="#333" />
          </LineChart>
        </CardContent>
      </Card>
    );
  }
}

const mapStore = (state) => {
  const {
    loading,
    data
  } = state.drone;
  return {
    loading,
    data
  };
};


export default connect(mapStore)(withStyles(styles)(Chart));
