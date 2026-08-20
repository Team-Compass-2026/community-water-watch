export type RiskLevel = "low" | "moderate" | "high" | "severe";

export type ReportCategory = "water" | "sanitation" | "flooding" | "supply";

export type ReportStatus = "pending" | "verified" | "contributing";

export interface DemoReport {
  id: string;
  category: ReportCategory;
  title: string;
  description: string;
  street: string;
  ward: string;
  township: string;
  ageLabel: string;
  daysAgo: number;
  verifications: number;
  verificationsNeeded: number;
  status: ReportStatus;
  severity: "low" | "medium" | "high";
  reporter: string;
  /** position on the ward map, 0-100 coordinate space */
  x: number;
  y: number;
  photo: string;
}

export const CATEGORY_META: Record<
  ReportCategory,
  { label: string; short: string; hint: string; emoji: string }
> = {
  water: {
    label: "Water quality",
    short: "Water",
    hint: "Colour, smell or taste of tap / well water",
    emoji: "💧",
  },
  sanitation: {
    label: "Sanitation",
    short: "Sanitation",
    hint: "Blocked drains, overflowing latrines, waste",
    emoji: "🚽",
  },
  flooding: {
    label: "Flooding",
    short: "Flooding",
    hint: "Standing water, flooded lanes after rain",
    emoji: "🌊",
  },
  supply: {
    label: "Water supply",
    short: "Supply",
    hint: "No water, broken pump or damaged pipe",
    emoji: "🚰",
  },
};

export const RISK_META: Record<
  RiskLevel,
  { label: string; text: string; bg: string; dot: string; hex: string }
> = {
  low: {
    label: "Low",
    text: "text-risk-low",
    bg: "bg-risk-low-soft",
    dot: "bg-risk-low",
    hex: "var(--risk-low)",
  },
  moderate: {
    label: "Moderate",
    text: "text-risk-moderate",
    bg: "bg-risk-moderate-soft",
    dot: "bg-risk-moderate",
    hex: "var(--risk-moderate)",
  },
  high: {
    label: "High",
    text: "text-risk-high",
    bg: "bg-risk-high-soft",
    dot: "bg-risk-high",
    hex: "var(--risk-high)",
  },
  severe: {
    label: "Severe",
    text: "text-risk-severe",
    bg: "bg-risk-severe-soft",
    dot: "bg-risk-severe",
    hex: "var(--risk-severe)",
  },
};

export const HOME_WARD = {
  ward: "Ward 12",
  township: "Hlaing Tharyar",
  city: "Yangon",
  residents: "18,400",
  waterPoints: 6,
};

export const CITIZEN = { name: "Thiri", handle: "Resident · Ward 12" };

