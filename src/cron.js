import cron from "node-cron";
import moment from "moment";
import db from "./database";
import { fetchAndSaveNumbers } from "./scraper";

cron.schedule("0 */1 * * *", () => {
  console.log(`Running cron job - scraping stps.dk ${moment().format()}`);
  return fetchAndSaveNumbers();
});
