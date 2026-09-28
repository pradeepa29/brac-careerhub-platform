"use client";
import { useEffect, useState } from "react";
import {
  makeContent,
  programs,
  tools,
  type DocumentRecord,
  type Profile,
  type Program,
  type ToolType,
} from "./data";
import { Heading } from "./ui";
import { DocumentPaper } from "../shared/document-paper";

type Answers = {
  background: string;
  experience: string;
  motivation: string;
  goals: string;
};
const questions: Record<ToolType, [string, string, string, string]> = {
  SOP: [
    "Academic background",
    "Relevant work, projects or achievements",
    "Why this program or field?",
    "Study and career goals",
  ],
  LOR: [
    "Referee and their relationship to you",
    "Work the referee has observed",
    "Strengths the referee could discuss",
    "Purpose of the recommendation",
  ],
  CV: [
    "Education and qualifications",
    "Experience and projects",
    "Skills and achievements",
    "Professional direction",
  ],
  Essay: [
    "Scholarship prompt or theme",
    "Leadership and contribution",
    "Why funding matters",
    "Future impact",
  ],
};
function startingAnswers(
  type: ToolType,
  profile: Profile,
  program?: Program,
): Answers {
  const target = program
    ? `${program.name} at ${program.university}`
    : `${profile.level} study in ${profile.fields[0] || "my chosen field"}`;
  if (type === "LOR")
    return {
      background: "[Add the referee's name, role and relationship to you.]",
      experience: `I study ${profile.currentSubject} at ${profile.institution}. [Add work this referee has personally observed.]`,
      motivation:
        "[Add a specific strength and an example the referee can confirm.]",
      goals: `This recommendation supports my application for ${target}.`,
    };
  if (type === "CV")
    return {
      background: `${profile.institution} — ${profile.degree}; CGPA ${profile.gpa}/${profile.scale}; expected graduation ${profile.graduation}.`,
      experience:
        "[Add your real projects, internships, responsibilities and results.]",
      motivation: "[Add skills and achievements you can demonstrate.]",
      goals: `Interested in ${target}.`,
    };
  return {
    background: `I study ${profile.currentSubject} at ${profile.institution}, with a CGPA of ${profile.gpa}/${profile.scale}.`,
    experience:
      "[Add a real project, responsibility, contribution and outcome.]",
    motivation: program
      ? `I am interested in ${program.name} at ${program.university}. [Add specific reasons.]`
      : "I am interested in continuing my studies. [Add your own reasons.]",
    goals:
      "I want to build knowledge and practical skills for my future work. [Make this goal your own.]",
  };
}

