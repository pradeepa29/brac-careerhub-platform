import assert from "node:assert/strict";
import test from "node:test";
import {
  programs,
  initialProfile,
  profileFilters,
  updateFiltersFromProfile,
  emptyFilters,
  filterPrograms,
  requirementFit,
  addProgram,
  makeContent,
  programRequirements,
  programProgress,
  daysUntilDeadline,
  initialDocuments,
  universityScholarships,
  rankProgramMatches,
} from "../app/student/data.ts";
import { programReadiness } from "../app/student/readiness.ts";

const readinessItem = (program, profile, id) =>
  programReadiness(program, profile).items.find((item) => item.id === id);

test("readiness distinguishes missing, low, and qualifying English results", () => {
  const program = programs.find((item) => item.id === "glasgow-analytics");
  assert.equal(readinessItem(program, initialProfile, "english").status, "met");
  assert.equal(readinessItem(program, { ...initialProfile, englishStatus: "Not taken" }, "english").status, "unknown");
  assert.equal(readinessItem(program, { ...initialProfile, englishOverall: "6.0" }, "english").status, "attention");
  assert.equal(readinessItem(program, { ...initialProfile, writing: "5.5" }, "english").status, "attention");
  assert.equal(readinessItem(program, { ...initialProfile, writing: "" }, "english").status, "unknown");
  assert.equal(readinessItem(program, { ...initialProfile, englishTest: "TOEFL", englishOverall: "95" }, "english").status, "met");
  const filters = profileFilters({ ...initialProfile, englishTest: "TOEFL", englishOverall: "95" });
  assert.equal(requirementFit(program, filters), "meets");
  assert.equal(requirementFit(program, { ...filters, english: "80" }), "gap");
  assert.equal(readinessItem(program, { ...initialProfile, englishTest: "PTE", englishOverall: "80" }, "english").status, "review");
});

test("program specific entrance scores and qualification gaps update from profile data", () => {
  const management = programs.find((item) => item.id === "glasgow-management");
  assert.equal(readinessItem(management, initialProfile, "entrance").status, "unknown");
  const gmat = (score) => ({ ...initialProfile, entranceTests: { ...initialProfile.entranceTests, GMAT: { status: "Completed", score, date: "2026-08-01" } } });
  assert.equal(readinessItem(management, gmat("550"), "entrance").status, "attention");
  assert.equal(readinessItem(management, gmat("650"), "entrance").status, "met");
  assert.equal(readinessItem(management, initialProfile, "qualification").status, "unknown");
  assert.equal(readinessItem(management, { ...initialProfile, degreeStatus: "Completed" }, "qualification").status, "met");
  assert.equal(readinessItem(management, { ...initialProfile, scale: "10" }, "grades").status, "review");
  assert.equal(readinessItem(management, { ...initialProfile, gpa: "2.7" }, "grades").status, "attention");
});

test("profile scores and supporting evidence are independent", () => {
  const program = programs.find((item) => item.id === "glasgow-analytics");
  assert.equal(readinessItem(program, initialProfile, "english").status, "met");
  assert.ok(programProgress(program, initialDocuments, {}).missing.some((item) => item.id === "English test evidence"));
  const noEnglish = programs.find((item) => item.id === "twente-research");
  assert.ok(!programReadiness(noEnglish, initialProfile).items.some((item) => item.id === "english"));
  assert.equal(readinessItem(noEnglish, initialProfile, "entrance").status, "unknown");
});

test("requirements ring reaches 100 percent only when measurable checks are met", () => {
  const management = programs.find((item) => item.id === "glasgow-management");
  const profile = {
    ...initialProfile,
    degreeStatus: "Completed",
    entranceTests: {
      ...initialProfile.entranceTests,
      GMAT: { status: "Completed", score: "650", date: "2026-08-01" },
    },
  };
  const complete = programReadiness(management, profile);
  assert.deepEqual(complete.score, { met: 4, total: 4, percent: 100 });
  assert.equal(readinessItem(management, profile, "background").status, "review");
  const missingGmat = programReadiness(management, initialProfile);
  assert.equal(missingGmat.score.percent, 50);
});

