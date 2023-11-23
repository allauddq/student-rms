// server/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { studentsDB, coursesDB, resultsDB } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Pass the NeDB instances to the routes
app.use('/', routes({ studentsDB, coursesDB, resultsDB }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
