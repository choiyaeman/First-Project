import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
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

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestSales = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  /*
  const [charData, setChartData] = useState(data); // 초기값은 data, 바꾸는 함수는 setChartData
  setInterval(() => {
    axios.get('/server/data') //server에가서 .then을 호출
    .then(response => {
      setChartDate(response.data);
    });
  }, 500)
*/

//   const componentReturnFunction = (aprop, bprop) => {
//     return(<Button // 참조..
//     size="small"
//     variant="text"
//   >
//     {aprop} <AccessAlarmIcon />
//   </Button>);
// }
//   }

  return (
    <Card
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
            Last 7 days <AccessAlarmIcon />
          </Button>
        }
        title= "사용량"//"Latest Sales"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            //data={charData}
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = { // LatestSales컴포넌트의 propTypes객체를 정의. propTypes 객체의 키 값은 프롭스 명이고, 값은 설정할 기본값.
  className: PropTypes.string
};

export default LatestSales;