/** Existing community reports (seeded demo data). */
export const SEED_REPORTS: DemoReport[] = [
  {
    id: "r-101",
    category: "water",
    title: "Brown water from street tap",
    description:
      "Tap water at the corner standpipe has been brownish since Monday. Smells slightly of earth.",
    street: "Bo Min Yaung St & Lane 4",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "6 hours ago",
    daysAgo: 0,
    verifications: 4,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "high",
    reporter: "Ko Zaw",
    x: 46,
    y: 41,
    photo: "water",
  },
  {
    id: "r-102",
    category: "sanitation",
    title: "Drain blocked beside market",
    description:
      "Main drain along the market wall is fully blocked with waste. Water is not moving at all.",
    street: "Market Road",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "1 day ago",
    daysAgo: 1,
    verifications: 6,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "high",
    reporter: "Daw Hla",
    x: 57,
    y: 33,
    photo: "drain",
  },
  {
    id: "r-103",
    category: "flooding",
    title: "Standing water in Lane 6",
    description: "Knee-deep water still there three days after the rain. Children play in it.",
    street: "Lane 6",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "2 days ago",
    daysAgo: 2,
    verifications: 5,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "medium",
    reporter: "U Myint",
    x: 38,
    y: 55,
    photo: "flood",
  },
  {
    id: "r-104",
    category: "water",
    title: "Tap water smells of sewage",
    description: "Water from the shared tap has a bad smell in the morning. Two houses affected.",
    street: "Lane 3",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "2 days ago",
    daysAgo: 2,
    verifications: 3,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "high",
    reporter: "Ma Nwe",
    x: 51,
    y: 47,
    photo: "water",
  },
  {
    id: "r-105",
    category: "supply",
    title: "Hand pump not working",
    description: "Community hand pump near the monastery stopped working after the flooding.",
    street: "Monastery Lane",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "3 days ago",
    daysAgo: 3,
    verifications: 2,
    verificationsNeeded: 3,
    status: "pending",
    severity: "medium",
    reporter: "Ko Aung",
    x: 66,
    y: 58,
    photo: "pump",
  },
  {
    id: "r-106",
    category: "sanitation",
    title: "Latrine overflow behind school",
    description: "Overflow reaching the footpath children use to get to school.",
    street: "School Road",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "4 days ago",
    daysAgo: 4,
    verifications: 4,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "high",
    reporter: "Daw Khin",
    x: 61,
    y: 45,
    photo: "drain",
  },
  {
    id: "r-107",
    category: "flooding",
    title: "Lane floods every rainfall",
    description: "Even short rain leaves the whole lane under water for a day.",
    street: "Lane 9",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "5 days ago",
    daysAgo: 5,
    verifications: 3,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "medium",
    reporter: "Ko Naing",
    x: 30,
    y: 44,
    photo: "flood",
  },
  {
    id: "r-108",
    category: "water",
    title: "Cloudy water at shared tap",
    description: "Water looks cloudy after it is left standing for ten minutes.",
    street: "Bo Min Yaung St",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "6 days ago",
    daysAgo: 6,
    verifications: 2,
    verificationsNeeded: 3,
    status: "pending",
    severity: "medium",
    reporter: "Ma Thida",
    x: 44,
    y: 36,
    photo: "water",
  },
  {
    id: "r-109",
    category: "sanitation",
    title: "Waste pile blocking canal inlet",
    description: "Household waste dumped at the canal inlet, water backing up into the lane.",
    street: "Canal Side",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "7 days ago",
    daysAgo: 7,
    verifications: 5,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "medium",
    reporter: "U Tun",
    x: 72,
    y: 30,
    photo: "drain",
  },
  {
    id: "r-110",
    category: "flooding",
    title: "Water entering ground floor homes",
    description: "Four houses on the low side of the lane had water inside after Tuesday's rain.",
    street: "Lane 6",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "8 days ago",
    daysAgo: 8,
    verifications: 4,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "high",
    reporter: "Ma Su",
    x: 35,
    y: 62,
    photo: "flood",
  },
  {
    id: "r-111",
    category: "supply",
    title: "Pipe leaking into open drain",
    description: "Supply pipe leaks right where the drain runs. Water may be drawn back in.",
    street: "Bo Min Yaung St",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "9 days ago",
    daysAgo: 9,
    verifications: 3,
    verificationsNeeded: 3,
    status: "contributing",
    severity: "high",
    reporter: "Ko Zeya",
    x: 49,
    y: 30,
    photo: "pump",
  },
  {
    id: "r-112",
    category: "water",
    title: "Bad taste from well water",
    description: "Shallow well water tastes salty and metallic since the flooding.",
    street: "Lane 11",
    ward: "Ward 12",
    township: "Hlaing Tharyar",
    ageLabel: "10 days ago",
    daysAgo: 10,
    verifications: 2,
    verificationsNeeded: 3,
    status: "pending",
    severity: "medium",
    reporter: "Daw Yee",
    x: 25,
    y: 33,
    photo: "water",
  },
];

/** The report the user files in the demo. */
export const USER_REPORT: DemoReport = {
  id: "r-200",
  category: "water",
  title: "Brown water from the street tap",
  description:
    "Water from the street tap outside my house has been brown for three days. It leaves a film in the bucket.",
  street: "Bo Min Yaung St, Lane 5",
  ward: "Ward 12",
  township: "Hlaing Tharyar",
  ageLabel: "Just now",
  daysAgo: 0,
  verifications: 0,
  verificationsNeeded: 3,
  status: "pending",
  severity: "high",
  reporter: "You (Thiri)",
  x: 48,
  y: 44,
  photo: "water",
};

/** 14-day ward risk history (score 0-100). Last point is "today". */
export const WARD_RISK_HISTORY = [
  { day: "Aug 7", score: 28, reports: 2 },
  { day: "Aug 8", score: 30, reports: 3 },
  { day: "Aug 9", score: 33, reports: 2 },
  { day: "Aug 10", score: 31, reports: 1 },
  { day: "Aug 11", score: 38, reports: 4 },
  { day: "Aug 12", score: 42, reports: 5 },
  { day: "Aug 13", score: 44, reports: 4 },
  { day: "Aug 14", score: 47, reports: 6 },
  { day: "Aug 15", score: 51, reports: 5 },
  { day: "Aug 16", score: 55, reports: 7 },
  { day: "Aug 17", score: 58, reports: 6 },
  { day: "Aug 18", score: 60, reports: 8 },
  { day: "Aug 19", score: 63, reports: 7 },
  { day: "Aug 20", score: 66, reports: 9 },
];

export const RAINFALL_30D = [
  { day: "W1", mm: 42 },
  { day: "W2", mm: 61 },
  { day: "W3", mm: 118 },
  { day: "W4", mm: 154 },
];

