import type { Profile, Program } from "./data";

export type ReadinessStatus = "met" | "attention" | "unknown" | "review";
export type ReadinessItem = {
  id: "qualification" | "grades" | "english" | "entrance" | "background";
  title: string;
  required: string;
  current: string;
  status: ReadinessStatus;
  detail: string;
  edit: "academic" | "english" | "entrance" | "background";
};

const present = (value: string) => value.trim() !== "" && Number.isFinite(Number(value));

export function programReadiness(program: Program, profile: Profile) {
  const bachelor = program.level === "Bachelor’s";
  const expectedLevel = bachelor
    ? "HSC or equivalent"
    : program.level === "PhD"
      ? "Master’s degree"
      : "Bachelor’s degree";
  const actualLevel = bachelor ? profile.higher.type : profile.degreeLevel;
  const grade = bachelor ? profile.higher.result : profile.gpa;
  const scale = bachelor ? profile.higher.scale : profile.scale;
  const expectedScale = bachelor ? 5 : 4;
  const qualificationStatus: ReadinessStatus = !actualLevel
    ? "unknown"
    : bachelor
      ? actualLevel === "HSC" && profile.higher.year
        ? "met"
        : "review"
      : actualLevel !== expectedLevel
        ? "attention"
        : profile.degreeStatus === "Completed"
          ? "met"
          : "unknown";
  const gradeStatus: ReadinessStatus = !present(grade) || !present(scale)
    ? "unknown"
    : Number(scale) !== expectedScale
      ? "review"
      : Number(grade) < program.gpa
        ? "attention"
        : "met";
  const items: ReadinessItem[] = [
    {
      id: "qualification",
      title: "Prior qualification",
      required: expectedLevel,
      current: actualLevel
        ? `${actualLevel}${!bachelor && profile.degreeStatus === "In progress" ? " · In progress" : ""}`
        : "Not provided",
      status: qualificationStatus,
      detail: qualificationStatus === "unknown"
        ? "Add your completed qualification or update its completion status."
        : qualificationStatus === "review"
          ? "This qualification needs an individual equivalency check."
          : qualificationStatus === "attention"
            ? "The listed qualification level differs from your profile."
            : "The listed qualification level matches your profile.",
      edit: "academic",
    },
    {
      id: "grades",
      title: bachelor ? "Higher secondary result" : "University CGPA",
      required: `At least ${program.gpa.toFixed(2)} / ${expectedScale}.00`,
      current: present(grade) && present(scale) ? `${grade} / ${scale}` : "Not provided",
      status: gradeStatus,
      detail: gradeStatus === "review"
        ? "Your result uses a different scale; the demo does not convert grades."
        : gradeStatus === "attention"
          ? "Your entered result is below the listed minimum."
          : gradeStatus === "unknown"
            ? "Add both your result and its grading scale."
            : "Your entered result meets the listed minimum.",
      edit: "academic",
    },
  ];

  if (program.required.includes("English test evidence")) {
    const alternatives = program.englishAlternatives || [];
    const englishRequired = [
      `IELTS ${program.ielts} overall, each band ${program.band}+`,
      ...alternatives.map((rule) => `${rule.test} ${rule.minimum}+`),
    ].join(" or ");
    let status: ReadinessStatus = "unknown";
    let detail = "Add a completed test result to check this requirement.";
    if (profile.englishStatus === "Completed") {
      const alternative = alternatives.find((rule) => rule.test === profile.englishTest);
      if (profile.englishTest === "IELTS") {
        const bands = [profile.listening, profile.reading, profile.writing, profile.speaking];
        if ((present(profile.englishOverall) && Number(profile.englishOverall) < program.ielts) ||
            bands.some((band) => present(band) && Number(band) < program.band)) {
          status = "attention";
          detail = "At least one entered IELTS score is below the listed minimum.";
        } else if (present(profile.englishOverall) && bands.every(present)) {
          status = "met";
          detail = "Your overall score and all four bands meet the listed minimums.";
        } else {
          detail = "Add the overall score and all four bands to complete the check.";
        }
      } else if (alternative) {
        if (present(profile.englishOverall)) {
          status = Number(profile.englishOverall) < alternative.minimum ? "attention" : "met";
          detail = status === "met"
            ? "Your score meets the listed alternative test minimum."
            : "Your entered score is below the listed alternative test minimum.";
        }
      } else {
        status = "review";
        detail = "This test is not listed as an accepted option in this mock program.";
      }
    }
    const knownBands = [profile.listening, profile.reading, profile.writing, profile.speaking]
      .filter(present)
      .map(Number);
    items.push({
      id: "english", title: "English proficiency", required: englishRequired,
      current: profile.englishStatus === "Completed" && present(profile.englishOverall)
        ? `${profile.englishTest} ${profile.englishOverall}${profile.englishTest === "IELTS" ? ` · lowest band ${knownBands.length ? Math.min(...knownBands) : "—"}` : ""}`
        : profile.englishStatus === "Not taken" ? "No result added" : `${profile.englishTest || "Test"} · ${profile.englishStatus.toLowerCase()}`,
      status, detail, edit: "english",
    });
  }

  if (program.entrance) {
    const rule = program.entrance;
    const result = profile.entranceTests[rule.test];
    const status: ReadinessStatus = result.status !== "Completed" || !present(result.score)
      ? "unknown"
      : Number(result.score) < rule.minimum ? "attention" : "met";
    items.push({
      id: "entrance", title: `${rule.test} score`, required: `At least ${rule.minimum}`,
      current: result.status === "Completed" && present(result.score)
        ? result.score
        : result.status === "Not taken" ? "No result added" : result.status,
      status,
      detail: status === "unknown"
        ? `Add a completed ${rule.test} result to check this requirement.`
        : status === "attention"
          ? `Your entered ${rule.test} score is below the listed minimum.`
          : `Your entered ${rule.test} score meets the listed minimum.`,
      edit: "entrance",
    });
  }

  items.push({
    id: "background", title: "Subject background", required: program.prerequisites,
    current: profile.degree || profile.currentSubject || "Not provided",
    status: "review",
    detail: "Compare your courses and experience with the program’s subject prerequisites; a degree title alone cannot confirm this.",
    edit: "background",
  });
  const order: Record<ReadinessStatus, number> = { attention: 0, unknown: 1, review: 2, met: 3 };
  const measurable = items.filter((item) => item.id !== "background");
  const met = measurable.filter((item) => item.status === "met").length;
  return {
    items: [...items].sort((a, b) => order[a.status] - order[b.status]),
    score: {
      met,
      total: measurable.length,
      percent: Math.round((met / measurable.length) * 100),
    },
  };
}
