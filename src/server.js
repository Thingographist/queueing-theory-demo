const app = require('./app');
require('./controllers/home');
require('./controllers/events');
require('./controllers/notifications');

app.post('/test', async (req, res) => {
   console.log(req.body)
   // console.log(req)
   res.send("ok")
})

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Сервер запущен на порту ${PORT}`);
});