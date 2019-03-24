import React, { Component } from "react";
import { connect } from "react-redux";

import { CardHeader, styles} from '../styles/sharedStyles'
import { LineChart, CartesianGrid, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";



class Chart extends Component {
  render() {
    const chartData = []
    const { data }   = this.props.data
    for (let i = 0; i < data.length; i++) {
      chartData.push({
        timestamp: moment(data[i].timestamp).format("MMM DD YYYY, HH:mm:ss"),
        metric: data[i].metric
      });
    }
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
    data
  } = state.drone;
  return {
    data
  }
}


export default connect(mapStore)(withStyles(styles)(Chart));
