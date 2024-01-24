import { MongoClient } from "mongodb";
import fs from "fs";

const connectionString = "mongodb://localhost:27017/";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("events-demo");

const eventsCollection = db.collection("events");

const allEvents = await eventsCollection.find().toArray();
const eventsSet = new Set();

allEvents.forEach((el, i) => {
  if (el.events && el.events.length) {
    el.events.forEach((event) => {
      eventsSet.add(event.label);
    });
  }
});

const eventsArray = [...eventsSet];
const eventsJSON = JSON.stringify(eventsArray.sort());

fs.writeFile("allEvents.json", eventsJSON, "utf8", () => console.log("end"));

// console.log("eventsSet", [...eventsSet]);
// console.log("end");
