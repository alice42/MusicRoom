const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(204).send({});
});

module.exports = router;
