"use client";

import Image from "next/image";
import { programImage } from "./program-images";
import { useRef } from "react";
import {
  daysUntilDeadline,
  formatDate,
  programProgress,
  universityScholarships,
  type DocumentRecord,
  type Program,
  type Profile,
  type ToolType,
} from "./data";
import { Heading } from "./ui";
import { programReadiness } from "./readiness";
import { ReadinessReview } from "./readiness-review";

function Deadline({ program }: { program: Program }) {
  const days = daysUntilDeadline(program.deadline);
  return (
    <span className={days < 30 ? "hub-deadline-soon" : ""}>
      {days < 0
        ? "Deadline passed"
        : days === 0
          ? "Due today"
          : `${days} day${days === 1 ? "" : "s"} left`}
    </span>
  );
}

export function MyProgramRow({
  program,
  documents,
  uploads,
  profile,
  onOpen,
}: {
  program: Program;
  documents: DocumentRecord[];
  uploads: Record<string, string>;
  profile: Profile;
  onOpen: () => void;
}) {
  const progress = programProgress(program, documents, uploads);
  const readiness = programReadiness(program, profile);
  const missing = progress.missing
    .slice(0, 2)
    .map((item) => item.remaining > 1 ? `${item.title} ×${item.remaining}` : item.title)
    .join(" · ");
  return (
    <button className="hub-my-program" onClick={onOpen} aria-label={`Open ${program.name} workspace`}>
      <span className="hub-my-program-image" aria-hidden="true">
        <Image src={programImage(program)} alt="" fill sizes="(max-width: 600px) 88px, 120px" />
      </span>
      <span className="hub-my-program-main">
        <span className="hub-row-country">{program.country} · {program.level}</span>
        <strong>{program.name}</strong>
        <span className="hub-my-program-uni">{program.university}</span>
        <span className="hub-my-progress-track" role="progressbar" aria-label="Documents prepared" aria-valuenow={progress.prepared} aria-valuemin={0} aria-valuemax={progress.slots}>
          <span style={{ width: `${(progress.prepared / progress.slots) * 100}%` }} />
        </span>
        <span className="hub-my-program-missing">
          {progress.missing.length
            ? `Next: ${missing}${progress.missing.length > 2 ? ` · +${progress.missing.length - 2} more` : ""}`
            : "All requested documents prepared"}
        </span>
        <span className="hub-my-program-readiness">
          {readiness.score.met} of {readiness.score.total} program requirements met
        </span>
      </span>
      <span className="hub-my-program-end">
        <span className="hub-my-program-deadline"><Deadline program={program} /><small>{formatDate(program.deadline)}</small></span>
        <span className="hub-my-program-count"><b>{progress.prepared}/{progress.slots}</b> documents prepared</span>
        <span className="hub-my-program-open">Open workspace <span aria-hidden="true">→</span></span>
      </span>
    </button>
  );
}

