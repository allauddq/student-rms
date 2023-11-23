const { resultsDB } = require("../database");
const { coursesDB } = require("../database");
const { studentsDB } = require("../database");

const getResults = (req, res) => {
  resultsDB.loadDatabase((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    resultsDB.find({}, async (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      console.log("Results from the database:", results);

      // Fetch all courses and students
      const courses = await getCourses();
      const students = await getStudents();

      console.log("coursesName:", courses);
      console.log("students:", students);
      
      // Filter out results for which the course or student is deleted
      const filteredResults = results.filter(
        (result) =>
          courses.find((course) => course.courseName === result.courseName) &&
          students.find((student) => student.studentName === result.studentName)
      );
      console.log("filteredResult = " + filteredResults);
      res.json(filteredResults);
    });
  });
};

const getCourses = () => {
  return new Promise((resolve, reject) => {
    coursesDB.loadDatabase((err) => {
      if (err) {
        reject(err);
        return;
      }

      coursesDB.find({}, (err, courses) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(courses);
      });
    });
  });
};

const getStudents = () => {
  return new Promise((resolve, reject) => {
    studentsDB.loadDatabase((err) => {
      if (err) {
        reject(err);
        return;
      }

      studentsDB.find({}, (err, students) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(students);
      });
    });
  });
};

const addResult = (req, res) => {
  const { courseName, studentName, score } = req.body;

  // Validate that required fields are provided
  if (!courseName || !studentName || !score) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newResult = { courseName, studentName, score };

  resultsDB.insert(newResult, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
};

const deleteResult = (req, res) => {
  const { id } = req.params;
  resultsDB.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    resultsDB.persistence.compactDatafile(); // Compact the datafile
    res.json({ message: `Successfully deleted ${numRemoved} result(s)` });
  });
};

module.exports = { getResults, addResult, deleteResult };
