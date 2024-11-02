const express = require('express');
const _pug = require('pug');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Настройка Pug как шаблонизатора
app.set('view engine', 'pug');
app.set('views', './resources/views');

// Статические файлы
app.use(express.static('resources/public'));

// Настройка сессий
app.use(session({secret: 'your_secret_key',resave: false,saveUninitialized: true,}));

// Парсинг тела запроса
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
