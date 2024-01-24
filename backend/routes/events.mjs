import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const { event, includeBody, startDate, endDate } = req.query;

  const _startDate = new Date(startDate.split("/").reverse().join("-"));
  const _endDate = new Date(endDate.split("/").reverse().join("-"));

  let collection = await db.collection("events");

  let results = await collection
    .find({
      events: {
        $elemMatch: {
          label: event,
          location: includeBody ? { $in: ["title", "body"] } : "title",
        },
      },
      date: {
        $gte: new Date(_startDate),
        $lte: new Date(_endDate),
      },
    })
    .sort({ date: 1 })
    .toArray();

  res
    .send({
      event,
      results,
    })
    .status(200);
});

router.get("/group", async (req, res) => {
  const { events, includeBody, startDate, endDate } = req.query;
  const eventsArray = events.split(",");

  const _startDate = new Date(startDate.split("/").reverse().join("-"));
  const _endDate = new Date(endDate.split("/").reverse().join("-"));

  let collection = await db.collection("events");

  let results = await collection
    .find({
      events: {
        $elemMatch: {
          label: { $in: eventsArray },
          location: includeBody ? { $in: ["title", "body"] } : "title",
        },
      },
      date: {
        $gte: new Date(_startDate),
        $lte: new Date(_endDate),
      },
    })
    .sort({ date: 1 })
    .toArray();

  res
    .send({
      events,
      results,
    })
    .status(200);
});

export default router;