test("university scholarships include awards listed for another program without implying eligibility", () => {
  const analytics = programs.find((item) => item.id === "glasgow-analytics");
  const management = programs.find((item) => item.id === "glasgow-management");
  const awards = universityScholarships(analytics);
  assert.equal(analytics.scholarships.length, 0);
  assert.equal(awards.length, 2);
  assert.ok(awards.every((award) => !award.forThisProgram && award.programNames.includes(management.name)));
  assert.ok(universityScholarships(management).every((award) => award.forThisProgram));
});

test("profile edits refresh default filters without overwriting catalog exploration", () => {
  const current = { ...profileFilters(initialProfile), countries: ["Canada"] };
  const nextProfile = { ...initialProfile, englishOverall: "7.0", countries: ["Australia"] };
  const updated = updateFiltersFromProfile(current, initialProfile, nextProfile);
  assert.equal(updated.english, "7.0");
  assert.deepEqual(updated.countries, ["Canada"]);
  assert.deepEqual(current.countries, ["Canada"]);
});

test("preset preferences return a useful shortlist, while clearing filters exposes the full catalog", () => {
  const filters = profileFilters(initialProfile);
  const results = filterPrograms(programs, filters);
  assert.ok(results.length >= 7);
  assert.equal(new Set(results.map((program) => program.name)).size, results.length);
  assert.ok(
    results.every(
      (p) =>
        filters.countries.includes(p.country) &&
        filters.fields.includes(p.field) &&
        p.level === filters.level &&
        p.annualBdt <= Number(filters.budget),
    ),
  );
  assert.equal(filterPrograms(programs, emptyFilters).length, programs.length);
});

test("program document checklists vary by university and count repeat statements", () => {
  const management = programs.find((program) => program.id === "glasgow-management");
  const research = programs.find((program) => program.id === "twente-research");
  assert.equal(programRequirements(management).find((item) => item.id === "SOP").count, 2);
  assert.equal(programRequirements(research).find((item) => item.id === "LOR").count, 2);
  assert.ok(!programRequirements(research).some((item) => item.id === "English test evidence"));
  assert.ok(programRequirements(programs[0]).some((item) => item.id === "English test evidence"));
  const academicOnly = { ...profileFilters(initialProfile), qualification: "Master’s degree", scale: "4", gpa: "3.8", test: "Not taken", english: "", band: "" };
  assert.equal(requirementFit(research, academicOnly), "meets");
});

test("started requirements move ahead of pending work, while missing counts remain accurate", () => {
  const glasgow = programs.find((program) => program.id === "glasgow-analytics");
  const startingDocuments = initialDocuments.filter((document) => document.id === "seed-sop");
  const initial = programProgress(glasgow, startingDocuments, {});
  assert.equal(initial.ordered[0].id, "SOP");
  assert.equal(initial.prepared, 1);
  assert.equal(initial.slots, 5);
  const withUpload = programProgress(glasgow, startingDocuments, { "Academic transcript": "transcript.pdf" });
  assert.deepEqual(withUpload.ordered.slice(0, 2).map((item) => item.id), ["SOP", "Academic transcript"]);
  assert.equal(withUpload.prepared, 2);
  assert.ok(!withUpload.missing.some((item) => item.id === "Academic transcript"));
});

test("studio seed has varied documents for each category and program context", () => {
  for (const type of ["SOP", "CV", "LOR"]) {
    const items = initialDocuments.filter((document) => document.type === type);
    assert.ok(items.length >= 4);
    assert.ok(items.some((document) => document.programId));
    assert.ok(items.some((document) => !document.programId));
  }
  assert.equal(new Set(initialDocuments.map((document) => document.id)).size, initialDocuments.length);
});

test("matching ranks relevant seeded programs and reacts to priority", () => {
  const filters = profileFilters(initialProfile);
  const answers = {
    level: filters.level, fields: filters.fields, countries: filters.countries,
    intake: filters.intake, budget: filters.budget, qualification: filters.qualification,
    gpa: filters.gpa, scale: filters.scale, test: filters.test,
    english: filters.english, band: filters.band, priority: "Balanced",
  };
  const ranked = rankProgramMatches(answers);
  assert.ok(ranked.length >= 7);
  assert.ok(ranked.every((item) => item.program.level === answers.level && answers.fields.includes(item.program.field)));
  assert.ok(ranked.every((item) => item.reasons.length <= 2 && item.caution));
  const cheaper = rankProgramMatches({ ...answers, priority: "Lower tuition" });
  assert.notDeepEqual(cheaper.slice(0, 7).map((item) => item.program.id), ranked.slice(0, 7).map((item) => item.program.id));
});

