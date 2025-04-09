import json

def unite_files(files):
    content = []
    for file in files:
        data = []
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            print(file + " " + str(len(data)))
        for question in data:
            content.append(question)
    return content

if __name__ == '__main__':
    file_path = "questions-2009-united.json"
    files = ["questions1.json", "questions2.json", "questions3.json", "questions4.json"]
    with open(file_path, 'w', encoding='utf-8') as f:
        content = unite_files(files)
        print(len(content))
        json.dump(content, f, ensure_ascii=False, indent=4)
        