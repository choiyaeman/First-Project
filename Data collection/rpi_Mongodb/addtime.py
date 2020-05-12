import serial
import time

port = "/dev/ttyACM0"
serialFromArduino = serial.Serial(port, 9600)
serialFromArduino.flushInput()

try:
	while True:
		aduino = serialFromArduino.readline()
		#aduino = str(input_s)

		now = time.localtime()
		timemer = "%04d/%02d/%02d %02d:%02d"%(now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min)
		input = (timemer + aduino)
		print(input).split(' ')
except KeyboardInterrupt:
	print
	print('exit')
