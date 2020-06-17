import { Card, CardHeader, colors, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useInterval } from "common/utils";
import palette from 'theme/palette';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height:500,
  }
}));

const DataView = (props) => {

  const [environment, setEnvironment] = useState(""); //useState([]);

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
          setEnvironment("");//([]);
        }
      );
  }, 3000);

  // let sumWaterFlow = 0;
  // let sumWtime = 0;
  // for (let i = 0; i < environment.length; i++) {
  //   sumWaterFlow += parseFloat(environment[i]["waterFlow"]); //유량
  //   sumWtime += parseFloat(environment[i]["wtime"]); // 전력
  // }

  const expData1 = {
    labels: ["수도","전기"],
    datasets: [
      {
        labels: ["수도","전기"],
        data: [     
          parseFloat(environment["waterFlow"]),
          parseFloat(environment["wtime"])
        ],
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

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: { display: false },
  cornerRadius: 0,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 5,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: true,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
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
                  display: true,
                  position: "right",
                },
              }}
              data={expData1}
              options={options}
            />
        </div>
      </Card>
            
    );
}

export default DataView;
