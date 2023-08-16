import random
import time

import asyncio
import aiohttp
import requests
import os

class LolSkin(object):
    def __init__(self):
        self.hero_list = "https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js"
        self.hero_skin = "https://game.gtimg.cn/images/lol/act/img/js/hero/{}.js"
        self.headers = {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
                       }
        # self.hero_list_ids = []
        self.hero_skin_urls = []
        self.get_hero_ids()

    def get_hero_ids(self):
        response = requests.get(self.hero_list, headers=self.headers)
        for i in response.json()["hero"]:
            hero_id = i["heroId"]
            # print(f"hero id is {hero_id}")
            self.hero_skin_urls.append(self.hero_skin.format(hero_id))

    async def get_skins(self):
        connector = aiohttp.TCPConnector(limit=50)
        async with aiohttp.ClientSession(headers=self.headers,connector=connector) as session:
            for url in self.hero_skin_urls:
                response = await session.get(url)
                skin_download_info = await response.json(content_type=None)
                task = []
                for skins in skin_download_info["skins"]:
                    skin_name = skins["heroTitle"]+skins["skinId"]
                    skin_url = ""
                    if len(skins["mainImg"]) != 0:
                        skin_url = skins["mainImg"]
                    else:
                        skin_url = skins["chromaImg"]
                    res = self.get_skin(session, skin_name, skin_url)
                    ts = asyncio.create_task(res)
                    task.append(ts)
                await asyncio.wait(task)

    async def get_skin(self, session, skin_name, skin_url):
        response = await session.get(skin_url)
        if response.status == 200:
            content = await response.read()
            with open("图片/"+skin_name+".jpg", "wb") as f:
                f.write(content)


if __name__ == "__main__":
    t1 = time.time()
    if not os.path.exists('图片'):
        os.mkdir('图片')
    ls = LolSkin()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(ls.get_skins())
    print('程序用时{}'.format(time.time()-t1))
