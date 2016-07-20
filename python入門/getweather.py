import requests
api_url = 'http://weather.livedoor.com/forecast/webservice/json/v1';
payload = {'city':'130010'}
weather_data = requests.get(api_url, params=payload).json()
# for文でweather_data['forecasts']の中のリクエスト型を順番に変数weatherに入れて、順番に同じ処理を行う。
for weather in weather_data['forecasts']:
	# print(weather['dateLabel'] + 'の天気は' + weather['telop'])
	# print(weather)
	# print(weather['temperature'])
	# →{'min': {'celsius': '23', 'fahrenheit': '73.4'}, 'max': {'celsius': '31', 'fahrenheit': '87.8'}}
	print(weather['date'] + 'の天気は' + weather['telop'] + 'です。')