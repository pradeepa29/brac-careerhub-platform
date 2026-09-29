export type ToolType = "SOP" | "CV" | "LOR" | "Essay";
export const tools: { id: ToolType; name: string; description: string }[] = [
  {
    id: "SOP",
    name: "Statement of Purpose",
    description: "Connect your academic story with your next chapter.",
  },
  {
    id: "CV",
    name: "Academic CV",
    description: "Bring your education, projects and experience together.",
  },
  {
    id: "LOR",
    name: "Letter of Recommendation",
    description: "Prepare a thoughtful evidence brief for your referee.",
  },
  {
    id: "Essay",
    name: "Scholarship Essay",
    description: "Tell your story of leadership, impact and ambition.",
  },
];
export type Grades = { subject: string; grade: string }[];
export type Qualification = {
  type: string;
  institution: string;
  board: string;
  year: string;
  result: string;
  scale: string;
  grades: Grades;
};
export type Profile = {
  name: string;
  email: string;
  nationality: string;
  residence: string;
  institution: string;
  currentSubject: string;
  year: string;
  graduation: string;
  level: string;
  fields: string[];
  countries: string[];
  intake: string;
  budget: string;
  scholarship: boolean;
  secondary: Qualification;
  higher: Qualification;
  degree: string;
  degreeLevel: string;
  degreeStatus: string;
  gpa: string;
  scale: string;
  englishStatus: string;
  englishTest: string;
  englishDate: string;
  englishOverall: string;
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
  entranceTests: Record<"GRE" | "GMAT", { status: string; score: string; date: string }>;
};
export const initialProfile: Profile = {
  name: "Ayesha Rahman",
  email: "ayesha.rahman@example.com",
  nationality: "Bangladeshi",
  residence: "Bangladesh",
  institution: "BRAC University",
  currentSubject: "Business Administration",
  year: "Final Year",
  graduation: "2027",
  level: "Master’s",
  fields: ["Business & Management", "Data & Computing"],
  countries: ["United Kingdom", "Australia"],
  intake: "September 2027",
  budget: "5500000",
  scholarship: false,
  secondary: {
    type: "SSC",
    institution: "Dhaka Residential School",
    board: "Dhaka",
    year: "2020",
    result: "5.00",
    scale: "5",
    grades: [],
  },
  higher: {
    type: "HSC",
    institution: "Dhaka City College",
    board: "Dhaka",
    year: "2022",
    result: "4.80",
    scale: "5",
    grades: [],
  },
  degree: "Bachelor of Business Administration",
  degreeLevel: "Bachelor’s degree",
  degreeStatus: "In progress",
  gpa: "3.40",
  scale: "4",
  englishStatus: "Completed",
  englishTest: "IELTS",
  englishDate: "2026-06-12",
  englishOverall: "6.5",
  listening: "7.0",
  reading: "6.5",
  writing: "6.0",
  speaking: "6.5",
  entranceTests: {
    GRE: { status: "Not taken", score: "", date: "" },
    GMAT: { status: "Not taken", score: "", date: "" },
  },
};
export type Scholarship = {
  name: string;
  funding: string;
  description: string;
  deadline: string;
};
export type Program = {
  id: string;
  name: string;
  university: string;
  country: string;
  city: string;
  level: string;
  field: string;
  years: number;
  credits: string;
  tuition: string;
  annualBdt: number;
  living: string;
  fee: string;
  deadline: string;
  intake: string;
  mode: string;
  gpa: number;
  ielts: number;
  band: number;
  description: string;
  prerequisites: string;
  scholarships: Scholarship[];
  required: string[];
  documentCounts?: Partial<Record<ToolType, number>>;
  entrance?: { test: "GRE" | "GMAT"; minimum: number };
  englishAlternatives?: { test: "TOEFL"; minimum: number }[];
};
const additionalProgramCopy: Record<string, { description: string; prerequisites: string }> = {
  "bristol-fintech": {
    description: "An illustrative program focused on the meeting point of financial services, data and digital products. Compare its course structure with your interest in analytics, regulation and technology-led business change.",
    prerequisites: "Quantitative preparation may be expected. Confirm the accepted degree subjects and mathematics requirements with the university.",
  },
  "queensland-analytics": {
    description: "Explore how organizations use data to understand customers, operations and strategy. This mock program combines analytical methods with business decisions and applied projects.",
    prerequisites: "Check accepted prior degrees and any statistics or mathematics prerequisites for your chosen entry route.",
  },
  "southampton-cyber": {
    description: "A technical route into security systems, risk and resilient computing. It is included as an adjacent option for students considering a move toward technology.",
    prerequisites: "A substantial computing background may be required; confirm subject eligibility before treating this as an application option.",
  },
  "rmit-information": {
    description: "A broad information technology pathway covering software, systems and practical problem solving. Explore whether its entry route supports your previous academic discipline.",
    prerequisites: "Entry pathways can differ by prior qualification. Check any required programming or mathematics background.",
  },
  "lancaster-supply": {
    description: "An illustrative management route focused on sourcing, operations and the movement of goods and services. It offers a different application of business analysis from finance or marketing.",
    prerequisites: "Review accepted degree backgrounds and any experience requirements in the current university guidance.",
  },
};
export const programs: Program[] = [
  [
    "glasgow-analytics",
    "MSc Business Analytics",
    "University of Glasgow",
    "United Kingdom",
    "Glasgow",
    "Master’s",
    "Business & Management",
    1,
    "180 UK credits",
    "£31,860 / year",
    4800000,
    3.0,
    6.5,
  ],
  [
    "adelaide-data",
    "Master of Data Science",
    "University of Adelaide",
    "Australia",
    "Adelaide",
    "Master’s",
    "Data & Computing",
    2,
    "48 units",
    "A$52,300 / year",
    4300000,
    3.0,
    6.5,
  ],
  [
    "glasgow-management",
    "MSc International Management",
    "University of Glasgow",
    "United Kingdom",
    "Glasgow",
    "Master’s",
    "Business & Management",
    1,
    "180 UK credits",
    "£29,000 / year",
    4350000,
    3.0,
    6.5,
  ],
  [
    "toronto-cs",
    "Honours BSc Computer Science",
    "University of Toronto",
    "Canada",
    "Toronto",
    "Bachelor’s",
    "Data & Computing",
    4,
    "20.0 credits",
    "C$61,720 / year",
    5500000,
    4.5,
    6.5,
  ],
  [
    "ottawa-digital",
    "MSc Digital Transformation",
    "University of Ottawa",
    "Canada",
    "Ottawa",
    "Master’s",
    "Business & Management",
    2,
    "45 credits",
    "C$35,000 / year",
    3100000,
    3.2,
    6.5,
  ],
  [
    "twente-it",
    "MSc Business Information Technology",
    "University of Twente",
    "Netherlands",
    "Enschede",
    "Master’s",
    "Data & Computing",
    2,
    "120 ECTS",
    "€18,900 / year",
    2800000,
    3.0,
    6.5,
  ],
  [
    "malaya-is",
    "Master of Information Systems",
    "University of Malaya",
    "Malaysia",
    "Kuala Lumpur",
    "Master’s",
    "Data & Computing",
    2,
    "42 credits",
    "RM21,000 / year",
    620000,
    3.0,
    6.0,
  ],
  [
    "debrecen-cs",
    "BSc Computer Science",
    "University of Debrecen",
    "Hungary",
    "Debrecen",
    "Bachelor’s",
    "Data & Computing",
    3,
    "180 ECTS",
    "US$7,500 / year",
    920000,
    4.0,
    6.0,
  ],
  [
    "melbourne-business",
    "Bachelor of Commerce",
    "University of Melbourne",
    "Australia",
    "Melbourne",
    "Bachelor’s",
    "Business & Management",
    3,
    "300 credit points",
    "A$49,000 / year",
    4050000,
    4.5,
    6.5,
  ],
  [
    "leeds-engineering",
    "MSc Advanced Mechanical Engineering",
    "University of Leeds",
    "United Kingdom",
    "Leeds",
    "Master’s",
    "Engineering",
    1,
    "180 UK credits",
    "£32,000 / year",
    4800000,
    3.2,
    6.5,
  ],
  [
    "monash-design",
    "Master of Design",
    "Monash University",
    "Australia",
    "Melbourne",
    "Master’s",
    "Arts & Design",
    2,
    "96 credit points",
    "A$44,000 / year",
    3630000,
    3.0,
    6.5,
  ],
  [
    "edinburgh-ai",
    "MSc Artificial Intelligence",
    "University of Edinburgh",
    "United Kingdom",
    "Edinburgh",
    "Master’s",
    "Data & Computing",
    1,
    "180 UK credits",
    "£43,300 / year",
    6500000,
    3.6,
    7.0,
  ],
  [
    "manchester-public",
    "Master of Public Health",
    "University of Manchester",
    "United Kingdom",
    "Manchester",
    "Master’s",
    "Health & Sciences",
    1,
    "180 UK credits",
    "£28,000 / year",
    4200000,
    3.0,
    6.5,
  ],
  [
    "twente-research",
    "PhD in Computer Science",
    "University of Twente",
    "Netherlands",
    "Enschede",
    "PhD",
    "Data & Computing",
    4,
    "Research degree",
    "Funded research position",
    0,
    3.5,
    7.0,
  ],
  [
    "bristol-fintech",
    "MSc Financial Technology",
    "University of Bristol",
    "United Kingdom",
    "Bristol",
    "Master’s",
    "Business & Management",
    1,
    "180 UK credits",
    "£34,800 / year",
    4900000,
    3.2,
    6.5,
  ],
  [
    "queensland-analytics",
    "Master of Business Analytics",
    "University of Queensland",
    "Australia",
    "Brisbane",
    "Master’s",
    "Business & Management",
    2,
    "32 units",
    "A$48,160 / year",
    4300000,
    3.0,
    6.5,
  ],
  [
    "southampton-cyber",
    "MSc Cyber Security",
    "University of Southampton",
    "United Kingdom",
    "Southampton",
    "Master’s",
    "Data & Computing",
    1,
    "180 UK credits",
    "£33,500 / year",
    4800000,
    3.2,
    6.5,
  ],
  [
    "rmit-information",
    "Master of Information Technology",
    "RMIT University",
    "Australia",
    "Melbourne",
    "Master’s",
    "Data & Computing",
    2,
    "192 credit points",
    "A$47,040 / year",
    4200000,
    3.0,
    6.5,
  ],
  [
    "lancaster-supply",
    "MSc Supply Chain Management",
    "Lancaster University",
    "United Kingdom",
    "Lancaster",
    "Master’s",
    "Business & Management",
    1,
    "180 UK credits",
    "£27,500 / year",
    3800000,
    3.0,
    6.5,
  ],
].map((row, index) => {
  const [
    id,
    name,
    university,
    country,
    city,
    level,
    field,
    years,
    credits,
    tuition,
    annualBdt,
    gpa,
    ielts,
  ] = row as [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    number,
    string,
    string,
    number,
    number,
    number,
  ];
  const awards: Scholarship[] =
    index % 3 === 0
      ? []
      : [
          {
            name: "International Merit Award",
            funding: "Up to 20% of tuition",
            description:
              "An illustrative merit award for international applicants with strong academic results. A separate supporting statement may be required.",
            deadline: "2027-03-01",
          },
        ];
  if (index % 3 === 2)
    awards.push({
      name: "Global Impact Scholarship",
      funding: "Partial tuition support",
      description:
        "For students demonstrating community contribution and leadership. Selection considers the applicant’s personal statement and supporting evidence.",
      deadline: "2027-02-15",
    });
  return {
    id,
    name,
    university,
    country,
    city,
    level,
    field,
    years,
    credits,
    tuition,
    annualBdt,
    gpa,
    ielts,
    living: "Approx. ৳12–18 lakh / year",
    fee: "See university application guidance",
    deadline: index % 2 ? "2027-04-30" : "2027-01-15",
    intake: index === 7 ? "January 2028" : "September 2027",
    mode: index === 6 ? "Hybrid" : "On campus",
    band: 6,
    description: additionalProgramCopy[id]?.description || `Explore ${field.toLowerCase()} through a combination of academic study, practical projects and independent work. ${name} at ${university} offers a focused environment to develop your knowledge and prepare for your next professional or research chapter.`,
    prerequisites: additionalProgramCopy[id]?.prerequisites || (
      field === "Data & Computing" || field === "Engineering"
        ? "Relevant mathematics or technical background. Subject prerequisites require individual review."
        : field === "Arts & Design"
          ? "A portfolio and relevant design experience may be required."
          : "A relevant academic background and supporting personal statement. Subject requirements need individual review."),
    scholarships: awards,
    required: [
      "SOP",
      "CV",
      ...(id === "toronto-cs" ? [] : ["LOR"]),
      "Academic transcript",
      ...(id === "twente-research" || id === "malaya-is"
        ? []
        : ["English test evidence"]),
      ...(awards.length ? ["Essay"] : []),
    ],
    documentCounts:
      id === "glasgow-management"
        ? { SOP: 2 }
        : id === "twente-research"
          ? { LOR: 2 }
          : undefined,
    entrance:
      id === "twente-research"
        ? { test: "GRE", minimum: 310 }
        : id === "glasgow-management"
          ? { test: "GMAT", minimum: 600 }
          : undefined,
    englishAlternatives:
      id === "glasgow-analytics" || id === "adelaide-data"
        ? [{ test: "TOEFL", minimum: 90 }]
        : undefined,
  };
});
export function universityScholarships(program: Program) {
  const unique = new Map<string, Scholarship & { programNames: string[]; forThisProgram: boolean }>();
  for (const option of programs.filter((candidate) => candidate.university === program.university)) {
    for (const scholarship of option.scholarships) {
      const key = `${scholarship.name}|${scholarship.funding}|${scholarship.deadline}`;
      const existing = unique.get(key);
      if (existing) {
        if (!existing.programNames.includes(option.name)) existing.programNames.push(option.name);
        if (option.id === program.id) existing.forThisProgram = true;
      } else {
        unique.set(key, {
          ...scholarship,
          programNames: [option.name],
          forThisProgram: option.id === program.id,
        });
      }
    }
  }
  return [...unique.values()].sort((a, b) => Number(b.forThisProgram) - Number(a.forThisProgram));
}
export const fields = [...new Set(programs.map((p) => p.field))];
export const countries = [...new Set(programs.map((p) => p.country))];
export const levels = ["Bachelor’s", "Master’s", "PhD"];
export const statuses = [
  "Preparing",
  "Submitted",
  "Interview",
  "Conditional offer",
  "Offer received",
  "Visa preparation",
];
export type Filters = {
  search: string;
  level: string;
  fields: string[];
  countries: string[];
  intake: string;
  budget: string;
  scholarship: boolean;
  academicOnly: boolean;
  gpa: string;
  scale: string;
  qualification: string;
  test: string;
  english: string;
  band: string;
  duration: string;
  mode: string;
  deadline: string;
};
export function profileFilters(p: Profile): Filters {
  return {
    search: "",
    level: p.level,
    fields: [...p.fields],
    countries: [...p.countries],
    intake: p.intake,
    budget: p.budget,
    scholarship: p.scholarship,
    academicOnly: true,
    gpa: p.level === "Bachelor’s" ? p.higher.result : p.gpa,
    scale: p.level === "Bachelor’s" ? p.higher.scale : p.scale,
    qualification: p.level === "Bachelor’s" ? p.higher.type : p.degreeLevel,
    test: p.englishStatus === "Completed" ? p.englishTest : "Not taken",
    english: p.englishOverall,
    band:
      p.englishStatus === "Completed" &&
      p.englishTest === "IELTS" &&
      [p.listening, p.reading, p.writing, p.speaking].every((x) => x !== "")
        ? String(
            Math.min(
              ...[p.listening, p.reading, p.writing, p.speaking].map(Number),
            ),
          )
        : "",
    duration: "",
    mode: "",
    deadline: "",
  };
}
export function updateFiltersFromProfile(
  current: Filters,
  previousProfile: Profile,
  nextProfile: Profile,
): Filters {
  const previous = profileFilters(previousProfile);
  const next = profileFilters(nextProfile);
  const updated = { ...current };
  for (const key of Object.keys(current) as (keyof Filters)[]) {
    if (JSON.stringify(current[key]) === JSON.stringify(previous[key])) {
      // The field still follows the profile default. Keep explicit catalog edits.
      Object.assign(updated, { [key]: next[key] });
    }
  }
  return updated;
}
export const emptyFilters: Filters = {
  search: "",
  level: "",
  fields: [],
  countries: [],
  intake: "",
  budget: "",
  scholarship: false,
  academicOnly: false,
  gpa: "",
  scale: "",
  qualification: "",
  test: "Not taken",
  english: "",
  band: "",
  duration: "",
  mode: "",
  deadline: "",
};
export function requirementFit(
  p: Program,
  f: Filters,
): "gap" | "unknown" | "meets" {
  const qualification =
    p.level === "Bachelor’s"
      ? "HSC"
      : p.level === "Master’s"
        ? "Bachelor’s degree"
        : "Master’s degree";
  const scale = p.level === "Bachelor’s" ? 5 : 4;
  const comparable =
    f.qualification === qualification &&
    Number(f.scale) === scale &&
    f.gpa !== "";
  const ieltsKnown = f.test === "IELTS" && f.english !== "";
  const alternative = p.englishAlternatives?.find((rule) => rule.test === f.test);
  const alternativeKnown = Boolean(alternative && f.english !== "");
  const englishRequired = p.required.includes("English test evidence");
  if (
    (comparable && Number(f.gpa) < p.gpa) ||
    (englishRequired && ieltsKnown && Number(f.english) < p.ielts) ||
    (englishRequired && ieltsKnown && f.band !== "" && Number(f.band) < p.band) ||
    (englishRequired && alternativeKnown && Number(f.english) < alternative!.minimum)
  )
    return "gap";
  return comparable &&
    (!englishRequired ||
      (ieltsKnown && f.band !== "" && Number.isFinite(Number(f.band))) ||
      alternativeKnown)
    ? "meets"
    : "unknown";
}
export function filterPrograms(list: Program[], f: Filters): Program[] {
  const query = f.search.trim().toLowerCase();
  return list.filter(
    (p) =>
      (!query || `${p.name} ${p.university}`.toLowerCase().includes(query)) &&
      (!f.level || p.level === f.level) &&
      (!f.fields.length || f.fields.includes(p.field)) &&
      (!f.countries.length || f.countries.includes(p.country)) &&
      (!f.intake || p.intake === f.intake) &&
      (!f.budget || p.annualBdt <= Number(f.budget)) &&
      (!f.scholarship || p.scholarships.length > 0) &&
      (!f.duration || p.years <= Number(f.duration)) &&
      (!f.mode || p.mode === f.mode) &&
      (!f.deadline || p.deadline >= f.deadline) &&
      (!f.academicOnly || requirementFit(p, f) !== "gap"),
  );
}
export type MatchAnswers = Pick<Filters,
  "level" | "fields" | "countries" | "intake" | "budget" |
  "qualification" | "gpa" | "scale" | "test" | "english" | "band"
