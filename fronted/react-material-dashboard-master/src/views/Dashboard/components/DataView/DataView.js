import { Card, CardHeader, colors, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useInterval } from "common/utils";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height:300
  }
}));

const DataView = (props) => {

  const [environment, setEnvironment] = useState([]);

  const classes = useStyles();

  useInterval(() => {
    fetch("http://localhost:8080/SpringMongo2/selectTest")
      .then((res) => res.json())
      .then(
        (result) => {
          setEnvironment(result);
        },
        // 주의: 컴포넌트의 실제 버그에서 발생하는 예외사항들을 넘기지 않도록
        // 에러를 catch() 블록(block)에서 처리하기보다는
        // 이 부분에서 처리하는 것이 중요합니다.
        (error) => {
          setEnvironment([]);
        }
      );
  });

  let sumWaterFlow = 0;
  let sumW = 0;
  for (let i = 0; i < environment.length; i++) {
    sumWaterFlow += parseFloat(environment[i]["watertFlow"]); //유량
    sumW += parseFloat(environment[i]["w"]); // 전력
  }

  const expData1 = {
    labels: ["수도","전기"],
    datasets: [
      {
        labels: ["수도","전기"],
        data: [sumWaterFlow, sumW], //environment.length==18
        borderWidth: 0,
        hoverBorderWidth: 3,
        backgroundColor: [
          colors.indigo[600],
          colors.yellow[400]
        ],
        fill: true,
        barPercentage: 0.6, //막대기 굵기
      },
    ],
  };

  return (
      
    <Card
    className={classes.root}
    >
      <CardHeader
        //action={componentReturnFunction("Last 7 days")} // 함수를 호출해서 넘기는것..
        title={
            <div style={{display:"flex",alignItems:"center"}}>
                <div>총 Energy사용량</div>
                <div style={{flexGrow:1}}></div>
            </div>
        }
      >
      </CardHeader>
      <Divider />
      <div className={classes.chartContainer}>
        <Bar
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: false,
                  position: "right",
                },
              }}
              data={expData1}
            />
        </div>
      </Card>
            
    );
}

export default DataView;
