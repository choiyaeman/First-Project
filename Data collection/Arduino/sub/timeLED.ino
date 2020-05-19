extern volatile unsigned long timer0_millis; //타이머변수

volatile double waterFlow;

unsigned long timeVal = 0; //현재시간값 저장변수
unsigned long previousVal = 0; //이전시간값 저장변수


void setup()
{
  Serial.begin(9600);
  waterFlow = 0;
  attachInterrupt(0, pulse, RISING); //pin2
}

void loop()
{

  timeVal = millis();

  if (timeVal - previousVal >= 1000) { //1초단위

    Serial.print("waterFlow,");
    Serial.println(waterFlow);
    Serial.println(timeVal);
    previousVal = timeVal;
  }
  //60초후 timer 리셋
  if (waterFlow >= 5.0) {
    Serial.print("waterFlow,");
    Serial.println(waterFlow);
    waterFlow = 0;

  }
  /*
    if(timeVal>=60000){ //60 초
     timer0_millis=0;
     previousVal=0;
     waterFlow = 0; //리셋
     Serial.println("reset");
    }*/
}

void pulse()
{
  waterFlow += 1.0 / 450.0;
}
