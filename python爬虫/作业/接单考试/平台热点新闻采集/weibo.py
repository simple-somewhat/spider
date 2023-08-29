import requests
from lxml import  etree
import pymongo
url_hot = "https://m.weibo.cn/api/feed/trendtop?containerid=102803_ctg1_8999_-_ctg1_8999_home&page=2"

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Mweibo-Pwa": "1",
    "Pragma": "no-cache",
    "Referer": "https://m.weibo.cn/",
    "Sec-Ch-Ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}

#
# response = requests.get(url=url_hot,headers=headers)
#
# print(response.json())

# step one 获取cookies

url_search = "https://s.weibo.com/top/summary?cate=realtimehot"
url_cookies = "https://rm.api.weibo.com/2/remind/push_count.json?trim_null=1&with_dm_group=1&with_reminding=1&with_settings=1&exclude_attitude=1&with_chat_group_notice=1&source=339644097&with_chat_group=1&with_dm_unread=1&callback=__jp51"

headers_search = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Cookie": "SUB=_2AkMTso8hf8NxqwJRmPwdyGvha412yA_EieKl7n76JRMxHRl-yj9kqmMmtRB6ODKhzSIqJBwZ8ttY6KkbaThmvUsgXT1R; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9Whp5c1bWuiAmJuHwb-.L6My",
    "Pragma": "no-cache",
    "Referer": "https://passport.weibo.com/",
    "Sec-Ch-Ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-site",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
}

response = requests.get(url=url_search, headers=headers_search)
# print(response.text)
html = etree.HTML(response.text)

titles = html.xpath("//td[@class='td-02']/a/text()")

hrefs = html.xpath("//td[@class='td-02']/a/@href")

hots = html.xpath("//td[@class='td-02']/span/text()")

item_all = []
print(titles)
first_item = {}
first_item['title'] = titles[0]
first_item['href'] = hrefs[0]
first_item['popularity'] = 'max';

for index in range(0,len(hots)):
    item = {}
    item['title'] = titles[index + 1]
    item['href'] = hrefs[index + 1]
    item['popularity'] = hots[index];
    print(item)


mongodb = pymongo.MongoClient(host='127.0.0.1',port=27017)
collection = mongodb['spider']['weibo']

# response.encoding = "gbk"
# print(response.text)

