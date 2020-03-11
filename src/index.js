import express from "express";
import { fetchAndSaveNumbers } from "./scraper";
import db from "./database";
import "./cron";

const port = 3000;
const app = express();

app.get("/", (req, res, next) => {
  const { infected, quarantined } = db.value();
  res.status(200).json({ infected, quarantined });
});

app.get("/scrape", (_req, res) =>
  fetchAndSaveNumbers()
    .then(() => res.status(200))
    .catch(err => res.status(500).send({ error: err }))
);

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
