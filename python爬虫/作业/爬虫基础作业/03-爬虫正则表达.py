import re
import requests

# <li><span class="s2">《<a href="https://www.qqtxt.cc/17_17111/" target="_blank">娘子，龙袍请穿好,我要读书的！</a>》
# reg = re.compile("<a href=\"https://www.qqtxt.cc/[0-9_]+/\" target=\"_blank\">([\u4e00-\u9fa5\uff01\D\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5]+)</a>")
# reg = re.compile("<a href=\"https://www.qqtxt.cc/[0-9_]+/\" target=\"_blank\">([\w,\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5]+)</a>")
reg = re.compile("<a href=\"https://www.qqtxt.cc/[0-9_]+/\" target=\"_blank\">(.+?)</a>")

url = "https://www.qqtxt.cc/list/1_2.html"

headers = {
    "Mozilla/5.0": "(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
}

match_all = []
for index in range(1, 11):
    url_index = f"https://www.qqtxt.cc/list/1_{index}.html"
    response = requests.get(url_index, headers=headers)
    response.encoding = "gbk"
    match_group = reg.findall(response.text)
    print(len(match_group))
    match_all.extend(match_group)

print(len(match_all))
