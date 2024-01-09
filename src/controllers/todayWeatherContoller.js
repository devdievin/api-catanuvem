const axios = require("axios");
const cheerio = require("cheerio");
const { returnIcon } = require("../utils/manageIcons");
const {
  removeAllLetters,
  domElementsListScraper,
  organizeElementDataDOM,
  returnCardModule,
  sanitizeExtractedData,
} = require("../utils/tools");

const getWeatherToday = async (url, typeSearch) => {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const weather = {
      location: !typeSearch.byCity
        ? $(
            '[data-testid="CurrentConditionsContainer"] > section > div > div > h1'
          ).text()
        : typeSearch.cityName,
      temperature: $('[data-testid="CurrentConditionsContainer"]')
        .find(
          'span[data-testid="TemperatureValue"].CurrentConditions--tempValue--MHmYY'
        )
        .text(),
      condition: $('[data-testid="CurrentConditionsContainer"]')
        .find('[data-testid="wxPhrase"].CurrentConditions--phraseValue--mZC_p')
        .text(),
      dayAndNight: getDayAndNight($),
      icon: returnIcon(
        $('[data-testid="CurrentConditionsContainer"]')
          .find(
            '.CurrentConditions--secondary--32-kp svg[data-testid="Icon"] > title'
          )
          .text()
      ),
      precipitation: $('section[data-testid="DailyWeatherModule"]')
        .find("ul > li:first-child .Column--precip--3JCDO")
        .clone()
        .children()
        .remove()
        .end()
        .text(),
      feelsLike: $('[data-testid="TodaysDetailsModule"]')
        .find(
          '[data-testid="TemperatureValue"].TodayDetailsCard--feelsLikeTempValue--2icPt'
        )
        .text(),
      wind: getWeatherTodayListProperties($).vento,
      humidity: getWeatherTodayListProperties($).umidade,
      dewPoint: getWeatherTodayListProperties($).ponto_de_orvalho,
      pressure: getWeatherTodayListProperties($).pressao,
      uvIndex: getWeatherTodayListProperties($).indice_uv,
      visibility: getWeatherTodayListProperties($).visibilidade,
      moon: getWeatherTodayListProperties($).fase_da_lua,
      climateVariation: getMaxMinTemperatureData($),
      airQuality: getAirQualityData($),
      sun: getSunData($),
      todayForecast: getTodayForecast($),
    };

    return weather;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return error.message;
  }
};

const getDayAndNight = ($) => {
  const data = $('[data-testid="CurrentConditionsContainer"]')
    .find(".CurrentConditions--tempHiLoValue--3T1DG")
    .text();

  const tempValues = data.split("•");

  return {
    day: removeAllLetters(tempValues[0]).trim(),
    night: removeAllLetters(tempValues[1]).trim(),
  };
};

const getWeatherTodayListProperties = ($) => {
  // # PROPERTIES
  // {
  //     max_min_: '--/19°',
  //     vento: '13 km/h',
  //     umidade: '78%',
  //     ponto_de_orvalho: '19°',
  //     pressao: '1015.2 mb',
  //     indice_uv: '2 de 11',
  //     visibilidade: '9.66 km',
  //     fase_da_lua: 'Lua minguante'
  // }
  const blacklist = ["Wind Direction", "Arrow Up", "Arrow Down"];

  let weatherDetailsListProperties = {};

  $("div.WeatherDetailsListItem--WeatherDetailsListItem--1CnRC").each(
    (index, element) => {
      let label = $(element)
        .find("div.WeatherDetailsListItem--label--2ZacS")
        .text()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(" ", "_")
        .replaceAll(/[._\/]+/g, "_")
        .trim();

      let value = $(element)
        .find("div.WeatherDetailsListItem--wxData--kK35q")
        .text()
        .replace(/(\r\n|\n|\r)/gm, "")
        .trim();
      weatherDetailsListProperties[label] = sanitizeExtractedData(
        value,
        blacklist
      );
    }
  );

  return weatherDetailsListProperties;
};

const getMaxMinTemperatureData = ($) => {
  const data = getWeatherTodayListProperties($).max_min_;
  const result = data.split("/");
  return { max: result[0], min: result[1] };
};

const getAirQualityData = ($) => {
  let score = $('[data-testid="AirQualityModule"]')
    .find(".DonutChart--donutchart--1W28b > [data-testid='DonutChartValue']")
    .text();
  let quality = $('[data-testid="AirQualityCategory"]').text();
  let description = $('[data-testid="AirQualitySeverity"]').text();

  return { score, quality, description };
};

const getSunData = ($) => {
  let sunrise = $('[data-testid="SunriseValue"]')
    .find("p.TwcSunChart--dateValue--2WK2q")
    .text();
  let sunset = $('[data-testid="SunsetValue"]')
    .find("p.TwcSunChart--dateValue--2WK2q")
    .text();

  return { sunrise, sunset };
};

const getTodayForecast = ($, fields = 4) => {
  let elementsListScraperArray = domElementsListScraper(
    $,
    returnCardModule("today")
  );
  let arrayDataList = organizeElementDataDOM(elementsListScraperArray, fields);
  return convertArrayToForecastObjectToday(arrayDataList);
};

const convertArrayToForecastObjectToday = (arr) => {
  const obj = arr.map(([period, temperature, icon, rain]) => ({
    period,
    temperature,
    icon: returnIcon(icon),
    precipitation: removeAllLetters(rain),
  }));

  return obj;
};

module.exports = { getWeatherToday };
