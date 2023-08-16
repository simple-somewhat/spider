import requests
import execjs
import pymongo
import threading
from concurrent.futures import ThreadPoolExecutor

# 全局变量
mutex = threading.Lock()
api_key = ""
hash_set = set()
# 创建 MongoDB 连接
client = pymongo.MongoClient("mongodb://localhost:27017/")
collection = client["spider"]["oklink"]


# 获取x_apikey
def get_api_key():
    global api_key
    with open("./getapi.js", 'r', encoding="utf-8") as f:
        content = f.read()
    cell = execjs.compile(content)
    api_key = cell.call("getApikey")


def deduplication(key):
    in_set = False
    mutex.acquire()
    if key in hash_set:
        in_set = True
    else:
        hash_set.add(key)
    mutex.release()
    return in_set


def get_data(offset):
    url = "https://www.oklink.com/api/explorer/v1/btc/transactionsNoRestrict"
    headers = {
        "authority": "www.oklink.com",
        "accept": "application/json",
        "accept-language": "zh-CN",
        "app-type": "web",
        "cache-control": "no-cache",
        "referer": "https://www.oklink.com/cn/btc/tx-list",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "x-apikey": api_key
    }
    params = {"txType": "", "limit": "20", "sort": "", "offset": offset}
    response = requests.get(url, headers=headers,  params=params)
    # 更新api key
    if response.json()["msg"] == "VISIT_ALREADY_EXPIRED":
        get_api_key()
        headers["x-apikey"] = api_key
        response = requests.get(url, headers=headers, params=params)

    for item in response.json()["data"]["hits"]:
        info = {}
        if deduplication(item["hash"]):
            continue
        info["hash"] = item["hash"]
        info["blockHeight"] = item["blockHeight"]
        info["inputsCount"] = item["inputsCount"]
        info["outputsCount"] = item["outputsCount"]
        collection.insert_one(info)


if __name__ == '__main__':
    # 初始化apikey
    get_api_key()
    # 定义线程池和任务函数
    executor = ThreadPoolExecutor(max_workers=5)
    for i in range(500):
        executor.submit(get_data, i*20)
    executor.shutdown(wait=True)
    print(len(hash_set))