export function ProgramWorkspace({
  program,
  documents,
  uploads,
  profile,
  onUpload,
  onProfileSave,
  onBack,
  onTool,
  onDocument,
  onReview,
  onConsult,
}: {
  program: Program;
  documents: DocumentRecord[];
  uploads: Record<string, string>;
  profile: Profile;
  onUpload: (id: string, filename: string) => void;
  onProfileSave: (profile: Profile) => void;
  onBack: () => void;
  onTool: (tool: ToolType) => void;
  onDocument: (id: string) => void;
  onReview: () => void;
  onConsult: () => void;
}) {
  const progress = programProgress(program, documents, uploads);
  const scholarships = universityScholarships(program);
  const scholarshipRail = useRef<HTMLDivElement>(null);
  return (
    <div className="hub-program-workspace">
      <button className="hub-back" onClick={onBack}>← My Programs</button>
      <Heading eyebrow="APPLICATION WORKSPACE" title={program.name} copy={program.university} />
      <div className="hub-workspace-brief" aria-label="Application status">
        <div><small>Application deadline</small><strong><Deadline program={program} /></strong><span>{formatDate(program.deadline)}</span></div>
        <div><small>Documents prepared</small><strong>{progress.prepared} of {progress.slots}</strong><span>{progress.complete} of {progress.total} requirements complete</span></div>
        <div><small>Still needed</small><strong>{progress.slots - progress.prepared}</strong><span>{progress.missing.length ? progress.missing.slice(0, 2).map((item) => item.title).join(" · ") : "Ready for document review"}</span></div>
      </div>

      <ReadinessReview
        program={program}
        profile={profile}
        onProfileSave={onProfileSave}
      />

      <section className="hub-preparation" aria-labelledby="hub-preparation-title">
        <div className="hub-preparation-head">
          <div>
            <p className="hub-section-kicker">02 / DOCUMENTS</p>
            <h2 id="hub-preparation-title">Prepare documents</h2>
            <p>Work through the documents requested for this program. Started items move to the top, so you can pick up where you left off.</p>
          </div>
          <span>{progress.complete} of {progress.total} complete</span>
        </div>
        <ol className="hub-document-timeline">
          {progress.ordered.map((requirement, index) => {
            const drafts = requirement.tool
              ? documents.filter((document) => document.programId === program.id && document.type === requirement.tool)
              : [];
            return (
              <li className={`hub-document-step ${requirement.started ? "is-started" : "is-pending"}`} key={requirement.id}>
                <span className="hub-timeline-rail" aria-hidden="true">
                  <span className="hub-timeline-node">{requirement.complete ? "✓" : String(index + 1).padStart(2, "0")}</span>
                  {index < progress.ordered.length - 1 && <span className={`hub-timeline-line ${requirement.started ? "is-solid" : "is-dotted"}`} />}
                </span>
                <div className="hub-document-step-content">
                  <div className="hub-document-step-head">
                    <div>
                      <h3>{requirement.title}</h3>
                      <p>{requirement.note}</p>
                      <span className="hub-document-status">
                        {requirement.complete ? "Prepared" : requirement.started ? "In progress" : "Not started"}
                        {requirement.count > 1 && ` · ${Math.min(requirement.current, requirement.count)} of ${requirement.count} ${requirement.kind === "draft" ? "drafts" : "files"}`}
                      </span>
                    </div>
                    {requirement.tool ? (
                      <button className="hub-btn" onClick={() => onTool(requirement.tool!)}>
                        {drafts.length ? "New draft" : "Create draft"}
                      </button>
                    ) : (
                      <label className="hub-btn hub-upload-action">
                        {uploads[requirement.id] ? "Replace file" : "Choose file"}
                        <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) onUpload(requirement.id, file.name);
                          event.target.value = "";
                        }} />
                      </label>
                    )}
                  </div>
                  {drafts.length > 0 && (
                    <div className="hub-draft-list">
                      {drafts.map((draft) => (
                        <button className="hub-draft-row" key={draft.id} onClick={() => onDocument(draft.id)}>
                          <span className="hub-draft-title">{draft.title}</span>
                          <span className="hub-draft-meta">{draft.status}{draft.updatedAt ? ` · Edited ${formatDate(draft.updatedAt.slice(0, 10))}` : ""}</span>
                          <span className="hub-draft-open">Open draft →</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {uploads[requirement.id] && <div className="hub-uploaded-file"><span>Selected file</span><strong>{uploads[requirement.id]}</strong><small>Available during this demo session</small></div>}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="hub-next-stages" aria-label="Next application steps">
        <div><span>03 / REVIEW</span><h2>Review your documents</h2><p>Get illustrative AI feedback, then return to a draft to revise it.</p><button className="hub-btn hub-btn-primary" onClick={onReview}>Review documents</button></div>
        <div><span>04 / OPTIONAL</span><h2>Consult an expert</h2><p>Speak one-to-one with a Career Hub consultant when you want another perspective.</p><button className="hub-btn" onClick={onConsult}>Find a consultant</button></div>
      </section>

      <section className="hub-university-scholarships" aria-labelledby="hub-scholarships-title">
        <div className="hub-scholarships-head">
          <div>
            <p className="hub-section-kicker">FUNDING OPTIONS</p>
            <h2 id="hub-scholarships-title">Scholarships</h2>
            <p>Scholarships listed across programs at {program.university}.</p>
          </div>
          {scholarships.length > 1 && <div className="hub-scholarships-controls">
            <button type="button" aria-label="Scroll scholarships left" onClick={() => scholarshipRail.current?.scrollBy({ left: -330, behavior: "smooth" })}>←</button>
            <button type="button" aria-label="Scroll scholarships right" onClick={() => scholarshipRail.current?.scrollBy({ left: 330, behavior: "smooth" })}>→</button>
          </div>}
        </div>
        {scholarships.length ? <div className="hub-scholarship-rail" ref={scholarshipRail} role="region" aria-label={`${program.university} scholarships`}>
          {scholarships.map((scholarship) => <article className="hub-scholarship-card" key={`${scholarship.name}-${scholarship.funding}`}>
            <span className="hub-scholarship-context">{scholarship.forThisProgram ? "Listed for this program" : `Listed for ${scholarship.programNames.join(" · ")}`}</span>
            <h3>{scholarship.name}</h3>
            <strong>{scholarship.funding}</strong>
            <p>{scholarship.description}</p>
            <div className="hub-scholarship-deadline"><span>Scholarship deadline</span><b>{formatDate(scholarship.deadline)}</b></div>
          </article>)}
        </div> : <p className="hub-scholarships-empty">No scholarships are listed for this university in the demo.</p>}
        <p className="hub-scholarships-note">Funding details are illustrative. Check each award’s eligibility with the university.</p>
      </section>
    </div>
  );
}
