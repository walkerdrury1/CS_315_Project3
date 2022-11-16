import requests

requests.post("http://localhost:4000/add-inventory", json={'name': 'carrot1', 'minimumamount': 150})
#a = requests.get("http://localhost:4000/get-inventory")
#print(a.text)
