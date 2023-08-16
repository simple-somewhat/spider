import socket
import re

#url = "https://pic.netbian.com/uploads/allimg/220211/004115-1644511275bc26.jpg"
#url = "https://pic.netbian.com/uploads/allimg/220215/233510-16449393101c46.jpg"
url = "https://pic.netbian.com/uploads/allimg/211120/005250-1637340770807b.jpg"
client = socket.socket()
client.connect(("pic.netbian.com", 80))
http_req = 'GET ' + url + ' HTTP/1.1\r\nHost: pic.netbian.com\r\nUser-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36\r\nConnection: close\r\n\r\n'
client.send(http_req.encode())
result = b''
data = client.recv(1024)
while data:
    result += data
    data = client.recv(1024)

images = re.findall(b'\r\n\r\n(.*)', result, re.S)[0]
print(images)
with open('小姐姐.png', 'wb')as f:
    f.write(images)
