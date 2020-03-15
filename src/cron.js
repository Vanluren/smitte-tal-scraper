import cron from "node-cron";
import moment from "moment";
import { fetchAndSaveNumbers } from "./scraper/scraper";

cron.schedule("0 */2 * * *", () => {
  console.log(`Running cron job - scraping worldometer ${moment().format()}`);
  return fetchAndSaveNumbers();
});
