import express from "express";
import db from "../db/conn.mjs";

import allEvents from "./allEvents.json" assert { type: "json" };
import presets from "./event_domains.json" assert { type: "json" };

const router = express.Router();

router.get("/", async (req, res) => {
  const { event, includeBody, startDate, endDate } = req.query;

  const _startDate = new Date(startDate.split("/").reverse().join("-"));
  const _endDate = new Date(endDate.split("/").reverse().join("-"));

  let collection = await db.collection("roles");

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

router.get("/preset", async (req, res) => {
  res
    .send({
      allEvents,
      presets,
    })
    .status(200);
});

router.get("/roles", async (req, res) => {
  const { event } = req.query;

  let collection = await db.collection("roles");

  const pipeline = [
    {
      $unwind: { path: "$events" },
    },
    {
      $project: { events: 1, _id: 0 },
    },
    {
      $match: { "events.label": event },
    },
    {
      $unwind: { path: "$events.roles" },
    },
    {
      $group: { _id: "$events.roles.label", count: { $sum: 1 } },
    },
    {
      $sort: { count: -1 },
    },
  ];

  let results = await collection.aggregate(pipeline).toArray();

  res
    .send({
      results,
    })
    .status(200);
});

router.get("/group", async (req, res) => {
  const { events, includeBody, startDate, endDate } = req.query;
  const eventsArray = events.split(",");

  const _startDate = new Date(startDate.split("/").reverse().join("-"));
  const _endDate = new Date(endDate.split("/").reverse().join("-"));

  let collection = await db.collection("roles");

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

router.post("/adv", async (req, res) => {
  const { queryData, includeBody, startDate, endDate } = req.body;

  const _startDate = new Date(startDate.split("/").reverse().join("-"));
  const _endDate = new Date(endDate.split("/").reverse().join("-"));

  const queryArray = [];

  if (queryData.roles.length) {
    queryData.roles.forEach((role) => {
      const rolesQuery = {};
      if (role.role) {
        rolesQuery.label = role.role;
      }
      if (role.value) {
        rolesQuery.text = { $regex: new RegExp(role.value, "i") };
      }

      queryArray.push({
        events: {
          $elemMatch: {
            label: queryData.event,
            location: includeBody ? { $in: ["title", "body"] } : "title",
            roles: {
              $elemMatch: rolesQuery,
            },
          },
        },
        date: {
          $gte: new Date(_startDate),
          $lte: new Date(_endDate),
        },
      });
    });
  } else {
    queryArray.push({
      events: {
        $elemMatch: {
          label: queryData.event,
          location: includeBody ? { $in: ["title", "body"] } : "title",
        },
      },
      date: {
        $gte: new Date(_startDate),
        $lte: new Date(_endDate),
      },
    });
  }

  let collection = await db.collection("roles");
  let results = await collection
    .find({
      $and: queryArray,
    })
    .sort({ date: 1 })
    .toArray();

  res
    .send({
      event: queryData.event,
      results,
    })
    .status(200);
});

export default router;
