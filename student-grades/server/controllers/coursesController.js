const { coursesDB } = require('../database');

const getCourses = (req, res) => {
  coursesDB.loadDatabase((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    coursesDB.find({}, (err, students) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json(students);
    });
  });
};

const addCourse = (req, res) => {
  const { courseName } = req.body;

  // Validate that required fields are provided
  if (!courseName) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const newCourse = { courseName };

  coursesDB.insert(newCourse, (err, course) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(course);
  });
};

const deleteCourse = (req, res) => {
  const { id } = req.params;
  coursesDB.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    coursesDB.persistence.compactDatafile(); // Compact the datafile
    res.json({ message: `Successfully deleted ${numRemoved} course(s)` });
  });
};

module.exports = { getCourses, addCourse, deleteCourse };
