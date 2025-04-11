CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(60) NOT NULL,
    role VARCHAR(30) NOT NULL,
    phone VARCHAR(20),
    birthdate DATE,
    location VARCHAR(100),
    avatar_url VARCHAR(255),
    level INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
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
    sub_discipline VARCHAR(250) NULL,
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

CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_user UUID NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    limit_time TIMESTAMP NOT NULL,
    done_time_at TIMESTAMP NULL,
    CONSTRAINT fk_exam_user FOREIGN KEY (id_user) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_exam UUID NOT NULL,
    id_question UUID NOT NULL,
    id_question_alternative UUID NULL,
    letters_order VARCHAR(1)[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_exam_questions_simulado FOREIGN KEY (id_exam) REFERENCES exams(id) ON DELETE CASCADE,
    CONSTRAINT fk_exam_questions_question FOREIGN KEY (id_question) REFERENCES questions(id) ON DELETE CASCADE,
    CONSTRAINT fk_exam_questions_alternative FOREIGN KEY (id_question_alternative) REFERENCES question_alternatives(id) ON DELETE CASCADE
);

CREATE TABLE accounts_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_account UUID REFERENCES accounts(id) ON DELETE CASCADE,
    id_question UUID REFERENCES questions(id) ON DELETE CASCADE,
    id_alternative UUID REFERENCES question_alternatives(id) ON DELETE CASCADE,
    id_exam_question UUID REFERENCES exam_questions(id) ON DELETE CASCADE,
    answered_at TIMESTAMP DEFAULT NOW()
);