import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Typography, colors } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import { Profile, SidebarNav, UpgradePlan } from './components';
import {getRandomInt, useInterval} from 'common/utils';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: 'theme.palette.red',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(4, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Controller',
      href: '/controller',
      icon: <HomeIcon />
    }
  ];

  const [discomfort, setDiscomfort] = useState({
    temperature: -100,
    humidity:-100
  });

  const [dustValue, setDustValue] =  useState({
    dustDensity: -999
  });

  useInterval(() => {
    axios.get("http://localhost:8080/SpringMongo2/selectTest")
    .then(response => {
      setDiscomfort(response.data[response.data.length-1]);
      setDustValue(response.data[response.data.length-1]);
    });
  }, 3000)

  const discomfortIndex = (1.8*discomfort.temperature-0.55*(1-discomfort.humidity/100)*(1.8*discomfort.temperature-26)+32).toFixed(1); //불쾌지수 계산식
  const dustIndex = dustValue.dustDensity;

  const discomfortColor = (discomfortIndex) => {
    if(discomfortIndex > 80) {
      return colors.red[500];
    } else if(discomfortIndex > 75) {
      return colors.orange[500];
    } else if(discomfortIndex > 70) {
      return colors.yellow[500];
    } else{
      return colors.green[500];
    }
  }
  
  const dustColor = (dustIndex) => {
    if(dustIndex > 250) {
      return colors.red[500];
    } else if(dustIndex > 100) {
      return colors.orange[500];
    } else if(dustIndex > 50) {
      return colors.yellow[500];
    } else {
      return colors.green[500];
    }
  }

  const discomfortImage = () => { // 불쾌지수 이미지 나타내기
    if(discomfortIndex > 80){
      return <img widht="48px" height="48px" src='/images/avatars/Very_bad.png'/>;
    } else if (discomfortIndex > 75){
      return <img widht="48px" height="48px" src='/images/avatars/Bad.png'/>;
    } else if (discomfortIndex > 70){
      return <img widht="48px" height="48px" src='/images/avatars/usually.png'/>;
    } else {
      return <img widht="48px" height="48px" src='/images/avatars/good.png'/>;
    }
  };

  const dustImage = () => { // 미세먼지 이미지 나타내기
    if(dustIndex > 250){
      return <img widht="48px" height="48px" src='/images/avatars/dust_Very Bad.png'/>;
    } else if (dustIndex > 100){
      return <img widht="48px" height="48px" src='/images/avatars/dust_Bad.png'/>;
    } else if (dustIndex > 50){
      return <img widht="48px" height="48px" src='/images/avatars/dust_usually.png'/>;
    } else {
      return <img widht="48px" height="48px" src='/images/avatars/dust_Very Good.png'/>;
    }
  }
  //const discomfortIndex = getRandomInt(60,85);

  // const discomfortImage = (index) => {
  //   if(index > 80){
  //     return <img widht="48px" height="48px" src='/images/avatars/Very_bad.png'/>;
  //   } else if (index > 75){
  //     return <img widht="48px" height="48px" src='/images/avatars/Bad.png'/>;
  //   } else if (index > 70){
  //     return <img widht="48px" height="48px" src='/images/avatars/usually.png'/>;
  //   } else {
  //     return <img widht="48px" height="48px" src='/images/avatars/good.png'/>;
  //   }
  // };

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        <Divider className={classes.divider} />
        
        <Typography variant="h3" align="center" gutterBottom>불쾌지수</Typography>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Typography variant="h1" align="center" style={{color:discomfortColor(discomfortIndex)}}>{discomfortIndex}</Typography>
        &nbsp;&nbsp;
          {discomfortImage()}
        </div>

        <Divider className={classes.divider} />
        <Typography variant="h3" align="center" gutterBottom>미세먼지</Typography>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Typography variant="h1" align="center" style={{color:dustColor(dustIndex)}}>{dustIndex}</Typography>
        &nbsp;&nbsp;
          {dustImage()}
        </div>
        
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
