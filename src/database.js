import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("db.json");
const db = lowdb(adapter);
db.defaults({ infected: [], quarantined: [] }).write();
export default db;
