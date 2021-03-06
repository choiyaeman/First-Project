import { Avatar, Card, CardContent, colors, Grid, Typography } from '@material-ui/core';
import OpacityIcon from '@material-ui/icons/Opacity';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import clsx from 'clsx';
import { useInterval } from 'common/utils';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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
    backgroundColor: colors.blue[500],
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
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const CurrentHumidity = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [humidityData, setHumidityData] = useState({
    humidity:-999
  });

  useInterval(() => {
    axios.get("http://localhost:8080/SpringMongo2/selectTest")
    .then(response => {
      setHumidityData(response.data[0])//(response.data[response.data.length-1])
    });
  }, 3000)

  const pickColor = (humidity) => {
    if(humidity > 65) {       // 나쁨
      return colors.red[500];
    } else if(humidity >39) {   // 좋음
      return colors.blue[500];
    } else {                    // 건조
      return colors.brown[500];
    }
  }

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
              Humidity
            </Typography>
            <Typography variant="h3" style={{color:pickColor(humidityData.humidity)}}>{humidityData.humidity}%</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <OpacityIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        {/* <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            16%
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

CurrentHumidity.propTypes = {
  className: PropTypes.string
};

export default CurrentHumidity;
