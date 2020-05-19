
volatile double waterFlow;

void setup() {
  Serial.begin(9600);
  waterFlow = 0;
  attachInterrupt(0,pulse,RISING);
}

void loop() {
  Serial.print("값은");
  Serial.print(waterFlow);
  Serial.println(" L");

  if(waterFlow = 5.0){
    //5L에서 초기화
    Serial.print("값은");
    Serial.print(waterFlow);
    Serial.println(" L");
    
  }
  

}
void pulse(){
  waterFlow += 1.0/450.0;
}
