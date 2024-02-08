import { MongoClient } from "mongodb";
import data from "./demo_full_data.json" assert { type: "json" };

const connectionString = "mongodb://mongo:27017/events-demo";
// const connectionString = "mongodb://localhost:27017/events-demo";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("events-demo");

// import data in db

db.collection("events").drop();

const eventsCollection = db.collection("events");

data.forEach((el, i) => {
  let events = [];
  let roles = [];

  if (el.title.spans) {
    Object.keys(el.title.spans).forEach((span) => {
      const splitted = span.split("*");
      if (splitted.length === 1) {
        events.push({
          label: span,
          value: el.title.spans[span],
          text: el.title.spans[span].join(" "),
          location: "title",
        });
      } else {
        roles.push({
          label: splitted[0],
          event: splitted[1],
          value: el.title.spans[span],
          text: el.title.spans[span].join(" "),
          location: "title",
        });
      }
    });
  }

  if (el.body.length) {
    el.body.forEach((sentence, y) => {
      if (sentence.spans) {
        Object.keys(sentence.spans).forEach((span) => {
          const splitted = span.split("*");
          if (splitted.length === 1) {
            events.push({
              label: span,
              value: el.body[y].spans[span],
              text: el.body[y].spans[span].join(" "),
              location: "body",
            });
          } else {
            roles.push({
              label: splitted[0],
              event: splitted[1],
              value: el.body[y].spans[span],
              text: el.body[y].spans[span].join(" "),
              location: "body",
            });
          }
        });
      }
    });
  }

  eventsCollection.insertOne({
    id: el.id,
    title: el.title,
    body: el.body,
    date: new Date(el.date),
    events,
    roles,
  });

  console.log("insert " + i);
});

console.log("end");

export default db;
