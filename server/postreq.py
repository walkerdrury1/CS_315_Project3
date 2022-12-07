import requests

#url = "http://localhost:4000"
url = "https://tyson-express.onrender.com"
a =requests.post(url + "/get-pairs", json={'startDate': '01-01-0001', 'endDate': '12-12-2050'})

#a = requests.get("http://localhost:4000/get-ingredients/orange chicken")
print(a.text)
