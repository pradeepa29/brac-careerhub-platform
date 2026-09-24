"use client";

import { useMemo, useState } from "react";

const journey = [
  ["Profile", "Study goal and academic history"],
  ["Preferences", "Country, intake and budget"],
  ["My pathway", "Guidance or application readiness"],
  ["University matches", "Ambitious, target and safer options"],
  ["My dashboard", "Saved programmes, fit and deadlines"],
  ["Scholarships", "Popular funding opportunities"],
  ["Document studio", "SOP, CV, LOR and essays"],
  ["Application plan", "Counsellor-reviewed task plan"],
  ["Application tracker", "Application, offer and visa status"],
];

const scholarships = [
  ["Chevening Scholarships", "United Kingdom", "Major study and living costs", "Leadership and impact profile"],
  ["Australia Awards", "Australia", "Fully funded opportunities", "Country and programme eligibility"],
  ["Erasmus Mundus Joint Masters", "Europe", "Participation, travel and living support", "Programme-specific criteria"],
  ["Stipendium Hungaricum", "Hungary", "Tuition, stipend and accommodation support", "Annual partner-country call"],
  ["University merit scholarships", "Multiple destinations", "Partial to full tuition awards", "Academic merit and application strength"],
];

const universities = [
  {
    name: "University of Glasgow",
    country: "United Kingdom",
    subject: "Business Analytics",
    tuition: "£31,860/year",
    scholarship: "Up to £10,000",
    deadline: "15 Jan 2027",
    base: 82,
  },
  {
    name: "University of Adelaide",
    country: "Australia",
    subject: "Data Science",
    tuition: "A$52,300/year",
    scholarship: "15–30% tuition",
    deadline: "30 Apr 2027",
    base: 78,
  },
  {
    name: "University of Ottawa",
    country: "Canada",
    subject: "Digital Transformation",
    tuition: "C$35,000/year",
    scholarship: "Merit awards",
    deadline: "01 Mar 2027",
    base: 74,
  },
  {
    name: "University of Twente",
    country: "Netherlands",
    subject: "Business Information Technology",
    tuition: "€18,900/year",
    scholarship: "€3,000–€22,000",
    deadline: "01 Feb 2027",
    base: 71,
  },
  {
    name: "University of Malaya",
    country: "Malaysia",
    subject: "Information Systems",
    tuition: "RM 42,000 total",
    scholarship: "Selected awards",
    deadline: "31 May 2027",
    base: 68,
  },
  {
    name: "University of Debrecen",
    country: "Hungary",
    subject: "Computer Science",
    tuition: "US$7,500/year",
    scholarship: "Stipendium Hungaricum",
    deadline: "15 Jan 2027",
    base: 66,
  },
];

type Profile = {
  name: string;
  institution: string;
  currentSubject: string;
  year: string;
  level: string;
  subject: string;
  result: string;
  english: string;
  budget: string;
  intake: string;
  countries: string[];
};

