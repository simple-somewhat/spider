import requests

headers = {
'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36'

}

url = "https://www.baidu.com/s?"

kw = {'wd': 'python'}

response = requests.get(url, headers=headers, params=kw)
response.encoding="utf-8"

print(response.status_code)
print(response.text)