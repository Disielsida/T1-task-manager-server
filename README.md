# T1-Task-Manager — Server

Backend REST API для управления задачами с использованием **Node.js**, **Express** и **TypeScript**.

## Stack

- Node.js + Express
- TypeScript
- In-memory data store (array)
- ESLint + Prettier

## Эндпойнты API

```http
GET    /tasks         # Получить все задачи
GET    /tasks/:id     # Получить задачу по ID
POST   /tasks         # Создать новую задачу
PATCH  /tasks/:id     # Обновить задачу по ID
DELETE /tasks/:id     # Удалить задачу по ID
```

## Примеры работы в Postman

### GET
Получение всех задач:
![GET /tasks](./images/getAll.png)

### GET by ID
Получение задачи по id:
![GET by ID /tasks](./images/getId.png)

### POST
Создание задачи:
![POST /tasks](./images/post.png)

### PATCH
Изменение задачи:
![PATCH /tasks](./images/patch.png)

### DELETE
Удаление задачи:
![DELETE /tasks](./images/delete.png)

## Установка

```bash
# 1. Клонирование репозитория
git clone https://github.com/Disielsida/T1-task-manager-server.git
cd T1-task-manager-server/server

# 2. Установить зависимости
npm install

# 3. Запустить сервер 
npm run dev
```