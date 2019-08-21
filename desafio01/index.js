const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

let counter = 0;

server.use((req, res, next) => {
  counter++;

  console.log(`Request n: ${counter}`);

  return next();
});

function checkProjectExists(req, res, next) {
  const project = projects.find(p => p.id === req.params.id);

  if (!project) {
    return res.status(400).json({
      error: 'Project does not exists'
    });
  }

  req.project = project;

  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { title } = req.body;

  req.project.title = title;

  return res.json(req.project);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body;

  req.project.tasks.push(title);

  return res.json(req.project);
});

server.listen(3000);