> & { priority: "Balanced" | "Lower tuition" | "Scholarships" | "Academic fit" };

export function rankProgramMatches(answers: MatchAnswers, list: Program[] = programs) {
  const academicFilters: Filters = { ...emptyFilters, ...answers };
  return list
    .filter((program) => !answers.level || program.level === answers.level)
    .filter((program) => !answers.fields.length || answers.fields.includes(program.field))
    .map((program) => {
      const fit = requirementFit(program, academicFilters);
      const withinBudget = !answers.budget || program.annualBdt <= Number(answers.budget);
      const preferredCountry = !answers.countries.length || answers.countries.includes(program.country);
      const preferredIntake = !answers.intake || program.intake === answers.intake;
      let score = 0;
      if (preferredCountry) score += 20;
      if (preferredIntake) score += 12;
      if (withinBudget) score += answers.priority === "Lower tuition" ? 28 : 16;
      if (fit === "meets") score += answers.priority === "Academic fit" ? 30 : 20;
      if (fit === "gap") score -= 35;
      if (program.scholarships.length) score += answers.priority === "Scholarships" ? 24 : 7;
      if (answers.priority === "Lower tuition" && answers.budget && withinBudget)
        score += Math.round((1 - program.annualBdt / Number(answers.budget)) * 15);
      const reasons = [
        preferredCountry && answers.countries.length ? `Preferred country: ${program.country}` : "",
        withinBudget && answers.budget ? "Within your stated tuition budget" : "",
        fit === "meets" ? "Listed score thresholds appear met" : "",
        program.scholarships.length ? `${program.scholarships.length} listed funding option${program.scholarships.length === 1 ? "" : "s"}` : "",
      ].filter(Boolean).slice(0, 2);
      const caution = fit === "gap"
        ? "A listed academic or English threshold needs attention."
        : !withinBudget
          ? "Tuition is above your stated budget."
          : fit === "unknown"
            ? "Some entry requirements need individual confirmation."
            : "Confirm degree status and subject prerequisites.";
      return { program, score, fit, reasons, caution };
    })
    .sort((a, b) => b.score - a.score || a.program.name.localeCompare(b.program.name));
}
export function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}
export function addProgram(ids: string[], id: string) {
  return ids.includes(id) ? ids : [...ids, id];
}
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}
export type DocumentRecord = {
  id: string;
  title: string;
  type: ToolType;
  programId: string | null;
  content: string;
  status: "Draft" | "Ready";
  version: number;
  history: { version: number; content: string }[];
  updatedAt?: string;
};
export type DocumentRequirement = {
  id: string;
  title: string;
  kind: "draft" | "upload";
  tool?: ToolType;
  count: number;
  note: string;
};

