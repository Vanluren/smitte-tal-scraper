import moment from "moment";

export const URL = "https://www.worldometers.info/coronavirus";

export const scrapedData = {
  date: moment(Date.now()).format(),
  infected: "",
  newCases: "",
  deaths: "",
  newDeaths: "",
  recovered: "",
  activeCases: "",
  criticalCases: ""
};
