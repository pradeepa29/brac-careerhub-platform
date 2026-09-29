"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  programs,
  initialProfile,
  initialDocuments,
  profileFilters,
  updateFiltersFromProfile,
  emptyFilters,
  addProgram,
  statuses,
  formatDate,
  programProgress,
  type Profile,
  type DocumentRecord,
  type ToolType,
} from "./data";
import { Heading, Empty, Icon, Modal } from "./ui";
import { Catalog, ProgramDetail } from "./programs";
import { AiBasedMatch } from "./match";
import { MyProgramRow, ProgramWorkspace } from "./program-workspace";
import {
  DocumentStudio,
  initialReviews,
  ReviewWorkspace,
  type ReviewRecord,
  type StudioTab,
} from "./studio";
import { ToolWorkspace } from "./tool-workspace";
import { MyProfile } from "./profile";
import { SupportActions } from "./legacy-panels";
import { StudyAbroadEntry } from "./entry";
import "./workspace.css";
import "./workspace-surfaces.css";

type Page =
  | "catalog"
  | "match"
  | "programs"
  | "documents"
  | "tracker"
  | "profile"
  | "tool"
  | "review";
const navigation: { heading: string; items: { id: Page; label: string }[] }[] =
  [
    {
      heading: "Explore",
      items: [
        { id: "catalog", label: "All Programs" },
        { id: "match", label: "AI Based Match" },
      ],
    },
    {
      heading: "Prepare Application",
      items: [
        { id: "programs", label: "My Programs" },
        { id: "documents", label: "Document Studio" },
      ],
    },
    {
      heading: "My Journey",
      items: [
        { id: "tracker", label: "Application Tracker" },
        { id: "profile", label: "My Profile" },
      ],
    },
  ];

