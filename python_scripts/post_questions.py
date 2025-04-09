import json
import requests

url = "http://localhost:4000"

session = requests.Session()

login_data = {
    "email": "",
    "password": ""
}

response_login = session.post( url + "/api/login", json=login_data)

def post_to_api(data, api_endpoint):
    for item in data:
        try:
            print(item["title"])
            response = session.post(api_endpoint, json=item)  # Assumes item is a valid JSON object
            response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
            print(f"POST request successful for item:")
        except requests.exceptions.RequestException as e:
            print(f"Error during POST request for item: {e}")
        except json.JSONDecodeError as e:
            print(f"Error decoding API response for item : {e}")

if __name__ == "__main__":
    file_path = "questions-2009-united-checked.json"
    data = []
    with open(file_path, "r", encoding= "utf-8") as file:
        data = json.load(file)
    post_to_api(data, url + "/api/questions")
    