const documentOrder = [
  "SOP",
  "CV",
  "LOR",
  "Essay",
  "Academic transcript",
  "English test evidence",
];

export function programRequirements(program: Program): DocumentRequirement[] {
  return documentOrder
    .filter((id) => program.required.includes(id))
    .map((id) => {
      const tool = tools.find((item) => item.id === id);
      const count = tool ? program.documentCounts?.[tool.id] || 1 : 1;
      const note =
        id === "SOP"
          ? count > 1
            ? `Prepare ${count} distinct statements for ${program.university}: one on academic goals and one on your fit for the program.`
            : `Explain your study goals and why ${program.name} fits them.`
          : id === "CV"
            ? `Highlight projects and experience relevant to ${program.field.toLowerCase()}.`
            : id === "LOR"
              ? `${count} referee ${count === 1 ? "brief" : "briefs"} with specific examples of your work; your referee writes the final letter.`
              : id === "Essay"
                ? "Prepare a separate supporting statement for the listed scholarship opportunity."
                : id === "Academic transcript"
                  ? "Add your most recent academic transcript or marksheet."
                  : `Add an English score report. Listed IELTS threshold: ${program.ielts} overall, no band below ${program.band}.`;
      return {
        id,
        title: tool?.name || id,
        kind: tool ? ("draft" as const) : ("upload" as const),
        tool: tool?.id,
        count,
        note,
      };
    });
}

