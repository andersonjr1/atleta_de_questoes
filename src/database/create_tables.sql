CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(60) NOT NULL,
    role VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE accounts_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_account UUID REFERENCES accounts(id) ON DELETE CASCADE,
    id_question UUID REFERENCES questions(id) ON DELETE CASCADE,
    id_alternative UUID REFERENCES question_alternatives(id) ON DELETE CASCADE,
    exam BOOLEAN,
    answered_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    question_index INT,
    year INT,
    language VARCHAR(255) NOT NULL,
    discipline VARCHAR(50),
    sub_discipline VARCHAR(50) NOT NULL,
    level INT DEFAULT 0,
    context VARCHAR(255),
    support_url VARCHAR(255),
    alternative_introduction VARCHAR(255)
);

CREATE TABLE question_alternatives (
    id_question UUID NOT NULL,
    letter VARCHAR(1) NOT NULL,
    text VARCHAR(255) NOT NULL,
    file_url VARCHAR(255),
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions(id)
);

CREATE TABLE question_files (
    id_question UUID NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions(id)
);

CREATE TABLE question_support(
    id_question UUID not null,
    support_url varchar(255) NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions(id)
);