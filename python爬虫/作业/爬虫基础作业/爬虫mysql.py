import requests
import pymysql
import pymongo
# url = "https://pianku.api.mgtv.com/rider/list/pcweb/v3"
# headers = {
#     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
# }
# params = {
#     "allowedRC": "1",
#     "platform": "pcweb",
#     "channelId": "2",
#     "pn": "0",
#     "pc": "80",
#     "hudong": "1",
#     "_support": "10000000",
#     "kind": "a1",
#     "area": "a1",
#     "year": "all",
#     "chargeInfo": "a1",
#     "sort": "c2"
# }

# response = requests.get(url, headers=headers, params=params)
# response.encoding = "utf-8"
# print(response.json())


class Manguo(object):
    def __init__(self):
        self.db = pymysql.connect(host='127.0.0.1', user='root', password='', db="spiders")
        self.cursor = self.db.cursor()
        self.mongodb = pymongo.MongoClient(host='127.0.0.1',port=27017)
        self.collection = self.mongodb['spider']['mangguo']
        self.url = "https://pianku.api.mgtv.com/rider/list/pcweb/v3"
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }

    def create_tables(self):
        sql = '''
            CREATE TABLE IF NOT EXISTS manguo(
                id int primary key auto_increment not null,
                name VARCHAR(255) NOT NULL, 
                series VARCHAR(255) NOT NULL, 
                description TEXT)
        '''
        try:
            self.cursor.execute(sql)
            print("create table success")
        except Exception as e:
            print(f"create manguo db failed{e}")

    def get_data(self, page):
        params = {
            "allowedRC": "1",
            "platform": "pcweb",
            "channelId": "2",
            "pn": str(page),
            "pc": "80",
            "hudong": "1",
            "_support": "10000000",
            "kind": "a1",
            "area": "a1",
            "year": "all",
            "chargeInfo": "a1",
            "sort": "c2"
        }
        response = requests.get(url=self.url,headers=self.headers,params=params)
        return response.json()

    def parse_data(self,response):
        data_list = response["data"]["hitDocs"]
        for data in data_list:
            item = {}
            name = data["title"]
            series = data["updateInfo"]
            description = data["story"]

            item["name"] = data["title"]
            item["series"] = data["updateInfo"]
            item["description"] = data["story"]
            self.save_data(name,series,description)
            self.save_data_mongo(item)

    def save_data(self,name,series,description):
        sql = 'INSERT INTO manguo(id,name,series,description) values(%s,%s,%s,%s)'
        try:
            self.cursor.execute(sql,(0,name,series,description))
            self.db.commit()
            print("Insert Success")
        except:
            print("Insert Failed")
            self.db.rollback()

    def save_data_mongo(self, item):
        self.collection.insert_one(item)

    def main(self):
        self.create_tables()
        for i in range(0,10):
            response = self.get_data(i)
            self.parse_data(response)


if __name__ == '__main__':
     mg = Manguo()
     mg.main()
