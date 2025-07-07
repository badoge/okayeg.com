/**
 * @param {string | number} number
 */
export function addOrdinalSuffix(number) {
  if (typeof number !== "number" || isNaN(number)) {
    return number;
  }
  const suffixes = ["th", "st", "nd", "rd"];
  const lastTwoDigits = Math.abs(number % 100);
  const suffix = suffixes[(lastTwoDigits - 20) % 10] || suffixes[lastTwoDigits] || suffixes[0];
  return number + suffix;
} //addOrdinalSuffix

/**
 * @param {number} num
 */
export function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
} //roundToTwo

/**
 * @param {string} code
 */
export function getLanguage(code) {
  const lang = new Intl.DisplayNames(["en"], { type: "language" });
  return lang.of(code);
} //getLanguage

/**
 * @param {number} miliseconds
 */
export function relativeTime(miliseconds) {
  let finalRealtiveTime = "";
  const secondsToString = Intl.NumberFormat("en", {
    style: "unit",
    unit: "second",
    unitDisplay: "long",
  }).format;
  const minutesToString = Intl.NumberFormat("en", {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
  }).format;
  const hoursToString = Intl.NumberFormat("en", {
    style: "unit",
    unit: "hour",
    unitDisplay: "long",
  }).format;
  const daysToString = Intl.NumberFormat("en", {
    style: "unit",
    unit: "day",
    unitDisplay: "long",
  }).format;
  const monthsToString = Intl.NumberFormat("en", {
    style: "unit",
    unit: "month",
    unitDisplay: "long",
  }).format;
  const yearsToString = Intl.NumberFormat("en", {
    style: "unit",
    unit: "year",
    unitDisplay: "long",
  }).format;

  let units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };
  if (miliseconds >= units.year) {
    let years = Math.floor(miliseconds / units.year);
    finalRealtiveTime += `${yearsToString(years)} `;
    miliseconds -= years * units.year;
  }

  if (miliseconds >= units.month) {
    let months = Math.floor(miliseconds / units.month);
    finalRealtiveTime += `${monthsToString(months)} `;
    miliseconds -= months * units.month;
  }

  if (miliseconds >= units.day) {
    let days = Math.floor(miliseconds / units.day);
    finalRealtiveTime += `${daysToString(days)} `;
    miliseconds -= days * units.day;
  }

  if (miliseconds >= units.hour) {
    let hours = Math.floor(miliseconds / units.hour);
    finalRealtiveTime += `${hoursToString(hours)} `;
    miliseconds -= hours * units.hour;
  }

  if (miliseconds >= units.minute) {
    let minutes = Math.floor(miliseconds / units.minute);
    finalRealtiveTime += `${minutesToString(minutes)} `;
    miliseconds -= minutes * units.minute;
  }

  if (miliseconds >= units.second) {
    let seconds = Math.floor(miliseconds / units.second);
    finalRealtiveTime += `${secondsToString(seconds)} `;
    miliseconds -= seconds * units.second;
  }
  return finalRealtiveTime;
} //relativeTime

/**
 * @description replace <, >, &, ', ", `, \ and / with HTML entities. - from https://github.com/validatorjs/validator.js
 * @param {*} str
 * @returns {*}
 */
export function escapeString(str) {
  assertString(str);
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\//g, "&#x2F;")
    .replace(/\\/g, "&#x5C;")
    .replace(/`/g, "&#96;");
} //escapeString

function assertString(input) {
  let isString = typeof input === "string" || input instanceof String;
  if (!isString) {
    let invalidType = _typeof(input);
    if (input === null) invalidType = "null";
    else if (invalidType === "object") invalidType = input.constructor.name;
    throw new TypeError("Expected a string but received a ".concat(invalidType));
  }
} //assertString

export const months = {
  0: "1-Month",
  2: "2-Month",
  3: "3-Month",
  6: "6-Month",
  9: "9-Month",
  12: "1-Year",
  18: "1.5-Year",
  24: "2-Year",
  30: "2.5-Year",
  36: "3-Year",
  42: "3.5-Year",
  48: "4-Year",
  54: "4.5-Year",
  60: "5-Year",
  66: "5.5-Year",
  72: "6-Year",
  78: "6.5-Year",
  84: "7-Year",
  90: "7.5-Year",
  96: "8-Year",
  102: "8.5-Year",
  108: "9-Year",
  114: "9.5-Year",
  120: "10-Year",
  126: "10.5-Year",
  132: "11-Year",
  138: "11.5-Year",
  144: "12-Year",
  2000: "1-Month Tier 2",
  2002: "2-Month Tier 2",
  2003: "3-Month Tier 2",
  2006: "6-Month Tier 2",
  2009: "9-Month Tier 2",
  2012: "1-Year Tier 2",
  2018: "1.5-Year Tier 2",
  2024: "2-Year Tier 2",
  2030: "2.5-Year Tier 2",
  2036: "3-Year Tier 2",
  2042: "3.5-Year Tier 2",
  2048: "4-Year Tier 2",
  2054: "4.5-Year Tier 2",
  2060: "5-Year Tier 2",
  2066: "5.5-Year Tier 2",
  2072: "6-Year Tier 2",
  2078: "6.5-Year Tier 2",
  2084: "7-Year Tier 2",
  2090: "7.5-Year Tier 2",
  2096: "8-Year Tier 2",
  2102: "8.5-Year Tier 2",
  2108: "9-Year Tier 2",
  2114: "9.5-Year Tier 2",
  2120: "10-Year Tier 2",
  2126: "10.5-Year Tier 2",
  2132: "11-Year Tier 2",
  2138: "11.5-Year Tier 2",
  2144: "12-Year Tier 2",
  3000: "1-Month Tier 3",
  3002: "2-Month Tier 3",
  3003: "3-Month Tier 3",
  3006: "6-Month Tier 3",
  3009: "9-Month Tier 3",
  3012: "1-Year Tier 3",
  3018: "1.5-Year Tier 3",
  3024: "2-Year Tier 3",
  3030: "2.5-Year Tier 3",
  3036: "3-Year Tier 3",
  3042: "3.5-Year Tier 3",
  3048: "4-Year Tier 3",
  3054: "4.5-Year Tier 3",
  3060: "5-Year Tier 3",
  3066: "5.5-Year Tier 3",
  3072: "6-Year Tier 3",
  3078: "6.5-Year Tier 3",
  3084: "7-Year Tier 3",
  3090: "7.5-Year Tier 3",
  3096: "8-Year Tier 3",
  3102: "8.5-Year Tier 3",
  3108: "9-Year Tier 3",
  3114: "9.5-Year Tier 3",
  3120: "10-Year Tier 3",
  3126: "10.5-Year Tier 3",
  3132: "11-Year Tier 3",
  3138: "11.5-Year Tier 3",
  3144: "12-Year Tier 3",
};
