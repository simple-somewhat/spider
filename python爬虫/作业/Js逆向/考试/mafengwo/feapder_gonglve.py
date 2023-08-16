import feapder
import pymongo
client = pymongo.MongoClient("mongodb://localhost:27017/")
collection = client["spider"]["mafengwo"]

class AirSpiderDemo(feapder.AirSpider):
    def start_requests(self):
        url = "https://www.mafengwo.cn/gonglve/"
        for i in range(1, 15):
            data = {
                "page": i
            }
            yield feapder.Request(url, data=data, method="POST")

    def download_midware(self, request):
        request.headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.mafengwo.cn",
            "Pragma": "no-cache",
            "Referer": "https://www.mafengwo.cn/gonglve/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        }
        return request

    def parse(self, request, response):
        titles = response.xpath('//div[@class="title"]/text()').extract()
        likes = response.xpath('//span[@class="stat"]/span/text()').extract()
        index = min(len(titles),len(likes))
        for index in range(index):
            item = {"title": titles[index], "like": likes[index]}
            collection.insert_one(item)

if __name__ == "__main__":
    AirSpiderDemo(thread_count=5).start()
