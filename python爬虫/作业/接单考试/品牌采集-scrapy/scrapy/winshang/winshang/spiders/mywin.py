import scrapy
from scrapy import cmdline
from lxml import etree
from winshang.items import WinshangItem
from scrapy.http.request import json_request
import json
class MywinSpider(scrapy.Spider):
    name = 'mywin'
    # allowed_domains = ['www.winshangdata.com']
    five_brand = ['餐饮', '儿童亲子', '文体娱', '零售', '生活服务']
    # start_urls = ['http://www.winshangdata.com/']
    url = "http://www.winshangdata.com/wsapi/brand/list3_4"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    }
    data = {
        "isHaveLink": "",
        "isTuozhan": "",
        "isXxPp": "",
        "kdfs": "",
        "key": "",
        "orderBy": "1",
        "pageNum": 1,
        "pageSize": 1001,
        "pid": "",
        "qy_p": "",
        "qy_r": "",
        "xqMj": "",
        "ytlb1": "",
        "ytlb2": ""
    }
    savedFile = open("brand.csv",'r+',encoding="utf-8")
    savedFile.write("tite,open_store,establish_time,cooperation_time,area_requirement\n")

    def start_requests(self):
        for brand in self.five_brand:
            self.data['ytlb1'] = brand
            yield  scrapy.Request(url=self.url, method='POST',headers=self.headers, body=json.dumps(self.data))

    def parse(self, response):
        for brand in response.json()['data']['list']:
            brand_id = brand['brandId']
            title = brand['brandName']
            print(brand_id,title)
            url = "http://www.winshangdata.com/brandDetail?brandId={}".format(brand_id)
            form_data={
                "brandId":str(brand_id)
            }

            yield scrapy.FormRequest(url=url, formdata=form_data, meta={'title': title}, callback=self.my_parse)

    def my_parse(self, response):
        # //li/span[@class='detail-option-value']
        html = etree.HTML(response.text)
        details = html.xpath("//li/span[@class='detail-option-value']/text()")
        title = response.meta.get('title')
        wi = WinshangItem()
        wi['title'] = title
        wi['establish_time'] = details[0]
        wi['open_store'] = details[2]
        wi['cooperation_time'] = details[3]
        wi['area_requirement'] = details[4]
        self.savedFile.write("{},{},{},{},{}\n".format(wi['title'],wi['open_store'],wi['establish_time'],wi['cooperation_time'],wi['area_requirement']))



if __name__ == '__main__':
    cmdline.execute('scrapy crawl mywin'.split())