export function programProgress(
  program: Program,
  documents: DocumentRecord[],
  uploads: Record<string, string> = {},
) {
  const requirements = programRequirements(program).map((requirement, index) => {
    const current = requirement.tool
      ? documents.filter(
          (document) =>
            document.programId === program.id &&
            document.type === requirement.tool,
        ).length
      : uploads[requirement.id]
        ? 1
        : 0;
    return {
      ...requirement,
      current,
      started: current > 0,
      complete: current >= requirement.count,
      remaining: Math.max(0, requirement.count - current),
      originalIndex: index,
    };
  });
  const ordered = [...requirements].sort(
    (a, b) => Number(b.started) - Number(a.started) || a.originalIndex - b.originalIndex,
  );
  return {
    ordered,
    started: requirements.filter((requirement) => requirement.started).length,
    complete: requirements.filter((requirement) => requirement.complete).length,
    total: requirements.length,
    prepared: requirements.reduce(
      (sum, requirement) => sum + Math.min(requirement.current, requirement.count),
      0,
    ),
    slots: requirements.reduce((sum, requirement) => sum + requirement.count, 0),
    missing: requirements.filter((requirement) => !requirement.complete),
  };
}

export function daysUntilDeadline(value: string, today = new Date()) {
  const start = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  return Math.ceil((Date.parse(`${value}T00:00:00Z`) - start) / 86400000);
}
export const initialDocuments: DocumentRecord[] = [
  {
    id: "seed-sop",
    title: "Glasgow · Statement of Purpose",
    type: "SOP",
    programId: "glasgow-analytics",
    content:
      "Statement of Purpose\n\nI am Ayesha Rahman, a final-year Business Administration student at BRAC University. I want to deepen my understanding of how data can inform thoughtful business decisions.\n\nMy goal is to study Business Analytics and connect quantitative methods with practical organizational challenges.\n\n[Add a real project, your responsibilities and the outcome here.]\n\n[Explain why the specific curriculum fits your interests.]",
    status: "Draft",
    version: 1,
    history: [],
  },
  {
    id: "seed-cv",
    title: "My academic CV",
    type: "CV",
    programId: null,
    content:
      "AYESHA RAHMAN\nayesha.rahman@example.com\n\nEDUCATION\nBRAC University — Business Administration\nExpected graduation: 2027 · CGPA: 3.40 / 4.00\n\nPROJECTS\n[Add a project, your role and a concrete result.]\n\nEXPERIENCE\n[Add relevant experience.]\n\nSKILLS\n[Add skills you can demonstrate.]",
    status: "Ready",
    version: 1,
    history: [],
  },
  {
    id: "seed-lor",
    title: "Adelaide · Recommendation brief",
    type: "LOR",
    programId: "adelaide-data",
    content:
      "Recommendation brief\n\nStudent: Ayesha Rahman\nInstitution: BRAC University\nTarget: Master of Data Science, University of Adelaide\n\n[Referee name and relationship]\n[Examples of academic work witnessed by the referee]\n[Specific strengths and supporting evidence]\n\nThis brief supports the referee in writing their own recommendation.",
    status: "Draft",
    version: 1,
    history: [],
  },
  {
    id: "seed-sop-adelaide",
    title: "Adelaide · Data Science statement",
    type: "SOP",
    programId: "adelaide-data",
    content: "Statement of Purpose\n\nI am Ayesha Rahman, studying Business Administration at BRAC University. Working with data in my coursework made me interested in how careful analysis can support better decisions.\n\nFor the Master of Data Science at the University of Adelaide, I want to strengthen my statistical and computing foundations.\n\n[Add a real analysis project and explain your individual contribution.]\n\n[Connect specific modules with your intended career direction.]",
    status: "Draft",
    version: 2,
    history: [],
    updatedAt: "2026-09-24T10:30:00Z",
  },
  {
    id: "seed-sop-ottawa",
    title: "Ottawa · Digital Transformation statement",
    type: "SOP",
    programId: "ottawa-digital",
    content: "Statement of Purpose\n\nMy academic background in Business Administration has led me to think about how organizations adopt new technology responsibly. I am preparing for the MSc Digital Transformation at the University of Ottawa.\n\n[Describe a real case study, project or work experience.]\n\n[Explain why this program's approach fits your plans.]",
    status: "Ready",
    version: 1,
    history: [],
    updatedAt: "2026-09-20T09:00:00Z",
  },
  {
    id: "seed-sop-general",
    title: "General · Graduate study statement",
    type: "SOP",
    programId: null,
    content: "Statement of Purpose — general outline\n\nMy interest in further study grew from my Business Administration coursework at BRAC University. I want to combine analytical thinking with practical organizational work.\n\n[Describe the experience that shaped this goal.]\n\n[Adapt this outline for each program before applying.]",
    status: "Draft",
    version: 1,
    history: [],
    updatedAt: "2026-09-18T11:00:00Z",
  },
  {
    id: "seed-cv-glasgow",
    title: "Glasgow · Academic CV",
    type: "CV",
    programId: "glasgow-analytics",
    content: "AYESHA RAHMAN\n\nEDUCATION\nBRAC University — Business Administration, expected 2027\nCGPA: 3.40 / 4.00\n\nRELEVANT WORK\n[Add a real analytics project, tools used and measurable outcome.]\n\nSKILLS\n[Add demonstrable quantitative and communication skills.]",
    status: "Draft",
    version: 1,
    history: [],
    updatedAt: "2026-09-25T14:10:00Z",
  },
  {
    id: "seed-cv-adelaide",
    title: "Adelaide · Academic CV",
    type: "CV",
    programId: "adelaide-data",
    content: "AYESHA RAHMAN\n\nEDUCATION\nBRAC University — Business Administration, expected 2027\nCGPA: 3.40 / 4.00\n\nDATA EXPERIENCE\n[Describe coursework or a real project using data.]\n\nTECHNICAL SKILLS\n[List tools you have actually used.]",
    status: "Draft",
    version: 1,
    history: [],
    updatedAt: "2026-09-22T08:45:00Z",
  },
  {
    id: "seed-cv-ottawa",
    title: "Ottawa · Academic CV",
    type: "CV",
    programId: "ottawa-digital",
    content: "AYESHA RAHMAN\n\nEDUCATION\nBRAC University — Business Administration, expected 2027\n\nPROJECTS\n[Add a real project involving a process, service or digital tool.]\n\nEXPERIENCE\n[Explain your responsibilities and results.]",
    status: "Ready",
    version: 1,
    history: [],
    updatedAt: "2026-09-21T15:20:00Z",
  },
  {
    id: "seed-lor-glasgow",
    title: "Glasgow · Referee evidence brief",
    type: "LOR",
    programId: "glasgow-analytics",
    content: "Recommendation brief\n\nStudent: Ayesha Rahman\nTarget: MSc Business Analytics, University of Glasgow\n\n[Referee name, role and relationship]\n[Specific academic work they observed]\n[Evidence of analytical ability and collaboration]\n\nThe referee writes and submits their own letter.",
    status: "Draft",
    version: 1,
    history: [],
    updatedAt: "2026-09-23T12:00:00Z",
  },
  {
    id: "seed-lor-ottawa",
    title: "Ottawa · Referee evidence brief",
    type: "LOR",
    programId: "ottawa-digital",
    content: "Recommendation brief\n\nStudent: Ayesha Rahman\nTarget: MSc Digital Transformation, University of Ottawa\n\n[Referee name and relationship]\n[Observed work on change, systems or teamwork]\n[One concrete example and its result]\n\nShare this brief with your referee for their independent letter.",
    status: "Ready",
    version: 1,
    history: [],
    updatedAt: "2026-09-19T10:00:00Z",
  },
  {
    id: "seed-lor-general",
    title: "General · Referee talking points",
    type: "LOR",
    programId: null,
    content: "Recommendation brief — general notes\n\nStudent: Ayesha Rahman\n\n[People who can speak directly to your academic or professional work]\n[Projects they supervised]\n[Specific qualities supported by examples]\n\nAdapt the evidence to each program and let the referee write the final letter.",
    status: "Draft",
    version: 1,
    history: [],
    updatedAt: "2026-09-17T16:30:00Z",
  },
  {
    id: "seed-essay-adelaide",
    title: "Adelaide · Scholarship essay outline",
    type: "Essay",
    programId: "adelaide-data",
    content: "Scholarship essay outline\n\n[Describe a real achievement or contribution.]\n[Explain what you learned and how further study would expand your impact.]\n[Check this award's actual prompts and eligibility before adapting the draft.]",
    status: "Draft",
    version: 1,
    history: [],
    updatedAt: "2026-09-16T10:00:00Z",
  },
  {
    id: "seed-essay-general",
    title: "General · Funding statement",
    type: "Essay",
    programId: null,
    content: "Funding statement outline\n\n[Give a real example of leadership, service or academic growth.]\n[Describe how funding would support your study plan.]\n[Adapt this draft to the scholarship criteria.]",
    status: "Draft",
    version: 1,
    history: [],
    updatedAt: "2026-09-15T10:00:00Z",
  },
];
export function makeContent(
  type: ToolType,
  profile: Profile,
  program: Program | undefined,
  notes: string,
): string {
  const target = program
    ? `${program.name} at ${program.university}`
    : `${profile.level} study in ${profile.fields.join(" or ") || "my chosen field"}`;
  if (type === "CV")
    return `${profile.name.toUpperCase()}\n${profile.email}\n\nEDUCATION\n${profile.institution} — ${profile.currentSubject}\nGraduation: ${profile.graduation} · CGPA: ${profile.gpa} / ${profile.scale}\n\nPROFILE\nSeeking ${target}.\n\nPROJECTS & EXPERIENCE\n${notes || "[Add your own projects and experience.]"}\n\nSKILLS\n[Add relevant skills.]`;
  if (type === "LOR")
    return `RECOMMENDATION BRIEF\n\nStudent: ${profile.name}\nInstitution: ${profile.institution}\nStudy goal: ${target}\n\nEvidence for the referee\n${notes || "[Provide examples of work the referee has directly observed.]"}\n\n[Referee to add their relationship to the student, specific observations and recommendation in their own words.]`;
  if (type === "Essay")
    return `SCHOLARSHIP ESSAY — SAMPLE DRAFT\n\nI am ${profile.name}, studying ${profile.currentSubject} at ${profile.institution}. My next academic goal is ${target}.\n\nMy experience and motivation\n${notes || "[Describe a real example of leadership or community contribution.]"}\n\n[Explain how funding would support your studies.]\n\n[Describe the contribution you hope to make after graduation.]`;
  return `STATEMENT OF PURPOSE — SAMPLE DRAFT\n\nI am ${profile.name}, a ${profile.currentSubject} student at ${profile.institution}. I am preparing for ${target}.\n\nAcademic background and motivation\n${notes || "[Describe your interests and a relevant academic experience.]"}\n\nWhy this program\n[Connect specific aspects of the curriculum with your goals.]\n\nFuture direction\n[Explain your own plans and how further study will support them.]`;
}
