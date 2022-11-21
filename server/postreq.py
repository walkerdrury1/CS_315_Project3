import requests

requests.post("http://localhost:4000/set-price", json={'name': 'potato2', 'price': '12'})
#a = requests.get("http://localhost:4000/excess-report/01-01-2022")
#print(a.text)
