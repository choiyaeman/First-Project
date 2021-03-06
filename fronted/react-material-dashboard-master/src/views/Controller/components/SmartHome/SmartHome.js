import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Divider, Card, CardContent, CardHeader } from '@material-ui/core';
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import ToysIcon from '@material-ui/icons/Toys';
import { makeStyles } from '@material-ui/styles';
import client from "../../../../lib/client";
import SettingsIcon from '@material-ui/icons/Settings';

//const apiURL = "http://localhost:5000";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  spacer: {
    height: theme.spacing(2) // 높이 간격주기
  },
  container: {
    ...theme.centerContainer,
    marginBottom:theme.spacing(1)
  },
  controlBox: {
    width:170,
    height:80,
    margin:theme.spacing(0,2)
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

  // 처음에 꺼져있는 상태로 설정.
  const [ledSwitch, setLedSwitch] = useState(false);
  const [airSwitch, setAirSwitch] = useState(false);
  const [allSwitch, setAllSwitch] = useState(false);

  //초기값 셋팅, useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook이다.
  useEffect(() => {
    // axios.get('/api/led/status')            // 라즈베리파이에서 led가 켜져있는지 꺼져있는지 현재 상태
    // .then(response => setLedSwitch(response.data.state));

    // axios.get('/api/air/status')
    // .then(response => setAirSwitch(response.data.state));

    setLedSwitch(true);
  }, []);

  const handleLedSwitch = async (evt, value) => {
    let currentSwitchValue = !ledSwitch;
    if(value != null){
      currentSwitchValue = value;
    }
    setLedSwitch(currentSwitchValue);
    // currentSwitchValue란 현재 스위치 값은 켜져있다라는 의미..

    let ledResult;
    // 호출부
    if (currentSwitchValue) {
      const response = await client.get('https://121.138.83.92:8000/led/on'); //켜졌을때.. flask 서버 api로부터 불러온다.. 
      ledResult = response.data;
    } else {
      const response = await client.get('https://121.138.83.92:8000/led/off');  // 꺼졌을때
      ledResult = response.data;
    }

    console.log(ledResult);

  }
  const handleAirSwitch = async (evt, value) => {
    let currentAirValue = !airSwitch;
    if(value != null){
      currentAirValue = value;
    }
    setAirSwitch(currentAirValue);
    // 호출부
    let moterResult;
    if (currentAirValue) {
      const response = await client.get('https://121.138.83.92:8000/moter/on');
      moterResult = response.data;
    } else {
      const response = await client.get('https://121.138.83.92:8000/moter/off');
      moterResult = response.data;
    }
    console.log(moterResult);
  }

  const handleAllSwitch = (evt) => {            // 전체 제어
    const currentAllSwitchValue = !allSwitch;
    setAllSwitch(currentAllSwitchValue);
    handleAirSwitch(null,currentAllSwitchValue);
    handleLedSwitch(null,currentAllSwitchValue);
  }

  // flex-grow CSS property 는 flex-item 요소가, flex-container 요소 내부에서 할당 가능한 공간의 정도를 선언
  return (
    <Card>
      <CardHeader
        avatar={<SettingsIcon />}
        title={
          <div className={classes.container}>
          <div>Controllers</div>
          <div style={{flexGrow:1}}></div>
          <div>전체제어</div>
          &nbsp;
          <AntSwitch checked={allSwitch} onChange={handleAllSwitch} name="allSwitch" />
          </div>
        }
      >
      </CardHeader>
      <Divider />
      <CardContent className={classes.container}>
        <Card className={classes.controlBox}>
          <CardContent>
            <div className={classes.container}>
              <EmojiObjectsTwoToneIcon className={classes.icon} />
              <Typography component="span" variant="h5">Led 조명</Typography>
            </div>
            <Typography component="div">
              <Grid component="label" container justify="center" alignItems="center" spacing={1}>
                <Grid item>Off</Grid>
                <Grid item>
                  <AntSwitch checked={ledSwitch} onChange={handleLedSwitch} name="ledSwitch" />
                </Grid>
                <Grid item>On</Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.controlBox}>
          <CardContent>
            <div className={classes.container}>
              <ToysIcon className={classes.icon} />
              <Typography component="span" variant="h5">냉난방기</Typography>
            </div>
            <Typography component="div">
              <Grid component="label" container justify="center" alignItems="center" spacing={1}>
                <Grid item>Off</Grid>
                <Grid item>
                  <AntSwitch checked={airSwitch} onChange={handleAirSwitch} name="airSwitch" />
                </Grid>
                <Grid item>On</Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}














