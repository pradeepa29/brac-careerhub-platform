"use client";
import { useState } from "react";
import Image from "next/image";
import { programImage } from "./program-images";
import {
  countries,
  fields,
  levels,
  programs,
  filterPrograms,
  formatDate,
  toggleValue,
  requirementFit,
  programRequirements,
  type Filters,
  type Program,
} from "./data";
import { Heading, Empty, Icon, ChipSelect, SelectField, Modal } from "./ui";

export function ProgramRow({
  program: p,
  selected,
  onOpen,
  onAdd,
  onWorkspace,
  count,
}: {
  program: Program;
  selected: boolean;
  onOpen: () => void;
  onAdd: () => void;
  onWorkspace?: () => void;
  count?: number;
}) {
  return (
    <article className="hub-program-row">
      <button
        className="hub-program-row-main"
        onClick={onOpen}
        aria-label={`View details for ${p.name}`}
      >
        <span className="hub-program-image" aria-hidden="true">
          <Image
            src={programImage(p)}
            alt=""
            fill
            sizes="(max-width: 600px) 96px, 132px"
          />
        </span>
        <span className="hub-program-row-info">
          <span className="hub-row-country">
            {p.country} · {p.level}
          </span>
          <strong>{p.name}</strong>
          <span>
            {p.university} · {p.city}
          </span>
          <small>
            {p.years} {p.years === 1 ? "year" : "years"} · {p.credits} ·{" "}
            {p.tuition}{" "}
            {count === undefined
              ? `· ${p.scholarships.length} scholarship${p.scholarships.length === 1 ? "" : "s"}`
              : `· ${count} draft${count === 1 ? "" : "s"}`}
          </small>
        </span>
      </button>
      <div className="hub-program-row-end">
        <span className="hub-program-deadline">
          <small>Application deadline</small>
          <b>{formatDate(p.deadline)}</b>
        </span>
        <div className="hub-program-row-actions">
          <button
            className="hub-row-action"
            aria-label={selected ? `Open ${p.name}` : `Add ${p.name} to My Programs`}
            onClick={selected ? onWorkspace || onOpen : onAdd}
          >
            {selected ? "Open program" : "Add program"}
          </button>
        </div>
      </div>
    </article>
  );
}

