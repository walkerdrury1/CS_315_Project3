import requests

requests.post("http://localhost:4000/change-minimumamount", json={'name': 'pumpkin spice', 'minimumamount': 200})
#a = requests.get("http://localhost:4000/get-inventory")
#print(a.text)