export default function StudyAbroad({
  exit,
  openCareerGuide,
}: {
  exit: () => void;
  openCareerGuide: () => void;
}) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    institution: "",
    currentSubject: "Business Administration",
    year: "Final Year",
    level: "Master’s",
    subject: "Business Analytics",
    result: "3.40",
    english: "IELTS 6.5",
    budget: "৳20–35 lakh",
    intake: "September 2027",
    countries: ["United Kingdom", "Australia"],
  });
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [generated, setGenerated] = useState<string[]>([]);
  const [reviewType, setReviewType] = useState("Statement of Purpose");
  const [reviewText, setReviewText] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [applications, setApplications] = useState<Record<string, string>>({});
  const [savedScholarships, setSavedScholarships] = useState<string[]>([]);
  const [booked, setBooked] = useState(false);
  const earlyStage = profile.year === "2nd Year" || profile.year === "3rd Year";

  const matches = useMemo(() => {
    const resultBoost = Math.max(
      -6,
      Math.min(8, (Number(profile.result) - 3) * 8),
    );
    return universities
      .map((u) => ({
        ...u,
        score: Math.round(
          Math.min(
            96,
            u.base +
              resultBoost +
              (profile.countries.includes(u.country) ? 6 : 0),
          ),
        ),
        band: u.base >= 80 ? "Ambitious" : u.base >= 72 ? "Target" : "Safer",
      }))
      .sort((a, b) => b.score - a.score);
  }, [profile]);

  const toggleCountry = (country: string) =>
    setProfile((p) => ({
      ...p,
      countries: p.countries.includes(country)
        ? p.countries.filter((c) => c !== country)
        : [...p.countries, country],
    }));
  const toggleShortlist = (name: string) =>
    setShortlist((s) =>
      s.includes(name) ? s.filter((x) => x !== name) : [...s, name],
    );
  const next = () => setStep((s) => Math.min(journey.length - 1, s + 1));
  const back = () => (step ? setStep(step - 1) : exit());

  const screens = [
    <section className="sa-panel" key="profile">
      <Heading
        eyebrow="Step 01 · Student profile"
        title="Tell us where you are now"
        copy="Your academic background helps the AI create an initial eligibility profile."
      />
      <div className="sa-form-grid">
        <label>
          Full name
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Your full name"
          />
        </label>
        <label>
          Current university / institution
          <input
            value={profile.institution}
            onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
            placeholder="Your institution"
          />
        </label>
        <label>
          Current subject / major
          <input
            value={profile.currentSubject}
            onChange={(e) => setProfile({ ...profile, currentSubject: e.target.value })}
          />
        </label>
        <label>
          Current academic stage
          <select value={profile.year} onChange={(e) => setProfile({ ...profile, year: e.target.value })}>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>Final Year</option>
            <option>Graduate</option>
          </select>
        </label>
        <label>
          Study level
          <select
            value={profile.level}
            onChange={(e) => setProfile({ ...profile, level: e.target.value })}
          >
            <option>Bachelor’s</option>
            <option>Master’s</option>
            <option>PhD</option>
          </select>
        </label>
        <label>
          Subject you want to study next
          <input
            value={profile.subject}
            onChange={(e) =>
              setProfile({ ...profile, subject: e.target.value })
            }
          />
        </label>
        <label>
          CGPA / equivalent result
          <input
            value={profile.result}
            onChange={(e) => setProfile({ ...profile, result: e.target.value })}
          />
        </label>
        <label>
          English test status
          <select
            value={profile.english}
            onChange={(e) =>
              setProfile({ ...profile, english: e.target.value })
            }
          >
            <option>Not taken yet</option>
            <option>IELTS 6.0</option>
            <option>IELTS 6.5</option>
            <option>IELTS 7.0+</option>
            <option>Duolingo 120+</option>
          </select>
        </label>
        <label>
          Graduation year
          <input defaultValue="2025" />
        </label>
      </div>
    </section>,
    <section className="sa-panel" key="preferences">
      <Heading
        eyebrow="Step 02 · Preferences"
        title="Choose what matters to you"
        copy="Set your destination, intake and affordability preferences. You can change these later."
      />
      <div className="sa-preferences">
        <div>
          <b>Preferred countries</b>
          <div className="sa-chips">
            {[
              "United Kingdom",
              "Australia",
              "Canada",
              "Netherlands",
              "Malaysia",
              "Hungary",
            ].map((c) => (
              <button
                key={c}
                className={profile.countries.includes(c) ? "selected" : ""}
                onClick={() => toggleCountry(c)}
              >
                {profile.countries.includes(c) ? "✓ " : "+ "}
                {c}
              </button>
            ))}
          </div>
        </div>
        <label>
          Target intake
          <select
            value={profile.intake}
            onChange={(e) => setProfile({ ...profile, intake: e.target.value })}
          >
            <option>January 2027</option>
            <option>September 2027</option>
            <option>January 2028</option>
          </select>
        </label>
        <label>
          Annual budget
          <select
            value={profile.budget}
            onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
          >
            <option>Below ৳20 lakh</option>
            <option>৳20–35 lakh</option>
            <option>৳35–50 lakh</option>
            <option>Above ৳50 lakh</option>
          </select>
        </label>
        <label className="sa-check">
          <input type="checkbox" defaultChecked /> I want scholarship options
        </label>
      </div>
    </section>,
    <section className="sa-panel" key="assessment">
      {earlyStage ? (
        <>
          <Heading
            eyebrow="Step 03 · Your recommended pathway"
            title="Build your profile before application year"
            copy={`As a ${profile.year} student, your best next step is Career Guidance Hub preparation—not university applications yet.`}
          />
          <div className="sa-route-card">
            <div className="sa-route-mark">CG</div>
            <div>
              <span>RECOMMENDED NOW</span>
              <h2>Career Guidance Hub</h2>
              <p>Clarify your future direction and build the academic, skills and experience profile that strong overseas applications need.</p>
            </div>
          </div>
          <div className="sa-guidance-grid">
            {[
              ["01", "Career direction", "Explore subjects and career outcomes before choosing a postgraduate programme."],
              ["02", "Profile-building plan", "Set targets for CGPA, projects, internships, leadership and extracurricular work."],
              ["03", "Skills roadmap", "Build research, communication, digital and subject-specific skills."],
              ["04", "Application timeline", "Plan English tests, scholarships and documents well before final year."],
            ].map((x) => <article key={x[0]}><i>{x[0]}</i><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
          </div>
          <button className="sa-big-action" onClick={openCareerGuide}>Open Career Guidance Hub →</button>
        </>
      ) : (
        <>
      <Heading
        eyebrow="Step 03 · AI profile assessment"
        title="Your study-abroad readiness"
        copy="A first-pass assessment based on the information you provided."
      />
      <div className="sa-assessment">
        <div className="sa-ring">
          <b>76</b>
          <span>/100</span>
        </div>
        <div>
          <h3>Good foundation, with three priorities</h3>
          <p>
            Your CGPA and subject fit support a competitive shortlist. Improve
            English-test evidence and application documents before submitting.
          </p>
          <div className="sa-meter">
            <span>
              Academic fit <b>84%</b>
            </span>
            <i>
              <em style={{ width: "84%" }} />
            </i>
          </div>
          <div className="sa-meter">
            <span>
              English readiness <b>68%</b>
            </span>
            <i>
              <em style={{ width: "68%" }} />
            </i>
          </div>
          <div className="sa-meter">
            <span>
              Document readiness <b>42%</b>
            </span>
            <i>
              <em style={{ width: "42%" }} />
            </i>
          </div>
        </div>
      </div>
      <div className="sa-alerts">
        <article>
          <b>Priority 1</b>
          <h4>Complete IELTS</h4>
          <p>Target 6.5 overall with no band below 6.0.</p>
        </article>
        <article>
          <b>Priority 2</b>
          <h4>Strengthen your SOP</h4>
          <p>Connect your experience to the selected programme.</p>
        </article>
        <article>
          <b>Priority 3</b>
          <h4>Prepare financial evidence</h4>
          <p>Map tuition, living cost and funding sources.</p>
        </article>
      </div>
        </>
      )}
    </section>,
    <section className="sa-panel" key="matches">
      <Heading
        eyebrow="Step 04 · AI university matching"
        title={`${matches.length} possible university options`}
        copy={`Ranked for ${profile.level} in ${profile.subject}, ${profile.intake}.`}
      />
      <div className="sa-match-list">
        {matches.map((u) => (
          <article key={u.name}>
            <div className={`sa-score ${u.band.toLowerCase()}`}>
              <b>{u.score}%</b>
              <span>{u.band}</span>
            </div>
            <div>
              <small>{u.country}</small>
              <h3>{u.name}</h3>
              <p>{u.subject}</p>
              <span>
                {u.tuition} · {u.scholarship}
              </span>
            </div>
            <div>
              <small>Application deadline</small>
              <b>{u.deadline}</b>
              <button onClick={() => toggleShortlist(u.name)}>
                {shortlist.includes(u.name)
                  ? "✓ Shortlisted"
                  : "+ Add to shortlist"}
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="sa-disclaimer">
        Prototype recommendations only. Final eligibility, fees, scholarships
        and deadlines must be verified on official university websites and
        reviewed by a counsellor.
      </p>
    </section>,
    <section className="sa-panel" key="shortlist">
      <Heading
        eyebrow="Step 05 · Your university dashboard"
        title="Your saved programmes"
        copy="Compare ambitious, target and safer options, then manage your next actions in one place."
      />
      <div className="sa-dashboard-stats">
        <article><b>{shortlist.length}</b><span>Saved programmes</span></article>
        <article><b>{generated.length}/4</b><span>Documents started</span></article>
        <article><b>{savedScholarships.length}</b><span>Scholarships saved</span></article>
      </div>
      {shortlist.length ? (
        <div className="sa-compare">
          {matches
            .filter((u) => shortlist.includes(u.name))
            .map((u) => (
              <article key={u.name}>
                <span>{u.score}% match</span>
                <h3>{u.name}</h3>
                <p>
                  {u.country} · {u.subject}
                </p>
                <dl>
                  <div>
                    <dt>Tuition</dt>
                    <dd>{u.tuition}</dd>
                  </div>
                  <div>
                    <dt>Scholarship</dt>
                    <dd>{u.scholarship}</dd>
                  </div>
                  <div>
                    <dt>Deadline</dt>
                    <dd>{u.deadline}</dd>
                  </div>
                </dl>
                <button onClick={() => toggleShortlist(u.name)}>Remove</button>
              </article>
            ))}
        </div>
      ) : (
        <Empty
          title="No universities shortlisted yet"
          copy="Go back to University matches and add at least two options to compare."
          action={() => setStep(3)}
        />
      )}
    </section>,
    <section className="sa-panel" key="scholarships">
      <Heading
        eyebrow="Step 06 · Scholarship explorer"
        title="Popular scholarships to explore"
        copy="Save relevant opportunities to your dashboard and verify the current call on the official provider website."
      />
      <div className="sa-scholarships">
        {scholarships.map((s, i) => (
          <article key={s[0]}>
            <div className="sa-scholarship-icon">{i + 1}</div>
            <div><small>{s[1]}</small><h3>{s[0]}</h3><p>{s[2]}</p><span>Typical focus: {s[3]}</span></div>
            <button onClick={() => setSavedScholarships((x) => x.includes(s[0]) ? x.filter((v) => v !== s[0]) : [...x, s[0]])}>
              {savedScholarships.includes(s[0]) ? "✓ Saved" : "+ Save"}
            </button>
          </article>
        ))}
      </div>
      <p className="sa-disclaimer">Scholarship availability and eligibility change by intake. Always verify dates, criteria and funding on the official scholarship website.</p>
    </section>,
    <section className="sa-panel" key="documents">
      <Heading
        eyebrow="Step 07 · AI document studio"
        title="Develop application-ready documents"
        copy="Create a strong first draft, then refine it with a counsellor before submission."
      />
      <div className="sa-docs">
        {[
          [
            "SOP",
            "Statement of Purpose",
            "Your motivation, academic story and study goals",
          ],
          [
            "CV",
            "Academic CV",
            "Education, projects, experience and achievements",
          ],
          [
            "LOR",
            "Recommendation brief",
            "A structured evidence pack for your referee",
          ],
          [
            "Essay",
            "Scholarship essay",
            "Impact, leadership and future contribution",
          ],
        ].map((d) => (
          <article key={d[0]}>
            <i>{d[0]}</i>
            <div>
              <h3>{d[1]}</h3>
              <p>{d[2]}</p>
              <span>
                {generated.includes(d[0])
                  ? "Outline ready · counsellor review pending"
                  : "Not started"}
              </span>
            </div>
            <button
              onClick={() =>
                setGenerated((g) => (g.includes(d[0]) ? g : [...g, d[0]]))
              }
            >
              {generated.includes(d[0])
                ? "✓ Open outline"
                : "Generate outline →"}
            </button>
          </article>
        ))}
      </div>
      <div className="sa-ai-review">
        <div className="sa-review-form">
          <span>AI DOCUMENT REVIEW</span>
          <h2>Review your application draft</h2>
          <p>
            Paste your draft to receive an instant readiness score, strengths,
            risks and practical revision guidance.
          </p>
          <label>
            Document type
            <select
              value={reviewType}
              onChange={(e) => {
                setReviewType(e.target.value);
                setReviewed(false);
              }}
            >
              <option>Statement of Purpose</option>
              <option>Academic CV</option>
              <option>Letter of Recommendation brief</option>
              <option>Scholarship essay</option>
            </select>
          </label>
          <label>
            Paste document text
            <textarea
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                setReviewed(false);
              }}
              placeholder="Paste the student's draft here. The review will assess clarity, evidence, structure, relevance and authenticity."
            />
          </label>
          <div className="sa-review-meta">
            <span>{reviewText.trim() ? reviewText.trim().split(/\s+/).length : 0} words</span>
            <button
              disabled={reviewText.trim().length < 80}
              onClick={() => setReviewed(true)}
            >
              ✦ Run AI review →
            </button>
          </div>
          {reviewText.trim().length > 0 && reviewText.trim().length < 80 && (
            <small>Add at least 80 characters for a useful review.</small>
          )}
        </div>
        {reviewed ? (
          <DocumentReview type={reviewType} text={reviewText} />
        ) : (
          <div className="sa-review-empty">
            <i>AI</i>
            <h3>Your review will appear here</h3>
            <p>No grades, achievements or experiences will be invented. The tool only evaluates the text you provide.</p>
          </div>
        )}
      </div>
      <div className="sa-safety">
        <b>Human review is built into the process</b>
        <p>
          AI helps organise and improve your own story. It should not invent
          achievements, grades or experience. Final documents should be checked
          by the student and a Career Hub counsellor.
        </p>
      </div>
    </section>,
    <section className="sa-panel" key="plan">
      <Heading
        eyebrow="Step 08 · Application plan"
        title="Your personalised action plan"
        copy="A deadline-driven plan based on your readiness gaps and shortlist."
      />
      <div className="sa-plan">
        {[
          ["done", "Profile and preferences", "Completed"],
          [
            generated.length ? "done" : "current",
            "Complete SOP and academic CV",
            generated.length
              ? `${generated.length} outlines ready`
              : "Due in 7 days",
          ],
          ["", "Book counsellor document review", "Due in 10 days"],
          ["", "Request recommendation letters", "Due in 14 days"],
          ["", "Verify entry requirements", "Before each application"],
          ["", "Submit selected applications", "Before university deadlines"],
        ].map((t, i) => (
          <article className={t[0]} key={t[1]}>
            <i>{t[0] === "done" ? "✓" : i + 1}</i>
            <div>
              <b>{t[1]}</b>
              <span>{t[2]}</span>
            </div>
            {t[0] === "current" && <button>Start task →</button>}
          </article>
        ))}
      </div>
      <SupportActions booked={booked} setBooked={setBooked} />
    </section>,
    <section className="sa-panel" key="tracker">
      <Heading
        eyebrow="Step 09 · Application tracker"
        title="Track every application in one place"
        copy="Record submissions, offers, visa steps and counsellor follow-ups."
      />
      <div className="sa-tracker">
        {matches
          .filter((u) => shortlist.includes(u.name))
          .map((u) => (
            <article key={u.name}>
              <div>
                <small>{u.country}</small>
                <h3>{u.name}</h3>
                <p>{u.subject}</p>
              </div>
              <select
                value={applications[u.name] || "Preparing"}
                onChange={(e) =>
                  setApplications({ ...applications, [u.name]: e.target.value })
                }
              >
                <option>Preparing</option>
                <option>Submitted</option>
                <option>Interview</option>
                <option>Conditional offer</option>
                <option>Offer received</option>
                <option>Visa preparation</option>
              </select>
            </article>
          ))}
      </div>
      {!shortlist.length && (
        <Empty
          title="Your tracker is ready"
          copy="Shortlisted universities will appear here with their application status."
          action={() => setStep(3)}
        />
      )}
      <SupportActions booked={booked} setBooked={setBooked} />
    </section>,
  ];

  return (
    <main className="sa-portal">
      <header className="sa-nav">
        <button onClick={exit}>
          <img src="/careerhub-logo.png" alt="Career Hub" />
        </button>
        <nav>
          <button onClick={exit}>Home</button>
          <button onClick={openCareerGuide}>Career Guidance Hub</button>
          <button className="active">Study Abroad</button>
          <button onClick={() => setStep(5)}>Scholarships</button>
          <button onClick={() => setStep(6)}>Document tools</button>
        </nav>
        <div>
          <button>English</button>
          <button className="sa-login">Login</button>
        </div>
      </header>
      <div className="sa-layout">
        <aside>
          <div className="sa-side-head">
            <small>STUDY ABROAD NAVIGATOR</small>
            <b>{profile.name || "Your application journey"}</b>
            <div>
              <i style={{ width: `${((step + 1) / journey.length) * 100}%` }} />
            </div>
            <span>
              {step + 1} of {journey.length} steps
            </span>
          </div>
          {journey.map((j, i) => (
            <button
              key={j[0]}
              className={`${i === step ? "active" : ""} ${i < step ? "done" : ""} ${earlyStage && i > 2 ? "locked" : ""}`}
              onClick={() => !earlyStage || i <= 2 ? setStep(i) : undefined}
              disabled={earlyStage && i > 2}
            >
              <i>{i < step ? "✓" : i + 1}</i>
              <span>
                <b>{j[0]}</b>
                <small>{earlyStage && i > 2 ? "Available in final year" : j[1]}</small>
              </span>
            </button>
          ))}
          <div className="sa-help">
            <b>Need expert guidance?</b>
            <p>
              Book a Career Hub counsellor to review your shortlist and
              documents.
            </p>
            <button>Counselling →</button>
          </div>
        </aside>
        <div className="sa-workspace">
          <div className="sa-content">{screens[step]}</div>
          <footer>
            <button onClick={back}>← {step ? "Back" : "Home"}</button>
            <span>Changes saved</span>
            <button className="primary" onClick={earlyStage && step === 2 ? openCareerGuide : next}>
              {earlyStage && step === 2
                ? "Open Career Guidance Hub →"
                : step < journey.length - 1
                ? "Save and continue →"
                : "Finish journey ✓"}
            </button>
          </footer>
        </div>
      </div>
    </main>
  );
}

function Heading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <header className="sa-heading">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
    </header>
  );
}
function Empty({
  title,
  copy,
  action,
}: {
  title: string;
  copy: string;
  action: () => void;
}) {
  return (
    <div className="sa-empty">
      <i>✦</i>
      <h3>{title}</h3>
      <p>{copy}</p>
      <button onClick={action}>View university matches →</button>
    </div>
  );
}

