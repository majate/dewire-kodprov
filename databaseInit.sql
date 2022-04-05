CREATE TABLE Translations (
    transKey VARCHAR(255) NOT NULL,
    lang VARCHAR(255) NOT NULL,
    trans VARCHAR(255),
    CONSTRAINT translations_pk PRIMARY KEY (transKey, lang) 
);

INSERT INTO translations SET transKey="name", lang="en", trans="Name"
ON DUPLICATE KEY UPDATE trans="Name";