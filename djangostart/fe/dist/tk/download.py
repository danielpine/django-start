import sys
import urllib.request as urllib2
import random
import os


def download(url):
    ip = ['121.31.159.197', '175.30.238.78', '124.202.247.110']
    useIp = ip[random.randint(0, 2)]
    header = {
        'User-agent':
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
        'X-Forwarded-For':
        useIp
    }
    request = urllib2.Request(url, headers=header)
    try:
        html = urllib2.urlopen(request).read()
    except Exception as e:
        print("Download error:", str(e))
        html = ""
    return html


import threading


def isString(obj):
    try:
        obj.lower() + obj.title() + obj + ""
    except:
        return False
    else:
        return True


def test():
    with open('static/tk/links.txt', 'r') as f:
        for line in f:
            if '@@@@' in line:
                line = line.split('@@@@')[0]
                arr = line.strip().replace(
                    'http://www.17sucai.com/preview/273145/2018-04-11/taikongxijizhan/',
                    '').split('/')
                t = threading.Thread(target=crawler, args=(line, arr))
                t.start()


def crawler(line, arr):
    filedir = '/'.join(arr[:-1]) + '/'
    filename = arr[-1:][0].split('?')[0]
    print('/'.join(arr[:-1]), arr[-1:][0].split('?')[0])
    if not os.path.exists(filedir):
        os.makedirs(filedir)
    html = download(line)
    with open(filedir + filename, 'w' if isString(html) else 'wb') as ff:
        ff.write(html)


if __name__ == "__main__":
    test()