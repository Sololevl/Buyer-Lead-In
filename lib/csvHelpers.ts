// lib/csvHelpers.ts
export const CSV_HEADERS = [
  "fullName","email","phone","city","propertyType","bhk","purpose",
  "budgetMin","budgetMax","timeline","source","notes","tags","status"
];

// Frontend (CSV) -> Prisma enum key
export const timelineCsvToPrisma: Record<string, string> = {
  "0-3m": "ZeroTo3m",
  "3-6m": "ThreeTo6m",
  ">6m": "MoreThan6m",
  "Exploring": "Exploring"
};

export const timelinePrismaToCsv = Object.fromEntries(
  Object.entries(timelineCsvToPrisma).map(([k, v]) => [v, k])
);

// Prisma key -> CSV value
export const bhkPrismaToCsv: Record<string, string> = {
  Studio: "Studio",
  One: "1",
  Two: "2",
  Three: "3",
  Four: "4"
};

export const bhkCsvToPrisma = Object.fromEntries(
  Object.entries(bhkPrismaToCsv).map(([k, v]) => [v, k])
);

// helper to parse numbers safely
export function toNumberOrNull(val: unknown) {
  if (val === null || val === undefined || val === "") return null;
  const n = Number(String(val).replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
