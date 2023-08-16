from bs4 import BeautifulSoup
import requests

url = "http://ip.yqie.com/ipproxy.htm"

headers = {
    "Mozilla/5.0": "(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
}

response = requests.get(url, headers)
response.encoding = "utf-8"
soup = BeautifulSoup(response.text, "lxml")
table = soup.select("table tr td")
for i in table:
    print(i.get_text())




