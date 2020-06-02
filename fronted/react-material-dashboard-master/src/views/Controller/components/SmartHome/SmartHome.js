import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Divider, Card, CardContent} from '@material-ui/core';
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import ToysIcon from '@material-ui/icons/Toys';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

//const apiURL = "http://localhost:5000";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  spacer : {
    height:theme.spacing(2) // 높이 간격주기
  }
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function CustomizedSwitches() {

  const classes = useStyles();

  // 처음에 꺼져있는 상태로 설정
  const [ledSwitch, setLedSwitch] = useState(false);
  const [airSwitch, setAirSwitch] = useState(false);

  //초기값 셋팅, useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook이다.
  useEffect(() => {
    // axios.get('/api/led/status')            // 라즈베리파이에서 led가 켜져있는지 꺼져있는지 현재 상태
    // .then(response => setLedSwitch(response.data.state));
    
    // axios.get('/api/air/status')
    // .then(response => setAirSwitch(response.data.state));

    setLedSwitch(true);
  },[]);

  const handleLedSwitch = (evt) => {
    const currentSwitchValue = !ledSwitch;  // currentSwitchValue란 현재 스위치 값은 켜져있다라는 의미..
    setLedSwitch(!ledSwitch);
    // 호출부
    if(currentSwitchValue){
      axios.get('http://107.10.13.44<flask서버주소>/led/on'); //켜졌을때.. flask 서버 api로부터 불러온다..
    } else {
      axios.get('/api/led/off');  // 꺼졌을때
    }
    
  }
  const handleAirSwitch = (evt) => {
    const currentAirValue = !airSwitch;
    setAirSwitch(!airSwitch);
    // 호출부
    if(currentAirValue) {
      axios.get('/api/moter/on');
    } else {
      axios.get('/api/moter/off');
    }
  }

  return (
    
    <FormGroup>
    <Card>
    <CardContent>
      <Typography component="div">
          <h3>Led 제어</h3>
        <Grid component="label" container alignItems="center" spacing={1}>
        <Grid icon>
        <EmojiObjectsTwoToneIcon className={classes.icon} />
        </Grid>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={ledSwitch} onChange={handleLedSwitch} name="ledSwitch" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
      </CardContent>
      </Card>
      <div className={classes.spacer} /> {/*간격조정*/}
      <Card>
      <CardContent>
      <Typography component="div">
          <h3>냉난방기 제어</h3>
        <Grid component="label" container alignItems="center" spacing={1}>
        <ToysIcon className={classes.icon} />
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={airSwitch} onChange={handleAirSwitch} name="airSwitch" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
      </CardContent>
      </Card>
    </FormGroup>

  );
}














