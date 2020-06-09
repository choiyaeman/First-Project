import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    height:theme.spacing(5),
    marginLeft:theme.spacing(2),
    color:theme.palette.white
  },
  avatar: {
    // left: 60,
    width: 50,
    height: 50
  }
  ,logoContainer: {
    ...theme.centerContainer
  }
})); 

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const logo = {
    avatar: '/images/avatars/dbms-logo.png',
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <div>
          <RouterLink className={classes.logoContainer} to="/">
            <Avatar
              className={classes.avatar}
              src={logo.avatar}
            />
            <Typography
              className={classes.title}
              color="textPrimary"
              variant="h1"
            >
          
            SmartHome
            </Typography>
            {/* <img
              alt="Logo"
              src= "/images/logos/dbms-logo.svg"  //src= "/images/logos/logo--white.svg" 
            /> */}
          </RouterLink>
        </div>
        <div className={classes.flexGrow} />
        {/* <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden> */}
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