export function Catalog({
  filters,
  setFilters,
  reset,
  clear,
  selected,
  onOpen,
  onAdd,
  onWorkspace,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  reset: () => void;
  clear: () => void;
  selected: string[];
  onOpen: (id: string) => void;
  onAdd: (id: string) => void;
  onWorkspace: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [sort, setSort] = useState("Curated order");
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters({ ...filters, [key]: value });
  const filtered = filterPrograms(programs, filters).sort((a, b) =>
    sort === "Lowest tuition"
      ? a.annualBdt - b.annualBdt
      : sort === "Nearest deadline"
        ? a.deadline.localeCompare(b.deadline)
        : 0,
  );
  const activeFilterCount = filters.fields.length + filters.countries.length +
    [filters.level, filters.intake, filters.mode, filters.duration, filters.deadline,
      filters.budget, filters.scholarship, filters.academicOnly].filter(Boolean).length;
  return (
    <>
      <Heading
        title="All Programs"
        copy="A world of opportunities. Find the program that feels right for you."
      />
      <section className="hub-filter-box" aria-label="Program filters">
        <div className="hub-search-row">
          <label className="hub-search">
            <Icon name="search" />
            <input
              aria-label="Search programs or universities"
              placeholder="Search programs or universities…"
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
            />
          </label>
          <button
            className="hub-btn"
            aria-haspopup="dialog"
            onClick={() => setExpanded(true)}
          >
            <Icon name="filter" /> Filters{" "}
            {activeFilterCount > 0 && (
              <span className="hub-count">{activeFilterCount}</span>
            )}
          </button>
        </div>
      </section>
      {expanded && (
        <Modal
          title="Filter programs"
          onClose={() => setExpanded(false)}
          drawer
        >
          <div className="hub-filter-expanded">
            <div className="hub-form-grid">
              <SelectField
                label="Study level"
                value={filters.level}
                onChange={(v) => update("level", v)}
                options={levels}
                anyLabel="Any level"
              />
              <SelectField
                label="Intake"
                value={filters.intake}
                onChange={(v) => update("intake", v)}
                options={["September 2027", "January 2028"]}
                anyLabel="Any intake"
              />
              <label className="hub-field">
                Maximum annual tuition (BDT)
                <input
                  type="number"
                  min="0"
                  step="100000"
                  placeholder="Any budget"
                  value={filters.budget}
                  onChange={(e) => update("budget", e.target.value)}
                />
              </label>
              <label className="hub-field">
                Maximum duration
                <select
                  value={filters.duration}
                  onChange={(e) => update("duration", e.target.value)}
                >
                  <option value="">Any duration</option>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      Up to {n} {n === 1 ? "year" : "years"}
                    </option>
                  ))}
                </select>
              </label>
              <SelectField
                label="Study mode"
                value={filters.mode}
                onChange={(v) => update("mode", v)}
                options={["On campus", "Hybrid"]}
                anyLabel="Any mode"
              />
              <label className="hub-field">
                Application deadline on or after
                <input
                  type="date"
                  value={filters.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />
              </label>
            </div>
            <ChipSelect
              label="Fields of study"
              options={fields}
              values={filters.fields}
              onChange={(v) => update("fields", toggleValue(filters.fields, v))}
            />
            <ChipSelect
              label="Countries"
              options={countries}
              values={filters.countries}
              onChange={(v) =>
                update("countries", toggleValue(filters.countries, v))
              }
            />
            <label className="hub-check">
              <input
                type="checkbox"
                checked={filters.scholarship}
                onChange={(e) => update("scholarship", e.target.checked)}
              />{" "}
              Only show programs with scholarships
            </label>
            <div className="hub-filter-academic">
              <h3>Your academic & English profile</h3>
              <p>
                Explore using different results without changing your saved
                profile. Unlisted equivalencies and subject prerequisites need
                individual review.
              </p>
              <div className="hub-form-grid">
                <SelectField
                  label="Qualification"
                  value={filters.qualification}
                  onChange={(v) => update("qualification", v)}
                  options={[
                    "HSC",
                    "A Levels",
                    "IB",
                    "Diploma",
                    "Bachelor’s degree",
                    "Master’s degree",
                    "Other",
                  ]}
                  anyLabel="Not specified"
                />
                <label className="hub-field">
                  GPA / CGPA
                  <input
                    type="number"
                    min="0"
                    max={filters.scale || undefined}
                    step="0.01"
                    value={filters.gpa}
                    onChange={(e) => update("gpa", e.target.value)}
                    placeholder="Unknown"
                  />
                </label>
                <SelectField
                  label="GPA scale"
                  value={filters.scale}
                  onChange={(v) => update("scale", v)}
                  options={["4", "5", "10", "100"]}
                  anyLabel="Not applicable"
                />
                <SelectField
                  label="English test"
                  value={filters.test}
                  onChange={(v) => update("test", v)}
                  options={["Not taken", "IELTS", "TOEFL", "Duolingo", "PTE"]}
                />
                <label className="hub-field">
                  Overall score
                  <input
                    type="number"
                    min="0"
                    max={filters.test === "IELTS" ? 9 : 160}
                    step="0.5"
                    disabled={filters.test === "Not taken"}
                    value={filters.english}
                    onChange={(e) => update("english", e.target.value)}
                  />
                </label>
                {filters.test === "IELTS" && (
                  <label className="hub-field">
                    Lowest IELTS band
                    <input
                      type="number"
                      min="0"
                      max="9"
                      step="0.5"
                      value={filters.band === "NaN" ? "" : filters.band}
                      onChange={(e) => update("band", e.target.value)}
                    />
                  </label>
                )}
              </div>
              <label className="hub-check">
                <input
                  type="checkbox"
                  checked={filters.academicOnly}
                  onChange={(e) => update("academicOnly", e.target.checked)}
                />{" "}
                Hide programs with known GPA or English-score gaps
              </label>
              <small>
                Other grading systems and tests remain visible as “Requirements
                to check”. Fees use illustrative BDT equivalents for this demo.
              </small>
            </div>
            <div className="hub-filter-drawer-actions">
              <button className="hub-text-btn" onClick={reset}>
                Reset to my preferences ↺
              </button>
              <button
                className="hub-btn hub-btn-primary"
                onClick={() => setExpanded(false)}
              >
                Show {filtered.length}{" "}
                {filtered.length === 1 ? "program" : "programs"}
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="hub-results-heading">
        <p>
          <strong>{filtered.length}</strong> programs to explore{" "}
          <span>· Curated by BRAC Career Hub</span>
        </p>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {["Curated order", "Lowest tuition", "Nearest deadline"].map(
              (s) => (
                <option key={s}>{s}</option>
              ),
            )}
          </select>
        </label>
      </div>
      {filtered.length ? (
        <div className="hub-program-grid">
          {filtered.map((p) => (
            <div key={p.id}>
              <ProgramRow
                program={p}
                selected={selected.includes(p.id)}
                onOpen={() => onOpen(p.id)}
                onAdd={() => onAdd(p.id)}
                onWorkspace={() => onWorkspace(p.id)}
              />
              <span className="hub-fit-label">
                {requirementFit(p, filters) === "gap"
                  ? "GPA or English requirement gap"
                  : requirementFit(p, filters) === "unknown"
                    ? "Requirements to check"
                    : "Listed GPA & IELTS thresholds met · check prerequisites"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          title="A little room to explore"
          copy="No programs fit these filters. Broaden a country, field or budget to discover more options."
          action={
            <button className="hub-btn hub-btn-primary" onClick={clear}>
              Explore all programs
            </button>
          }
        />
      )}
      <p className="hub-footnote">
        Program details and campus images are illustrative. Confirm fees,
        deadlines and scholarships with each university.
      </p>
    </>
  );
}

export function ProgramDetail({
  program: p,
  selected,
  onBack,
  onAdd,
}: {
  program: Program;
  selected: boolean;
  onBack: () => void;
  onAdd: () => void;
}) {
  return (
    <>
      <button className="hub-back" onClick={onBack}>
        ← All Programs
      </button>
      <Heading
        eyebrow={`${p.country.toUpperCase()} · ${p.level.toUpperCase()}`}
        title={p.name}
        copy={`${p.university} · ${p.city}`}
        action={<button className="hub-btn hub-btn-primary" onClick={onAdd}>
          {selected ? "Open My Program →" : "+ Add to My Programs"}
        </button>}
      />
      <section className="hub-panel">
        <div className="hub-detail-summary">
          <span className="hub-badge">{p.intake}</span>
          <span>
            {p.years} {p.years === 1 ? "year" : "years"} · {p.credits}
          </span>
          <span>{p.mode}</span>
        </div>
        <h2>About the program</h2>
        <p className="hub-description">{p.description}</p>
        <dl className="hub-detail-facts">
          <div>
            <dt>Annual tuition</dt>
            <dd>{p.tuition}</dd>
          </div>
          <div>
            <dt>Application deadline</dt>
            <dd>{formatDate(p.deadline)}</dd>
          </div>
          <div>
            <dt>Indicative living costs</dt>
            <dd>{p.living}</dd>
          </div>
          <div>
            <dt>Application fee</dt>
            <dd>{p.fee}</dd>
          </div>
        </dl>
        <details className="hub-detail-more" open>
          <summary>Entry requirements & scholarships</summary>
          <div className="hub-detail-columns">
            <div>
              <h3>Academic requirements</h3>
              <p>
                {p.level === "Bachelor’s"
                  ? `HSC: minimum ${p.gpa} / 5.00. Other secondary qualifications require an equivalency review.`
                  : `Relevant ${p.level === "PhD" ? "master’s" : "bachelor’s"} degree: minimum CGPA ${p.gpa} / 4.00.`}
              </p>
              <p>{p.prerequisites}</p>
              <h3>English proficiency</h3>
              <p>
                {p.required.includes("English test evidence")
                  ? `IELTS ${p.ielts} overall, with no band below ${p.band}${p.englishAlternatives?.length ? `; or ${p.englishAlternatives.map((rule) => `${rule.test} ${rule.minimum}+`).join("; or ")}` : ""}. Other tests require an individual requirements check.`
                  : "No English score evidence is listed for this mock program checklist."}
              </p>
              <h3>Documents to prepare</h3>
              <p>
                {programRequirements(p)
                  .map((requirement) => `${requirement.count > 1 ? `${requirement.count} × ` : ""}${requirement.title}`)
                  .join(" · ")}
              </p>
            </div>
            <div>
              <h3>Scholarships ({p.scholarships.length})</h3>
              {p.scholarships.length ? (
                p.scholarships.map((s) => (
                  <article className="hub-scholarship" key={s.name}>
                    <b>{s.name}</b>
                    <span>{s.funding}</span>
                    <p>{s.description}</p>
                    <small>Apply by {formatDate(s.deadline)}</small>
                  </article>
                ))
              ) : (
                <p>No scholarships are listed for this program.</p>
              )}
            </div>
          </div>
        </details>
      </section>
    </>
  );
}
