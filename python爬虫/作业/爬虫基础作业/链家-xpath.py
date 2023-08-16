from lxml import etree
import requests

url = "https://cs.lianjia.com/ershoufang/rs/"


headers = {
    "Mozilla/5.0": "(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers)

html = etree.HTML(response.text)
# print(type(html))
address = html.xpath("//a[@class='noresultRecommend img LOGCLICKDATA']/img/@alt")
# print(address)
# print(len(address))
titles = html.xpath("//div[@class='title']/a/text()")
# print(titles)
# print(len(titles))
house_info = html.xpath("//div[@class='houseInfo']/text()")
# print(len(house_info), house_info)
starIcon = html.xpath("//div[@class='followInfo']/text()")
# print(len(starIcon), starIcon)

totalPrice = html.xpath("//div[@class='totalPrice totalPrice2']/span/text()")
# print(len(totalPrice), totalPrice)

unitPrice = html.xpath("//div[@class='unitPrice']/span/text()")
print(len(unitPrice), unitPrice)
