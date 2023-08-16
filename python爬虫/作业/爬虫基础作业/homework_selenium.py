from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time,random
from pymongo import MongoClient

def wph_spider():
    options = webdriver.ChromeOptions()
    options.add_argument('--disable-blink-features=AutomationControlled')
    prefs = {"profile.managed_default_content_settings.images": 2}
    options.add_experimental_option("prefs", prefs)
    # 隐藏"Chrome正在受到自动软件的控制"
    options.add_experimental_option('useAutomationExtension', False)  # 去掉开发者警告
    options.add_experimental_option('excludeSwitches', ['enable-automation'])
    browser = webdriver.Chrome(chrome_options=options)

    browser.get("https://category.vip.com/suggest.php?keyword=%E5%8F%A3%E7%BA%A2&ff=235|12|1|1")
    client = MongoClient(host="127.0.0.1",port=27017)
    table = client["spider"]["wph"]

    for x in range(1,5):
        t = x/4
        js = f"document.documentElement.scrollTop = document.documentElement.scrollHeight * {t}"
        browser.execute_script(js)
        time.sleep(random.randint(800, 1500)/1000)
    #sub_pages = browser.find_elements(By.XPATH, "//section[@id='J_searchCatList']/div/a")
    sub_pages = browser.find_elements(By.XPATH, "//div[@class='c-goods-item  J-goods-item c-goods-item--auto-width']")
    urls = []
    for i in sub_pages:
        url = i.get_attribute('href')
        urls.append(url)

        # table.insert_one(info)

    for item in sub_pages:
        data = {'price': item.find_element(By.XPATH,
                                           './/div[@class="c-goods-item__sale-price J-goods-item__sale-price"]').text,
                'title': item.find_element(By.XPATH, './a/div[2]/div[2]').text}
        # wait = WebDriverWait(browser, 10)
        # browser.get(i)
        # input = wait.until(EC.presence_of_element_located((By.XPATH,'//div[@class="price-v6-line-one"]/span[@class="sp-price"]')))
        # price_element = browser.find_element(By.XPATH, '//div[@class="price-v6-line-one"]/span[@class="sp-price"]')
        # price = price_element.text
        # title_element = browser.find_element(By.XPATH, '//p[@class="pib-title-detail"]')
        # title = title_element.text
        # info = {'标题': title, '价钱': price}
        print(data)
        table.insert_one(data)

    # table.insert_one(info)
    # for item in sub_pages:
    #     browser.get(item)
    #     price = browser.find_element(By.XPATH,'//div[@class="price-v6-line-one"]/span[1]/text()')
    #     title = browser.find_element(By.XPATH,'//p[@class="pib-title-detail"]/text()')
    #     info = {'标题':title,'价钱':price}
    #     table.insert_one(info)
    return

if __name__ == "__main__":
    wph_spider()