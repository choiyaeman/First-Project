import serial
import time
import json
import pymongo
from pymongo import MongoClient


client = MongoClient('192.168.1.79', 27017)
db = client.iotdata
check = db.check

port = "/dev/ttyACM0"
serialFromArduino = serial.Serial(port, 9600)
serialFromArduino.flushInput()



try:
    while True:
        aduino = serialFromArduino.readline()

        aduino = aduino.replace("\r\n", "")
        now = time.localtime()

        timemer = "%04d/%02d/%02d,%02d:%02d," % (
            now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min)

        input = (timemer + aduino).split(',')

       	data = {
            input[0] : input[1],
      	    input[2] : input[3],
            input[4] : input[5],
       	    input[6] : input[7],
        }

	json_data = json.dumps(data)
        print(json_data)
	d = json.loads(json_data)
	postid = db.check.insert_one(d).inserted_id


except KeyboardInterrupt:
    print
    print('exit')

# d = json.loads(mydata)
# d['date'] = datetime.datetime.utcnow()

#print(d)
