import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles'; 

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { data, options } from './chart';
import axios from 'axios';
import { useInterval } from 'common/utils';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 200,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const HumidityChart = props => {
  const { className, ...rest } = props; 

  const classes = useStyles();

// const [chartData, setChartData] = useState([]);
// const [labelData, setLabelData] = useState([]);

// useInterval(() => {
//     axios.get("http://localhost:8080/SpringMongo2/selectTest?limit=100")
//     .then(response => {
      
//       const newChartData = [];
//       const newLabelData = [];

//       response.data.slice(0,50).forEach((row, index) => {
//         newLabelData.push(row.time);
//         newChartData.push(row.humidity);
//         //newChartData.push(getRandomInt(10,90));
//       });
//         // setChartData(newChartData);
//         // setLabelData(newLabelData);
        
//         setChartData(newChartData.reverse());
//         setLabelData(newLabelData.reverse());
//     });
// }, 3000)

  const data = {
    labels: ['21:56','22:10','23:34','23:48','24:02','24:16','24:30','24:44','24:58','25:12'],
    datasets: [
      {
        label: "Room Humidity",
        fill: false,
        backgroundColor: colors.green[400],
        borderColor: colors.green[400],
        data:[48.90, 43.20, 36.20, 54.20, 75.20, 62.29, 38.20, 34.10, 29.20, 41.20]
      }
    ]
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        //action={componentReturnFunction("Last 7 days")} // 함수를 호출해서 넘기는것..
        title={
          <div style={{display:"flex", alignItems:"center"}}>
            <div>Humidity</div>
            <div style={{flexGrow:1}}></div>
            <div>Realtime</div>
            &nbsp;
            <AccessAlarmIcon />
          </div>
        }
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Line
            // data = {{
            //   labels: labelData,
            //   datasets: [
            //     {
            //       label: 'Room Humidity',
            //       fill: false,
            //       backgroundColor: colors.green[400],
            //       borderColor: colors.green[400],//'#42a5f5',//palette.primary.main,
            //       data: chartData
            //     }
            //   ]
            // }}
            data={data}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
};

HumidityChart.propTypes = {
  className: PropTypes.string
};

export default HumidityChart;