import requests
import os

page_list = ["firstpage", "secondpage", "thirdpage"]


def get_pic(url, dir, index):
    response = requests.get(url)
    pic = "小姐姐" + str(index) + ".png"
    target_path = os.path.join(dir, pic)
    with open(target_path, 'wb') as f:
        f.write(response.content)
    return


def get_three_pages(page, indexdir):
    parameter = {
        "tn": "resultjson_com",
        "logid": "10547802564945110924",
        "ipn": "rj",
        "ct": "201326592",
        "is": "",
        "fp": "result",
        "fr": "",
        "word": "小姐姐",
        "queryWord": "小姐姐",
        "cl": "2",
        "lm": "-1",
        "ie": "utf-8",
        "oe": "utf-8",
        "adpicid": "",
        "st": "-1",
        "z": "",
        "ic": "0",
        "hd": "",
        "latest": "",
        "copyright": "",
        "s": "",
        "se": "",
        "tab": "",
        "width": "",
        "height": "",
        "face": "0",
        "istype": "2",
        "qc": "",
        "nc": "1",
        "expermode": "",
        "nojc": "",
        "isAsync": "",
        "pn": f"{page}",
        "rn": "30",
        "gsm": "78"
    }
    url = "https://image.baidu.com/search/acjson"
    cookies = {
        "BDqhfp": "小姐姐&&0-10-1undefined&&408&&2",
        "BIDUPSID": "FFB528B9894938B897B7610DE9A713AF",
        "PSTM": "1596210212",
        "BDUSS": "VjbjNLMWNXZWhheFd4Q01ncS1zMkhnSGVIdUVZbWxjVWpEMjRETXdnaHh-RjVmRVFBQUFBJCQAAAAAAAAAAAEAAAA3nu4Hv9XD976zvecAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFvN19xbzdfaD",
        "BDUSS_BFESS": "VjbjNLMWNXZWhheFd4Q01ncS1zMkhnSGVIdUVZbWxjVWpEMjRETXdnaHh-RjVmRVFBQUFBJCQAAAAAAAAAAAEAAAA3nu4Hv9XD976zvecAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFvN19xbzdfaD",
        "__yjs_duid": "1_e3977589714e74ed367a2d5eafa131491617891227189",
        "MCITY": "-:",
        "BAIDUID": "0C39C3FB811A2C72A98F09C9E83984FE:FG=1",
        "ZFY": "Rbn9CJVgTkP2WTxfTR5cXFpF4exDPVU:AbfnxKDrpeg4:C",
        "BAIDUID_BFESS": "0C39C3FB811A2C72A98F09C9E83984FE:FG=1",
        "__bid_n": "1842e7e061eb91e1314207",
        "FEID": "v10-b275c13d5674ed1a11779ca532d2a9fc28e2b294",
        "__xaf_fpstarttimer__": "1672317792871",
        "__xaf_thstime__": "1672317792974",
        "FPTOKEN": "SuH+TWF4StQnmiBktt8mSsRemA3MSj0dF4YLNu7BIgzc724nSBEmEEHM2U7qkM22sLgydpDHEtHUQfUOnYoeXF+LmWxWWV3R5C8Ucmi9Bwf6EH0rdYzJ4k/auSpNWTjnXflcg/atuo0NAq28FFJ42p99JEGRU/QjvViAaBZI7mnhIhXi67+8nB6RssIHvb9jmyLI1/9XB7RykUTYrW/ldzSPLiIqA9ZKoIjN09RcL7LQ5p042G6ABfyZvqi5vhVVOYNX+JuCdovg5Jo+IynHmVv6uiiRAZAqgSbTZOmoquaSg5ufZgXEfR45+5Rfo/kWSckdGDz9EKDoHmHMbo5kXO8lPMX7Tj5Ms1XNPWi/QqZT7YSc+aZofSw1gLJglRHUfZfPc5s5sUmzBg4jfL4Tlg==|CvRZ1mirByDsQSjr5RlnmvwiKCCBOiuoudCKWbbPVo0=|10|12544f221689bd805e644679787535db",
        "__xaf_fptokentimer__": "1672317793057",
        "H_PS_PSSID": "36543_37973_37906_37623_36920_37990_37936_37987_37903_26350_37881",
        "BA_HECTOR": "0g05208hak0081ah20042ia21hr5o0i1j",
        "BDRCVFR[X_XKQks0S63]": "mk3SLVN4HKm",
        "userFrom": "www.baidu.com",
        "firstShowTip": "1",
        "BDRCVFR[dG2JNJb_ajR]": "mk3SLVN4HKm",
        "BDRCVFR[-pGxjrCMryR]": "mk3SLVN4HKm",
        "H_WISE_SIDS": "219946_234044_219623_232777_236443_229812_231501_238148_235174_235443_235513_237837_240662_240447_240597_238226_227932_229966_211986_215727_219943_228650_229154_239500_237893_203520_239087_241363_241719_232630_242082",
        "delPer": "0",
        "H_WISE_SIDS_BFESS": "219946_234044_219623_232777_236443_229812_231501_238148_235174_235443_235513_237837_240662_240447_240597_238226_227932_229966_211986_215727_219943_228650_229154_239500_237893_203520_239087_241363_241719_232630_242082",
        "BDORZ": "AE84CDB3A529C0F8A2B9DCDD1D18B695",
        "cleanHistoryStatus": "0",
        "indexPageSugList": "[\"小姐姐\",\"小哥哥\"]",
        "BDRCVFR[kAjskz-82g3]": "mk3SLVN4HKm",
        "IMG_WH": "1880_280",
        "ab_sr": "1.0.1_NzQ4YmE4YmFjZjE5OTBhOGQzYWYxM2M1ZDA2YzExYWYyMTI5ZjEyZTNmZDg5MjNjMDM4MWQzM2Q4NWFmNTk4ZThjYmIwNzc4ZjQ1YTY1OWQwOThmZjgxM2U1MzE4YjExMmZlNmEwOWIyMzZiZDYzNDhiMmUyZTQ0ZDY2ZjIxZjllZDI2Yjk5ZjRiYjg1MjAxNWU2NzFiODBlNzdhMzJlYg=="
    }

    header = {
             "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.3",
             "X-Requested-With": "XMLHttpRequest"
    }
    response = requests.get(url=url, headers=header,  params=parameter)
    for index, link in enumerate(response.json()["data"]):
        if link:
            print(link["hoverURL"])
            get_pic(link["hoverURL"], page_list[indexdir], index)


for i in range(3):
    get_three_pages(30 + i*0, i)
#get_three_pages(30, 0)
#get_three_pages(60, 1)
#get_three_pages(90, 2)
# get_pic("https://img0.baidu.com/it/u=4245219980,2730012540&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=500", 0)
