# dewire-kodprov

Used software:
- Node v14.17.6
- MySQL (via XAMPP v3.2.2)

## Setup
1. Install dependencies
```
$ npm install
```
2. Start the MySQL server and login
3. Create a new MySQL database
4. In the database, create a new table called `Translations`:
```sql
CREATE TABLE Translations (
    transKey VARCHAR(255) NOT NULL,
    lang VARCHAR(255) NOT NULL,
    trans VARCHAR(255),
    CONSTRAINT translations_pk PRIMARY KEY (transKey, lang) 
);
```
5. Update `config.js` to match the settings of the database
6. Start the Node server (it will be running on port 3001)
```
$ node index.js
```

## Add/Update translation
To add a new translation for a given key and language (or update the existing translation for that key and language pair), do a POST request to `http://localhost:3001`.

The body should be a json-object containing the following attributes:
- `key` (string) - The key of the word/phrase
- `lang` (string) - The language code of the language of the word/phrase
- `translation` (string) - The word/phrase in the specified language

## Get translation
To get a translation for a specific key pair with a GET request to `http://localhost:3001`. The request should contain the following query parameters:
- `key` (string) - The key of the wanted word/phrase
- `lang` (string) - The language code of the language

### Response
If a translation was found, the response will be a json-object in the following format
```
{
    "key": <key>,
    "lang": <language>,
    "translation": <the word/phrase in the specified language>
}
```

## Use Examples
Add a translation for the key `buy-chips` in English with following request:

```
curl -X POST http://localhost:3001 -H 'Content-Type: application/json' -d '{"key":"buy-chips","lang":"en", "translation":"Buy chips"}'
```
