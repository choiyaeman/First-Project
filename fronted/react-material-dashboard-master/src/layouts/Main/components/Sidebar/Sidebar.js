import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Typography } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
//import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
//import TextFieldsIcon from '@material-ui/icons/TextFields';
//import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
import { Profile, SidebarNav, UpgradePlan } from './components';
import {getRandomInt} from 'common/utils';

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
    margin: theme.spacing(2, 0)
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

  const discomfortIndex = getRandomInt(60,85);

  const discomfortImage = (index) => {
    if(index > 80){
      return <img widht="48px" height="48px" src='/images/avatars/Very_bad.png'/>;
    } else if (index > 75){
      return <img widht="48px" height="48px" src='/images/avatars/Bad.png'/>;
    } else if (index > 70){
      return <img widht="48px" height="48px" src='/images/avatars/usually.png'/>;
    } else {
      return <img widht="48px" height="48px" src='/images/avatars/good.png'/>;
    }
  };

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
        <Typography variant="h1" align="center">{discomfortIndex}</Typography>
        &nbsp;&nbsp;
          {discomfortImage(discomfortIndex)}
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
