import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

let DB_PATH = "db.json";
if (process.NODE_ENV === "production") {
  DB_PATH = "prod_db.json";
}

const adapter = new FileSync(DB_PATH);
const db = lowdb(adapter);
db.defaults({
  lastUpdate: "",
  currentlyInfected: "",
  currentlyQuarantined: "",
  infected: [],
  quarantined: [],
  scrapedData: []
}).write();
export default db;
