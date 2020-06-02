import React from "react";
import { Bar, Radar } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import PolarView from "./PolarView";

class DataView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      environment: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/SpringMongo2/selectTest")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            environment: result,
          });
        },
        // 주의: 컴포넌트의 실제 버그에서 발생하는 예외사항들을 넘기지 않도록
        // 에러를 catch() 블록(block)에서 처리하기보다는
        // 이 부분에서 처리하는 것이 중요합니다.
        (error) => {
          this.setState({
            environment: [],
          });
        }
      );

    //setInterval, setState로 가져오기
    // [참고] https://okky.kr/article/472399
  }

  //{"id":"5ec60b86f198ebe53368b62b","temperature":"23.90","wtime":"0","humidity":"38.30","watertFlow":"15.50","w":"0","time":"2020/05/2114:03","dustDensity":"81.25"},

  render() {
    const { environment } = this.state; //배열이 들어감
    let sumDust = 0;
    let sumTemp = 0;
    let sumHumidity = 0;
    let sumWaterFlow = 0;
    for (let i = 0; i < environment.length; i++) {
      sumDust += parseFloat(environment[i]["dustDensity"]); //미세먼지
      sumTemp += parseFloat(environment[i]["temperature"]); //온도
      sumHumidity += parseFloat(environment[i]["humidity"]); //습도
      sumWaterFlow += parseFloat(environment[i]["watertFlow"]); //유량
    }

    const expData1 = {
      labels: ["미세먼지", "온도", "습도", "유량"],
      datasets: [
        {
          labels: ["미세먼지", "온도", "습도", "유량"],
          data: [sumDust, sumTemp, sumHumidity, sumWaterFlow], //environment.length==18
          borderWidth: 2,
          hoverBorderWidth: 3,
          backgroundColor: [
            "rgba(238, 102, 121, 1)",
            "rgba(98, 181, 229, 1)",
            "rgba(255, 198, 0, 1)",
            "rgba(235, 52, 216, 1)",
          ],
          fill: true,
          barPercentage: 0.6, //막대기 굵기
        },
      ],
    };

    const expData2 = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    };

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={6}>
            <Bar
              options={{
                legend: {
                  display: false,
                  position: "right",
                },
              }}
              data={expData1}
              height={120}
            />
          </Grid>
          <Grid item lg={6}>
            <Radar data={expData2} />
          </Grid>
          {/* {JSON.stringify(environment)} */}
          <br />
          <Grid item lg={6}>
            <PolarView />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DataView;
