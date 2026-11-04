export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseDateInput(dateInput) {
  if (typeof dateInput === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [year, month, day] = dateInput.split("-").map((value) => Number(value));
    return new Date(year, month - 1, day);
  }
  return new Date(dateInput);
}

export function safeInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return fallback;
  }
  return parsed;
}

export function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function unique(values) {
  return [...new Set(values)];
}

export function toDateKey(dateInput) {
  const date = parseDateInput(dateInput);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(dateInput, days) {
  const date = parseDateInput(dateInput);
  date.setDate(date.getDate() + days);
  return date;
}

export function formatDate(dateInput, locale = "en-GB") {
  return parseDateInput(dateInput).toLocaleDateString(locale, {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });
}

export function formatDateTime(dateInput, locale = "en-GB") {
  return parseDateInput(dateInput).toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function formatEuro(amount, locale = "it-IT") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}
