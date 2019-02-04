const express = require("express");
const router = express.Router();

router.get("/user/login/:user", async (req, res) => {
  const user = req.params.user
  const test = req.query.test

  res.status(200).send(`${user} ${test}`);
});

module.exports = router;
