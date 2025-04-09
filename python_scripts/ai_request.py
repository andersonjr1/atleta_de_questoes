from google import genai

import json

def ai_requests(questions):
    client = genai.Client(api_key="")

    original_prompt = """
    Vou enviar uma questão do ENEM no formato JSON. Quero que você preencha os seguintes campos:

        "level": um número inteiro entre 1 e 9 representando o nível de dificuldade da questão;

        "sub_discipline": uma string indicando a subdisciplina ou tema específico relacionado à questão (por exemplo, "química orgânica", "interpretação de texto", "geometria plana", etc.);

        "support_urls": uma lista com no mínimo 5 links relevantes que sirvam como material de apoio para entender o conteúdo da questão (Os links tem que ser de um desses sites: mundoeducacao.uol.com.br, significados.com.br, todamateria.com.br, britannica.com, brasilescola.uol.com.br, infoescola.com)
        
        "explanation": uma explicação sobre a alternativa certa da questão.

    Mantenha a estrutura original do JSON e apenas adicione ou preencha esses campos para a questão.
    """

    start = 0

    end = 5;

    questions_per_dificullt = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
    }

    new_questions = []

    while True:
        try:
            five_questions = []

            if(end >= len(questions)):
                five_questions = questions[start:]
            else:
                five_questions = questions[start:end]
            
            prompt = original_prompt + "\n" + "\n" + "As questões são: " + str(five_questions);

            response = client.models.generate_content(
                model='gemini-2.0-flash',
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                },
            )

            five_questions = json.loads(response.text)

            for question in five_questions:
                questions_per_dificullt[question["level"]] += 1
                new_questions.append(question)
            
            if (end >= len(questions)):
                break
            
            start = end
            end += 5
        except Exception:
            print(Exception)

    print(questions_per_dificullt)

    print(len(new_questions))

if __name__ == '__main__':
    questions = []

    discipline = "linguagens"

    file_path = "questions-2009.json"

    file_path_new = "questions-2009" + discipline + ".json"

    with open(file_path, 'r', encoding='utf-8') as f:
        questions = json.load(f)

    with open(file_path_new, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=4)

    def test_discipline(question):
        return question["discipline"] == discipline

    questions = list(filter(test_discipline, questions))

