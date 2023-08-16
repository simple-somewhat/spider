import requests

headers = {
    #"POST": "/credit-website/publicity/topSearch/getXYXXPageInfo.do HTTP/1.1",
    "Accept": "text/plain, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "40",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Host": "credit.hefei.gov.cn",
    #"Origin": "https://credit.hefei.gov.cn",
    #"Pragma": "no-cache",
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

cookies = {
    "JSESSIONID": "94492B8F1BDA3B2972517D394F23E9F4",
    "__jsluid_s": "e6199d18f72ff53e24d0e80d1791cf8b",
    "__jsl_clearance_s": "1691918010.214|0|TYK2WPqXJbFNZM4ltNahofuIjaA%3D",
    "arialoadData": "true"
}

data_page = {
    "currentPageNo": "2",
    "pageSize": "10",
    "creditQuery":""
}
url = "https://credit.hefei.gov.cn/credit-website/publicity/topSearch/getXYXXPageInfo.do"
response  = requests.post(headers = headers ,url=url,data=data_page,cookies=cookies)
print(response.text)