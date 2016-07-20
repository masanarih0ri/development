import requests, pprint
api_url = 'https://ja.wikipedia.org/w/api.php'
api_params = {'format':'xmlfm', 'action':'query', 'titles':'Mr.Children', 'prop':'revisions', 'rvprop':'content'}
wiki_data = requests.get(api_url, params=api_params).json()

fo = codecs.open('Users/horimasanari/Desktop/wiki.html','w','utf-8')
fo.write(wiki_data.text)
fo.close()
