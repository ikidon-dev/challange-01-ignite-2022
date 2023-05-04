const { v4: uuidv4 } = require("uuid");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response
      .status(404)
      .json({ error: "There is no user with that username" });
  }

  request.user = user;

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some((user) => user.username === username);

  if (userAlreadyExists) {
    return response
      .status(400)
      .json({ error: "A user with that username already exists." });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  return response.json(request.user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;

  const task = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  const userIndex = users.findIndex(
    (user) => user.username === request.user.username
  );
  users[userIndex].todos.push(task);

  return response.status(201).json(task);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { id } = request.params;

  const userIndex = users.findIndex(
    (user) => user.username === request.user.username
  );

  const taskIndex = request.user.todos.findIndex((task) => task.id === id);

  if (taskIndex == -1) {
    return response.status(404).json({ error: "This task does not exist" });
  }

  const task = request.user.todos[taskIndex];

  const updatedTask = {
    ...task,
    title,
    deadline,
  };

  users[userIndex].todos[taskIndex] = updatedTask;

  return response.json(updatedTask);
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { id } = request.params;

  const userIndex = users.findIndex(
    (user) => user.username === request.user.username
  );

  const taskIndex = request.user.todos.findIndex((task) => task.id === id);

  if (taskIndex == -1) {
    return response.status(404).json({ error: "This task does not exist" });
  }

  const task = request.user.todos[taskIndex];

  const updatedTask = {
    ...task,
    done: true,
  };

  users[userIndex].todos[taskIndex] = updatedTask;

  return response.json(updatedTask);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { id } = request.params;

  const userIndex = users.findIndex(
    (user) => user.username === request.user.username
  );

  const taskIndex = request.user.todos.findIndex((task) => task.id === id);

  if (taskIndex == -1) {
    return response.status(404).json({ error: "This task does not exist" });
  }

  users[userIndex].todos = request.user.todos.splice(taskIndex, -1);

  return response.status(204).json();
});

module.exports = app;
