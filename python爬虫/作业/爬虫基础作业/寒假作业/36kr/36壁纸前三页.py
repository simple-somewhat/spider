from lxml import etree
import aiohttp
import asyncio
import time
import os


class WallPaper(object):
    def __init__(self):
        self.url = "https://www.3gbizhi.com/wallDM/index_{}.html"
        self.page_three = ["https://www.3gbizhi.com/wallDM/index.html"]
        self.headers = {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
                       }

    def format_url(self):
        for i in range(2, 4):
            self.page_three.append(self.url.format(i))

    async def parse_page(self, res, session):
        html = await etree.HTML(res)
        imgs = await html.xpath("//li/a//img[@class='lazysrc']/text()")
        for i in imgs:
            response = await session.get(i)
            if response.status == 200:
                image = response.read()
                with open("壁纸/"+i.split("/")[1], "wb") as f:
                    f.write(image)

    async def get_images(self):
        connector = aiohttp.TCPConnector(limit=50)
        with aiohttp.ClientSession(headers=self.headers, connector=connector) as session:
            tasks = []
            for url in self.page_three:
                response = await session.get(url)
                content = await response.text
                tsk = self.parse_page(content, session)
                tasks.append(asyncio.create_task(tsk))
            asyncio.wait(tasks)


if __name__ == "__main__":
    st = time.time()
    wp = WallPaper()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(wp.get_images())
    print("Total time {}", time.time() - st)
