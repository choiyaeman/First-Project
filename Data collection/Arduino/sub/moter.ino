
int a = 8;
int b = 9;
void setup()
{
  pinMode(a, OUTPUT);
  pinMode(b, OUTPUT);
  Serial.begin(9600);

}

void loop()
{
  Serial.println("시작");
  analogWrite(a, 150);
  analogWrite(b, 255 );
  delay(5000);
  digitalWrite(a, LOW);
  digitalWrite(b, LOW);
  delay(5000);


}
