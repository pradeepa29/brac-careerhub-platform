"use client";
import { useEffect, useMemo, useState } from "react";
import {
  countries,
  fields,
  levels,
  profileFilters,
  rankProgramMatches,
  toggleValue,
  type MatchAnswers,
  type Profile,
} from "./data";
import { ProgramRow } from "./programs";
import { ChipSelect, Heading, SelectField } from "./ui";

const searchStages = [
  { title: "Reviewing your answers", detail: "Study plans and academic background" },
  { title: "Searching curated programs", detail: "Fields, countries, intake and tuition" },
  { title: "Checking requirements", detail: "Listed grades and English thresholds" },
  { title: "Ranking your options", detail: "The choices most relevant to your answers" },
];

function answersFromProfile(profile: Profile): MatchAnswers {
  const filters = profileFilters(profile);
  return {
    level: filters.level,
    fields: filters.fields,
    countries: filters.countries,
    intake: filters.intake,
    budget: filters.budget,
    qualification: filters.qualification,
    gpa: filters.gpa,
    scale: filters.scale,
    test: filters.test,
    english: filters.english,
    band: filters.band,
    priority: "Balanced",
  };
}

export function AiBasedMatch({
  active,
  profile,
  selected,
  onOpen,
  onAdd,
  onWorkspace,
}: {
  active: boolean;
  profile: Profile;
  selected: string[];
  onOpen: (id: string) => void;
  onAdd: (id: string) => void;
  onWorkspace: (id: string) => void;
}) {
  const [answers, setAnswers] = useState<MatchAnswers>(() => answersFromProfile(profile));
  const [phase, setPhase] = useState<"questions" | "searching" | "results">("questions");
  const [elapsed, setElapsed] = useState(0);
  const matches = useMemo(() => rankProgramMatches(answers).slice(0, 7), [answers]);
  const setAnswer = <K extends keyof MatchAnswers>(key: K, value: MatchAnswers[K]) =>
    setAnswers((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    if (active) window.scrollTo({ top: 0 });
  }, [active, phase]);

  useEffect(() => {
    if (phase !== "searching") return;
    const start = Date.now();
    const interval = window.setInterval(() => setElapsed(Math.min(5000, Date.now() - start)), 100);
    const finish = window.setTimeout(() => {
      setElapsed(5000);
      setPhase("results");
    }, 5000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(finish);
    };
  }, [phase]);

  const startSearch = () => {
    setElapsed(0);
    setPhase("searching");
  };
  const stage = Math.min(searchStages.length - 1, Math.floor(elapsed / 1250));

  return <div className="hub-match">
    <Heading
      title="AI Based Match"
      copy={phase === "questions"
        ? "Answer a few questions to find programs worth exploring. Your profile details are already filled in."
        : phase === "searching"
          ? "Comparing your answers with the Career Hub program catalog."
          : "A focused shortlist based on your answers. Explore the details before making a decision."}
    />

    {phase === "questions" && <form className="hub-match-questionnaire" onSubmit={(event) => { event.preventDefault(); startSearch(); }}>
      <section className="hub-match-question-section" aria-labelledby="hub-match-study-title">
        <div className="hub-match-question-head"><span>01</span><div><h2 id="hub-match-study-title">What would you like to study?</h2><p>Choose the directions you would be open to exploring.</p></div></div>
        <div className="hub-match-grid">
          <SelectField label="Study level" value={answers.level} onChange={(value) => setAnswer("level", value)} options={levels} />
          <SelectField label="Preferred intake" value={answers.intake} onChange={(value) => setAnswer("intake", value)} options={["September 2027", "January 2028"]} anyLabel="Any intake" />
        </div>
        <ChipSelect label="Fields of study" options={fields} values={answers.fields} onChange={(value) => setAnswer("fields", toggleValue(answers.fields, value))} />
        <ChipSelect label="Preferred countries" options={countries} values={answers.countries} onChange={(value) => setAnswer("countries", toggleValue(answers.countries, value))} />
      </section>

      <section className="hub-match-question-section" aria-labelledby="hub-match-background-title">
        <div className="hub-match-question-head"><span>02</span><div><h2 id="hub-match-background-title">What is your current background?</h2><p>These answers help check listed entry thresholds. They stay separate from My Profile.</p></div></div>
        <div className="hub-match-grid">
          <SelectField label="Current qualification" value={answers.qualification} onChange={(value) => setAnswer("qualification", value)} options={["HSC", "A Levels", "IB", "Diploma", "Bachelor’s degree", "Master’s degree", "Other"]} anyLabel="Not specified" />
          <label className="hub-field">GPA / CGPA<input type="number" min="0" max="100" step="0.01" value={answers.gpa} onChange={(event) => setAnswer("gpa", event.target.value)} placeholder="e.g. 3.40" /></label>
          <SelectField label="GPA scale" value={answers.scale} onChange={(value) => setAnswer("scale", value)} options={["4", "5", "10", "100"]} anyLabel="Not specified" />
          <SelectField label="English test" value={answers.test} onChange={(value) => setAnswers((current) => ({ ...current, test: value, english: value === current.test ? current.english : "", band: value === "IELTS" ? current.band : "" }))} options={["Not taken", "IELTS", "TOEFL", "Duolingo", "PTE"]} />
          {answers.test !== "Not taken" && <label className="hub-field">Overall English score<input type="number" min="0" max="120" step="0.5" value={answers.english} onChange={(event) => setAnswer("english", event.target.value)} placeholder="Enter your score" /></label>}
          {answers.test === "IELTS" && <label className="hub-field">Lowest IELTS band<input type="number" min="0" max="9" step="0.5" value={answers.band} onChange={(event) => setAnswer("band", event.target.value)} placeholder="e.g. 6.0" /></label>}
        </div>
      </section>

      <section className="hub-match-question-section" aria-labelledby="hub-match-priority-title">
        <div className="hub-match-question-head"><span>03</span><div><h2 id="hub-match-priority-title">What matters most?</h2><p>We use this to order your options, along with your preferences above.</p></div></div>
        <div className="hub-match-grid">
          <label className="hub-field">Maximum annual tuition in BDT<input type="number" min="0" step="10000" value={answers.budget} onChange={(event) => setAnswer("budget", event.target.value)} placeholder="No limit" /></label>
          <SelectField label="Prioritize" value={answers.priority} onChange={(value) => setAnswer("priority", value as MatchAnswers["priority"])} options={["Balanced", "Academic fit", "Lower tuition", "Scholarships"]} />
        </div>
      </section>
      <div className="hub-match-submit"><span>This preview uses the curated demo catalog. Always confirm final eligibility with the university.</span><button className="hub-btn hub-btn-primary" type="submit">Find my matches →</button></div>
    </form>}

    {phase === "searching" && <div className="hub-match-searching" role="status" aria-live="polite">
      <div className="hub-match-search-head"><span className="hub-match-orbit" aria-hidden="true" /><div><h2>Finding programs for you</h2><p>{searchStages[stage].title}</p></div><strong>{Math.min(100, Math.round(elapsed / 50))}%</strong></div>
      <div className="hub-match-progress" role="progressbar" aria-label="Matching progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(100, Math.round(elapsed / 50))}><span style={{ width: `${Math.min(100, elapsed / 50)}%` }} /></div>
      <ol className="hub-match-stages">{searchStages.map((item, index) => <li key={item.title} className={index < stage ? "is-done" : index === stage ? "is-current" : ""}><span aria-hidden="true">{index < stage ? "✓" : String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.detail}</small></div></li>)}</ol>
      <p className="hub-match-demo-note">Illustrative search of Career Hub&apos;s curated programs.</p>
    </div>}

    {phase === "results" && <div className="hub-match-results">
      <div className="hub-match-results-head"><div><h2>{matches.length} programs to consider</h2><p>Ordered for your stated level, interests, budget and academic profile.</p></div><div><button className="hub-btn" onClick={() => setPhase("questions")}>Edit answers</button><button className="hub-btn hub-btn-primary" onClick={startSearch}>Run match again</button></div></div>
      {matches.length ? <div className="hub-program-grid">{matches.map((match, index) => <div className="hub-match-result" key={match.program.id}>
        <div className="hub-match-result-context"><strong>{String(index + 1).padStart(2, "0")}</strong><span>{match.reasons.join(" · ") || "An option to explore"}</span></div>
        <ProgramRow program={match.program} selected={selected.includes(match.program.id)} onOpen={() => onOpen(match.program.id)} onAdd={() => onAdd(match.program.id)} onWorkspace={() => onWorkspace(match.program.id)} />
        <p className={`hub-match-caution${match.fit === "gap" ? " is-gap" : ""}`}>{match.caution}</p>
      </div>)}</div> : <div className="hub-match-empty"><h3>No programs match this study level and field combination yet.</h3><p>Try another field or study level to explore the curated catalog.</p><button className="hub-btn" onClick={() => setPhase("questions")}>Edit answers</button></div>}
      <p className="hub-footnote">These are illustrative recommendations from preset program data, not admissions decisions.</p>
    </div>}
  </div>;
}
