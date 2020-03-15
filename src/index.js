import express from "express";
import { fetchAndSaveNumbers } from "./scraper/scraper";
import db from "./db/database";
import "./cron";

const port = process.env.PORT || 1337;
const app = express();

app.get("/", (_, res) => {
  const { lastCheck, currentlyInfected } = db.value();
  return res.status(200).json({ lastCheck, currentlyInfected });
});

app.get("/data", (_, res) => {
  return res.status(200).json(db.value());
});

app.get("/infected", (_, res) => {
  const { infected } = db.value();
  return res.status(200).json({ infected });
});

app.get("/scrape", (_, res) =>
  fetchAndSaveNumbers()
    .then(() => res.status(200).json(db.value()))
    .catch(err => res.status(500).send({ error: err }))
);

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
