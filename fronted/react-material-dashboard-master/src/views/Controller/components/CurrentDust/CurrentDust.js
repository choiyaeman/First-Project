import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { brown } from '@material-ui/core/colors';
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
    backgroundColor: brown[600],//theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const CurrentDust = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [dustData, setDustData] = useState({
    dustDensity:-1
  });

  useInterval(() => { 
    axios.get("http://localhost:8080/SpringMongo2/selectTest")
    .then(response => {
      setDustData(response.data[response.data.length-1]) //response.data[0])
    });
  }, 3000)

  const pickColor = (dustDensity) => {
    if(dustDensity > 100) {
      return colors.red[500];
    } else if(dustDensity >50) {
      return colors.green[500];
    } else {
      return colors.blue[500];
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
              Dust
            </Typography>
            <Typography variant="h3" style={{color:pickColor(dustData.dustDensity)}}>{dustData.dustDensity}[ug/m3]</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        {/* <LinearProgress
          className={classes.progress}
          value={75.5}
          variant="determinate"
        /> */}
      </CardContent>
    </Card>
  );
};

CurrentDust.propTypes = {
  className: PropTypes.string
};

export default CurrentDust;
