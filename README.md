# Smart HOME 프로젝트
Smart HOME

# 프로젝트명
HDMS(Home Data Management Service)

# 프로젝트 개요
- 주거 환경에 IT를 융합하여 거주자가 일반 데스크탑 PC를 사용해서 원격으로 집안을 제어함으로써 
  편리함과 복지 증진이 가능하도록 스마트 라이프 환경 개발
- 프로젝트 일정: 2020-04-08 ~ 2020-06-29
- 활용 장비: 라즈베리파이, 아두이노, 유량센서(YF-S201), 전류센서(ACS712 30A), 온습도센서(DHT22), 미세먼지센서(GP2Y10)

## Description
아두이노에서 데이터를 수집하고 수집한 데이터는 serial 통신을 통해 라즈베리에서 받는다
라즈베리에서 받은 데이터들을 json형식으로 변환 후 서버에 있는 mongoDB에 저장한다
가상화 환경 Docker 안에 브릿지를 만들어 DB, Spring, React을 넣고 네트워크 ip 고정값을 준다. 연결할때는 각 할당받은 url주소로 접속
React에서는 웹에서 보여줄 Dashboard와 Controller 정의. Dashboard 부분에는 Chartjs를 이용하여 실시간 Visualizing, 
Controller 부분에서도 실시간 Visaulizing 및 제어 기능 구현
Controller에서 Led, Moter switch on/off 이벤트 발생 시 라즈베리파이 flask 서버로 호출하고 받아와 작동되도록 구현.
공통적으로 불쾌지수 및 미세먼지 실시간 상태 Visaulizing

## Functions
- 불쾌지수 및 미세먼지 상태 Visualizing
- 수도, 전기 사용량 Visaulizing
- 실내 온습도, 미세먼지, 전기, 수도 실시간 Visualizing
- 불쾌지수, 미세먼지 상태 실시간 Visaulizing
- Led, Moter 전체, 수동 Controller

## Install & Test
For frontend
```
node 설치
npm install
npm install https
npm run start
```

For backend
```
mvn clean package
```

## Our Team
최예만, 김귀수, 김영진, 남광현