export interface Township {
  id: string;
  name: string;
  risk: RiskLevel;
  score: number;
  reports7d: number;
  change: number;
  verifiedPct: number;
  /** svg polygon points in a 0-100 space */
  points: string;
  labelX: number;
  labelY: number;
}

export const TOWNSHIPS: Township[] = [
  {
    id: "hlaing-tharyar",
    name: "Hlaing Tharyar",
    risk: "high",
    score: 66,
    reports7d: 41,
    change: 38,
    verifiedPct: 82,
    points: "6,30 30,22 38,44 30,66 10,62",
    labelX: 21,
    labelY: 44,
  },
  {
    id: "shwepyithar",
    name: "Shwepyithar",
    risk: "moderate",
    score: 52,
    reports7d: 24,
    change: 12,
    verifiedPct: 74,
    points: "18,8 44,6 40,22 30,22 6,30",
    labelX: 27,
    labelY: 17,
  },
  {
    id: "insein",
    name: "Insein",
    risk: "moderate",
    score: 47,
    reports7d: 19,
    change: 6,
    verifiedPct: 71,
    points: "44,6 62,12 58,30 40,22",
    labelX: 51,
    labelY: 18,
  },
  {
    id: "dagon-seikkan",
    name: "Dagon Seikkan",
    risk: "high",
    score: 58,
    reports7d: 27,
    change: 15,
    verifiedPct: 68,
    points: "76,20 96,26 92,50 74,44",
    labelX: 85,
    labelY: 35,
  },
  {
    id: "north-okkalapa",
    name: "North Okkalapa",
    risk: "moderate",
    score: 44,
    reports7d: 16,
    change: -3,
    verifiedPct: 77,
    points: "62,12 76,20 74,44 58,30",
    labelX: 68,
    labelY: 27,
  },
  {
    id: "kyimyindaing",
    name: "Kyimyindaing",
    risk: "low",
    score: 26,
    reports7d: 7,
    change: -8,
    verifiedPct: 80,
    points: "38,44 58,30 56,50 40,58",
    labelX: 48,
    labelY: 45,
  },
  {
    id: "thaketa",
    name: "Thaketa",
    risk: "moderate",
    score: 41,
    reports7d: 14,
    change: 4,
    verifiedPct: 66,
    points: "74,44 92,50 86,72 68,64",
    labelX: 80,
    labelY: 58,
  },
  {
    id: "dawbon",
    name: "Dawbon",
    risk: "low",
    score: 22,
    reports7d: 5,
    change: -2,
    verifiedPct: 73,
    points: "56,50 74,44 68,64 52,62",
    labelX: 62,
    labelY: 55,
  },
  {
    id: "seikkan",
    name: "Seikkan",
    risk: "low",
    score: 19,
    reports7d: 4,
    change: 0,
    verifiedPct: 70,
    points: "30,66 40,58 52,62 46,80 26,76",
    labelX: 38,
    labelY: 70,
  },
];

export const CITY_TREND_30D = [
  { day: "Jul 22", city: 31, ward: 26 },
  { day: "Jul 26", city: 33, ward: 29 },
  { day: "Jul 30", city: 34, ward: 31 },
  { day: "Aug 3", city: 36, ward: 33 },
  { day: "Aug 7", city: 37, ward: 28 },
  { day: "Aug 11", city: 39, ward: 38 },
  { day: "Aug 15", city: 41, ward: 51 },
  { day: "Aug 18", city: 42, ward: 60 },
  { day: "Aug 20", city: 43, ward: 66 },
];

export const CATEGORY_BREAKDOWN = [
  { name: "Water quality", value: 38 },
  { name: "Sanitation", value: 27 },
  { name: "Flooding", value: 24 },
  { name: "Supply", value: 11 },
];

export const RISK_FACTORS = [
  {
    label: "Report density",
    detail: "15 reports within a 400 m radius in 8 days",
    weight: 32,
    value: 88,
  },
  {
    label: "Verification rate",
    detail: "82% of reports confirmed by a second resident",
    weight: 24,
    value: 82,
  },
  {
    label: "Category mix",
    detail: "Water quality + sanitation reported at the same locations",
    weight: 20,
    value: 76,
  },
  {
    label: "Rainfall & drainage",
    detail: "154 mm this week, drainage blocked at 3 known points",
    weight: 14,
    value: 71,
  },
  {
    label: "Repeat locations",
    detail: "Bo Min Yaung St standpipe reported 6 times in 10 days",
    weight: 10,
    value: 64,
  },
];

export function scoreToRisk(score: number): RiskLevel {
  if (score >= 75) return "severe";
  if (score >= 60) return "high";
  if (score >= 35) return "moderate";
  return "low";
}
