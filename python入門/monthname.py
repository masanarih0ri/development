def japanese(month):
	month_name = {
		1:"睦月",2:"如月",3:"弥生",4:"卯月",5:"皐月",6:"水無月",7:"文月",8:"葉月",9:"長月",10:"神無月",11:"霜月",12:"師走"
	}

	try:
		response = month_name[month]
	except:
		response = '月の数字を入力してください'

	return response

if __name__ == '__main__':
	print('これはモジュール用のファイルです。importをして使ってください')