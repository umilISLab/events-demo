import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { pass } = req.body;

  if (pass === "Demo-events-8491!") {
    res
      .send({
        authKey: "31519209202126915145",
      })
      .status(200);
  } else {
    res
      .send({
        authKey: null,
      })
      .status(200);
  }
});

export default router;