export default function Workspace({
  exit,
  openCareerGuide,
}: {
  exit: () => void;
  openCareerGuide: () => void;
}) {
  const [entryComplete, setEntryComplete] = useState(false);
  const [page, setPage] = useState<Page>("catalog");
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [filters, setFilters] = useState(() => profileFilters(initialProfile));
  const [selected, setSelected] = useState([
    "glasgow-analytics",
    "adelaide-data",
    "ottawa-digital",
  ]);
  const [documents, setDocuments] =
    useState<DocumentRecord[]>(initialDocuments);
  const [reviews, setReviews] = useState<ReviewRecord[]>(initialReviews);
  const [studioTab, setStudioTab] = useState<StudioTab>("SOP");
  const [applications, setApplications] = useState<Record<string, string>>({
    "ottawa-digital": "Submitted",
    "adelaide-data": "Interview",
  });
  const [uploads, setUploads] = useState<Record<string, Record<string, string>>>({});
  const [detail, setDetail] = useState<string | null>(null);
  const [infoId, setInfoId] = useState<string | null>(null);
  const [toolSession, setToolSession] = useState<{
    type: ToolType;
    programId: string | null;
    documentId: string | null;
    returnPage: "programs" | "documents";
    returnProgramId: string | null;
  } | null>(null);
  const [reviewSession, setReviewSession] = useState<{
    programId: string | null;
    documentId: string | null;
    returnPage: "programs" | "documents" | "tool";
  } | null>(null);
  const [mobile, setMobile] = useState(false);
  const [notice, setNotice] = useState("");
  const [booked, setBooked] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    mainRef.current?.focus({ preventScroll: true });
  }, [page, detail, entryComplete]);
  const navigate = (next: Page) => {
    setPage(next);
    setDetail(null);
    setMobile(false);
    setNotice("");
  };
  const saveProfile = (next: Profile) => {
    setFilters((current) => updateFiltersFromProfile(current, profile, next));
    setProfile(next);
  };
  const selectProgram = (id: string) => {
    setSelected((ids) => addProgram(ids, id));
    setNotice("Added to My Programs. Your preparation workspace is ready.");
  };
  const openProgram = (id: string) => {
    setPage("programs");
    setDetail(id);
    setNotice("");
  };
  const openTool = (
    type: ToolType,
    programId: string | null,
    documentId: string | null = null,
    fromStudio = false,
  ) => {
    if (fromStudio) setStudioTab(type);
    setToolSession({
      type,
      programId,
      documentId,
      returnPage: fromStudio ? "documents" : "programs",
      returnProgramId: fromStudio ? null : programId,
    });
    setPage("tool");
    setDetail(null);
  };
  const openDocument = (id: string, fromStudio = false) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) openTool(doc.type, doc.programId, doc.id, fromStudio);
  };
  const openReview = (
    programId: string | null,
    documentId: string | null,
    returnPage: "programs" | "documents" | "tool",
  ) => {
    setReviewSession({ programId, documentId, returnPage });
    setPage("review");
    setDetail(null);
  };
  const activeProgram =
    page === "programs" ? programs.find((p) => p.id === detail) : undefined;
  const myPrograms = programs.filter((p) => selected.includes(p.id));
  const currentSection =
    page === "tool"
      ? toolSession?.returnPage
      : page === "review"
        ? reviewSession?.programId
          ? "programs"
          : "documents"
        : page;
  const nav = (
    <>
      <div className="hub-brand">
        <Image
          src="/careerhub-logo.png"
          width="112"
          height="68"
          alt="BRAC Career Hub"
        />
        <span>STUDY ABROAD</span>
      </div>
      <nav aria-label="Student navigation">
        {navigation.map((group) => (
          <section className="hub-nav-group" key={group.heading}>
            <h2>{group.heading}</h2>
            {group.items.map((item) => (
              <button
                key={item.id}
                aria-current={currentSection === item.id ? "page" : undefined}
                className={currentSection === item.id ? "active" : ""}
                onClick={() => navigate(item.id)}
              >
                <Icon name={item.id} />
                <span>{item.label}</span>
                {item.id === "programs" && <small>{selected.length}</small>}
              </button>
            ))}
          </section>
        ))}
      </nav>
      <div className="hub-sidebar-bottom">
        <button className="hub-account" onClick={() => navigate("profile")}>
          <Icon name="profile" />
          <span>
            <b>{profile.name}</b>
            <small>Student account</small>
          </span>
        </button>
        <button className="hub-home-link" onClick={exit}>
          ← Back to home
        </button>
        <small className="hub-session-label">
          Demo session · resets on refresh
        </small>
      </div>
    </>
  );
  if (!entryComplete) {
    return <StudyAbroadEntry exit={exit} onContinue={(name, email) => {
      setProfile((current) => ({ ...current, name, email }));
      setEntryComplete(true);
    }} />;
  }
  return (
    <main className="sa-portal hub">
      <a className="hub-skip-link" href="#student-content">
        Skip to content
      </a>
      <aside className="hub-sidebar">{nav}</aside>
      <div
        className={`hub-main${page === "catalog" ? " hub-main-catalog" : ""}`}
        id="student-content"
        tabIndex={-1}
        ref={mainRef}
      >
        <button
          className="hub-mobile-menu hub-btn"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          onClick={() => setMobile(true)}
        >
          <Icon name="menu" /> Menu
        </button>
        <div hidden={page !== "match"}>
          <AiBasedMatch
            active={page === "match"}
            profile={profile}
            selected={selected}
            onOpen={setInfoId}
            onAdd={selectProgram}
            onWorkspace={openProgram}
          />
        </div>
        {page === "match" ? null : page === "tool" && toolSession ? (
          <ToolWorkspace
            key={`${toolSession.type}-${toolSession.programId}-${toolSession.documentId}`}
            type={toolSession.type}
            programId={toolSession.programId}
            document={documents.find((d) => d.id === toolSession.documentId)}
            profile={profile}
            onBack={() => {
              setPage(toolSession.returnPage);
              setDetail(toolSession.returnProgramId);
            }}
            onSave={(doc) =>
              setDocuments((list) =>
                list.some((d) => d.id === doc.id)
                  ? list.map((d) => (d.id === doc.id ? doc : d))
                  : [doc, ...list],
              )
            }
            onReview={(id) => {
              setToolSession({ ...toolSession, documentId: id });
              openReview(toolSession.programId, id, "tool");
            }}
          />
        ) : page === "review" && reviewSession ? (
          <ReviewWorkspace
            key={`${reviewSession.programId}-${reviewSession.documentId}`}
            documents={documents}
            reviews={reviews}
            initialDocumentId={reviewSession.documentId}
            programId={reviewSession.programId}
            onBack={() => {
              setPage(reviewSession.returnPage);
              if (reviewSession.returnPage === "programs")
                setDetail(reviewSession.programId);
            }}
            onOpen={(id) => openDocument(id, !reviewSession.programId)}
            onReviewed={(review) => setReviews((list) => [...list, review])}
          />
        ) : activeProgram ? (
          <ProgramWorkspace
            key={activeProgram.id}
            program={activeProgram}
            documents={documents.filter(
              (d) => d.programId === activeProgram.id,
            )}
            uploads={uploads[activeProgram.id] || {}}
            profile={profile}
            onProfileSave={saveProfile}
            onUpload={(id, filename) =>
              setUploads((current) => ({
                ...current,
                [activeProgram.id]: { ...current[activeProgram.id], [id]: filename },
              }))
            }
            onBack={() => setDetail(null)}
            onTool={(type) => openTool(type, activeProgram.id)}
            onDocument={(id) => openDocument(id)}
            onReview={() => openReview(activeProgram.id, null, "programs")}
            onConsult={openCareerGuide}
          />
        ) : (
          <>
            {page === "catalog" && (
              <Catalog
                filters={filters}
                setFilters={setFilters}
                reset={() => setFilters(profileFilters(profile))}
                clear={() => setFilters({ ...emptyFilters })}
                selected={selected}
                onOpen={setInfoId}
                onAdd={selectProgram}
                onWorkspace={openProgram}
              />
            )}
            {page === "programs" && (
              <>
                <Heading
                  title="My Programs"
                  copy="The possibilities you’ve chosen. Make each application your own."
                  action={
                    <button
                      className="hub-btn"
                      onClick={() => navigate("catalog")}
                    >
                      Explore programs
                    </button>
                  }
                />
                <div className="hub-program-summary">
                  <article>
                    <b>{selected.length}</b>
                    <span>Selected programs</span>
                  </article>
                  <article>
                    <b>
                      {
                        documents.filter(
                          (d) => d.programId && selected.includes(d.programId),
                        ).length
                      }
                    </b>
                    <span>Program documents</span>
                  </article>
                  <article>
                    <b>
                      {
                        myPrograms.filter((program) =>
                          programProgress(
                            program,
                            documents,
                            uploads[program.id] || {},
                          ).complete ===
                          programProgress(
                            program,
                            documents,
                            uploads[program.id] || {},
                          ).total,
                        ).length
                      }
                    </b>
                    <span>Document checklists complete</span>
                  </article>
                </div>
                {myPrograms.length ? (
                  <div className="hub-program-grid">
                    {myPrograms.map((p) => (
                      <MyProgramRow
                        key={p.id}
                        program={p}
                        documents={documents}
                        uploads={uploads[p.id] || {}}
                        profile={profile}
                        onOpen={() => openProgram(p.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <Empty
                    title="Your shortlist starts with a possibility"
                    copy="Explore the catalog and add a program you’d like to prepare for."
                    action={
                      <button
                        className="hub-btn hub-btn-primary"
                        onClick={() => navigate("catalog")}
                      >
                        Explore programs
                      </button>
                    }
                  />
                )}
              </>
            )}
            {page === "documents" && (
              <DocumentStudio
                documents={documents}
                reviews={reviews}
                tab={studioTab}
                setTab={setStudioTab}
                onCreate={(type) => openTool(type, null, null, true)}
                onOpen={(id) => openDocument(id, true)}
                onReview={(id) => openReview(null, id, "documents")}
                onNewReview={() => openReview(null, null, "documents")}
              />
            )}
            {page === "tracker" && (
              <>
                <Heading
                  eyebrow="MY JOURNEY"
                  title="Application Tracker"
                  copy="Keep track of your submissions, offers and visa steps."
                />
                <div className="sa-tracker">
                  {myPrograms.map((p) => (
                    <article key={p.id}>
                      <div>
                        <small>{p.country}</small>
                        <h3>{p.university}</h3>
                        <p>{p.name}</p>
                        <button
                          className="hub-text-btn"
                          onClick={() => openProgram(p.id)}
                        >
                          Open program
                        </button>
                      </div>
                      <div className="hub-tracker-deadline">
                        <span>Application deadline</span>
                        <strong>{formatDate(p.deadline)}</strong>
                      </div>
                      <label className="hub-field">
                        Application status
                        <select
                          value={applications[p.id] || "Preparing"}
                          onChange={(e) =>
                            setApplications({
                              ...applications,
                              [p.id]: e.target.value,
                            })
                          }
                        >
                          {statuses.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </label>
                    </article>
                  ))}
                </div>
                {!myPrograms.length && (
                  <Empty
                    title="Your tracker is ready"
                    copy="Add a program to My Programs to start tracking its application."
                    action={
                      <button
                        className="hub-btn"
                        onClick={() => navigate("catalog")}
                      >
                        Explore programs
                      </button>
                    }
                  />
                )}
                <SupportActions booked={booked} setBooked={setBooked} />
              </>
            )}
            {page === "profile" && (
              <MyProfile
                profile={profile}
                onSave={saveProfile}
              />
            )}
          </>
        )}
      </div>
      {notice && (
        <div className="hub-toast" role="status">
          <span>✓ {notice}</span>
          <button onClick={() => navigate("programs")}>View programs</button>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}
      {mobile && (
        <Modal title="Your workspace" onClose={() => setMobile(false)}>
          <div className="hub-mobile-nav">{nav}</div>
        </Modal>
      )}
      {infoId && programs.find((p) => p.id === infoId) && (
        <Modal title="Program details" wide onClose={() => setInfoId(null)}>
          <div className="hub-program-info-modal">
            <ProgramDetail
              program={programs.find((p) => p.id === infoId)!}
              selected={selected.includes(infoId)}
              onBack={() => setInfoId(null)}
              onAdd={() => {
                if (selected.includes(infoId)) openProgram(infoId);
                else selectProgram(infoId);
                setInfoId(null);
              }}
            />
          </div>
        </Modal>
      )}
    </main>
  );
}
