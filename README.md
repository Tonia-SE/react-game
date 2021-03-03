2048 React-game

Для проверки приложения можно воспользоваться готовым деплоем - netlify, либо развернуть весь бэк и фронт локально по инструкции ниже.

Для работы с приложением на компьютере должны быть установлены следующие программы

Git - Download & Install Git.
Node.js - Download & Install Node.js and the npm package manager.

Для локального запуска бэкенд сервера:

Перейдите по ссылке https://github.com/Tonia-SE/react-game-backend и склонируйте репозиторий
Выполните команду git checkout react-game
Выполните команду npm i
Выполните команду npm run dev

Для запуска фронта:

Клонируйте ветку develop текущего репозитория
Выполните команду git checkout react-game
Выполните команду npm i
В файловой системе (src/consts.ts) в файле consts.ts раскомментируйте строку 1, закомментируйте строку 2
Выполните команду npm run start