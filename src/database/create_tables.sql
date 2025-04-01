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
    vestibular VARCHAR(60) NOT NULL,
    year INT NOT NULL,
    question_index INT NULL,
    language VARCHAR(30) NULL,
    context TEXT NULL,
    alternative_introduction TEXT NULL,
    explanation TEXT NULL,
    discipline VARCHAR(50) NULL,
    sub_discipline VARCHAR(50) NULL,
    level INT NULL
);

CREATE TABLE question_alternatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_question UUID NOT NULL,
    letter VARCHAR(1) NOT NULL,
    alternative_text TEXT NULL,
    file_url VARCHAR(255) NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE question_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_question UUID NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE question_support(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_question UUID NOT NULL,
    support_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions(id) ON DELETE CASCADE
);