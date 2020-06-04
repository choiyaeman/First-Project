import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line, Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles'; 

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { data, options } from './chart';
import axios from 'axios';
import {useInterval} from 'common/utils';

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

// 두 값 사이의 정수 난수 생성하기
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const CurrentEnvironment = props => {
  const { className, ...rest } = props; 

  const classes = useStyles();

const [chartData, setChartData] = useState([]);
const [chartData1, setChartData1 ] = useState([]);
const [chartData2, setChartData2 ] = useState([]);
const [labelData, setLabelData] = useState([]);

//[{"id":"5ece13c4ea2ecf898165c6f5","dustDensity":"31.25","date":"21:46","temperature":"22.20","humidity":"48.90"},{"id":"5ece13c4ea2ecf898165c6f6","dustDensity":"16.25","date":"21:46","temperature":"22.20","humidity":"49.00"},{"id":"5ece13c4ea2ecf898165c6f7","dustDensity":"11.25","date":"21:46","temperature":"22.20","humidity":"49.00"},{"id":"5ece13c4ea2ecf898165c6f8","dustDensity":"42.50","date":"21:46","temperature":"22.20","humidity":"48.90"},{"id":"5ece13c4ea2ecf898165c6f9","dustDensity":"36.25","date":"21:46","temperature":"22.20","humidity":"48.90"},{"id":"5ece13c4ea2ecf898165c6fa","dustDensity":"35.00","date":"21:46","temperature":"22.20","humidity":"48.90"},{"id":"5ece13c4ea2ecf898165c6fb","dustDensity":"27.50","date":"21:46","temperature":"22.20","humidity":"48.90"},{"id":"5ece13c4ea2ecf898165c6fc","dustDensity":"27.50","date":"21:46","temperature":"22.20","humidity":"48.90"},{"id":"5ece13c4ea2ecf898165c6fd","dustDensity":"41.25","date":"21:47","temperature":"22.20","humidity":"48.90"},{"id":"5ece13c4ea2ecf898165c6fe","dustDensity":"35.00","date":"21:47","temperature":"22.20","humidity":"48.90"},{"id":"5ece13c4ea2ecf898165c6ff","dustDensity":"28.75","date":"21:47","temperature":"22.20","humidity":"49.00"},{"id":"5ece13c4ea2ecf898165c700","dustDensity":"15.00","date":"21:47","temperature":"22.20","humidity":"49.10"},{"id":"5ece13c4ea2ecf898165c701","dustDensity":"13.75","date":"21:47","temperature":"22.20","humidity":"49.10"},{"id":"5ece13c4ea2ecf898165c702","dustDensity":"20.00","date":"21:47","temperature":"22.20","humidity":"49.10"},{"id":"5ece13c4ea2ecf898165c703","dustDensity":"32.50","date":"21:47","temperature":"22.20","humidity":"49.20"},{"id":"5ece13c4ea2ecf898165c704","dustDensity":"31.25","date":"21:47","temperature":"22.20","humidity":"49.30"},{"id":"5ece13c4ea2ecf898165c705","dustDensity":"26.25","date":"21:47","temperature":"22.20","humidity":"49.50"},{"id":"5ece13c4ea2ecf898165c706","dustDensity":"26.25","date":"21:47","temperature":"22.20","humidity":"49.60"}]

useInterval(() => {
    axios.get("http://localhost:8080/SpringMongo2/selectTest?limit=100")
    // date => 밀리초까지 표현(12:47:50.456 yyyy-MM-dd HH:mm:ss.SSS) or timestamp
    .then(response => {
      // const newdata = response.data.map( (row,index) => {
      //   //{"id":"5ece13c4ea2ecf898165c6f5","dustDensity":"31.25","date":"21:46","temperature":"22.20","humidity":"48.90"}
      //   // 0,1,2   index가 차례대로 나오기위해 ..
        
      //   return {
      //     x:row.date+":"+index,
      //     y:parseInt(row.temperature)
      //   }
      // });
      const newChartData = [];
      const newChartData1 = [];
      const newChartData2 = [];
      const newLabelData = [];

      response.data.forEach((row,index) => {
        newLabelData.push(row.time+":"+index);
        newChartData.push(row.temperature);
        newChartData1.push(row.humidity);
        newChartData2.push(row.dustDensity);
       // newChartData.push(getRandomInt(10,35));
      });

      const reversedLabel = newLabelData.reverse();     // 배열 원소 순서를 거꾸로
      const reversedChartData = newChartData.reverse();
      const reversedChartData1 = newChartData1.reverse();
      const reversedChartData2 = newChartData2.reverse();

      setChartData(reversedChartData);
      setChartData1(reversedChartData1);
      setChartData2(reversedChartData2);
      setLabelData(reversedLabel);
      // setChartData(newChartData);
      // setLabelData(newLabelData);
    });
}, 3000)

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        //action={componentReturnFunction("Last 7 days")} // 함수를 호출해서 넘기는것..
        action={  // 부모가 하나
          <Button // 참조..
            size="small"
            variant="text"
          >
            real time <AccessAlarmIcon />
          </Button>
        }
        title= "Environment"
      />
      <Divider />
      
        <div className={classes.chartContainer}>
          <Line
            data = {{
              labels: labelData,
              datasets: [
                {
                  label: 'Temperature',
                  backgroundColor: "#FF0000",//'#42a5f5',//palette.primary.main,
                  data: chartData
                },
                {
                    label: 'Humidity',
                    backgroundColor: '#40FF00',//'#42a5f5',//palette.primary.main,
                    data: chartData1
                },
                {
                    label: 'Dust',
                    backgroundColor: '#696969',//'#42a5f5',//palette.primary.main,
                    data: chartData2
                }
              ]
            }}
            options={options}
          />
        </div>
      </div>
  );
};

CurrentEnvironment.propTypes = {
  className: PropTypes.string
};

export default CurrentEnvironment;