test("a partial multi-draft requirement starts the timeline but still shows missing work", () => {
  const management = programs.find((program) => program.id === "glasgow-management");
  const oneDraft = { ...initialDocuments[0], id: "other-sop", programId: management.id };
  const progress = programProgress(management, [oneDraft], {});
  assert.equal(progress.ordered[0].id, "SOP");
  assert.equal(progress.ordered[0].started, true);
  assert.equal(progress.ordered[0].complete, false);
  assert.equal(progress.ordered[0].remaining, 1);
});

test("deadline countdown is based on calendar days", () => {
  assert.equal(daysUntilDeadline("2027-01-15", new Date("2027-01-14T23:59:00Z")), 1);
  assert.equal(daysUntilDeadline("2027-01-15", new Date("2027-01-15T07:00:00Z")), 0);
});
test("catalog exploration does not mutate the saved profile", () => {
  const profile = structuredClone(initialProfile);
  const filters = profileFilters(profile);
  filters.countries.push("Canada");
  filters.fields.splice(0, 1);
  assert.deepEqual(profile, initialProfile);
  assert.deepEqual(profileFilters(profile).countries, initialProfile.countries);
});
test("known academic gaps are excluded, but unsupported equivalencies are not invented", () => {
  const program = programs[0];
  const filters = profileFilters(initialProfile);
  assert.equal(requirementFit(program, filters), "meets");
  assert.equal(requirementFit(program, { ...filters, gpa: "2.0" }), "gap");
  assert.equal(requirementFit(program, { ...filters, scale: "5" }), "unknown");
  assert.equal(
    requirementFit(program, { ...filters, test: "PTE", english: "80" }),
    "unknown",
  );
  assert.equal(requirementFit(program, { ...filters, band: "5" }), "gap");
  assert.equal(
    filterPrograms(programs, { ...filters, english: "4" }).length,
    0,
  );
});
test("unfinished English scores and a future study goal do not become completed qualifications", () => {
  const filters = profileFilters({
    ...initialProfile,
    speaking: "",
    level: "PhD",
  });
  assert.equal(filters.band, "");
  assert.equal(filters.qualification, "Bachelor’s degree");
  assert.equal(requirementFit(programs[0], filters), "unknown");
});
test("two programs at one university remain independent and repeated selection is harmless", () => {
  const sameUniversity = programs.filter(
    (p) => p.university === "University of Glasgow",
  );
  assert.equal(sameUniversity.length, 2);
  let selected = addProgram([], sameUniversity[0].id);
  selected = addProgram(selected, sameUniversity[1].id);
  selected = addProgram(selected, sameUniversity[0].id);
  assert.equal(selected.length, 2);
});
test("combined filters support scholarship-only, country, deadlines and affordability", () => {
  const matches = filterPrograms(programs, {
    ...emptyFilters,
    countries: ["Australia"],
    scholarship: true,
    budget: "5000000",
    deadline: "2027-03-01",
  });
  assert.ok(matches.length > 0);
  assert.ok(
    matches.every(
      (p) =>
        p.country === "Australia" &&
        p.scholarships.length &&
        p.annualBdt <= 5000000 &&
        p.deadline >= "2027-03-01",
    ),
  );
  assert.ok(programs.some((p) => p.scholarships.length === 0));
  assert.ok(programs.some((p) => p.scholarships.length > 1));
});
test("standalone and program drafts use the appropriate context without invented experience", () => {
  const standalone = makeContent(
    "SOP",
    initialProfile,
    undefined,
    "My actual project",
  );
  const tailored = makeContent(
    "SOP",
    initialProfile,
    programs[0],
    "My actual project",
  );
  assert.ok(!standalone.includes(programs[0].university));
  assert.ok(tailored.includes(programs[0].university));
  assert.ok(tailored.includes("My actual project"));
  assert.ok(
    makeContent("CV", initialProfile, undefined, "").includes(
      "[Add your own projects and experience.]",
    ),
  );
});
