

import requests
from lxml import etree
import time
import re
import xlwt

pattern = re.compile("区块链")
pattern_ai = re.compile("人工智能训练师")
cities_list = ["北京","河北","浙江","安徽","河南","湖北","广东","海南","重庆","四川","贵州","云南","陕西"]
# cities_list = ["陕西"]

detail_lists = ["http://pjjg.osta.org.cn/detail/44582detail.html","http://pjjg.osta.org.cn/detail/44430detail.html","http://pjjg.osta.org.cn/detail/45288detail.html","http://pjjg.osta.org.cn/detail/29676detail.html","http://pjjg.osta.org.cn/detail/29669detail.html","http://pjjg.osta.org.cn/detail/20771detail.html","http://pjjg.osta.org.cn/detail/44570detail.html","http://pjjg.osta.org.cn/detail/44571detail.html","http://pjjg.osta.org.cn/detail/44574detail.html","http://pjjg.osta.org.cn/detail/32563detail.html","http://pjjg.osta.org.cn/detail/32524detail.html","http://pjjg.osta.org.cn/detail/32460detail.html","http://pjjg.osta.org.cn/detail/32892detail.html","http://pjjg.osta.org.cn/detail/32534detail.html","http://pjjg.osta.org.cn/detail/14148detail.html","http://pjjg.osta.org.cn/detail/35358detail.html","http://pjjg.osta.org.cn/detail/44609detail.html","http://pjjg.osta.org.cn/detail/36672detail.html","http://pjjg.osta.org.cn/detail/14566detail.html","http://pjjg.osta.org.cn/detail/17147detail.html","http://pjjg.osta.org.cn/detail/19466detail.html","http://pjjg.osta.org.cn/detail/30963detail.html","http://pjjg.osta.org.cn/detail/31007detail.html","http://pjjg.osta.org.cn/detail/31028detail.html","http://pjjg.osta.org.cn/detail/31047detail.html","http://pjjg.osta.org.cn/detail/28902detail.html","http://pjjg.osta.org.cn/detail/15080detail.html","http://pjjg.osta.org.cn/detail/43153detail.html","http://pjjg.osta.org.cn/detail/15258detail.html","http://pjjg.osta.org.cn/detail/15274detail.html","http://pjjg.osta.org.cn/detail/15280detail.html","http://pjjg.osta.org.cn/detail/34718detail.html","http://pjjg.osta.org.cn/detail/44936detail.html","http://pjjg.osta.org.cn/detail/15321detail.html","http://pjjg.osta.org.cn/detail/37619detail.html"]

def get_data(url):
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
    }
    cookies = {
        "Hm_lvt_e85984af56dd04582a569a53719e397f": "1683899458",
        "Hm_lpvt_e85984af56dd04582a569a53719e397f": "1683899458"
    }

    response = requests.get(url, headers=headers, cookies=cookies, verify=False)
    response.encoding = "utf-8"
    return response


def get_cites():
    url = "http://pjjg.osta.org.cn/pjjg/3303_gd_dfpjjgpx.html"
    response = get_data(url)
    html = etree.HTML(response.text)
    all_cities = html.xpath("//div/a/@href")[6:]
    all_cities_name = html.xpath("//div/a/text()")[8:]
    return all_cities, all_cities_name


def add_sheet(sheet,row,list_all):
    col = 3
    sheet.write(row,0,list_all[0])
    sheet.write(row,1,list_all[1])
    sheet.write(row,2,list_all[2])
    for item in list_all[3]:
        sheet.write(row, col, item)
        col += 1
    sheet.write(row, 7, list_all[4])


def sheet_init(work_book, name):
    sheet = work_book.add_sheet(name)
    sheet.write(0, 0, '省份')
    sheet.write(0, 1, '职称')
    sheet.write(0, 2, '公司')
    sheet.write(0, 3, '联系人')
    sheet.write(0, 4, '联系电话')
    sheet.write(0, 5, '邮箱')
    sheet.write(0, 6, '地址')
    sheet.write(0, 7, '级别')
    return sheet


if __name__ == "__main__":
    cities, cities_name = get_cites()
    workbook = xlwt.Workbook(encoding='utf-8')
    first_sheet = sheet_init(workbook,"人工智能训练师")


    index = 1
    for city in enumerate(cities):
        # print(city)
        # if cities_name[city[0]] not in cities_list:
        #     continue
        city_url = f"http://pjjg.osta.org.cn{city[1]}"
        city_response = get_data(city_url)
        city_html = etree.HTML(city_response.text)
        city_detail = city_html.xpath("//a[@class='detail']/@href")
        # print(city_detail)
        for detail in city_detail:

            work_url = f"http://pjjg.osta.org.cn{detail}"
            # if work_url not in detail_lists:
            #     continue
            work_response = get_data(work_url)
            work_html = etree.HTML(work_response.text)
            work_infos = work_html.xpath("//tr/td[@style='width: 230px;' and @rowspan]/text()")
            work_info_ori = work_html.xpath("//tr/td[@style='width: 230px;' and @rowspan]")
            time.sleep(0.01)
            index_class = 0
            for info in work_infos:
                # results = pattern.match(info)
                results = pattern_ai.match(info)
                if results is not None:
                    print(work_url)
                    work_info = work_html.xpath("//div[@class='mid']/p/text()")
                    title = work_html.xpath("//div[@class='main_title']/text()")
                    class_info = work_info_ori[index_class].xpath("./following-sibling::td[3]/text()")
                    print(class_info,cities_name[city[0]], info, title[0].strip("\r\n "), ' '.join(work_info))
                    list_all = [cities_name[city[0]],info,title[0].strip("\r\n "),work_info,class_info]
                    add_sheet(first_sheet,index,list_all)
                    index += 1
                index_class += 1
    workbook.save(r"E:\MyWorkSpace\图灵学院\code\python爬虫\兼职\职业技能等级评价\ai.xlsx")

    print("end scrapy!!!")


# xpath_detail = //a[@class='detail']/@href
# xpath_work = //tr/td[@style='width: 230px;' and @rowspan]/text()
# xpath_info = //div[@class='mid']/p/text()

