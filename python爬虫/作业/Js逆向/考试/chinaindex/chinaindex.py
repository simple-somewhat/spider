import requests
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs
import pymongo

client = pymongo.MongoClient(host='localhost', port=27017)
collection = client['spider']['chinaindex']

headers = {
    "UUID": "32722c72-37f6-5ea1-b3b0-d91a4ed84ad6",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "incognitoMode":"0"
}
params =  {
        "sign": "46cf510e48f99667216bfa781d6bebab"
}

response = requests.request("GET","https://www.chinaindex.net/iIndexMobileServer/teleplay/rank/waiting/fans",headers = headers,params=params)

out_e = {}
with open("./simpleversion.js", 'r', encoding='utf-8') as f:
    js_code = f.read()
    cell = execjs.compile(js_code)
    out_e = cell.call("mydataFilter", response.json())

# sava data

for rank in out_e["rank_list"]:
    item = {}
    item['name'] = rank['object_info']['name']
    item['rank'] = rank['rank']
    item['fans_num'] = rank['fans_num']
    item['heat_value'] = rank['heat_value']
    collection.insert_one(item)
