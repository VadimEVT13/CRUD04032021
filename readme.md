# Приложение CRUD
- Дата создания:  04.03.2021
- Описание:       CRUD приложение с использованием localStorage
- Дата окончания: 10.03.2021
- Сайт:           [Приложение на хостинге](http://crudapp.zzz.com.ua/dist/)

## Запуск
1. Необходимо установить [Node.js](https://nodejs.org/en/download/) для использования __npm__ команды из командной строки
2. В корне приложения использовать команду __npm run dev__ (это команда запуска __webpack-dev-server__)
3. После запуска локального сервера перейти по адресу http://127.0.0.1:9000/

## Подробности
Работа __webpack-dev-server__ описана в __webpack.config.js__:
```js
devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
}
```
- __port__ - указывает 9000 порт для запуска, если он занят смените на доступный.
- __Папка "dist"__ - директория для запуска приложения.
- __watchContentBase__ - флаг запуска автоматической компиляции кода.