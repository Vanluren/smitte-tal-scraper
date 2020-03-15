import fetch from "node-fetch";
import cheerio from "cheerio";
import moment from "moment";
import db, { writeToDb, updateDb } from "../db/database";
import { CURRENT_INFECT, DB_SCRAPED_DATA, LAST_CHECK } from "../db/constants";
import { URL, scrapedData } from "./constants";

const _fetchPage = () =>
  fetch(URL)
    .then(res => res.text())
    .then(body => body);

const _getDkFromCountriesTable = page => {
  const $ = cheerio.load(page);

  return $("#main_table_countries>tbody>tr>td")
    .filter((i, elem) => {
      return (
        $(elem)
          .text()
          .trim()
          .toLowerCase() === "denmark"
      );
    })
    .parent();
};

const _parseDkRowToObj = rowData => {
  let data = { ...scrapedData };

  const arr = rowData
    .children()
    .toArray()
    .map(v =>
      cheerio(v)
        .text()
        .trim()
    );

  data.date = moment(Date.now()).format();
  data.infected = arr[1];
  data.newCases = arr[2];
  data.deaths = arr[3];
  data.newDeaths = arr[4];
  data.recovered = arr[5];
  data.activeCases = arr[6];

  return data;
};

const _saveNumbers = object => {
  updateDb(CURRENT_INFECT, object.infected);
  updateDb(LAST_CHECK, object.date);
  writeToDb(DB_SCRAPED_DATA, object);
};

export const fetchAndSaveNumbers = async () => {
  try {
    const page = await _fetchPage();
    const dkRow = _getDkFromCountriesTable(page);
    const objToSave = _parseDkRowToObj(dkRow);
    return _saveNumbers(objToSave);
  } catch (err) {
    throw new Error(err);
  }
};
