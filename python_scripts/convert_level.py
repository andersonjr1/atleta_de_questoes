
import json
import requests

def convert_level(data):

    questions = []

    levels = {
        1: 0,
        2: 0,
        3: 0
    }

    for question in data:
        if(question["level"] <= 5):
            question["level"] = 1
            levels[1] += 1
        elif(question["level"] == 6):
            question["level"] = 2
            levels[2] += 1
        else:
            question["level"] = 3
            levels[3] += 1
        questions.append(question)
    
    print(levels)

    return questions

if __name__ == '__main__':
    file_path = "question.json"
    file_path_new = "question-new.json"
    questions = []
    try:
        with open(file_path, "r", encoding= "utf-8") as file:
            data = json.load(file)
            questions = convert_level(data)
        with open(file_path_new, "w", encoding= "utf-8") as file:
            json.dump(questions, file, indent=4, ensure_ascii=False)
    except Exception as e:
        print(e)