import assert from "node:assert/strict";
import test from "node:test";
import { exampleProfile, validProfile, reportScores, visibleFields } from "../app/career/data.ts";

test("mandatory onboarding rejects missing answers and out-of-scale grades", () => {
  assert.equal(validProfile(exampleProfile), true);
  assert.equal(validProfile({ ...exampleProfile, skills: "   " }), false);
  assert.equal(validProfile({ ...exampleProfile, grade: "4.5" }), false);
  assert.equal(validProfile({ ...exampleProfile, roles: "invalid" }), false);
  assert.equal(validProfile({ ...exampleProfile, portfolio: "javascript:alert(1)" }), false);
});

test("applicants without experience or final grades can finish honestly", () => {
  const profile = { ...exampleProfile, experience: "none", experienceDetail: "", scale: "pending", grade: "" };
  assert.equal(validProfile(profile), true);
  assert.ok(!visibleFields(1, profile).some(field => field.key === "experienceDetail"));
  assert.ok(!visibleFields(0, profile).some(field => field.key === "grade"));
});

test("readiness uses submitted evidence and stays within percentage bounds", () => {
  const starting = reportScores({ ...exampleProfile, experience: "none", proficiency: "beginner", cvConfidence: "start", interview: "low", linkedin: "", portfolio: "", certifications: "" });
  const prepared = reportScores({ ...exampleProfile, experience: "experienced", proficiency: "advanced", cvConfidence: "ready", interview: "high", linkedin: "https://example.com", portfolio: "https://example.com", certifications: "Certificate" });
  assert.ok(starting.every((score, i) => score < prepared[i]));
  assert.ok([...starting, ...prepared].every(score => score >= 0 && score <= 100));
});
