
const removeAllLetters = (string) => (string.replace(/[a-z A-Z]/g, ''));

const domElementsListScraper = ($, identifier) => {
    let parentElementArray = [], childElementsArray = [];

    $(identifier).find('ul > li > a').each((index, element) => {
        parentElementArray.push($(element));

        $(parentElementArray[index]).find('span:not(.Accessibility--visuallyHidden--2uGW3)').each((index, element) => {
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

module.exports = { removeAllLetters, domElementsListScraper, organizeElementDataDOM }