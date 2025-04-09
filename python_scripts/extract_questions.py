import os
import json
import re
import requests

url = "http://localhost:4000"

session = requests.Session()

login_data = {
    "email": "",
    "password": ""
}

response_login = session.post( url + "/api/login", json=login_data)

def extract_questions(directory):
    try:
        questions = []

        items = os.listdir(directory)

        # Filter only directories (subfolders)
        subfolders = [item for item in items if os.path.isdir(os.path.join(directory, item))]

        if subfolders:
            for subfolder in subfolders:
                subfolder_path = os.path.join(directory, subfolder)

                files = [f for f in os.listdir(subfolder_path) if os.path.isfile(os.path.join(subfolder_path, f))]
                if files:
                    for file in files:
                        if file == "details.json":
                            details_path = os.path.join(subfolder_path, file)
                            try:
                                with open(details_path, 'r', encoding="utf-8") as f:  # Specify encoding here
                                    
                                    details_data = json.load(f)
                                    question_files_new_and_old_links = old_and_new_images_links(details_data["files"], subfolder_path) 
                                    context = change_context(details_data["context"], question_files_new_and_old_links)
                                    question_files_new_links = []
                                    for images_links in question_files_new_and_old_links:
                                         question_files_new_links.append(images_links["new_url"])
                                    question = {
                                        "title": details_data["title"],
                                        "question_index": details_data["index"],
                                        "year": details_data["year"],
                                        "language": details_data["language"],
                                        "discipline": details_data["discipline"],
                                        "context": clean_text(context),
                                        "alternative_introduction": details_data["alternativesIntroduction"],
                                        "sub_discipline": None,
                                        "vestibular": "ENEM",
                                        "level": None,
                                        "alternatives": [
                                            {
                                                "letter": details_data["alternatives"][0]["letter"],
                                                "text": details_data["alternatives"][0]["text"],
                                                "file_url": new_image_link(details_data["alternatives"][0]["file"], subfolder_path),
                                                "is_correct": details_data["alternatives"][0]["isCorrect"]
                                            },
                                            {
                                                "letter": details_data["alternatives"][1]["letter"],
                                                "text": details_data["alternatives"][1]["text"],
                                                "file_url": new_image_link(details_data["alternatives"][1]["file"], subfolder_path),
                                                "is_correct": details_data["alternatives"][1]["isCorrect"]
                                            },
                                            {
                                                "letter": details_data["alternatives"][2]["letter"],
                                                "text": details_data["alternatives"][2]["text"],
                                                "file_url": new_image_link(details_data["alternatives"][2]["file"], subfolder_path),
                                                "is_correct": details_data["alternatives"][2]["isCorrect"]
                                            },
                                            {
                                                "letter": details_data["alternatives"][3]["letter"],
                                                "text": details_data["alternatives"][3]["text"],
                                                "file_url": new_image_link(details_data["alternatives"][3]["file"], subfolder_path),
                                                "is_correct": details_data["alternatives"][3]["isCorrect"]
                                            },
                                            {
                                                "letter": details_data["alternatives"][4]["letter"],
                                                "text": details_data["alternatives"][4]["text"],
                                                "file_url": new_image_link(details_data["alternatives"][4]["file"], subfolder_path),
                                                "is_correct": details_data["alternatives"][4]["isCorrect"]
                                            },
                                        ],
                                        "support_urls": [
                                            
                                        ],
                                        "question_files": question_files_new_links
                                    }

                                    questions.append(question)

                            except json.JSONDecodeError:
                                print(f"     Error: Invalid JSON format in {file}")
                            except UnicodeDecodeError:
                                print(f"     Error: Could not decode {file} with ANSI encoding.")
                            except Exception as e:
                                print(subfolder)
                                print(f"     Error reading {file}: {e}")
                                
        else:
            print("No subfolders found.")
        
        return questions

    except FileNotFoundError:
        print("The directory does not exist.")
    except PermissionError:
        print("Permission denied to access this folder.")

def extract_filename(url):
  """Extracts the filename from a URL.

  Args:
    url: The URL string.

  Returns:
    The filename (string) or None if the URL is invalid.
  """
  try:
    return url.rsplit('/', 1)[-1]
  except:
    return None
  
def extract_filenames_from_list(urls):
    """
    Extracts filenames from a list of URLs.

    Args:
        urls: A list of URL strings.

    Returns:
        A list of filenames (strings), or None for invalid URLs.
    """
    filenames = []
    for url in urls:
        try:
            filenames.append(url.rsplit('/', 1)[-1])
        except:
            filenames.append(None)  # Append None for invalid URLs
    return filenames

def upload_images(image_path):
    data = {
        "username": "test_user",
        "description": "This is an image upload"
    }
    files = {"question": ("image.png", open(image_path, "rb"), "image/png")}
    response = session.post(url + "/api/image", data=data, files=files)
    if response.status_code == 201:
        return response.json()["path"]

def new_image_link(url, subfolder_path):
    if url == None:
        return None
    file_path = extract_filename(url)
    image_path = os.path.join(subfolder_path, file_path)
    return upload_images(image_path)

def old_and_new_images_links(list, subfolder_path):
    if len(list) == 0 or list == None:
        return []
    files_paths = extract_filenames_from_list(list)
    images_links = []
    for i, file_path in enumerate(files_paths):
        image_path = os.path.join(subfolder_path, file_path)
        images_links.append({"old_url": list[i], "new_url": upload_images(image_path)})
    return images_links

def change_context(context, images_links):
    for image_link in images_links:
        context = context.replace(image_link["old_url"], image_link["new_url"])
    return context

def clean_text(text):
    if(text == None):
        return text
    text = str(text)
    text = text.replace(" ", " ")
    text = text.replace("*", "")
    pattern = rf"!\[\]\(/images/[a-f0-9-]+\.png\)" 
    cleaned_text = re.sub(pattern, "", text)
    return cleaned_text

if __name__ == "__main__":
    folder_path = "questions-2010"

    questions = extract_questions(folder_path)

    sorted_questions = sorted(questions, key=lambda x: x["question_index"])

    myfile = open(f"{folder_path}.json", "w", encoding ='utf8')

    json.dump(sorted_questions, myfile, indent=4, ensure_ascii=False)

    myfile.close()