import requests

requests.post("http://localhost:4000/process-transaction", json={'cost': 7.5, 
                                                                 'items': [
                                                                     {'id':1, 
                                                                      'name':'orange chicken'}, 
                                                                     {'id': 15, 
                                                                      'name': 'white rice'}                                                                     
                                                                 ] })
