import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { dbDefaultObj } from "../db/constants";

const DB_PATH =
  process.env.NODE_ENV === "production" ? "prod_db.json" : "db.json";

const adapter = new FileSync(DB_PATH);
const db = lowdb(adapter);

db.defaults({ ...dbDefaultObj }).write();

export const writeToDb = (dbName, obj) => {
  return db
    .get(dbName)
    .push(obj)
    .write();
};

export const updateDb = (dbField, val) => db.set(dbField, val).write();

export default db;
