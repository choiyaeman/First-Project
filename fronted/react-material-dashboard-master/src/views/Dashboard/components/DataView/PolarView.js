import React from "react";
import { Polar } from "react-chartjs-2";

class PolarView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oneData: "",
    };
  }

  getOneData() {
    fetch("http://localhost:8080/SpringMongo2/randomSelect")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            oneData: result,
          });
        },

        (error) => {
          this.setState({
            oneData: "",
          });
        }
      );
  }

  componentDidMount() {
    setInterval(this.getOneData.bind(this), 500);
  }

  render() {
    const { oneData } = this.state; //배열이 들어감

    const expData3 = {
      datasets: [
        {
          // data: [11, 16, 7.5],
          data: [
            parseFloat(oneData["dustDensity"]), //숫자로 변형하자
            parseFloat(oneData["temperature"]),
            parseFloat(oneData["humidity"]),
          ],
          backgroundColor: [
            "#FF6384", //Red
            "#4BC0C0", //Green
            "#FFCE56", //Yellow
          ],
          label: "미세먼지, 온도, 습도", // for legend
        },
      ],
      labels: ["미세먼지", "온도", "습도"],
    };

    return (
      <div>
        <Polar data={expData3} />
        {/* {JSON.stringify(oneData)} */}
      </div>
    );
  }
}
export default PolarView;
