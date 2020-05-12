import serial
from pymongo import MongoClient

connection = MongoClient('192.168.1.79', 27017)

db = connection.test_database
collection = db.emp

docs = collection.find()

for i in docs:
	print(i)

#port = "/dev/ttyACM0"
#serialFromArduino = serial.Serial(port, 9600)
#serialFromArduino.flushInput()
#
#try:
#	while True:
#		input_s = serialFromArduino.readline()
#		input = str(input_s)
#		print(input)
#
#except KeyboardInterrupt:
#	print
#	print('exit')
