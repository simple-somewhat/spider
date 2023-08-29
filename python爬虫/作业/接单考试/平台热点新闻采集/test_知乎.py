import requests
from lxml import etree
url = "https://www.zhihu.com/hot"
# "Cookie": "_9755xjdesxxd_=32; YD00517437729195%3AWM_TID=1Y3V2S4UnbpBBRFARUcrg1ZezMWT%2FUzF; gdxidpyhxdE=1lwa8I3immo8eUddsWLn8ucJISIOLl6Brr%2BLWAWTi2%5CneOaOP%2FIefVx9yisf5b6EWd6qjzCrDqi58TK1jC%2B%5Cjbo1INkTt3g9vbXHqU%5CsSCLtkS1fLMB%2FcP%2F%2Bg%2BWEycih6iyEuXGt1XviucLBYHN30M5KggqT5e8k9MmW6%2Fjx7dC3OJ3K%3A1620742298318; YD00517437729195%3AWM_NI=ie%2BW93S9pKwMcfKCWkP%2F5qdQw67pmVgisx7070G0hoTcGnCT2lZbvP63kDqDxnj60L54hBSeOYQmoSBWnjY2Di3xu%2BuLtYpiitfneNTQszjFGfvwwcrwoakayZP5zJMMOGY%3D; YD00517437729195%3AWM_NIKE=9ca17ae2e6ffcda170e2e6eeb8c24fb4be8b88e54392ac8ab2c45f939b9abbf47daabf818ee93f8e8bbf98c52af0fea7c3b92aabbbe5b8bc3991e7c0acf647a1ba85a4d66194f1fb92e75bb5eaf991f05ea5b7bd99b63cf5f089d1eb6598bd898fc260f2b49683f55cf6eda5a5f450bcb2a6d7b348f7eca8a3d26f8d879f8eee598289a28bdc3a88b7fd99f821b794bcbaf363abacaa8fe846988fbd9be94e85baba98f669b2a9a182ea6bbb86a0d6f9428f9381a8dc37e2a3; __utmv=51854390.100-1|2=registration_date=20140330=1^3=entry_date=20140330=1; _zap=c6e61762-f10b-4e71-85e5-190ec44b98f4; q_c1=6dded8c15aee4f1fbc19ba60e34cce4d|1661872032000|1600958564000; __utma=51854390.2134041400.1597468837.1629122705.1661872033.2; z_c0=2|1:0|10:1691757710|4:z_c0|80:MS4xemE1SUFBQUFBQUFtQUFBQVlBSlZUWTU2dzJVWXFEWXRFbmxNcUp3c0cxblZaZ2VpcHMtYU9BPT0=|1e11667bb870c3fc778773b0ce99f0918ed4c9fbedd394e477a7f7c4dfd7f909; _xsrf=b823d380-52af-43c3-8763-65ad6dc5daf9; d_c0=AOCTJbvHSBePTtz9igMoDLJFifbM2ymcv8E=|1692801187; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1690725767,1691507269,1691757710,1692801193; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1692801193; tst=h; SESSIONID=cB21rAdeLwJX5QnjcC8QpJkqEvMlMGFWBYPaOnELqaP; KLBRSID=d1f07ca9b929274b65d830a00cbd719a|1692801193|1692801187; JOID=VFwdA0KWnEBJelwILpCBmainQ3k299J6cQcfYEPV6QYZRgJkSDGApyt3UgwvIOxY3A2LZzYigtbi9Wic3ZVw7-Y=; osd=Wl0UBk-YnUlMd1IJJ5WMl6muRnQ49tt_fAkeaUbY5wcQQw9qSTiFqiV2WwkiLu1R2QCFZj8nj9jj_G2R05R56us=",
#
headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Cookie": "_9755xjdesxxd_=32; YD00517437729195%3AWM_TID=1Y3V2S4UnbpBBRFARUcrg1ZezMWT%2FUzF; gdxidpyhxdE=1lwa8I3immo8eUddsWLn8ucJISIOLl6Brr%2BLWAWTi2%5CneOaOP%2FIefVx9yisf5b6EWd6qjzCrDqi58TK1jC%2B%5Cjbo1INkTt3g9vbXHqU%5CsSCLtkS1fLMB%2FcP%2F%2Bg%2BWEycih6iyEuXGt1XviucLBYHN30M5KggqT5e8k9MmW6%2Fjx7dC3OJ3K%3A1620742298318; YD00517437729195%3AWM_NI=ie%2BW93S9pKwMcfKCWkP%2F5qdQw67pmVgisx7070G0hoTcGnCT2lZbvP63kDqDxnj60L54hBSeOYQmoSBWnjY2Di3xu%2BuLtYpiitfneNTQszjFGfvwwcrwoakayZP5zJMMOGY%3D; YD00517437729195%3AWM_NIKE=9ca17ae2e6ffcda170e2e6eeb8c24fb4be8b88e54392ac8ab2c45f939b9abbf47daabf818ee93f8e8bbf98c52af0fea7c3b92aabbbe5b8bc3991e7c0acf647a1ba85a4d66194f1fb92e75bb5eaf991f05ea5b7bd99b63cf5f089d1eb6598bd898fc260f2b49683f55cf6eda5a5f450bcb2a6d7b348f7eca8a3d26f8d879f8eee598289a28bdc3a88b7fd99f821b794bcbaf363abacaa8fe846988fbd9be94e85baba98f669b2a9a182ea6bbb86a0d6f9428f9381a8dc37e2a3; __utmv=51854390.100-1|2=registration_date=20140330=1^3=entry_date=20140330=1; _zap=c6e61762-f10b-4e71-85e5-190ec44b98f4; q_c1=6dded8c15aee4f1fbc19ba60e34cce4d|1661872032000|1600958564000; __utma=51854390.2134041400.1597468837.1629122705.1661872033.2; z_c0=2|1:0|10:1691757710|4:z_c0|80:MS4xemE1SUFBQUFBQUFtQUFBQVlBSlZUWTU2dzJVWXFEWXRFbmxNcUp3c0cxblZaZ2VpcHMtYU9BPT0=|1e11667bb870c3fc778773b0ce99f0918ed4c9fbedd394e477a7f7c4dfd7f909; _xsrf=b823d380-52af-43c3-8763-65ad6dc5daf9; d_c0=AOCTJbvHSBePTtz9igMoDLJFifbM2ymcv8E=|1692801187; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1690725767,1691507269,1691757710,1692801193; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1692801193; tst=h; SESSIONID=cB21rAdeLwJX5QnjcC8QpJkqEvMlMGFWBYPaOnELqaP; KLBRSID=d1f07ca9b929274b65d830a00cbd719a|1692801193|1692801187; JOID=VFwdA0KWnEBJelwILpCBmainQ3k299J6cQcfYEPV6QYZRgJkSDGApyt3UgwvIOxY3A2LZzYigtbi9Wic3ZVw7-Y=; osd=Wl0UBk-YnUlMd1IJJ5WMl6muRnQ49tt_fAkeaUbY5wcQQw9qSTiFqiV2WwkiLu1R2QCFZj8nj9jj_G2R05R56us=",
        "Pragma": "no-cache",
        "Sec-Ch-Ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

response = requests.get(url=url, headers=headers)

html = etree.HTML(response.text)

hrefs = html.xpath("//div[@class='HotItem-content']/a/@href")
titles = html.xpath("//div[@class='HotItem-content']/a/@title")
hots = html.xpath("//div[@class='HotItem-metrics HotItem-metrics--bottom']/text()")

print(hrefs)
print(titles)
print(hots)
