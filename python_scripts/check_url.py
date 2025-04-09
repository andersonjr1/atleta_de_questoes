
import json
import requests

def check_url(data):
    questions = []
    authorized_sites = ["mundoeducacao.uol.com.br", "significados.com.br", "todamateria.com.br", "britannica.com", "brasilescola.uol.com.br", "ecycle.com.br", "infoescola.com"]
    for question in data:
        print(question["title"])
        valid_urls = []
        for url in question["support_urls"]:
            print(url)
            if not any(site in url for site in authorized_sites):
                continue
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    valid_urls.append(url)
            except Exception as e:
                print(e)
                continue
        print(valid_urls)
        question["support_urls"] = valid_urls
        questions.append(question)
    return questions
        
if __name__ == '__main__':
    file_path = "questions.json"
    file_path_new = "questions-new.json"
    questions = []

    try:
        with open(file_path, "r", encoding= "utf-8") as file:
            data = json.load(file)
            questions = check_url(data)

        with open(file_path_new, "w", encoding= "utf-8") as file:
            json.dump(questions, file, indent=4, ensure_ascii=False)
    except Exception as e:
        print(e)