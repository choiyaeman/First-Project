 
from flask import Flask, request
from flask import render_template
import RPi.GPIO as GPIO

app = Flask(__name__)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(8, GPIO.OUT, initial=GPIO.LOW)#LED pin number
GPIO.setup(11, GPIO.OUT, initial=GPIO.LOW)#moter pin number
GPIO.setup(13, GPIO.OUT, initial=GPIO.LOW)#moter pin number
 
@app.route("/")
def home():
    return render_template("intest.html")

@app.route("/led/on")
def led_on():
    try:
        GPIO.output(8, GPIO.HIGH)
        return "ok"
    except expression as identifier:
        return "fail"

@app.route("/led/off")
def led_off():
    try:
        GPIO.output(8, GPIO.LOW)
        return "ok"
    except expression as identifier:
        return "fail"

@app.route("/moter/on")
def moter_on():
    try:
        GPIO.output(11, GPIO.LOW)
        GPIO.output(13, GPIO.HIGH)
        return "ok"
    except expression as identifier:
        return "fail"
    
@app.route("/moter/off")
def moter_off():
    try:
        GPIO.output(13, GPIO.LOW)
        GPIO.output(11, GPIO.LOW)
        return "ok"
    except expression as identifier:
        return "fail"



if __name__ == "__main__":
        app.run(host="0.0.0.0")

