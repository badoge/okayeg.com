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
