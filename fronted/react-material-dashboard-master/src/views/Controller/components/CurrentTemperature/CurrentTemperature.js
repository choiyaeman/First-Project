import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
//import MoneyIcon from '@material-ui/icons/Money';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import axios from 'axios';
import {useInterval} from 'common/utils';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
 
}));

const CurrentTemperature = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [temperatureData, setTemperatureData] = useState({
    temperature:-999 // 기본값을 설정해줘야 오류가 안난다.
  });
  useInterval(() => {
    axios.get("http://localhost:8080/SpringMongo2/selectTest?1=1")
    .then(response => {    
      setTemperatureData(response.data[response.data.length-1]) // -1 한 이유는 예를들어 배열은 a[0], a[1] ... 0 부터 시작하므로 -1을 해줘야한다. 
    });
  }, 3000)

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Temperature
            </Typography>
            <Typography variant="h3">{temperatureData.temperature}°C</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AcUnitIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        {/* <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Since last month
          </Typography>
        </div> */}
      </CardContent>
    </Card>
  );
};

CurrentTemperature.propTypes = {
  className: PropTypes.string
};

export default CurrentTemperature;
