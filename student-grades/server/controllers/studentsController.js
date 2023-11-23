const { studentsDB } = require("../database");

const getStudents = (req, res) => {
  studentsDB.loadDatabase((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    studentsDB.find({}, (err, students) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json(students);
    });
  });
};

const addStudent = (req, res) => {
  const { studentName, dob, email } = req.body;

  // Validate that required fields are provided
  if (!studentName || !dob || !email) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newStudent = { studentName, dob, email };

  studentsDB.insert(newStudent, (err, student) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(student);
  });
};

const deleteStudent = (req, res) => {
  const { id } = req.params;
  studentsDB.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    studentsDB.persistence.compactDatafile(); // Compact the datafile
    res.json({ message: `Successfully deleted ${numRemoved} student(s)` });
  });
};

module.exports = { getStudents, addStudent, deleteStudent };
