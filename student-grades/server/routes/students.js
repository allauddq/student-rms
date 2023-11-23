const express = require("express");
const studentsController = require("../controllers/studentsController");

const createRouter = (studentsDB) => {
  const router = express.Router();

  router.get("/", studentsController.getStudents);
  router.post("/", studentsController.addStudent);
  router.delete("/:id", studentsController.deleteStudent);

  return router;
};

module.exports = createRouter;
