"use client";
import { useState } from "react";
import {
  countries,
  fields,
  levels,
  toggleValue,
  type Profile,
  type Qualification,
} from "./data";
import { ChipSelect, Heading, SelectField } from "./ui";

function Education({
  title,
  value: q,
  onChange,
  types,
}: {
  title: string;
  value: Qualification;
  onChange: (q: Qualification) => void;
  types: string[];
}) {
  const update = <K extends keyof Qualification>(
    key: K,
    value: Qualification[K],
  ) => onChange({ ...q, [key]: value });
  const letterGrades = q.type === "O Levels" || q.type === "A Levels";
  return (
    <section className="hub-profile-section">
      <h2>{title}</h2>
      <div className="hub-form-grid">
        <SelectField
          label="Qualification"
          value={q.type}
          onChange={(type) =>
            onChange({
              ...q,
              type,
              result: "",
              scale: type === "SSC" || type === "HSC" ? "5" : "",
              grades: [],
            })
          }
          options={types}
        />
        <label className="hub-field">
          Institution
          <input
            value={q.institution}
            onChange={(e) => update("institution", e.target.value)}
          />
        </label>
        <label className="hub-field">
          Board / awarding body
          <input
            value={q.board}
            onChange={(e) => update("board", e.target.value)}
          />
        </label>
        <label className="hub-field">
          Completion year
          <input
            type="number"
            min="1980"
            max="2040"
            value={q.year}
            onChange={(e) => update("year", e.target.value)}
          />
        </label>
        {!letterGrades && (
          <>
            <label className="hub-field">
              GPA / result
              <input
                type="number"
                min="0"
                max={q.scale || undefined}
                step="0.01"
                value={q.result}
                onChange={(e) => update("result", e.target.value)}
                placeholder="Leave blank if pending"
              />
            </label>
            <label className="hub-field">
              Maximum possible result
              <input
                type="number"
                min="1"
                max="100"
                value={q.scale}
                onChange={(e) => update("scale", e.target.value)}
                placeholder="For example: 5, 45 or 100"
              />
            </label>
          </>
        )}
      </div>
      {letterGrades && (
        <div className="hub-grade-list">
          <h3>Subjects and grades</h3>
          {q.grades.map((g, i) => (
            <div className="hub-grade-row" key={i}>
              <label className="hub-field">
                Subject {i + 1}
                <input
                  value={g.subject}
                  onChange={(e) =>
                    update(
                      "grades",
                      q.grades.map((v, n) =>
                        n === i ? { ...v, subject: e.target.value } : v,
                      ),
                    )
                  }
                  placeholder="e.g. Mathematics"
                />
              </label>
              <label className="hub-field">
                Grade
                <select
                  value={g.grade}
                  onChange={(e) =>
                    update(
                      "grades",
                      q.grades.map((v, n) =>
                        n === i ? { ...v, grade: e.target.value } : v,
                      ),
                    )
                  }
                >
                  <option value="">Pending</option>
                  {["A*", "A", "B", "C", "D", "E", "U"].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="hub-icon-btn"
                aria-label={`Remove subject ${i + 1}`}
                onClick={() =>
                  update(
                    "grades",
                    q.grades.filter((_, n) => n !== i),
                  )
                }
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            className="hub-btn"
            onClick={() =>
              update("grades", [...q.grades, { subject: "", grade: "" }])
            }
          >
            + Add subject
          </button>
          <p className="hub-muted">
            Grades are retained as entered. The demo does not convert them into
            a GPA.
          </p>
        </div>
      )}
    </section>
  );
}

export function MyProfile({
  profile,
  onSave,
}: {
  profile: Profile;
  onSave: (p: Profile) => void;
}) {
  const [draft, setDraft] = useState<Profile>(profile);
  const [notice, setNotice] = useState("");
  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setDraft({ ...draft, [key]: value });
    setNotice("");
  };
  const maxScore =
    draft.englishTest === "IELTS"
      ? 9
      : draft.englishTest === "TOEFL"
        ? 120
        : draft.englishTest === "PTE"
          ? 90
          : 160;
  return (
    <>
      <Heading
        eyebrow="MY JOURNEY"
        title="My Profile"
        copy="Your starting point. Keep your background and study preferences up to date."
      />
      <form
        className="hub-profile-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(structuredClone(draft));
          setNotice(
            "Profile saved. Your catalog filters now use these preferences.",
          );
        }}
      >
        <div className="hub-profile-intro">
          <div>
            <h2>{draft.name}</h2>
            <p>BRAC Career Hub · Student</p>
          </div>
        </div>
        <section className="hub-profile-section">
          <h2>Personal details</h2>
          <p>The basics that make your documents yours.</p>
          <div className="hub-form-grid">
            <label className="hub-field">
              Full name
              <input
                required
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label className="hub-field">
              Email address
              <input
                required
                type="email"
                value={draft.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </label>
            <label className="hub-field">
              Nationality
              <input
                value={draft.nationality}
                onChange={(e) => set("nationality", e.target.value)}
              />
            </label>
            <label className="hub-field">
              Country of residence
              <input
                value={draft.residence}
                onChange={(e) => set("residence", e.target.value)}
              />
            </label>
          </div>
        </section>
        <section className="hub-profile-section">
          <h2>Current education</h2>
          <div className="hub-form-grid">
            <label className="hub-field">
              Current / most recent institution
              <input
                value={draft.institution}
                onChange={(e) => set("institution", e.target.value)}
              />
            </label>
            <label className="hub-field">
              Current subject / major
              <input
                value={draft.currentSubject}
                onChange={(e) => set("currentSubject", e.target.value)}
              />
            </label>
            <SelectField
              label="Academic stage"
              value={draft.year}
              onChange={(v) => set("year", v)}
              options={[
                "Higher secondary",
                "1st Year",
                "2nd Year",
                "3rd Year",
                "Final Year",
                "Graduate",
                "Postgraduate",
              ]}
            />
            <label className="hub-field">
              Expected / completed graduation year
              <input
                type="number"
                min="1980"
                max="2040"
                value={draft.graduation}
                onChange={(e) => set("graduation", e.target.value)}
              />
            </label>
          </div>
        </section>
        <Education
          title="Secondary education"
          value={draft.secondary}
          onChange={(q) => set("secondary", q)}
          types={["SSC", "O Levels", "Other"]}
        />
        <Education
          title="Higher secondary education"
          value={draft.higher}
          onChange={(q) => set("higher", q)}
          types={["HSC", "A Levels", "IB", "Diploma", "Other"]}
        />
        {draft.year !== "Higher secondary" && (
          <section className="hub-profile-section">
            <h2>University qualification</h2>
            <p>
              Your most recent university qualification, completed or in
              progress.
            </p>
            <div className="hub-form-grid">
              <SelectField
                label="Qualification level"
                value={draft.degreeLevel}
                onChange={(v) => set("degreeLevel", v)}
                options={["Bachelor’s degree", "Master’s degree"]}
              />
              <SelectField
                label="Completion status"
                value={draft.degreeStatus}
                onChange={(v) => set("degreeStatus", v)}
                options={["In progress", "Completed"]}
              />
              <label className="hub-field">
                Degree title
                <input
                  value={draft.degree}
                  onChange={(e) => set("degree", e.target.value)}
                />
              </label>
              <label className="hub-field">
                CGPA
                <input
                  type="number"
                  min="0"
                  max={draft.scale || undefined}
                  step="0.01"
                  value={draft.gpa}
                  onChange={(e) => set("gpa", e.target.value)}
                />
              </label>
              <SelectField
                label="CGPA scale"
                value={draft.scale}
                onChange={(v) => set("scale", v)}
                options={["4", "5", "10", "100"]}
              />
            </div>
          </section>
        )}
        <section className="hub-profile-section">
          <h2>English proficiency</h2>
          <p>You can explore programs even if you haven’t taken a test yet.</p>
          <div className="hub-form-grid">
            <SelectField
              label="Test status"
              value={draft.englishStatus}
              onChange={(v) => set("englishStatus", v)}
              options={["Not taken", "Planned", "Completed"]}
            />
            {draft.englishStatus !== "Not taken" && (
              <SelectField
                label="Test type"
                value={draft.englishTest}
                onChange={(v) =>
                  setDraft({
                    ...draft,
                    englishTest: v,
                    englishOverall: "",
                    listening: "",
                    reading: "",
                    writing: "",
                    speaking: "",
                  })
                }
                options={["IELTS", "TOEFL", "Duolingo", "PTE"]}
              />
            )}
            {draft.englishStatus === "Completed" && (
              <label className="hub-field">
                Overall score
                <input
                  type="number"
                  min="0"
                  max={maxScore}
                  step="0.5"
                  value={draft.englishOverall}
                  onChange={(e) => set("englishOverall", e.target.value)}
                />
              </label>
            )}
            {draft.englishStatus !== "Not taken" && (
              <label className="hub-field">
                Test date
                <input
                  type="date"
                  value={draft.englishDate}
                  onChange={(e) => set("englishDate", e.target.value)}
                />
              </label>
            )}
          </div>
          {draft.englishStatus === "Completed" &&
            draft.englishTest === "IELTS" && (
              <div className="hub-form-grid hub-band-grid">
                {(["listening", "reading", "writing", "speaking"] as const).map(
                  (b) => (
                    <label key={b} className="hub-field">
                      {b[0].toUpperCase() + b.slice(1)}
                      <input
                        type="number"
                        min="0"
                        max="9"
                        step="0.5"
                        value={draft[b]}
                        onChange={(e) => set(b, e.target.value)}
                      />
                    </label>
                  ),
                )}
              </div>
            )}
        </section>
        <section className="hub-profile-section">
          <h2>Entrance tests</h2>
          <p>Add GRE or GMAT results when a program lists them. Scores and dates are used for the demo readiness review.</p>
          {(["GRE", "GMAT"] as const).map((test) => (
            <div key={test} className="hub-entrance-test">
              <h3>{test}</h3>
              <div className="hub-form-grid">
                <SelectField
                  label="Test status"
                  value={draft.entranceTests[test].status}
                  onChange={(value) => setDraft((current) => ({
                    ...current,
                    entranceTests: { ...current.entranceTests, [test]: { ...current.entranceTests[test], status: value } },
                  }))}
                  options={["Not taken", "Planned", "Completed"]}
                />
                {draft.entranceTests[test].status === "Completed" && (
                  <label className="hub-field">
                    Total score
                    <input
                      type="number"
                      min={test === "GRE" ? 260 : 200}
                      max={test === "GRE" ? 340 : 800}
                      step="1"
                      value={draft.entranceTests[test].score}
                      onChange={(e) => setDraft((current) => ({
                        ...current,
                        entranceTests: { ...current.entranceTests, [test]: { ...current.entranceTests[test], score: e.target.value } },
                      }))}
                    />
                  </label>
                )}
                {draft.entranceTests[test].status !== "Not taken" && (
                  <label className="hub-field">
                    Test date
                    <input
                      type="date"
                      value={draft.entranceTests[test].date}
                      onChange={(e) => setDraft((current) => ({
                        ...current,
                        entranceTests: { ...current.entranceTests, [test]: { ...current.entranceTests[test], date: e.target.value } },
                      }))}
                    />
                  </label>
                )}
              </div>
            </div>
          ))}
        </section>
        <section className="hub-profile-section">
          <h2>Where would you like to go?</h2>
          <p>These preferences become the default filters in All Programs.</p>
          <div className="hub-form-grid">
            <SelectField
              label="Preferred study level"
              value={draft.level}
              onChange={(v) => set("level", v)}
              options={levels}
            />
            <SelectField
              label="Preferred intake"
              value={draft.intake}
              onChange={(v) => set("intake", v)}
              options={["September 2027", "January 2028"]}
              anyLabel="Any intake"
            />
            <label className="hub-field">
              Maximum annual tuition budget (BDT)
              <input
                type="number"
                min="0"
                step="100000"
                value={draft.budget}
                onChange={(e) => set("budget", e.target.value)}
                placeholder="No preference"
              />
              <small>Tuition only; living costs are listed separately.</small>
            </label>
          </div>
          <ChipSelect
            label="Preferred fields of study"
            options={fields}
            values={draft.fields}
            onChange={(v) => set("fields", toggleValue(draft.fields, v))}
          />
          <ChipSelect
            label="Preferred countries"
            options={countries}
            values={draft.countries}
            onChange={(v) => set("countries", toggleValue(draft.countries, v))}
          />
          <p className="hub-muted">
            Leave fields or countries unselected to stay open to all options.
          </p>
          <label className="hub-check">
            <input
              type="checkbox"
              checked={draft.scholarship}
              onChange={(e) => set("scholarship", e.target.checked)}
            />{" "}
            Prefer programs with scholarships
          </label>
        </section>
        <div className="hub-profile-save">
          <p role="status">
            {notice ||
              "Changes last for this demo session. Refresh to restore the preset profile."}
          </p>
          <div>
            <button
              type="button"
              className="hub-btn"
              onClick={() => {
                setDraft(structuredClone(profile));
                setNotice("Unsaved changes discarded.");
              }}
            >
              Cancel
            </button>
            <button type="submit" className="hub-btn hub-btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
