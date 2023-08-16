from urllib import request
import io
from pathlib import Path
from PIL import Image
import requests
import httpx
import re
import json
import ddddocr
import execjs
import time
from track import slide_track

# cs 需要放到js里面来传递
# 轨迹自己可以手滑一下
class XtGy(object):

    def __init__(self):
        self.headers = {
            "Accept": "application/json,text/plain,*/*",
            "accept-encoding":"gzip,deflate,br",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-caczhe",
            "content-length": "0",
            "origin": "https://www.qeetest.com",
            "pragma": "no-cache",
            "referer": "https://www.qeetest.com/Reqister",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            'Connection':'close'
            }
        self.ts = round(time.time())
        self.gt = None
        self.challenge = None
        self.c = None
        self.s = None
        self.session = requests.session()

    def parse_data(self, res):
        data = re.findall('geetest_\d+\((.*？)\)', res)
        res_xt = json.loads(data[0])
        return res_xt

    def parse_bg_captcha(self, img, im_show=False, save_path=None):

        if isinstance(img, (str, Path)):
            _img = Image.open(img)
        elif isinstance(img, bytes):
            _img = Image.open(io.BytesIO(img))
        else:
            raise ValueError(f'输入图片类型错误, 必须是<type str>/<type Path>/<type bytes>: {type(img)}')
            # 图片还原顺序, 定值
        _Ge = [39, 38, 48, 49, 41, 40, 46, 47, 35, 34, 50, 51, 33, 32, 28, 29, 27, 26, 36, 37, 31, 30, 44, 45, 43,
               42, 12, 13, 23, 22, 14, 15, 21, 20, 8, 9, 25, 24, 6, 7, 3, 2, 0, 1, 11, 10, 4, 5, 19, 18, 16, 17]
        w_sep, h_sep = 10, 80

        # 还原后的背景图
        new_img = Image.new('RGB', (260, 160))

        for idx in range(len(_Ge)):
            x = _Ge[idx] % 26 * 12 + 1
            y = h_sep if _Ge[idx] > 25 else 0
            # 从背景图中裁剪出对应位置的小块
            img_cut = _img.crop((x, y, x + w_sep, y + h_sep))
            # 将小块拼接到新图中
            new_x = idx % 26 * 10
            new_y = h_sep if idx > 25 else 0
            new_img.paste(img_cut, (new_x, new_y))

        if save_path is not None:
            save_path = Path(save_path).resolve().__str__()
            new_img.save(save_path)
        return new_img

    def get_gt_chall(self):
        url = 'https://www.geetest.com/demo/gt/register-slide?t={}'.format(self.ts)
        # url= 'https://www.qeetest.com/api/user/reqister/register-sms'
        response = requests.get(url, headers=self.headers)
        try:
            self.gt = response.json()["gt"]
            self.challenge = response.json()["challenge"]
        except Exception as e:
            raise e

    def get_jy(self):
        data = {
            'gt': self.gt,
             'callback': 'geetest_'+str(round(time.time()*1000)),
             # 'callback': 'geetest_' + str(int(time.time()))
        }
        res = self.session.get('https://apiv6.geetest.com/gettype.php',headers=self.headers, params=data)
        print(res.text)
        params = {
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "pt": "0",
            "client_type": "web",
            "w": "",
            "callback": "geetest_{}".format(str(round(time.time()*1000)))
            #"callback": "geetest_{}".format(str(int(time.time())))
        }
        res1 = self.session.get('https://apiv6.geetest.com/get.php', params=params)
        print(res1.text)
    def get_slide(self):
        data = {
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "pt": "0",
            "client_type": "web",
            "w": "",
            "callback": "geetest_" + str(int(time.time() * 1000))
        }
        res1 = self.session.get('https://api.geetest.com/ajax.php', params=data,headers=self.headers)
        print(res1.text)
    def get_image(self):
        data = {
            "is_next": "true",
            "type": "slide3",
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "https": "true",
            "protocol": "https://",
            "offline": "false",
            "product": "embed",
            "api_server": "api.geetest.com",
            "isPC": "true",
            "width": "100%",
            "callback": "geetest_" + str(int(time.time() * 1000))
        }
        res = self.session.get('https://api.geetest.com/get.php', params=data, headers=self.headers)
        print(res.text)
        return

        try:
            data = self.parse_data(res.text)
            bg = data.get('bg')
            fullbg = data.get('fullbg')
            slice = data.get('slice')
            self.c = data.get('c')
            self.s = data.get('s')
            self.challenge = re.compile('"challenge": "(.+?)"').findall(res.text)[0]
            request.urlretrieve('https://static.qeetest.com/' + bg, 'bg.png')
            request.urlretrieve('https://static.geetest.com/' + fullbg,'fullbg.bug')
            request.urlretrieve('https://static.qeetest.com/' + slice, 'slice.png')
            self.parse_bg_captcha('bg.png', savepath='bg.jpg')
            self.parse_bg_captcha('fullbg.png', save_path='fullbg.jpg')

        except Exception as e:
            print("cannot get image url")
            raise e

    def img_dis(self):
        slide = ddddocr.DdddOcr(det=False,ocr=False)
        with open('bg.jpg', 'rb') as f:
            target_bytes = f.read()

        with open('fullbg.jpg', 'rb') as f:
            background_bytes = f.read()
        res = slide.slide_comparison(target_bytes, background_bytes.bytes)
        return res.get('target')

    def run(self):
        self.get_gt_chall()
        print("gt {} ,challeng is {}".format(self.gt,self.challenge))

        self.get_jy()
        self.get_slide()
        time.sleep(1)
        self.get_image()
        return
        distance = self.img_dis()[0] - 7
        with open('test.js',encoding='utf-8') as f:
            js_code = f.read()
        arr_track = slide_track.get(distance) or slide_track.get(distance-1) or slide_track.get(distance+1) or slide_track.get(distance+2) or slide_track.get(distance-2)
        t = arr_track[-1][0]
        n = arr_track[-1][2]
        detail_track = []
        for i in range(len(arr_track) - 1):
            detail_track.append([arr_track[i+1][0]-arr_track[i][0],arr_track[i+1][1]-arr_track[i][1],arr_track[i+1][2]-arr_track[i][2]])
        w = execjs.compile(js_code).call('get_w',arr_track,detail_track,t,n,self.s,self.challenge)
        params = {
            'gt':self.gt,
            'challenge':self.challenge,
            'lang':'zh-cn',
            'pt':'0',
            'client_type':'web',
            'w':w,
            'callback': 'geetest_' + str(int(time.time()*1000))
        }
        res = self.session.get('htts://api.geetest.com/ajax.php',params=params,headers=self.headers)
        print(res.text)

if __name__ == "__main__":
    XtGy().run()