function SupportActions({
  booked,
  setBooked,
}: {
  booked: boolean;
  setBooked: (value: boolean) => void;
}) {
  return (
    <div className="sa-support-actions">
      <div>
        <span>READY FOR THE NEXT STEP?</span>
        <h3>Apply independently or get expert support</h3>
        <p>Verify requirements on the official university site, or book a BRAC Career Hub professional to review your plan and documents.</p>
      </div>
      <div>
        <button onClick={() => window.alert("In production, this opens the selected university's official application page.")}>Go to official application →</button>
        <button className="primary" onClick={() => setBooked(true)}>{booked ? "✓ Call request received" : "Book a Career Hub call"}</button>
      </div>
    </div>
  );
}

function DocumentReview({ type, text }: { type: string; text: string }) {
  const words = text.trim().split(/\s+/).length;
  const evidence = /project|research|intern|work|led|achiev|result|impact|experience/i.test(text);
  const programme = /university|programme|program|course|faculty|study|degree/i.test(text);
  const goals = /goal|future|career|plan|aspir|contribute/i.test(text);
  const score = Math.min(92, 54 + (words > 180 ? 12 : 5) + (evidence ? 10 : 0) + (programme ? 8 : 0) + (goals ? 8 : 0));
  const band = score >= 82 ? "Strong draft" : score >= 68 ? "Promising draft" : "Needs development";
  return (
    <div className="sa-review-result">
      <header>
        <div className="sa-review-score"><b>{score}</b><span>/100</span></div>
        <div><small>{type}</small><h3>{band}</h3><p>AI first review · professional review recommended before submission</p></div>
      </header>
      <section>
        <h4>What is working</h4>
        <ul>
          <li>{evidence ? "The draft includes experience or evidence that can support credibility." : "The draft establishes a starting narrative."}</li>
          <li>{goals ? "Future goals are visible and help explain motivation." : "The document has enough material to shape a clearer goal statement."}</li>
        </ul>
      </section>
      <section className="improve">
        <h4>Priority improvements</h4>
        <ul>
          {!evidence && <li>Add specific projects, responsibilities and measurable outcomes.</li>}
          {!programme && <li>Explain why the selected programme and institution fit your goals.</li>}
          {!goals && <li>Connect the document to a clear study and career objective.</li>}
          <li>Replace general claims with concrete examples from the student's real experience.</li>
          <li>Use a direct opening and make every paragraph serve one clear purpose.</li>
        </ul>
      </section>
      <button>Save review to dashboard</button>
    </div>
  );
}
