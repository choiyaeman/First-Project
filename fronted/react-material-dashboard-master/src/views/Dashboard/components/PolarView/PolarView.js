import { Card, CardHeader, Divider, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useInterval } from "common/utils";
import React, { useState } from "react";
import { Polar } from "react-chartjs-2";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height:500,
  }
}));

const PolarView = (props) => {

  const [environment, setEnvironment] = useState("");

  const classes = useStyles();
  useInterval(() => {
    fetch("http://localhost:8080/SpringMongo2/selectTest")
      .then((res) => res.json())
      .then(
        (result) => {
          setEnvironment(result[0]);//(result[result.length-1]);
        },
        // 주의: 컴포넌트의 실제 버그에서 발생하는 예외사항들을 넘기지 않도록
        // 에러를 catch() 블록(block)에서 처리하기보다는
        // 이 부분에서 처리하는 것이 중요합니다.
        (error) => {
          setEnvironment("");
        }
      );
  },3000);

  const expData3 = {
    datasets: [
      {
        // data: [11, 16, 7.5],
        data: [     
          parseFloat(environment["temperature"]),
          parseFloat(environment["humidity"]),
          parseFloat(environment["dustDensity"]), //숫자로 변형하자
          // parseFloat(environment["waterFlow"]),
          // parseFloat(environment["wtime"])
        ],
        backgroundColor: [
          colors.red[500], //Red
          colors.green[500], //Green
          colors.grey[500], //DeepGrey
          // colors.blue[500], //blue
          // colors.yellow[500], //yellow
        ],
        label: "온도, 습도, 미세먼지", // for legend
      },
    ],
    labels: ["온도", "습도", "미세먼지"],
  };


  return (
      
    <Card
    className={classes.root}
    >
      <CardHeader
        //action={componentReturnFunction("Last 7 days")} // 함수를 호출해서 넘기는것..
        title={
            <div style={{display:"flex",alignItems:"center"}}>
                <div>현재 Environment</div>
                <div style={{flexGrow:1}}></div>
            </div>
        }
      >
      </CardHeader>
      <Divider />
      <div className={classes.chartContainer}>

        <Polar 
          options={{
            maintainAspectRatio: false, //  해당 요소의 비율을 유지x
            legend: {
              display: true,
              position: "top",
            },
          }}
          data={expData3}  
          />
      </div>
      </Card>
            
    );
}

export default PolarView;
