import palette from 'theme/palette';
import { blue, red } from '@material-ui/core/colors';

export const data = {
 
  datasets: [{
    type: 'bar',
    label: 'Bar Dataset',
    backgroundColor: red[700],
    data:[10,20,30,40,50,60],
    order: 1
  },{
    type: 'line',
    label: 'Line Dataset',
    divider: blue[700],
    data:[10,30,10,40,10,50],
    order: 2
  }],
  labels: ['1 월', '2 월', '3 월', '4 월', '5 월', '6 월']
};

export const options = {  //이름으로 export
  showLines: true,
  spanGaps: false,
  responsive: true,
  maintainAspectRatio: false,
  legend: { display: true },
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
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: red[700]//palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: blue[700], //palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};



















