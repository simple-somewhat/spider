import requests
import execjs

headers = {
    "authority": "h5api.m.taobao.com",
    "accept": "application/json",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://zc-paimai.taobao.com",
    "pragma": "no-cache",
    "referer": "https://zc-paimai.taobao.com/",
    "sec-ch-ua": "^\\^Chromium^^;v=^\\^112^^, ^\\^Google",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "^\\^Windows^^",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}

url = "https://h5api.m.taobao.com/h5/mtop.taobao.datafront.invoke.auctionwalle/1.0/"


def get_sign(data):
    with open("./sign.js","r",encoding='utf-8') as f:
        content = f.read()
        js_code = execjs.compile(content)
        all = js_code.call("getsign", data)
        return all.split('-')[0],all.split('-')[1]


params = {
    "jsv": "2.6.1",
    "appKey": "12574478",
    "t": "1683105585564",
    "sign": "98a24f53ec1f84846a6f0f1115b9bd6e",
    "bxPageId": "1910955",
    "api": "mtop.taobao.datafront.invoke.auctionwalle",
    "v": "1.0",
    "type": "originaljson",
    "dataType": "json",
    "requiredParams": "dfApiName^%^2CdfUniqueId"
}
data = {
    'data':'{"dfApp":"auctionwalle","dfApiName":"auctionwalle.datou.getPageModulesData","dfVariables":"{\"pageId\":1910955,\"moduleIds\":\"4394607430,4489817680,4480874310,2004318340,4529967930,2708524060,global\",\"context\":{\"keyword\":\"二手房\",\"page\":\"1\",\"userInfo\":\"{}\",\"sceneCode\":\"20210823QCG72BUD\",\"firstScreen\":\"true\",\"device\":\"pc\"}}","dfUniqueId":"1910955.4394607430,4489817680,4480874310,2004318340,4529967930,2708524060,global","dfVariablesRecover":"{}"}'
}

sign, cur_time = get_sign(data)
params["t"] = cur_time
params["sign"] = sign
response = requests.post(url, headers=headers,  params=params, data=data)

print(response.text)
print(response)


