import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'DBMS',
    avatar: '/images/avatars/avatar_12.jpg',
    bio: 'Team members'
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/* <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings" 
      /> */}
      <AvatarGroup max={5}>
        <Avatar alt="Remy Sharp" src="/images/avatars/avatar_1.png" />
        <Avatar alt="Travis Howard" src="/images/avatars/avatar_2.png" />
        <Avatar alt="Cindy Baker" src="/images/avatars/avatar_3.png" />
        <Avatar alt="Agnes Walker" src="/images/avatars/avatar_4.png" />
        <Avatar alt="Trevor Henderson" src="/images/avatars/avatar_5.png.jpg" />
      />
      </AvatarGroup>

      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
