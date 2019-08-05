const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get('/', (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  let templateVars = {greetings: 'Hello World!'};
  res.render("hello_world", templateVars);
});

app.get('/urls', (req, res) => {
  let templateVars = {urls: urlDatabase};
  res.render("url_index", templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("url_show", templateVars);
});


const generateRandomString = function(longURL) {
  let shortURL = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let length = 6;
  
  for (let i = 0; i < length; i++) {
    let random = Math.random(chars.length);
    let index = Math.floor(random * chars.length);
    shortURL += chars[index];
  }
  
  urlDatabase[shortURL] = longURL;
};

app.post('/urls', (req, res) => {
  console.log(req.body.longURL);
  generateRandomString(req.body.longURL);
  res.send("Ok");
});