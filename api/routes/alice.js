const express = require("express");
const router = express.Router();

// EXEMPLE

// this route can be reached with [POST] @ /api/alice/route-example
router.post("/route-example", async (req, res) => {
  try {
    const { foo, bar, baz, qux, quux } = req.body;
    return res.status(200).send({
      message: "foo bar baz qux quux received on /alice/route-example",
      foo,
      bar,
      baz,
      qux,
      quux
    });
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

module.exports = router;
