import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders,
  SecondChart,
  ThirdChart,
  DataView,
  PolarView,
  CurrentEnvironment
} from './components';
import CurrentEnergy from './components/CurrentEnergy';
import TotalView from './components/TotalView';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={12}
          xs={12}
        >
          <DataView />
        </Grid>
        <Grid
          item
          lg={6}
          md={12}
          xs={12}
        >
          <TotalView />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <CurrentEnergy />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <CurrentEnvironment />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
