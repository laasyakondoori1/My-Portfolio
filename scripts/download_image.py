import urllib.request, re

url = 'https://commons.wikimedia.org/wiki/File:Campus_aerial_view_of_Anurag_University.jpg'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'href="(https://upload\.wikimedia\.org/wikipedia/commons/[^"]+Campus_aerial_view_of_Anurag_University\.jpg)"', html)
    if match:
        img_url = match.group(1)
        print('Downloading', img_url)
        img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(img_req) as response, open('public/anurag-university.jpg', 'wb') as out_file:
            out_file.write(response.read())
        print('Downloaded successfully.')
    else:
        print("Could not find image url")
except Exception as e:
    print("Error:", e)
