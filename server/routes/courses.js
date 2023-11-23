// server/routes/courses.js
const express = require("express");
const coursesController = require("../controllers/coursesController");

const createRouter = (coursesDB) => {
  const router = express.Router();

  router.get("/", coursesController.getCourses);
  router.post("/", coursesController.addCourse);
  router.delete("/:id", coursesController.deleteCourse);

  return router;
};
module.exports = createRouter;
