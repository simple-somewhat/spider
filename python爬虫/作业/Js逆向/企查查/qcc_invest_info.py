import requests
import execjs
path = "/api/datalist/touzilist?keyNo=5dffb644394922f9073544a08f38be9f&pageIndex=2"
headers = {
    "authority": "www.qcc.com",
    "accept": "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "cookie": "QCCSESSID=84109a7a459423d5d5887ee976; qcc_did=aaae92f1-319c-487a-b434-5549956d9a18; UM_distinctid=186c9618f31efa-0d6dac49927735-26031951-1fa400-186c9618f3210ca; acw_tc=76700ea516787612112688483e7aab182fd4773605aa98d6752eab8df0; CNZZDATA1254842228=518059621-1678413476-https%253A%252F%252Fwww.google.com%252F%7C1678759093",
    "pragma": "no-cache",
    "referer": "https://www.qcc.com/firm/5dffb644394922f9073544a08f38be9f.html",
    "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "x-pid": "0894f207c1ef498be36b279896d2d178",
    "x-requested-with": "XMLHttpRequest"
}
key = ""
value = ""
with open("qcc.js", 'r', encoding='utf-8') as f:
    content = f.read()
    context = execjs.compile(content)
    key = context.call("key", path)
    value = context.call("value", path)
headers[key] = value

response = requests.request("GET","https://www.qcc.com/api/datalist/touzilist?keyNo=5dffb644394922f9073544a08f38be9f&pageIndex=2",headers = headers)

print(response.json())
