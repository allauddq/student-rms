const express = require("express");
const resultsController = require("../controllers/resultsController");

const createRouter = (resultsDB) => {
  const router = express.Router();

  router.get("/", resultsController.getResults);
  router.post("/", resultsController.addResult);
  router.delete('/:id', (req, res) => resultsController.deleteResult(req, res, resultsDB));

  return router;
};

module.exports = createRouter;
