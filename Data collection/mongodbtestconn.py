import pymongo
import json
import datetime
from pymongo import MongoClient

client = MongoClient("192.168.1.79", 27017)
db = client.nlu  # DataBase 생성 nlu 이름
users = db.logging  # collection 생성 logging 이름

mydata = """{"name": "kimyj", "age":26}"""

d = json.loads(mydata)
d['date'] = datetime.datetime.utcnow()

postid = db.logging.insert_one(d).inserted_id
