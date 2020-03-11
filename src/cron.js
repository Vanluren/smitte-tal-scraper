import cron from "node-cron";
import moment from "moment";
import db from "./database";
import { fetchAndSaveNumbers } from "./scraper";

cron.schedule("0 */4 * * *", () => {
  console.log(`Running cron job - ${moment().format()}`);
  fetchAndSaveNumbers();
  db.get("lastUpdate")
    .push(moment().format())
    .write();
});
