DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS question_alternatives;
DROP TABLE IF EXISTS question_files;
DROP TABLE IF EXISTS question_support;

\i create_tables.sql