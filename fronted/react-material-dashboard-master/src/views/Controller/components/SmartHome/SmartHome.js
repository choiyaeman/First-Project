import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core'; // 디자인 컴포넌트 기본적으로 적용

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: { //style
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const SmartHome = props => { //props를 받아 렌더링한느 부분
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: '최예만',
    city: '서울',
    country: '한국',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_12.jpg'
  };

  const template = `나의 살던 고향은 ${user.city}`

  return (
    <Card
      {...rest} // 모든 prop를 다 가져온다
      className={clsx(classes.root, className)}
     // raised={true}
    >
      <CardContent>
        <div className={classes.details}>
          <div>  
            <Typography  //글을 쓸때 쓰는것.
              gutterBottom  // 줄 밑에 조금 여백을 주겠다는 의미.
              variant="h2"  // 무슨 스타일을 할지 정하는것.
            >
              choi yaeman
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({user.timezone})
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

SmartHome.propTypes = {
  className: PropTypes.string
};

export default SmartHome;
