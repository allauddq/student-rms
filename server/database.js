// server/database.js
const Datastore = require('nedb');

const createDB = (filename) => {
  return new Datastore({ filename, autoload: true });
};

const studentsDB = createDB('./server/data/students.db');
const coursesDB = createDB('./server/data/courses.db');
const resultsDB = createDB('./server/data/results.db');

module.exports = { studentsDB, coursesDB, resultsDB };
