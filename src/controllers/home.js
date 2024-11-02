const app = require('../app');

// Главная страница
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Главная страница',
        isAuthenticated: req.session.isAuthenticated || false,
    });
});