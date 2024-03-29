const schedule = require("node-schedule");

const scheduleTask = (taskName, dayOfWeek, hour, minute, callback) => {
  try {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = dayOfWeek; // array (0-6) Starting with Sunday
    rule.hour = hour;
    rule.minute = minute;

    const job = schedule.scheduleJob(rule, () => {
      callback();
    });
    console.log("## Scheduled task -->", taskName);
  } catch (error) {
    console.error(error.message);
  }
};

const removeAllLetters = (string) => string.replace(/[a-z A-Z]/g, "");

const convertToCamelCase = (str) => {
  let arr_words = str.toLowerCase().split(" ");
  const prepositions = [
    "a",
    "e",
    "o",
    "da",
    "de",
    "do",
    "as",
    "os",
    "das",
    "dos",
    "na",
    "no",
    "nas",
    "nos",
  ];
  let result = arr_words.map((word) => {
    if (prepositions.includes(word)) {
      return word;
    } else {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    }
  });
  return result.join(" ");
};

const returnCardModule = (cardName) => {
  const cardList = [
    { name: "today", module: "TodayWeatherModule" },
    { name: "hours", module: "HourlyWeatherModule" },
    { name: "days", module: "DailyWeatherModule" },
  ];
  let card = cardList.find((el) => el.name === cardName);
  return card.module;
};

const domElementsListScraper = ($, identifier) => {
  let parentElementsArray = [],
    childElementsArray = [];

  $(`section[data-testid="${identifier}"] > div`)
    .find("ul > li > a")
    .each((index, element) => {
      parentElementsArray.push($(element));
      $(parentElementsArray[index])
        .children()
        .each((index, element) => {
          childElementsArray.push($(element).text());
        });
    });

  return childElementsArray;
};

const organizeElementDataDOM = (arr, number_fields) => {
  let arrTemp = [];
  let arrDataList = [];
  let count = 0;

  for (let index = 0; index <= arr.length; index++) {
    if (count === number_fields) {
      arrDataList.push(arrTemp);
      arrTemp = [];
      count = 0;
    }
    arrTemp.push(arr[index]);
    count++;
  }

  return arrDataList;
};

const sanitizeExtractedData = (inputString, blacklist) => {
  // Cria uma expressão regular a partir da blacklist, escapando caracteres especiais
  const blacklistRegex = new RegExp(
    blacklist
      .map((word) => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
      .join("|"),
    "gi"
  );

  // Substitui as palavras da blacklist por uma string vazia
  return inputString.replace(blacklistRegex, "").trim();
};

module.exports = {
  scheduleTask,
  removeAllLetters,
  sanitizeExtractedData,
  convertToCamelCase,
  returnCardModule,
  domElementsListScraper,
  organizeElementDataDOM,
};
