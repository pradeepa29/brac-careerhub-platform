"use client";
import { Heading } from "./ui";
import type { Profile } from "./data";
export function Pathway({
  profile,
  openCareerGuide,
}: {
  profile: Profile;
  openCareerGuide: () => void;
}) {
  const earlyStage = profile.year === "2nd Year" || profile.year === "3rd Year";
  return (
    <section className="sa-panel" key="assessment">
      {earlyStage ? (
        <>
          <Heading
            eyebrow="Your pathway"
            title="Build your profile before application year"
            copy={`As a ${profile.year} student, your best next step is Career Guidance Hub preparation—not university applications yet.`}
          />
          <div className="sa-route-card">
            <div>
              <span>RECOMMENDED NOW</span>
              <h2>Career Guidance Hub</h2>
              <p>
                Clarify your future direction and build the academic, skills and
                experience profile that strong overseas applications need.
              </p>
            </div>
          </div>
          <div className="sa-guidance-grid">
            {[
              [
                "01",
                "Career direction",
                "Explore subjects and career outcomes before choosing a postgraduate programme.",
              ],
              [
                "02",
                "Profile-building plan",
                "Set targets for CGPA, projects, internships, leadership and extracurricular work.",
              ],
              [
                "03",
                "Skills roadmap",
                "Build research, communication, digital and subject-specific skills.",
              ],
              [
                "04",
                "Application timeline",
                "Plan English tests, scholarships and documents well before final year.",
              ],
            ].map((x) => (
              <article key={x[0]}>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </article>
            ))}
          </div>
          <button className="hub-btn hub-btn-primary" onClick={openCareerGuide}>
            Open Career Guidance Hub
          </button>
        </>
      ) : (
        <>
          <Heading
            eyebrow="Your pathway"
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
                Your CGPA and subject fit support a competitive shortlist.
                Improve English-test evidence and application documents before
                submitting.
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
    </section>
  );
}
export function SupportActions({
  booked,
  setBooked,
}: {
  booked: boolean;
  setBooked: (value: boolean) => void;
}) {
  return (
    <div className="sa-support-actions">
      <div>
        <h3>Apply independently or get expert support</h3>
        <p>
          Verify requirements on the official university site, or book a BRAC
          Career Hub professional to review your plan and documents.
        </p>
      </div>
      <div>
        <button
          onClick={() =>
            window.alert(
              "In production, this opens the selected university's official application page.",
            )
          }
        >
          Official application
        </button>
        <button className="hub-btn" onClick={() => setBooked(true)}>
          {booked ? "Call request received" : "Book a Career Hub call"}
        </button>
      </div>
    </div>
  );
}
