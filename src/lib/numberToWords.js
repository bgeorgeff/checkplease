// Convert numbers to plain English words.
// "$5,743.00" → "Five thousand seven hundred forty-three dollars"
// "$5,743.50" → "Five thousand seven hundred forty-three dollars and fifty cents"
// Handles negative, decimal, currency, and bare numbers.

const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen"
];

const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty",
  "sixty", "seventy", "eighty", "ninety"
];

const SCALES = ["", "thousand", "million", "billion", "trillion"];

function intToWords(n) {
  if (n === 0) return "zero";
  if (n < 0) return "negative " + intToWords(-n);

  const groups = [];
  while (n > 0) {
    groups.push(n % 1000);
    n = Math.floor(n / 1000);
  }

  const parts = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];
    if (group === 0) continue;
    const groupWords = under1000ToWords(group);
    const scale = SCALES[i];
    parts.push(scale ? `${groupWords} ${scale}` : groupWords);
  }

  return parts.join(" ");
}

function under1000ToWords(n) {
  const parts = [];
  if (n >= 100) {
    parts.push(ONES[Math.floor(n / 100)] + " hundred");
    n = n % 100;
  }
  if (n >= 20) {
    const ten = TENS[Math.floor(n / 10)];
    const one = n % 10;
    parts.push(one ? `${ten}-${ONES[one]}` : ten);
  } else if (n > 0) {
    parts.push(ONES[n]);
  }
  return parts.join(" ");
}

function capitalizeFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Convert a numeric amount to plain English.
 * @param {number|string} amount - the amount (e.g. 5743.50 or "5,743.50")
 * @param {object} options
 * @param {string} options.currency - "USD" (default), "EUR", "GBP"
 * @param {boolean} options.capitalize - capitalize first letter (default true)
 * @returns {string}
 */
export function amountToWords(amount, options = {}) {
  const { currency = "USD", capitalize = true } = options;

  // Normalize input
  if (typeof amount === "string") {
    amount = parseFloat(amount.replace(/[^0-9.\-]/g, ""));
  }
  if (isNaN(amount)) return "";

  const negative = amount < 0;
  amount = Math.abs(amount);

  const wholePart = Math.floor(amount);
  const cents = Math.round((amount - wholePart) * 100);

  const currencyNames = {
    USD: { major: "dollar", minor: "cent" },
    EUR: { major: "euro", minor: "cent" },
    GBP: { major: "pound", minor: "penny" }
  };
  const names = currencyNames[currency] || currencyNames.USD;

  const wholeWords = intToWords(wholePart);
  const wholeStr = `${wholeWords} ${names.major}${wholePart === 1 ? "" : "s"}`;

  let result;
  if (cents === 0) {
    result = wholeStr;
  } else {
    const centsWords = intToWords(cents);
    result = `${wholeStr} and ${centsWords} ${names.minor}${cents === 1 ? "" : "s"}`;
  }

  if (negative) result = "negative " + result;
  return capitalize ? capitalizeFirst(result) : result;
}

/**
 * Convert a bare number to words (no currency).
 * @param {number} n
 * @returns {string}
 */
export function numberToWords(n) {
  if (typeof n === "string") n = parseFloat(n.replace(/[^0-9.\-]/g, ""));
  if (isNaN(n)) return "";

  const negative = n < 0;
  n = Math.abs(n);

  const whole = Math.floor(n);
  const fraction = n - whole;

  let result = intToWords(whole);

  if (fraction > 0) {
    // Render decimal as "point five seven" style
    const decimalStr = n.toString().split(".")[1] || "";
    const digitWords = decimalStr.split("").map(d => ONES[parseInt(d, 10)]).join(" ");
    result += " point " + digitWords;
  }

  if (negative) result = "negative " + result;
  return capitalizeFirst(result);
}
