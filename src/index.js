import express from "express";
import { fetchAndSaveNumbers } from "./scraper";
import db from "./database";
import "./cron";

const port = process.env.PORT || 1337;
const app = express();

app.get("/", (req, res, next) => {
  const { lastUpdate, currentlyInfected, currentlyQuarantined } = db.value();
  return res
    .status(200)
    .json({ lastUpdate, currentlyInfected, currentlyQuarantined });
});

app.get("/data", (_, res) => {
  return res.status(200).json(db.value());
});

app.get("/infected", (_, res) => {
  const { infected } = db.value();
  return res.status(200).json({ infected });
});

app.get("/quarantined", (_, res) => {
  const { quarantined } = db.value();
  return res.status(200).json({ quarantined });
});

app.get("/scrape", (_req, res) =>
  fetchAndSaveNumbers()
    .then(() => res.status(200))
    .catch(err => res.status(500).send({ error: err }))
);

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
