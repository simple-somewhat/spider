import requests
import execjs
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "137",
    "Content-Type": "application/json",
    "Host": "user.hrdjyun.com",
    "Origin": "https://www.hh1024.com",
    "Pragma": "no-cache",
    "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
}
body = {}
phone = "15208206820"
org_pwd = "123simON"
pwd = ""
sig = ""
t = ""
with open("pwd.js", "r", encoding="utf-8") as file:
    content = file.read()
    context = execjs.compile(content)
    pwd = context.call("getpwd", org_pwd)
    sig_and_t = context.call("getsign", phone, pwd)
    sig = sig_and_t[0]
    t = sig_and_t[1]
body["phoneNum"] = "15208206820"
body["pwd"] = pwd
body["sig"] = sig
body["t"] = t
body["tenant"] = 1
print(body)
response = requests.request("POST","https://user.hrdjyun.com/wechat/phonePwdLogin",headers=headers,json=body)
print(response.text)