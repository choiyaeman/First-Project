// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain

#include "DHT.h"

#define no_dust 0.35
#define DHTPIN 4     // what pin we're connected to

// Uncomment whatever type you're using!
//#define DHTTYPE DHT11   // DHT 11 
#define DHTTYPE DHT22   // DHT 22  (AM2302)
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

// Connect pin 1 (on the left) of the sensor to +5V
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

DHT dht(DHTPIN, DHTTYPE);

// 아두이노 - 미세 먼지 센서 연결
int dustout = A0;
int v_led = 7;

// 센서로 읽은 값 변수 선언
float vo_value = 0;

// 센서로 읽은 값을 전압으로 측정 변수
float sensor_voltage = 0;

// 실제 미세 먼지 밀도 변수
float dust_density = 0;

void setup() {
  Serial.begin(9600); 
  pinMode(v_led, OUTPUT);
 
  dht.begin();
}

void loop() {
  
  
  // 미세 먼지 센서 동작
  digitalWrite(v_led, LOW);       // 적외선 LED ON
  delayMicroseconds(280);         // 280us동안 딜레이
  vo_value = analogRead(dustout); // 데이터를 읽음
  delayMicroseconds(40);          // 320us - 280us
  digitalWrite(v_led, HIGH);      // 적외선 LED OFF
  delayMicroseconds(9680);        // 10ms(주기) -320us(펄스 폭) 한 값

  sensor_voltage = get_voltage(vo_value);
  dust_density = get_dust_density(sensor_voltage);
  

  
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  Serial.print("DustDensity,");
  Serial.print(dust_density);
  // check if returns are valid, if they are NaN (not a number) then something went wrong!
  if (isnan(t) || isnan(h)) {
    Serial.println("Failed to read from DHT");
  } else {

    Serial.print(",Humidity,"); 
    Serial.print(h);
    Serial.print(",Temperature,"); 
    Serial.println(t);
    delayMicroseconds(280);
  }
  
  delay(50000);
}

float get_voltage(float value)
{
    // 아날로그 값을 전압 값으로 바꿈
    float V = value * 5.0 / 800; //1024
    return V;
}

float get_dust_density(float voltage)
{
    // 데이터 시트에 있는 미세 먼지 농도(ug) 공식 기준
    float dust = (voltage - no_dust) / 0.005;
    return dust;
}
