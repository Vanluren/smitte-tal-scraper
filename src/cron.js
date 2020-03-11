import cron from "node-cron";
import moment from "moment";
import { fetchAndSaveNumbers } from "./scraper";

cron.schedule("0 */4 * * *", () => {
  console.log(`Running cron job - ${moment().format()}`);
  fetchAndSaveNumbers();
});
