import scrapy
import requests
import json
five_brand = ['餐饮', '儿童亲子', '文体娱', '零售', '生活服务']

url = "http://www.winshangdata.com/wsapi/brand/list3_4"
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Authorization": "",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "164",
    "Content-Type": "application/json;charset=UTF-8",
    "Host": "www.winshangdata.com",
    "Origin": "http://www.winshangdata.com",
    "Pragma": "no-cache",
    "Referer": "http://www.winshangdata.com/brandList",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "appType": "bigdata",
    "platform": "pc",
    "token": "",
    "uid": "",
    "uuid": "123456"
}

data = {
    "isHaveLink": "",
    "isTuozhan": "",
    "isXxPp": "",
    "kdfs": "",
    "key": "",
    "orderBy": "1",
    "pageNum": 1,
    "pageSize": 60,
    "pid": "",
    "qy_p": "",
    "qy_r": "",
    "xqMj": "",
    "ytlb1": "餐饮",
    "ytlb2": ""
}

def get_brand_infos():
    for brand in five_brand:
        # params["ytlb1"] = brand

        # response = requests.post(url=url, headers=headers,json=data)
        response = requests.post(url, data=json.dumps(data))
        print(response.text)
        break


if __name__ == "__main__":
    get_brand_infos()