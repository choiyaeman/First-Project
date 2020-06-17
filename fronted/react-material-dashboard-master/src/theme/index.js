import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  centerContainer: {
    // flex item의 ‘진행 축’ 정렬과 간격을 제어하는 ‘justify-content’.
    // flex item의 ‘교차 축’ 정렬을 제어하는 ‘align-items’.
    // flex item의 ‘독립적 교차 축’ 정렬을 제어하는 ‘align-self’.
    // flex item의 ‘여러 줄 교차 축’ 정렬과 간격을 제어하는 ‘align-content’.
    display:"flex",
    alignItems:"center",     // align-items 속성은 유연한 컨테이너 내부의 항목에 대한 기본 정렬을 지정
    justifyContent:"center" // justify-content 속성은 ‘진행 축’ 정렬과 아이템 사이의 간격을 제어
  }
});

export default theme;
