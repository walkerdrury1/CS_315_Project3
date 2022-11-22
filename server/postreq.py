import requests

#url = "http://localhost:4000"
url = "https://tyson-express.onrender.com"
#requests.post(url + "/change-type", json={'name': 'potato3', 'type': 'pen15'})
a = requests.get("http://localhost:4000/get-ingredients/orange chicken")
print(a.text)
