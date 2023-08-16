import re
import requests

url = 'https://www.dns.com/login.html'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'}
response = requests.get(url, headers=headers)
data = re.findall('   var csrfToken = ".*";', response.text)
print(data)