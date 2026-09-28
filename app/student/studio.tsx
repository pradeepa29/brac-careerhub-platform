"use client";
import { useState } from "react";
import { initialDocuments, programs, tools, type DocumentRecord, type ToolType } from "./data";
import { Heading, Empty, Icon } from "./ui";

export type ReviewRecord = {
  id: string;
  documentId: string;
  content: string;
  score: number;
  notes: string[];
  createdAt: string;
};
export const initialReviews: ReviewRecord[] = [
  {
    id: "seed-review-glasgow",
    documentId: "seed-sop",
    content: initialDocuments.find((document) => document.id === "seed-sop")!.content,
    score: 74,
    notes: [
      "The study direction is clear; add a specific project and your own contribution.",
      "Connect your reasons for Glasgow to parts of its curriculum.",
      "Confirm every program detail before using this statement.",
    ],
    createdAt: "2026-09-25T14:00:00Z",
  },
  {
    id: "seed-review-adelaide",
    documentId: "seed-sop-adelaide",
    content: initialDocuments.find((document) => document.id === "seed-sop-adelaide")!.content,
    score: 68,
    notes: [
      "Give a concrete example of analytical work, including methods and results.",
      "Explain how your business background connects to the data science curriculum.",
    ],
    createdAt: "2026-09-24T11:20:00Z",
  },
  {
    id: "seed-review-cv",
    documentId: "seed-cv",
    content: initialDocuments.find((document) => document.id === "seed-cv")!.content,
    score: 81,
    notes: [
      "The education section is easy to scan.",
      "Replace placeholders with verifiable projects, skills and outcomes.",
    ],
    createdAt: "2026-09-21T09:15:00Z",
  },
  {
    id: "seed-review-lor",
    documentId: "seed-lor",
    content: initialDocuments.find((document) => document.id === "seed-lor")!.content,
    score: 72,
    notes: [
      "The brief identifies the target program and the referee's role.",
      "Add examples your referee can personally verify before sharing it.",
    ],
    createdAt: "2026-09-19T13:30:00Z",
  },
];
export type StudioTab = ToolType | "Review";
const tabs: { id: StudioTab; label: string; sub: string }[] = [
  { id: "SOP", label: "SOP", sub: "Statements of purpose" },
  { id: "LOR", label: "LOR", sub: "Recommendation briefs" },
  { id: "CV", label: "CV", sub: "Academic CVs" },
  { id: "Review", label: "Review", sub: "Document feedback" },
];
export function DocumentStudio({
  documents,
  reviews,
  tab,
  setTab,
  onCreate,
  onOpen,
  onReview,
  onNewReview,
}: {
  documents: DocumentRecord[];
  reviews: ReviewRecord[];
  tab: StudioTab;
  setTab: (tab: StudioTab) => void;
  onCreate: (type: ToolType) => void;
  onOpen: (id: string) => void;
  onReview: (id: string) => void;
  onNewReview: () => void;
}) {
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState("all");
  const shown = documents.filter(
    (d) =>
      d.type === tab &&
      (scope === "all" ||
        (scope === "general"
          ? !d.programId
          : scope === "program"
            ? !!d.programId
            : d.programId === scope)) &&
      `${d.title} ${programs.find((p) => p.id === d.programId)?.name || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const reviewRows = reviews.filter((r) =>
    documents
      .find((d) => d.id === r.documentId)
      ?.title.toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <>
      <Heading
        title="Document Studio"
        copy="Pick up a draft where you left off, or start a general document."
      />
      <div
        className="hub-studio-categories"
        role="tablist"
        aria-label="Document categories"
      >
        {tabs.map((item) => (
          <button
            title={item.sub}
            role="tab"
            onKeyDown={(event) => {
              const directions = ["ArrowLeft", "ArrowRight", "Home", "End"];
              if (!directions.includes(event.key)) return;
              event.preventDefault();
              const index = tabs.findIndex((t) => t.id === item.id);
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? tabs.length - 1
                    : (index +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        tabs.length) %
                      tabs.length;
              setTab(tabs[next].id);
              (
                event.currentTarget.parentElement?.children[
                  next
                ] as HTMLButtonElement
              )?.focus();
            }}
            aria-selected={tab === item.id}
            tabIndex={
              tab === item.id || (tab === "Essay" && item.id === "SOP") ? 0 : -1
            }
            className={tab === item.id ? "active" : ""}
            key={item.id}
            onClick={() => setTab(item.id)}
          >
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
      <div className="hub-studio-list-head">
        <div>
          <h2>
            {tab === "Review"
              ? "Previous reviews"
              : `${tools.find((t) => t.id === tab)?.name} documents`}
          </h2>
          <p>
            {tab === "Review"
              ? `${reviewRows.length} saved illustrative review${reviewRows.length === 1 ? "" : "s"}`
              : `${shown.length} document${shown.length === 1 ? "" : "s"} in this section`}
          </p>
        </div>
        <button
          className="hub-btn hub-btn-primary"
          onClick={() => (tab === "Review" ? onNewReview() : onCreate(tab))}
        >
          {tab === "Review" ? "+ Start review" : `+ New ${tab}`}
        </button>
      </div>
      <div className="hub-studio-filters">
        <label className="hub-search">
          <Icon name="search" />
          <input
            aria-label="Search studio items"
            placeholder="Search documents…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        {tab !== "Review" && (
          <select
            aria-label="Document context"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="all">All documents</option>
            <option value="program">Program documents</option>
            <option value="general">General documents</option>
            {programs
              .filter((p) => documents.some((d) => d.programId === p.id))
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.university} · {p.name}
                </option>
              ))}
          </select>
        )}
      </div>
      {tab === "Review" ? (
        reviewRows.length ? (
          <div className="hub-studio-rows">
            {reviewRows.map((r) => {
              const doc = documents.find((d) => d.id === r.documentId);
              return (
                <button
                  className="hub-studio-row"
                  key={r.id}
                  onClick={() => onReview(r.documentId)}
                >
                  <Icon name="documents" />
                  <span>
                    <strong>{doc?.title || "Document review"}</strong>
                    <small>
                      Illustrative review ·{" "}
                      {new Date(r.createdAt).toLocaleDateString()} ·{" "}
                      {doc?.content === r.content
                        ? "Current draft"
                        : "Draft changed since review"}
                    </small>
                  </span>
                  <b>{r.score}/100</b>
                </button>
              );
            })}
          </div>
        ) : (
          <Empty
            title="No reviews yet"
            copy="Review a draft to see sample feedback here."
          />
        )
      ) : shown.length ? (
        <div className="hub-studio-rows">
          <div className="hub-file-table-head" aria-hidden="true">
            <span />
            <span>Document name</span>
            <span>Program</span>
            <span>Status</span>
            <span>Last edited</span>
          </div>
          {shown.map((d) => (
            <button
              className="hub-studio-row hub-file-row"
              key={d.id}
              onClick={() => onOpen(d.id)}
            >
              <Icon name="documents" />
              <span className="hub-file-name">{d.title}</span>
              <span className="hub-file-context">
                {d.programId
                  ? programs.find((p) => p.id === d.programId)?.university
                  : "General document"}
              </span>
              <span className="hub-file-status">{d.status}</span>
              <span className="hub-file-date">
                {d.updatedAt
                  ? new Date(d.updatedAt).toLocaleDateString()
                  : "Preset draft"}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <Empty
          title="No documents in this view"
          copy="Create a document or change the search and context filters."
        />
      )}
      {tab !== "Review" && (
        <div className="hub-studio-extra">
          <button
            className="hub-text-btn"
            onClick={() => setTab(tab === "Essay" ? "SOP" : "Essay")}
          >
            {tab === "Essay"
              ? "← Back to SOP documents"
              : "View scholarship essays →"}
          </button>
        </div>
      )}
    </>
  );
}

export function ReviewWorkspace({
  documents,
  reviews,
  initialDocumentId,
  programId,
  onBack,
  onOpen,
  onReviewed,
}: {
  documents: DocumentRecord[];
  reviews: ReviewRecord[];
  initialDocumentId: string | null;
  programId: string | null;
  onBack: () => void;
  onOpen: (id: string) => void;
  onReviewed: (review: ReviewRecord) => void;
}) {
  const available = documents.filter(
    (d) => !programId || d.programId === programId,
  );
  const [id, setId] = useState(initialDocumentId || available[0]?.id || "");
  const doc = available.find((d) => d.id === id);
  const recent = [...reviews].reverse().find((r) => r.documentId === id);
  const [current, setCurrent] = useState<ReviewRecord | undefined>(recent);
  const run = () => {
    if (!doc) return;
    const content = doc.content;
    const words = content.trim().split(/\s+/).length;
    const evidence =
      /project|research|intern|work|led|achiev|result|impact|experience/i.test(
        content,
      );
    const goal = /goal|future|career|plan|aspir|contribute/i.test(content);
    const score = Math.min(
      92,
      54 + (words > 180 ? 12 : 5) + (evidence ? 10 : 0) + (goal ? 8 : 0),
    );
    const notes = [
      words < 180
        ? "Develop the examples with your role and a concrete outcome."
        : "The draft has useful detail; check that every example supports its purpose.",
      evidence
        ? "Relevant experience is mentioned. Make your own contribution clear."
        : "Add a real project or experience that supports your application.",
      goal
        ? "Your future direction is present. Link it more closely to the program."
        : "State what you hope to do after the program.",
      "Check facts, requirements and program-specific details before using this draft.",
    ];
    const result = {
      id: crypto.randomUUID(),
      documentId: id,
      content,
      score,
      notes,
      createdAt: new Date().toISOString(),
    };
    onReviewed(result);
    setCurrent(result);
  };
  return (
    <>
      <button className="hub-back" onClick={onBack}>
        ← {programId ? "Program preparation" : "Document Studio"}
      </button>
      <Heading
        eyebrow="STEP 02 · REVIEW"
        title="Review your documents"
        copy="Get illustrative feedback and return to the tool page to revise your draft."
      />
      <div className="hub-review-layout">
        <section className="hub-panel">
          <label className="hub-field">
            Choose a draft
            <select
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setCurrent(
                  [...reviews]
                    .reverse()
                    .find((r) => r.documentId === e.target.value),
                );
              }}
            >
              <option value="">Select a document</option>
              {available.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </label>
          {doc ? (
            <>
              <div className="hub-review-paper">
                <pre>{doc.content}</pre>
              </div>
              <div className="hub-editor-actions">
                <span>
                  {doc.type} · Version {doc.version}
                </span>
                <button className="hub-btn" onClick={() => onOpen(doc.id)}>
                  Edit document
                </button>
                <button className="hub-btn hub-btn-primary" onClick={run}>
                  Run sample review
                </button>
              </div>
            </>
          ) : (
            <Empty
              title="A draft comes first"
              copy="Create a document to preview review feedback."
            />
          )}
        </section>
        <section className="hub-panel hub-review-feedback">
          <h2>Feedback</h2>
          {current ? (
            <>
              <div className="hub-review-score">
                <b>{current.score}</b>
                <span>/100 · Illustrative score</span>
              </div>
              {current.content !== doc?.content && (
                <p className="hub-demo-note">
                  This document changed after the review. Run a new review for
                  the current draft.
                </p>
              )}
              <ol>
                {current.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ol>
              <button
                className="hub-btn"
                disabled={!doc}
                onClick={() => doc && onOpen(doc.id)}
              >
                Revise document
              </button>
            </>
          ) : (
            <div className="hub-tool-empty">
              <h3>Ready to review</h3>
              <p>
                Select a draft and run a sample review. This feedback is
                scripted for the demo.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
