"use client";

import { useEffect, useState } from "react";
import { type Profile, type Program } from "./data";
import { programReadiness, type ReadinessItem, type ReadinessStatus } from "./readiness";

const statusText: Record<ReadinessStatus, string> = {
  met: "Meets listed requirement",
  attention: "Needs attention",
  unknown: "Information needed",
  review: "Needs confirmation",
};
const statusSymbol: Record<ReadinessStatus, string> = {
  met: "✓", attention: "!", unknown: "?", review: "?",
};
function RequirementIcon({ id }: { id: ReadinessItem["id"] }) {
  const paths: Record<ReadinessItem["id"], string> = {
    qualification: "M2 9l10-5 10 5-10 5-10-5Zm4 3v5c3.7 3 8.3 3 12 0v-5M22 9v7",
    grades: "M4 20V5M4 20h17M8 16l4-5 3 2 5-7",
    english: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-4 4-4 14 0 18M12 3c4 4 4 14 0 18",
    entrance: "M7 3h10l3 3v15H4V6l3-3Zm5 4v8m-3-3h6M8 18h8",
    background: "M4 4h7v16H4zM13 4h7v16h-7zM7 8h1M16 8h1",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id]} /></svg>;
}

function ReadinessEditor({
  item,
  program,
  profile,
  onSave,
  onCancel,
}: {
  item: ReadinessItem;
  program: Program;
  profile: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Profile>(() => structuredClone(profile));
  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));
  const test = program.entrance?.test;
  const entrance = test ? draft.entranceTests[test] : undefined;
  const setEntrance = (key: "status" | "score" | "date", value: string) => {
    if (!test) return;
    setDraft((current) => ({
      ...current,
      entranceTests: {
        ...current.entranceTests,
        [test]: { ...current.entranceTests[test], [key]: value },
      },
    }));
  };
  return (
    <form className="hub-readiness-editor" onSubmit={(event) => {
      event.preventDefault();
      onSave(structuredClone(draft));
    }}>
      <div className="hub-readiness-edit-fields">
        {item.edit === "academic" && (program.level === "Bachelor’s" ? <>
          <label className="hub-field">Higher secondary qualification
            <select value={draft.higher.type} onChange={(event) => set("higher", { ...draft.higher, type: event.target.value })}>
              {["HSC", "A Levels", "IB", "Diploma", "Other"].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label className="hub-field">Result
            <input type="number" min="0" max={draft.higher.scale || undefined} step="0.01" value={draft.higher.result} onChange={(event) => set("higher", { ...draft.higher, result: event.target.value })} />
          </label>
          <label className="hub-field">Result scale
            <input type="number" min="1" max="100" value={draft.higher.scale} onChange={(event) => set("higher", { ...draft.higher, scale: event.target.value })} />
          </label>
          <label className="hub-field">Completion year
            <input type="number" min="1980" max="2040" value={draft.higher.year} onChange={(event) => set("higher", { ...draft.higher, year: event.target.value })} />
          </label>
        </> : <>
          <label className="hub-field">Qualification level
            <select value={draft.degreeLevel} onChange={(event) => set("degreeLevel", event.target.value)}>
              {["Bachelor’s degree", "Master’s degree"].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label className="hub-field">Completion status
            <select value={draft.degreeStatus} onChange={(event) => set("degreeStatus", event.target.value)}>
              {["In progress", "Completed"].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label className="hub-field">CGPA
            <input type="number" min="0" max={draft.scale || undefined} step="0.01" value={draft.gpa} onChange={(event) => set("gpa", event.target.value)} />
          </label>
          <label className="hub-field">CGPA scale
            <select value={draft.scale} onChange={(event) => set("scale", event.target.value)}>
              {["4", "5", "10", "100"].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
        </>)}
        {item.edit === "english" && <>
          <label className="hub-field">Test status
            <select value={draft.englishStatus} onChange={(event) => set("englishStatus", event.target.value)}>
              {["Not taken", "Planned", "Completed"].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          {draft.englishStatus !== "Not taken" && <label className="hub-field">Test
            <select value={draft.englishTest} onChange={(event) => setDraft((current) => ({ ...current, englishTest: event.target.value, englishOverall: "", listening: "", reading: "", writing: "", speaking: "" }))}>
              {["IELTS", "TOEFL", "Duolingo", "PTE"].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>}
          {draft.englishStatus === "Completed" && <>
            <label className="hub-field">Overall score
              <input required type="number" min="0" max={draft.englishTest === "IELTS" ? 9 : draft.englishTest === "TOEFL" ? 120 : draft.englishTest === "PTE" ? 90 : 160} step={draft.englishTest === "IELTS" ? "0.5" : "1"} value={draft.englishOverall} onChange={(event) => set("englishOverall", event.target.value)} />
            </label>
            {draft.englishTest === "IELTS" && (["listening", "reading", "writing", "speaking"] as const).map((band) => <label className="hub-field" key={band}>{band[0].toUpperCase() + band.slice(1)}
              <input required type="number" min="0" max="9" step="0.5" value={draft[band]} onChange={(event) => set(band, event.target.value)} />
            </label>)}
          </>}
          {draft.englishStatus !== "Not taken" && <label className="hub-field">Test date
            <input type="date" value={draft.englishDate} onChange={(event) => set("englishDate", event.target.value)} />
          </label>}
        </>}
        {item.edit === "entrance" && entrance && <>
          <label className="hub-field">{test} status
            <select value={entrance.status} onChange={(event) => setEntrance("status", event.target.value)}>
              {["Not taken", "Planned", "Completed"].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          {entrance.status === "Completed" && <label className="hub-field">{test} total score
            <input required type="number" min={test === "GRE" ? 260 : 200} max={test === "GRE" ? 340 : 800} step="1" value={entrance.score} onChange={(event) => setEntrance("score", event.target.value)} />
          </label>}
          {entrance.status !== "Not taken" && <label className="hub-field">Test date
            <input type="date" value={entrance.date} onChange={(event) => setEntrance("date", event.target.value)} />
          </label>}
        </>}
        {item.edit === "background" && <>
          <label className="hub-field">Degree title
            <input value={draft.degree} onChange={(event) => set("degree", event.target.value)} />
          </label>
          <label className="hub-field">Current subject or major
            <input value={draft.currentSubject} onChange={(event) => set("currentSubject", event.target.value)} />
          </label>
        </>}
      </div>
      {item.edit === "background" && <p>Subject fit still needs an individual check after these details are updated.</p>}
      <div className="hub-readiness-edit-actions">
        <button type="button" className="hub-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="hub-btn hub-btn-primary">Update profile</button>
      </div>
    </form>
  );
}

export function ReadinessReview({
  program, profile, onProfileSave,
}: {
  program: Program;
  profile: Profile;
  onProfileSave: (profile: Profile) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const readiness = programReadiness(program, profile);
  useEffect(() => {
    if (!open && !editing) return;
    const closeOutside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(`[data-readiness-id="${open || editing}"]`)) {
        setOpen(null);
        setEditing(null);
      }
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        setEditing(null);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [open, editing]);
  return <section className="hub-readiness" aria-labelledby="hub-readiness-title">
    <div className="hub-readiness-head">
      <div>
        <p className="hub-section-kicker">01 / PROGRAM REQUIREMENTS</p>
        <h2 id="hub-readiness-title">Program Requirements</h2>
        <p>Check your background and test scores. Hover or tap an icon for details.</p>
      </div>
    </div>
    <div className="hub-readiness-checks">
        <div className="hub-readiness-icons" aria-label="Application requirements">
          {readiness.items.map((item) => <div className={`hub-readiness-icon is-${item.status} ${open === item.id || editing === item.id ? "is-open" : ""}`} data-readiness-id={item.id} key={item.id}>
            <button type="button" className="hub-readiness-trigger" aria-label={`${item.title}: ${statusText[item.status]}`} aria-expanded={open === item.id || editing === item.id} aria-controls={`hub-readiness-popover-${item.id}`} onClick={(event) => { const closing = open === item.id && !editing; setOpen(closing ? null : item.id); setEditing(null); setNotice(""); if (closing) event.currentTarget.blur(); }}>
              <RequirementIcon id={item.id} />
              <span className="hub-readiness-symbol" aria-hidden="true">{statusSymbol[item.status]}</span>
            </button>
            <div className="hub-readiness-popover" id={`hub-readiness-popover-${item.id}`} role="group" aria-label={`${item.title} details`}>
              <div className="hub-readiness-popover-head"><strong>{item.title}</strong><span className={`hub-readiness-state is-${item.status}`}>{statusSymbol[item.status]} {statusText[item.status]}</span></div>
              {!editing || editing !== item.id ? <>
                <dl><div><dt>Required</dt><dd>{item.required}</dd></div><div><dt>Your profile</dt><dd>{item.current}</dd></div></dl>
                <p>{item.detail}</p>
                <button type="button" className="hub-btn hub-readiness-update" onClick={() => { setOpen(item.id); setEditing(item.id); }}>Update profile</button>
              </> : <ReadinessEditor key={item.id} item={item} program={program} profile={profile} onCancel={() => setEditing(null)} onSave={(next) => { onProfileSave(next); setEditing(null); setOpen(null); setNotice("Profile updated. Readiness refreshed across your programs."); }} />}
            </div>
          </div>)}
        </div>
        <p className="hub-readiness-note">Score covers measurable checks; subject fit needs confirmation. Verify requirements with the university.</p>
    </div>
    <div className="hub-requirements-score">
        <div
          className="hub-requirements-ring"
          role="progressbar"
          aria-label="Measurable requirements met"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={readiness.score.percent}
          style={{ background: `conic-gradient(var(--sa-purple) ${readiness.score.percent}%, #e9e3ec 0)` }}
        >
          <span>{readiness.score.percent}<small>%</small></span>
        </div>
        <small>{readiness.score.met} of {readiness.score.total} checks met</small>
    </div>
    {notice && <p className="hub-readiness-saved" role="status">{notice}</p>}
  </section>;
}
