import requests
import pymysql
import execjs

db = pymysql.connect(host="localhost", user="root", password="", db="spiders")
cursor = db.cursor()


def insert_data(auctionTitle,price,heatInfo):
    sql = 'INSERT INTO auction(id, auctionTitle, price,heatInfo) values("{}", "{}", "{}","{}")'.format(0, auctionTitle, price, heatInfo)
    try:
        print(sql)
        cursor.execute(sql)
        db.commit()
    except Exception as e:
        print(e)
        db.rollback()


def create_table():
    sql = '''
    CREATE TABLE IF NOT EXISTS auction (
        id int primary key auto_increment not null,
        auctionTitle VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        heatInfo VARCHAR(255) NOT NULL
       )
    '''
    try:
        cursor.execute(sql)
        print("CREATE TABLE SUCCESS.")
    except Exception as ex:
        print(f"CREATE TABLE FAILED,CASE:{ex}")
        db.close()


def get_sign(data):
    with open("./sign.js","r",encoding='utf-8') as f:
        content = f.read()
        js_code = execjs.compile(content)
        all = js_code.call("getsign", data)
        return all.split('-')[0],all.split('-')[1]


def get_data():
    baseData  = '{\"dfApp\":\"auctionwalle\",\"dfApiName\":\"auctionwalle.datou.getPageModulesData\",\"dfVariables\":\"{\\\"pageId\\\":1910955,\\\"moduleIds\\\":\\\"2004318340:items\\\",\\\"context\\\":{\\\"_b_2004318340:items\\\":\\\"{\\\\\\\"keyword\\\\\\\":\\\\\\\"二手房\\\\\\\",\\\\\\\"page\\\\\\\":\\\\\\\"%s\\\\\\\",\\\\\\\"userInfo\\\\\\\":{}}\\\",\\\"userInfo\\\":\\\"{}\\\",\\\"device\\\":\\\"pc\\\",\\\"sceneCode\\\":\\\"20210823QCG72BUD\\\"}}\",\"dfUniqueId\":\"1910955.2004318340:items\",\"dfVariablesRecover\":\"{}\"}"'
    headers = {
        "authority": "h5api.m.taobao.com",
        "accept": "application/json",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://zc-paimai.taobao.com",
        "pragma": "no-cache",
        "referer": "https://zc-paimai.taobao.com/",
        "sec-ch-ua": "^\\^Chromium^^;v=^\\^112^^, ^\\^Google",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "^\\^Windows^^",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    }
    cookies = {
        "cna": "z4LaF++QgH4CAd7UcNsUNPH9",
        "xlly_s": "1",
        "cookie2": "13330efdd235ecbb37a4e638ddf144a6",
        "t": "c9a9e0723ae641d444929cd92491a734",
        "_tb_token_": "e5596e71af5e8",
        "uc1": "cookie14=Uoe8idJroNN04A^%^3D^%^3D",
        "_m_h5_tk": "35df82b04fef78b5ea36791959659ffd_1683114311717",
        "_m_h5_tk_enc": "9790de76c0758f7862b206891eb36fc4",
        "l": "fBNy-sougvIcdKmUBOfwPurza77OSIRAguPzaNbMi9fP9e5p58V5W1w4zwL9C3GVFsAwR3kOuRA9BeYBqI4m20m8ra-KjcDmnmOk-Wf..",
        "tfstk": "cn7lB__a_g-WJladhTT77vrbVgqAZ80eIw7fuShoZdvNs_bVi9mqbE9LiL2_UD1..",
        "isg": "BL-_Q5qT56Q5GeYSPOdneaNZTpNJpBNGSFIvnVGMW261YN_iWXSjlj12ojCeOOu-"
    }
    url = "https://h5api.m.taobao.com/h5/mtop.taobao.datafront.invoke.auctionwalle/1.0/"
    params = {
        "jsv": "2.6.1",
        "appKey": "12574478",
        "t": "1683099706303",
        "sign": "0930ea37461b6310af76846407be4bd4",
        "bxPageId": "1910955",
        "api": "mtop.taobao.datafront.invoke.auctionwalle",
        "v": "1.0",
        "type": "originaljson",
        "dataType": "json",
        "requiredParams":"dfApiName,dfUniqueId"

    }
    data = {
        "data": "{\"dfApp\":\"auctionwalle\",\"dfApiName\":\"auctionwalle.datou.getPageModulesData\",\"dfVariables\":\"{\\\"pageId\\\":1910955,\\\"moduleIds\\\":\\\"2004318340:items\\\",\\\"context\\\":{\\\"_b_2004318340:items\\\":\\\"{\\\\\\\"keyword\\\\\\\":\\\\\\\"二手房\\\\\\\",\\\\\\\"page\\\\\\\":\\\\\\\"%s\\\\\\\",\\\\\\\"userInfo\\\\\\\":{}}\\\",\\\"userInfo\\\":\\\"{}\\\",\\\"device\\\":\\\"pc\\\",\\\"sceneCode\\\":\\\"20210823QCG72BUD\\\"}}\",\"dfUniqueId\":\"1910955.2004318340:items\",\"dfVariablesRecover\":\"{}\"}"
    }

    for i in range(1,4):
        cur_data = baseData%(i)
        sign,cur_time, = get_sign(cur_data)
        params["t"] = cur_time
        params["sign"] = sign
        data["data"] = cur_data
        response = requests.post(url, headers=headers, params=params, cookies=cookies, data=data)

        for item in response.json()["data"]["data"]["GQL_getPageModulesData"]["2004318340"]["items"]["schemeList"]:
            auction_title = item["auctionTitle"]
            price = item["price"]
            heat_info = item["heatInfo"]
            print(auction_title,price,heat_info)
            insert_data(auction_title, price, heat_info)


if __name__ == "__main__":
    create_table()
    get_data()
