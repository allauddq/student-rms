const express = require('express');
const studentsRouter = require('./students');
const coursesRouter = require('./courses');
const resultsRouter = require('./results');

const createRoutes = ({ studentsDB, coursesDB, resultsDB }) => {
  const router = express.Router();

  router.use('/students', studentsRouter(studentsDB));
  router.use('/courses', coursesRouter(coursesDB));
  router.use('/results', resultsRouter(resultsDB));

  return router;
};

module.exports = createRoutes;
