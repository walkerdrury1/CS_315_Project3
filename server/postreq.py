import requests

#requests.post("http://localhost:4000/set-price", json={'name': 'potato2', 'price': 10})
a = requests.get("http://localhost:4000/restock-report")
print(a.text)
