import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';

const useStyles = makeStyles(theme => ({  // theme 테마, object를 return
  root: {
    padding: theme.spacing(4) // 공간을 얼마나 띄우느냐 4*8=32px
  }
}));

const Account = () => { // () 인자로 받는다는 의미 받아서 밑에 내용을 실행할게요..
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* classname 디자인할때 쓰이는것   */}
      <Grid
        container
        spacing={4}
      >
        <Grid
          item    // 12칸중에 몇칸을 차지하는지
          lg={4}  //lg : largedevice를 의미
          md={6}  // md : tablet
          xl={4}
          xs={12}
        >
          <AccountProfile />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
