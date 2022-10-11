const schedule = require('node-schedule');

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
}

const removeAllLetters = (string) => (string.replace(/[a-z A-Z]/g, ''));

const convertToCamelCase = (str) => {
    let new_word = str.split(" ");
    let result = new_word.map((word) => {
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
    });
    return result.join(" ");
}

const domElementsListScraper = ($, identifier) => {
    let parentElementsArray = [], childElementsArray = [];

    $(identifier).find('ul > li > a').each((index, element) => {
        parentElementsArray.push($(element));
        $(parentElementsArray[index]).children().each((index, element) => {
            childElementsArray.push($(element).text());
        });
    });

    return childElementsArray;
}

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
}

module.exports = { scheduleTask, removeAllLetters, convertToCamelCase, domElementsListScraper, organizeElementDataDOM }