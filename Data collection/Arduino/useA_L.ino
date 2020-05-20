extern volatile unsigned long timer0_millis;
unsigned long timeVal = 0; //현재시간값 저장변수
unsigned long previousVal = 0; //이전시간값 저장변수

volatile double waterFlow;

const int analogIn = A0; //아날로그 입력 PIN
int mVperAmp = 100; // 아날로그 입력 mV당 전류 값
// 5A 짜리는 185
// 20A 짜리는 100
// 30A 짜리는 66
int RawValue = 0;  // 아날로그 값 저장 변수
int ACSoffset = 2500; // 기준 값 0A일때 아날로그 값은 2500 이다.
double Voltage = 0;   // 계산된 아날로그 값
double Amps = 0;      // 실제 측정된 전류 값

int watH = 0;
int wat = 0;



void setup() {
  //모니터 프로그램용
  Serial.begin(9600);
  waterFlow = 0;
  attachInterrupt(0, pulse, RISING);
}

void loop() {
  //아날로그 값 읽기
  RawValue = analogRead(analogIn);
  //아날로그 값 0 ~ 1024을 전앖 0(0V) ~ 5000(5V)으로 변경(계산을 쉽게 하기 위해)
  Voltage = (RawValue / 1024.0) * 5000; // Gets you mV
  //전류값 계산
  //측정된 전압을 0A기준으로 뺀다음 mV당 전류값으로 나누면 끝!
  Amps = ((Voltage - ACSoffset) / mVperAmp);
  

  analogWrite(a, 150);
  analogWrite(b, 255);
  if (Amps <= 0.1) {
    Amps = 0.0;
  }

  timeVal = millis(); 
  wat = Amps * Voltage / 100;

  if(wat > 5){
        watH + 1;        
    }
  //1초
  if(timeVal - previousVal >= 6000){     
      Serial.print("W,"); // shows the voltage measured
      Serial.print(wat); // the '3' after voltage allows you to display 3 digits after decimal point
      Serial.print(",Wtime");
      Serial.print(watH);
      Serial.print(",watertFlow,");
      Serial.println(waterFlow);   
      previousVal = timeVal;
  }
}

void pulse(){
  waterFlow += 1.0/450.0;   
 }
