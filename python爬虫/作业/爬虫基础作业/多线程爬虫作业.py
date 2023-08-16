import threading

import pymongo
import requests
from queue import Queue
from lxml import etree


class BaseSpider(object):
    def create_db(self, name):
        if name == "mongo":
            self.db = pymongo.MongoClient(host="127.0.0.1", port=27017)
            self.collection = self.db["spider"]["base"]

    def __init__(self, url, db, headers):
        self.url = url
        self.create_db(db)
        self.headers = headers
        self.url_queue = Queue()
        self.response_queue = Queue()
        self.save_item_queue = Queue()
        self.index = 0

    def format_url(self):
        for i in range(1, 31):
            self.url_queue.put(self.url.format(i))

    def get_url(self):
        self.format_url()

    def get_data(self):
        while True:
            url = self.url_queue.get()
            response = requests.get(url, headers=self.headers).text
            self.response_queue.put(response)
            self.url_queue.task_done()

    def pares_data(self):
        while True:
            data = self.response_queue.get()
            self.index += 1
            html = etree.HTML(data)
            titles = html.xpath("//strong/a/@title")
            list_actor = []
            actors = html.xpath("//li")
            for item in actors:
                text = item.xpath("./p[@class='actor']/a/text()")
                if len(text) != 0:
                    list_actor.append(text)
                else:
                    list_actor.append("None Find")
            actor_list = list_actor[-30:]
            # actor = html.xpath("//p[@class='actor']/a/text()")
            bfs = html.xpath("//p[@class='num-bf']/text()")
            series = html.xpath("//span[@class='maskTx']/text()")
            for title, actor, bf, serie in zip(titles, actor_list, bfs, series):
                item = {}
                item['title'] = title
                item['actor'] = actor
                item['bf'] = bf
                item['series'] = serie
                self.save_item_queue.put(item)
            self.response_queue.task_done()

    def save_data(self):
        while True:
            item = self.save_item_queue.get()
            self.collection.insert_one(item)
            self.save_item_queue.task_done()

    def main(self):
        thread_list = []
        thread_url = threading.Thread(target=self.get_url)
        thread_list.append(thread_url)

        for i in range(4):
            thread_list.append(threading.Thread(target=self.get_data))
        for i in range(4):
            thread_list.append(threading.Thread(target=self.pares_data))
        thread_list.append(threading.Thread(target=self.save_data))
        for i in thread_list:
            i.setDaemon(True)
            i.start()
        for q in [self.url_queue, self.response_queue, self.save_item_queue]:
            q.join()


if __name__ == "__main__":
    headers = {
        "Mozilla/5.0": "(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    }
    url = "https://so.tv.sohu.com/list_p1101_p2_p3_p4-1_p5_p6_p77_p80_p92_p10{}_p11_p12_p13_p14.html"
    spider = BaseSpider(url, "mongo", headers)
    spider.main()
    # url = "https://so.tv.sohu.com/list_p1101_p2_p3_p4-1_p5_p6_p77_p80_p92_p101_p11_p12_p13_p14.html"
    # headers = {
    #     "Mozilla/5.0": "(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    # }
    # response = requests.get(url, headers=headers).text
    # html = etree.HTML(response)
    # title = html.xpath("//strong/a/@title")
    # actor = html.xpath("//li")
    # bf = html.xpath("//p[@class='num-bf']/text()")
    # series = html.xpath("//span[@class='maskTx']/text()")
    # print(len(series), len(bf), len(title))
    #print(actor.xpath("./p[@class='actor']"))
    # list_ok = []
    # print(len(actor))
    # for item in actor:
    #     if len(item.xpath("./p[@class='actor']/a/text()")) != 0:
    #         # print(item.xpath("./p[@class='actor']/a/text()"))
    #         list_ok.append(item.xpath("./p[@class='actor']/a/text()"))
    #     else:
    #         list_ok.append("noactor")
    #
    # print(len(list_ok))
    # for i in list_ok[-30:]:
    #     print(" ".join(i))


