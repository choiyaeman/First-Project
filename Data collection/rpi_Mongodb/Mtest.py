import serial
import time
import json
import pymongo

from pymongo import MongoClient

conn =  MongoClient('192.168.1.79', 27017)

db = conn.test_db
collect = db.collect

port = "/dev/ttyACM0"
serialFromArduino = serial.Serial(port, 9600)
serialFromArduino.flushInput()

try:
	while True:
		aduino = serialFromArduino.readline()

		aduino = aduino.replace("\r\n","")
		now = time.localtime()
		timemer = "%04d/%02d/%02d,%02d:%02d,"%(now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min)
		input = (timemer + aduino).split(',')
#		print(input)
		mydata = {
			input[0]:input[1],
			input[2]:input[3],
			input[4]:input[5],
			input[6]:input[7],
			}
#		json_data = json.dumps(mydata)
		print(mydata)
		str(mydata)
		d = json.loads(mydata)
		postid = db.collect.insert_one(d).inserted_id

#		collect.insert(input)

except KeyboardInterrupt:
	print
	print('exit')
