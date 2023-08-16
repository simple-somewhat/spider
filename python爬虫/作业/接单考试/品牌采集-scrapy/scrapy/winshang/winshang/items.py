# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class WinshangItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    establish_time = scrapy.Field()
    open_store = scrapy.Field()
    cooperation_time = scrapy.Field()
    area_requirement = scrapy.Field()
