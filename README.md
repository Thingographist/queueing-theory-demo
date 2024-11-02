Проект для моделирования и мониторинга поведения пользователя на сайте в контексте теории массового обслуживания.

# TODO

- Wordpress + WooCommerce
- экспорт настроек из Grafana
- экспорт/импорт задач из Influx

# Цель
- описание модели событий пользователя
- настройка конфигурации для визуализации моделей очередей в graphana

# Модель магазина

Страница предоставляет интерфейс для генерации событий

- каталог товаров
- поиск
- рекомендации
- корзина 

# Запуск

```bash
docker-compose up
```

В другом терминале

```bash
npm install
npm run init-grafana
npm start
```

# Сервисы

* макет приложения - http://localhost:3000/
* influxdb - http://localhost:3001/
    - пользователь: example-user
    - пароль: example-pass
* grafana - http://localhost:3007/
    - пользователь: admin
    - пароль: admin
    - [Тестовый дашборд](http://localhost:3007/d/fe2gi9gfxatc0d/pol-zovatel-skaja-statistika?from=now-6h&to=now&timezone=browser&var-query0=)
* kafka ui - http://localhost:29092/