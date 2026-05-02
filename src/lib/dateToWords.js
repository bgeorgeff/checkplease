// Convert dates to plain spoken English.
// 2026-05-05 → "Tuesday, May fifth, twenty twenty-six"
// 2026-05-05 08:40 → "Tuesday, May fifth, twenty twenty-six at 8:40 in the morning"

const ORDINALS = {
  1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth",
  6: "sixth", 7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth",
  11: "eleventh", 12: "twelfth", 13: "thirteenth", 14: "fourteenth",
  15: "fifteenth", 16: "sixteenth", 17: "seventeenth", 18: "eighteenth",
  19: "nineteenth", 20: "twentieth", 21: "twenty-first", 22: "twenty-second",
  23: "twenty-third", 24: "twenty-fourth", 25: "twenty-fifth",
  26: "twenty-sixth", 27: "twenty-seventh", 28: "twenty-eighth",
  29: "twenty-ninth", 30: "thirtieth", 31: "thirty-first"
};

const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen"
];

const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function under100Words(n) {
  if (n < 20) return ONES[n];
  const ten = TENS[Math.floor(n / 10)];
  const one = n % 10;
  return one ? `${ten}-${ONES[one]}` : ten;
}

function yearToWords(year) {
  // Handle common year patterns naturally:
  // 2026 → "twenty twenty-six"
  // 2000 → "two thousand"
  // 2007 → "two thousand seven"
  // 1999 → "nineteen ninety-nine"
  if (year < 1000 || year > 9999) return year.toString();

  const high = Math.floor(year / 100);
  const low = year % 100;

  // 2000-2009 sound better as "two thousand X"
  if (high === 20 && low < 10) {
    return low === 0 ? "two thousand" : `two thousand ${ONES[low]}`;
  }

  // Default: "nineteen ninety-nine", "twenty twenty-six"
  if (low === 0) {
    return `${under100Words(high)} hundred`;
  }
  return `${under100Words(high)} ${under100Words(low)}`;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

function timeOfDay(hour) {
  // Used for "in the morning/afternoon/evening" — softer than AM/PM
  if (hour < 12) return "in the morning";
  if (hour < 17) return "in the afternoon";
  if (hour < 21) return "in the evening";
  return "at night";
}

/**
 * Convert a Date to spoken English.
 * @param {Date|string} date
 * @param {object} options
 * @param {boolean} options.includeTime - include time of day (default false)
 * @param {boolean} options.includeWeekday - include "Tuesday," prefix (default true)
 * @param {boolean} options.includeYear - include the year (default true)
 * @returns {string}
 */
export function dateToWords(date, options = {}) {
  const { includeTime = false, includeWeekday = true, includeYear = true } = options;

  if (typeof date === "string") date = new Date(date);
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";

  const weekday = WEEKDAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const dayOrdinal = ORDINALS[day] || day.toString();

  const parts = [];
  if (includeWeekday) parts.push(weekday + ",");
  parts.push(month);
  parts.push(includeYear ? dayOrdinal + "," : dayOrdinal);
  if (includeYear) parts.push(yearToWords(year));

  let result = parts.join(" ");

  if (includeTime) {
    const hour24 = date.getHours();
    const minute = date.getMinutes();
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const minuteStr = minute === 0
      ? ""
      : (minute < 10 ? `oh ${ONES[minute]}` : under100Words(minute));
    const timeStr = minuteStr
      ? `${ONES[hour12] || hour12} ${minuteStr}`
      : `${ONES[hour12] || hour12} o'clock`;
    result += ` at ${timeStr} ${timeOfDay(hour24)}`;
  }

  return result;
}

/**
 * Format a date for the visual modal — long human-readable form.
 * Uses native Intl.DateTimeFormat with full date style.
 * @param {Date|string} date
 * @param {boolean} includeTime
 */
export function dateToVisualString(date, includeTime = false) {
  if (typeof date === "string") date = new Date(date);
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";

  const dateStr = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);

  if (!includeTime) return dateStr;

  const timeStr = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(date);

  return `${dateStr} at ${timeStr}`;
}
