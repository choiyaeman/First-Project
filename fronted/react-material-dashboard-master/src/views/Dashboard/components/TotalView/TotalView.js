import React from "react";
import { Bar, Radar } from "react-chartjs-2";
import { Grid, Card, CardHeader } from "@material-ui/core";
import PolarView from "./PolarView";

class TotalView extends React.Component {
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
          borderWidth: 2,
          hoverBorderWidth: 3,
          backgroundColor: [
            "#0000FF",
            "rgba(255, 255, 0)"
          ],
          fill: true,
          barPercentage: 0.6, //막대기 굵기
        },
      ],
    };

    return (
      
      <div>
        <Grid container spacing={4}>
          <br />

          <Grid item lg={12}>
            <PolarView />
          </Grid>
        </Grid>
      </div>

    );
  }
}

export default TotalView;
