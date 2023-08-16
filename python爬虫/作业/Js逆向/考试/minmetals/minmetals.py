import requests
import execjs
import pymysql
db = pymysql.connect(host="localhost", user="root", password="", db="spiders")
cursor = db.cursor()
def insert_data(name,bm):
    sql = 'INSERT INTO zhaobiao(id, name, bm) values("{}", "{}", "{}")'.format(0, name, bm)
    # 执行 SQL 语句
    try:
        print(sql)
        cursor.execute(sql)
        db.commit()
    except Exception as e:
        print(e)
        db.rollback()

def create_table():

    # 使用预处理语句创建表
    sql = '''
    CREATE TABLE IF NOT EXISTS zhaobiao (
        id int primary key auto_increment not null,
        name VARCHAR(255) NOT NULL,
        bm VARCHAR(255) NOT NULL
       )
    '''
    try:
        cursor.execute(sql)
        print("CREATE TABLE SUCCESS.")
    except Exception as ex:
        print(f"CREATE TABLE FAILED,CASE:{ex}")
        db.close()

def get_data():
    headers ={
        "POST": "/open/homepage/zbs/by-lx-page HTTP/1.1",
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": "696",
        "Content-Type": "application/json",
        "Cookie": "__jsluid_s=8f4b93d02a3a320f7502838abb6c3cc0; SUNWAY-ESCM-COOKIE=e569adf2-7f0d-45fd-bd53-c16b712717ca",
        "Host": "ec.minmetals.com.cn",
        "Origin": "https://ec.minmetals.com.cn",
        "Pragma": "no-cache",
        "Referer": "https://ec.minmetals.com.cn/open/home/purchase-info/?tabIndex=0",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    }
    url = "https://ec.minmetals.com.cn/open/homepage/zbs/by-lx-page"
    params = []
    with open("./minmtals.js", 'r', encoding="utf-8") as f:
        content = f.read()
        cell = execjs.compile(content)
        for i in range(1,3):
            params.append(cell.call("getParam", i))

    for param in params:
        data = {
            "param": param
        }
        response = requests.request("POST",url, headers=headers, json=data)
        for item in response.json()["list"]:
            name = item["mc"]
            bm = item["bm"]
            insert_data(name,bm)

if __name__ == "__main__":
    create_table()
    get_data()
