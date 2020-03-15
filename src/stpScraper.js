const NUMBER_SPLITTER = ":";
const TIME_SPLITTER = "Opdateret";
const QUARAN_MATCHER = "Danmark - Personer i karantæne:";
const INFECT_MATCHER = "Danmark - Smittede personer:";
const TITLE_SEL = "p.link-title";
const url = "https://stps.dk/";

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
