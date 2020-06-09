import palette from 'theme/palette';
import { blue } from '@material-ui/core/colors';

export const data = {
  labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
  datasets: [
    {
      label: 'This year',
      backgroundColor: '#fafafa',//'#42a5f5',//palette.primary.main,
      data: []
    }
  ]
};

export const options = {  //이름으로 export
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
        lineThickness: 12,
        maxBarThickness: 10,
        linePercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary,
          autoSkip: true,
          maxTicksLimit: 20
        },
        gridLines: {
          display: true,
          drawBorder: true
        }
      }
    ],
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