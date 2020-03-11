import fetch from "node-fetch";
import $ from "cheerio";
import moment from "moment";
import db from "./database";

const QUARAN_DB = "quarantined";
const INFECT_DB = "infected";
const NUMBER_SPLITTER = ":";
const TIME_SPLITTER = "Opdateret";
const QUARAN_MATCHER = "Danmark - Personer i karantæne:";
const INFECT_MATCHER = "Danmark - Smittede personer:";
const TITLE_SEL = "p.link-title";

const parsedInfo = {
  date: moment().format(),
  infected: null,
  quarantined: null
};

const _matchNumber = box => {
  const title = $(TITLE_SEL, box).text();
  return title.split(NUMBER_SPLITTER)[1].trim();
};

const _matchTime = box => {
  const time = $("p.link-description", box)
    .text()
    .split(TIME_SPLITTER)[1]
    .trim();
  return moment(time, "D[.]MMM YYYY[,] [kl.]HH:mm", "da").format();
};

const _parseBoxes = boxes => {
  boxes.each((_, box) => {
    const title = $(TITLE_SEL, box).text();
    if (title.includes(QUARAN_MATCHER)) {
      parsedInfo["quarantined"] = {
        updated: _matchTime(box),
        amount: _matchNumber(box, title)
      };
    } else if (title.includes(INFECT_MATCHER)) {
      parsedInfo["infected"] = {
        updated: _matchTime(box),
        amount: _matchNumber(box, title)
      };
    }
  });

  return parsedInfo;
};

const _saveNumbers = object => {
  const isNewInfectedCount =
    db.get(INFECT_DB).value["amount"] !== object.infected.amount;
  const isNewQuarantineCount =
    db.get(QUARAN_DB).value()["amount"] !== object.quarantined.amount;

  if (!isNewInfectedCount) {
    db.get("infected")
      .push({ date: object.date, ...object.infected })
      .write();

    db.get("currentlyInfected")
      .push(object.infected.amount)
      .write();
  }
  if (!isNewQuarantineCount) {
    db.get("quarantined")
      .push({ date: object.date, ...object.quarantined })
      .write();

    db.get("currentlyQuarantined")
      .push(object.infected.amount)
      .write();
  }
};

export const fetchAndSaveNumbers = () => {
  const url = "https://stps.dk/";
  return fetch(url)
    .then(res => res.text())
    .then(body => {
      const boxes = $("li.link-box-link", body);
      const parsedBoxes = _parseBoxes(boxes);
      _saveNumbers(parsedBoxes);
    })
    .catch(err => console.error(err));
};
