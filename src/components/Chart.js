import React, { Component } from "react";
import { connect } from "react-redux";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment'
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
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

class Chart extends Component {
  render() {
    const chartData = []
    let i;
    for (i = 0; i < this.props.data.data.length; i++) {
      chartData.push({
        timestamp: moment(this.props.data.data[i].timestamp).format("MMM DD YYYY, HH:mm:ss"),
        metric: this.props.data.data[i].metric
      });
    }
    return(
      <Card className={this.props.classes.card}>
        <CardHeader title="Chart Visualization" />
        <CardContent>
          <LineChart width={450} height={250} data={chartData} iconSize={6} >
            <XAxis dataKey="timestamp" />
            <YAxis domain={[235, 325]}/>
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
    data: data
  } = state.drone;
  return {
    data
  }
}


export default connect(mapStore)(withStyles(styles)(Chart));
