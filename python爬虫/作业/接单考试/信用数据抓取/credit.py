import requests
from lxml import etree
import re
import execjs
from hashlib import md5, sha1, sha256
import json
import ast
import time
headers = {
    "X-Requested-With": "XMLHttpRequest",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
    # "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}
headers_one =   {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "Cookie": "JSESSIONID={}; __jsluid_s=0e47e0441046b3ead95f763efd9f3901; __jsl_clearance_s=1690818658.001|-1|CfiIbiXOqGGj5li97JNZeSLfmHY%3D; arialoadData=true",
    "Host": "credit.hefei.gov.cn",
    "Origin": "https://credit.hefei.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://credit.hefei.gov.cn/credit-website/publicity/search-result/xyxx-list.do",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
headers_two ={
    "Accept": "text/plain, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "9",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "JSESSIONID={}; __jsluid_s=0e47e0441046b3ead95f763efd9f3901; __jsl_clearance_s=1690818658.001|-1|CfiIbiXOqGGj5li97JNZeSLfmHY%3D; arialoadData=true",
    "Host": "credit.hefei.gov.cn",
    "Origin": "https://credit.hefei.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://credit.hefei.gov.cn/credit-website/publicity/search-result/xyxx-list.do",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}

headers_three = {
    "Cookie": "JSESSIONID={}; __jsluid_s=0e47e0441046b3ead95f763efd9f3901; __jsl_clearance_s=1690818365.21|0|5hUoAmp6tH8Yb3aZ6pDj%2FPkjmjY%3D; arialoadData=true",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"


}
headers_three_back = {
    "Accept": "text/plain, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "40",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "JSESSIONID={}; __jsluid_s=ac6dccd5fbf05ced3d808734b12db29a; __jsl_clearance_s=1690814408.839|0|y%2BDKYOo%2BKGIj9BaD%2FFP6R%2BSQVic%3D; arialoadData=true",
    "Host": "credit.hefei.gov.cn",
    "Origin": "https://credit.hefei.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://credit.hefei.gov.cn/credit-website/publicity/search-result/xyxx-list.do",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}


# cookie = "JSESSIONID={}; __jsluid_s=ac6dccd5fbf05ced3d808734b12db29a; __jsl_clearance_s=1690814408.839|0|y%2BDKYOo%2BKGIj9BaD%2FFP6R%2BSQVic%3D; arialoadData=true"

url = 'https://credit.hefei.gov.cn/credit-website/publicity/search-result/xyxx-list.do'
url_page = "https://credit.hefei.gov.cn/credit-website/publicity/topSearch/getXYXXPageInfo.do"
url_login = "https://credit.hefei.gov.cn/credit-website/publicity/getLoginUser.do"
url_navdata = "https://credit.hefei.gov.cn/credit-website/publicity/infoColumn/getNavData.do"
data_nav = {
    "sysFrom": 2
}
data_page = {
    "currentPageNo": "2",
    "pageSize": "10",
"creditQuery":""
}
headerok = {
    "Accept": "text/plain, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "40",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "JSESSIONID=4DC00DE3EE6E104BCD1D33DA992C3E55; __jsluid_s=0e47e0441046b3ead95f763efd9f3901; __jsl_clearance_s=1691071270.053|0|2J1%2BFnVmx%2Bsv34SAuFmmzc2g4tk%3D",
    "Host": "credit.hefei.gov.cn",
    "Origin": "https://credit.hefei.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://credit.hefei.gov.cn/credit-website/publicity/search-result/xyxx-list.do",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
# step one ,get __jsluid_s
def go(data):
    chars = data["chars"]
    for i in chars:
        for j in chars:
            cookie = data["bts"][0] + i + j + data["bts"][1]
            if data['ha'] == 'md5':
                encrypt = md5()
            elif data['ha'] == 'sha1':
                encrypt = sha1()
            elif data['ha'] == 'sha256':
                encrypt = sha256()
            encrypt.update(cookie.encode(encoding='utf-8'))
            if encrypt.hexdigest() == data['ct']:
                return cookie

response = requests.get(url=url, headers=headers)
cookie = response.headers['Set-Cookie'].split(';')[0].split('=')
cookies = {cookie[0]:cookie[1]}

print(response.headers['Set-Cookie'])
js_clearance = re.findall('cookie=(.*);location', response.text)[0]
result = execjs.eval(js_clearance).split(';')[0]
__jsl_clearance_s = result.split("=")
cookies.update({__jsl_clearance_s[0]: __jsl_clearance_s[1]})
print(cookies)

response = requests.get(url, cookies=cookies, headers=headers)
print(response.text)


dataNow = re.findall(r'go\((.*?)\)', response.text)[1]
print(dataNow)
data = json.loads(dataNow)
newcookie = go(data)
print(go(data))
cookies.update({"__jsl_clearance_s":newcookie})
print(cookies)

response = requests.get(url, cookies=cookies, headers=headers)
appid = re.findall(r'appid=(.*?)\"', response.text)
print(appid)
cookie = response.headers['Set-Cookie'].split(';')[0].split('=')
cookies.update({cookie[0]:cookie[1]})
cookies["arialoadData"] = "True"
print(cookies)

url_checkdata = "https://service.govwza.cn/api/services/Accessibility/Configuration/checkLoadData?appid=53fd4934aabd8ec066f1c692d4c7c0b9&timestamp=1690726607905&domain=credit.hefei.gov.cn&referer=https%3A%2F%2Fcredit.hefei.gov.cn%2Fcredit-website%2Fpublicity%2Fsearch-result%2Fxyxx-list.do&mainversion=4"
data_check = {
    "appid": "53fd4934aabd8ec066f1c692d4c7c0b9",
    "domain": "credit.hefei.gov.cn",
    "referer": "https%3A%2F%2Fcredit.hefei.gov.cn%2Fcredit-website%2Fpublicity%2Fsearch-result%2Fxyxx-list.do",
    "mainversion": "4"
}
data_check["timestamp"] = time.time()

response = requests.get(url=url_checkdata,json=data_check,headers= headers)
print(response.text)

response = requests.get(url=url_navdata,cookies=cookies,json=data_nav,headers = headers)
print(response.text)
headers["Content-Length"] = "40"
urlpage = "https://credit.hefei.gov.cn/credit-website/publicity/topSearch/getXYXXPageInfo.do"
response = requests.post(url=urlpage, cookies=cookies, headers=headers,data=data_page,timeout=(5,30))
print(response.json(),response.headers)

#response = requests.post(url=url_page, json=data,headers=headers)
#print(response.text)
# response = requests.get(url=url, headers=headers)
# html = etree.HTML(response.text)
# link = html.xpath('//link/@href')[1]
# jsessionid= link.split(";")[1].split("=")[1]
# print(jsessionid,cookie.format(jsessionid))
# headers_one["Cookie"] = cookie.format(jsessionid)
# print(headers_one)
# response = requests.post(url=url_login,headers=headers_one)
# print(response.text)
# headers_two["Cookie"] = cookie.format(jsessionid)
# response = requests.post(url= url_navdata,headers=headers_two,json=data_nav)
# print(response.text)
# headers_three["Cookie"] = cookie.format(jsessionid)
# response = requests.post(url= url_page,headers=headers_three,json=data)
# print(response.text)