export function ToolWorkspace({
  type,
  programId,
  document,
  profile,
  onBack,
  onSave,
  onReview,
}: {
  type: ToolType;
  programId: string | null;
  document?: DocumentRecord;
  profile: Profile;
  onBack: () => void;
  onSave: (doc: DocumentRecord) => void;
  onReview: (id: string) => void;
}) {
  const program = programs.find((p) => p.id === programId);
  const [answers, setAnswers] = useState(() =>
    startingAnswers(type, profile, program),
  );
  const [active, setActive] = useState<DocumentRecord | undefined>(document);
  const [title, setTitle] = useState(
    document?.title ||
      `${program?.university.replace("University of ", "") || "General"} · ${tools.find((t) => t.id === type)?.name}`,
  );
  const [text, setText] = useState(document?.content || "");
  const [viewVersion, setViewVersion] = useState(document?.version || 1);
  const [stream, setStream] = useState<string | null>(null);
  const [visible, setVisible] = useState(0);
  const [tab, setTab] = useState<"inputs" | "document">(
    document ? "document" : "inputs",
  );
  const [mode, setMode] = useState<"Edit" | "Preview">("Edit");
  const [notice, setNotice] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [template, setTemplate] = useState("Classic");
  useEffect(() => {
    if (stream === null || visible >= stream.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setVisible(stream.length));
      return () => cancelAnimationFrame(frame);
    }
    const timer = window.setTimeout(
      () => setVisible((n) => Math.min(n + 5, stream.length)),
      18,
    );
    return () => window.clearTimeout(timer);
  }, [stream, visible]);
  const finished = stream !== null && visible >= stream.length;
  const viewedText =
    active && viewVersion !== active.version
      ? active.history.find((h) => h.version === viewVersion)?.content || text
      : text;
  const output = stream !== null ? stream.slice(0, visible) : viewedText;
  const update = (key: keyof Answers, value: string) =>
    setAnswers((a) => ({ ...a, [key]: value }));
  const generate = () => {
    const notes = [
      answers.background,
      answers.experience,
      answers.motivation,
      answers.goals,
    ]
      .filter(Boolean)
      .join("\n\n");
    const content = makeContent(type, profile, program, notes);
    const doc: DocumentRecord = active
      ? {
          ...active,
          content,
          title,
          version: active.version + 1,
          history: [
            ...active.history,
            { version: active.version, content: active.content },
          ],
          status: "Draft",
          updatedAt: new Date().toISOString(),
        }
      : {
          id: crypto.randomUUID(),
          title,
          type,
          programId,
          content,
          version: 1,
          history: [],
          status: "Draft",
          updatedAt: new Date().toISOString(),
        };
    setActive(doc);
    setText(content);
    setViewVersion(doc.version);
    setStream(content);
    setVisible(0);
    setTab("document");
    setMode("Preview");
    onSave(doc);
    setNotice("Generating an illustrative sample from your inputs…");
  };
  const editContent = (value: string) => {
    setText(value);
    if (active) {
      const updated = {
        ...active,
        content: value,
        title,
        updatedAt: new Date().toISOString(),
      };
      setActive(updated);
      onSave(updated);
    }
  };
  const editTitle = (value: string) => {
    setTitle(value);
    if (active) {
      const updated = {
        ...active,
        title: value,
        updatedAt: new Date().toISOString(),
      };
      setActive(updated);
      onSave(updated);
    }
  };
  return (
    <div className="hub-tool-page">
      <button className="hub-back" onClick={onBack}>
        ← {program ? program.name : "Document Studio"}
      </button>
      <Heading
        eyebrow="DOCUMENT WORKSPACE"
        title={tools.find((t) => t.id === type)?.name || type}
        copy={
          program
            ? `${program.university} · ${program.country}`
            : "General document · independent of any program"
        }
        action={
          <span className="hub-badge">
            {active ? `Version ${active.version}` : "New draft"}
          </span>
        }
      />
      {program && (
        <div className="hub-tool-context">
          <strong>{program.name}</strong>
          <span>
            {program.university} · {program.level} · {program.intake}
          </span>
        </div>
      )}
      <div className="hub-tool-mobile-tabs">
        <button
          className={tab === "inputs" ? "active" : ""}
          onClick={() => setTab("inputs")}
        >
          Inputs
        </button>
        <button
          className={tab === "document" ? "active" : ""}
          onClick={() => setTab("document")}
        >
          Document
        </button>
      </div>
      <div
        className={`hub-tool-split ${collapsed ? "hub-tool-collapsed" : ""}`}
      >
        <section
          className={`hub-tool-pane hub-tool-inputs ${tab !== "inputs" ? "hub-tool-mobile-hidden" : ""}`}
        >
          <header>
            <div>
              <h2>Questionnaire</h2>
              <p>Prefilled for the demo. Edit freely before generating.</p>
            </div>
            <button
              className="hub-text-btn hub-collapse"
              onClick={() => setCollapsed(true)}
            >
              Collapse
            </button>
          </header>
          <div className="hub-tool-pane-scroll">
            {(["background", "experience", "motivation", "goals"] as const).map(
              (key, i) => (
                <label className="hub-field" key={key}>
                  {questions[type][i]}
                  <textarea
                    rows={5}
                    value={answers[key]}
                    onChange={(e) => update(key, e.target.value)}
                  />
                </label>
              ),
            )}
            <button className="hub-btn hub-btn-primary" onClick={generate}>
              {active ? "Generate another version" : "Generate sample draft"}
            </button>
            <p className="hub-footnote">
              Illustrative demo output. Check facts and replace bracketed
              prompts with your own details.
            </p>
          </div>
        </section>
        <section
          className={`hub-tool-pane hub-tool-output ${tab !== "document" ? "hub-tool-mobile-hidden" : ""}`}
        >
          <header>
            <div>
              <h2>Your document</h2>
              <p>
                {stream !== null && !finished
                  ? "Generating your sample draft…"
                  : active
                    ? "Changes stay in this demo session"
                    : "Your generated draft will appear here"}
              </p>
            </div>
            {collapsed && (
              <button
                className="hub-text-btn"
                onClick={() => setCollapsed(false)}
              >
                Show inputs
              </button>
            )}
          </header>
          <div className="hub-tool-pane-scroll">
            {active ? (
              <>
                <div className="hub-editor-top">
                  <input
                    aria-label="Document title"
                    value={title}
                    onChange={(e) => editTitle(e.target.value)}
                  />
                  <span className="hub-badge">{active.status}</span>
                </div>
                <div className="hub-editor-toolbar">
                  <div className="hub-segmented">
                    <button
                      className={mode === "Edit" ? "active" : ""}
                      onClick={() => {
                        setMode("Edit");
                        setStream(null);
                        setViewVersion(active.version);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={mode === "Preview" ? "active" : ""}
                      onClick={() => setMode("Preview")}
                    >
                      Preview
                    </button>
                  </div>
                  {type === "CV" && (
                    <label>
                      Template{" "}
                      <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                      >
                        <option>Classic</option>
                        <option>Modern</option>
                        <option>Minimal</option>
                      </select>
                    </label>
                  )}
                  <select
                    aria-label="Document version"
                    value={viewVersion}
                    onChange={(e) => {
                      const version = Number(e.target.value);
                      setViewVersion(version);
                      setStream(null);
                      setMode("Preview");
                      setNotice(
                        `Viewing version ${version}. Select Edit to return to the current draft.`,
                      );
                    }}
                  >
                    <option value={active.version}>
                      Version {active.version}
                    </option>
                    {active.history.map((h) => (
                      <option key={h.version} value={h.version}>
                        Version {h.version}
                      </option>
                    ))}
                  </select>
                </div>
                <DocumentPaper
                  value={mode === "Edit" && stream === null ? text : output}
                  editing={mode === "Edit" && stream === null}
                  onChange={editContent}
                  label="Document content"
                  template={template.toLowerCase()}
                  streaming={stream !== null && !finished}
                />
                <div className="hub-editor-actions">
                  <span>
                    {output.trim() ? output.trim().split(/\s+/).length : 0}{" "}
                    words
                  </span>
                  <button
                    className="hub-btn"
                    onClick={async () => {
                      await navigator.clipboard.writeText(output);
                      setNotice("Copied to clipboard.");
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="hub-btn"
                    onClick={() => {
                      const url = URL.createObjectURL(
                        new Blob([output], { type: "text/plain" }),
                      );
                      const a = window.document.createElement("a");
                      a.href = url;
                      a.download = `${title.replace(/[^a-z0-9 -]/gi, "") || "document"}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Download
                  </button>
                  <button
                    className="hub-btn"
                    disabled={!finished && stream !== null}
                    onClick={() => onReview(active.id)}
                  >
                    Review draft
                  </button>
                </div>
              </>
            ) : (
              <div className="hub-tool-empty">
                <h3>Ready when you are</h3>
                <p>
                  Work through the prefilled questions, then generate a sample
                  draft.
                </p>
              </div>
            )}
            <p className="hub-inline-notice" role="status">
              {finished
                ? "Sample ready. You can edit it or review it."
                : notice}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
