# coding: utf-8

import urllib
from bs4 import BeautifulSoup

# URL
# Season 4, October channel
url = "https://prichan.jp/items/4th_10.html"

# Access to the URL
html = urllib.request.urlopen(url)

# HTML Parser
soup = BeautifulSoup(html, 'lxml')

# Get div.coordinate-list
divs = soup.find_all('div', attrs={"class": "coordinate-list"})
for div in divs:
    # divはコーデ一式に対応するhtml要素
    print(div.attrs)
    lis = div.find('ul').find_all('li')
    for li in lis:
        pchid = li.find('div', attrs={"class": "-shoulder"}).get_text()
        print(pchid)
        imgUrl = 'https://prichan.jp' + li.find('img')['data-src']
        saveName = './imgs/' + pchid + '.jpg'
        print(imgUrl)
        urllib.request.urlretrieve(imgUrl, saveName)
