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
    setInterval(this.getOneData.bind(this), 3000);
  }

  render() {
    const { oneData } = this.state;

    const expData3 = {
      datasets: [
        {
          // data: [11, 16, 7.5],
          data: [     
            parseFloat(oneData["temperature"]),
            parseFloat(oneData["humidity"]),
            parseFloat(oneData["dustDensity"]), //숫자로 변형하자
            parseFloat(oneData["watertFlow"]),
            parseFloat(oneData["w"])
          ],
          backgroundColor: [
            "#FF0000", //Red
            "#40FF00", //Green
            "#696969", //DeepGrey
            "#0000FF", //blue
            "#FFFF00", //yellow
          ],
          label: "온도, 습도, 미세먼지, 유량, 전력", // for legend
        },
      ],
      labels: ["온도", "습도", "미세먼지", "유량", "전력"],
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
