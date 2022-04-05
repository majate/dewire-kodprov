const express = require('express');
const http = require('http');
const mysql = require('mysql');
const config = require('./config');
const utils = require('./utils');

const db = mysql.createConnection(config.db);
db.connect((err) => {
  if (err) {
    console.log('Error connecting to db: ' + err.stack)
  } else {
    console.log('Successful connection to db')
  }
})

const hostname = '127.0.0.1';
const port = 3001;

const server = express();
server.use(express.json());

// Handle "get translation" requests
server.get('/', (req, res) => {
  const {key, lang} = req.query;
  console.log(`New GET request: key='${key}' lang='${lang}'`)
  
  if (!key || !lang) {
    res.status(400)
    res.json({error: "Missing required parameters (query should include 'key' and 'lang')"})
    return
  }

  utils.getTranslation(db, key, lang, (err, results) => {
      if (err) {
        res.status(500)
        res.json({error: "Internal error in database"})
      } else if (!results || results.length < 1) {
        res.status(400)
        res.json({error: `No translation found for key='${key}' lang='${lang}'`})
      } else {
        res.status(200)
        res.json({key, lang, translation: results[0].trans})
      }
    })
});

// Handle "update translation" requests
server.post('/', (req, res) => {
  const {key, lang, translation} = req.body;
  utils.addTranslation(db, key, lang, translation, (err) => {
    if (err) {
      res.status(500)
      res.json({error: "Internal error in database"})
    }
    res.sendStatus(200)
  })
  console.log(`New POST request: key='${key}' lang='${lang}' translation='${translation}'`)
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
