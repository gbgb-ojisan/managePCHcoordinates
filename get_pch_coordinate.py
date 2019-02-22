# coding: utf-8

import urllib
from bs4 import BeautifulSoup
import csv
import re

# -----------------------------------------------------
# URL
url = "https://prichan.jp/items/selection.html#6-P1"
# CSV filename
filename = 'pch_selection_airanju.csv'
# セレクションの場合，過去のコーデと同一のページに追記されるため，
# divのidで絞り込む必要がある
isSelection = 1
if isSelection:
    interestId = '6-P'

# -----------------------------------------------------

# Access to the URL
html = urllib.request.urlopen(url)

# HTML Parser
soup = BeautifulSoup(html, 'lxml')

fieldNames = ['pchId', 'groupId', 'name', 'rarity', 'category', 'like', 'imgPath', 'imgUrl']
# Open a csv file
# ATTN: Windowsで実行するとSJISのCSVとして書き込まれるので注意（encoding指定が効かない)
with open(filename, 'w', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldNames)
    writer.writeheader()
    # Get div.coordinate-list
    if isSelection:
        divs = soup.find_all('div', attrs={"id": re.compile(interestId), "class": "coordinate-list"})
    else:
        divs = soup.find_all('div', attrs={"class": "coordinate-list"})
    
    for div in divs:
        # divはコーデ一式に対応するhtml要素
        print(div.attrs)
        groupId = div['id']
        lis = div.find('ul').find_all('li')
        for li in lis:
            # Get the attributes of a item.
            pchid = li.find('div', attrs={"class": "-shoulder"}).get_text()
            category = li.find('div', attrs={"class": "-category"}).get_text()
            name = li.find('div', attrs={"class": "-title"}).get_text()
            rarity = li.find('div', attrs={"class": "-rarity"}).get_text()
            like = li.find('div', attrs={"class": "-like"}).get_text()
            imgUrl = 'https://prichan.jp' + li.find('img')['data-src']
            saveName = './imgs/' + pchid + '.jpg'
            writer.writerow({'pchId': pchid,
                             'groupId': groupId,
                             'name': name,
                             'rarity': rarity,
                             'like': like,
                             'category': category,
                             'imgPath': saveName,
                             'imgUrl': imgUrl})                         

#        print(imgUrl)
#        urllib.request.urlretrieve(imgUrl, saveName)
