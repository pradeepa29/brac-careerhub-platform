"use client";

import { useState } from "react";
import AdaptivePractice from "./adaptive-practice";
import ExamStudyLibrary from "./exam-study-library";

const examOptions = [
  ["BCS", "প্রিলিমিনারি ও লিখিত প্রস্তুতি"],
  ["BANK", "সরকারি ও বিশেষায়িত ব্যাংক"],
  ["NTRCA", "শিক্ষক নিবন্ধন পরীক্ষা"],
  ["PRIMARY", "প্রাথমিক শিক্ষক নিয়োগ"],
];

const prepSteps = [
  "পরীক্ষা নির্বাচন",
  "প্রস্তুতি লাইব্রেরি",
  "AI বেসলাইন ডায়াগনস্টিক",
  "অভিযোজিত মাস্টারি পরিকল্পনা",
  "দৈনিক শেখা ও অনুশীলন",
  "কুইজ, মক ও সংশোধিত পরিকল্পনা",
  "রেডিনেস ও পাস-থ্রেশহোল্ড",
];
const pastPapers = [
  ["৪৬তম BCS প্রিলিমিনারি", "২০০ প্রশ্ন · উত্তর ও ব্যাখ্যাসহ", "download"],
  ["৪৫তম BCS প্রিলিমিনারি", "বিষয়ভিত্তিক MCQ অনুশীলন", "practice"],
  ["৪৪তম BCS প্রিলিমিনারি", "বিষয়ভিত্তিক MCQ অনুশীলন", "practice"],
  ["৪৩তম BCS প্রিলিমিনারি", "বিষয়ভিত্তিক MCQ অনুশীলন", "practice"],
];
const recommendedBooks = [
  [
    "বাংলা",
    "নবম–দশম শ্রেণির বাংলা ব্যাকরণ",
    "ব্যাকরণ, বানান ও বাক্যগঠন",
    "মূল পাঠ্য",
  ],
  [
    "ইংরেজি",
    "English Grammar in Use",
    "Grammar, usage ও self-practice",
    "মূল পাঠ্য",
  ],
  [
    "গণিত",
    "নবম–দশম শ্রেণির সাধারণ গণিত",
    "পাটিগণিত, বীজগণিত ও জ্যামিতি",
    "মূল পাঠ্য",
  ],
  [
    "বাংলাদেশ বিষয়াবলি",
    "বাংলাদেশের সংবিধান ও NCTB পাঠ্য",
    "ইতিহাস, সরকার ও নাগরিকতা",
    "রেফারেন্স",
  ],
  [
    "বিজ্ঞান ও ICT",
    "NCTB সাধারণ বিজ্ঞান ও ICT",
    "মূল ধারণা ও প্রয়োগ",
    "মূল পাঠ্য",
  ],
  [
    "আন্তর্জাতিক বিষয়াবলি",
    "সাম্প্রতিক বিষয়াবলি ও সরকারি প্রতিবেদন",
    "বিশ্ব রাজনীতি, অর্থনীতি ও সংস্থা",
    "আপডেটেড",
  ],
];
const chapterBank: Record<string, Array<[string, number, number]>> = {
  বাংলা: [
    ["ধ্বনি ও বর্ণ", 86, 35],
    ["শব্দতত্ত্ব ও শব্দের উৎস", 124, 22],
    ["ব্যাকরণ ও বাক্য", 168, 48],
    ["বাংলা সাহিত্য", 210, 18],
    ["পূর্ববর্তী BCS প্রশ্ন", 200, 12],
  ],
  ইংরেজি: [
    ["Parts of Speech", 110, 42],
    ["Grammar & Correction", 176, 31],
    ["Vocabulary & Idioms", 240, 19],
    ["Comprehension", 95, 8],
    ["Previous BCS English", 200, 15],
  ],
  গণিত: [
    ["শতকরা ও অনুপাত", 142, 54],
    ["লাভ-ক্ষতি ও সুদ", 126, 38],
    ["বীজগণিত", 185, 21],
    ["জ্যামিতি", 164, 16],
    ["মানসিক দক্ষতা", 155, 29],
  ],
  "বাংলাদেশ বিষয়াবলি": [
    ["ইতিহাস ও মুক্তিযুদ্ধ", 220, 46],
    ["সংবিধান ও সরকার", 185, 32],
    ["অর্থনীতি ও বাজেট", 142, 18],
    ["ভূগোল ও পরিবেশ", 126, 22],
    ["সাম্প্রতিক বাংলাদেশ", 160, 10],
  ],
  "সাধারণ বিজ্ঞান": [
    ["পদার্থবিজ্ঞান", 132, 48],
    ["রসায়ন", 118, 33],
    ["জীববিজ্ঞান", 148, 55],
    ["স্বাস্থ্য ও পরিবেশ", 96, 28],
    ["কম্পিউটার ও ICT", 174, 41],
  ],
  "আন্তর্জাতিক বিষয়াবলি": [
    ["আন্তর্জাতিক সংস্থা", 136, 26],
    ["বিশ্ব রাজনীতি", 122, 18],
    ["ভূরাজনীতি ও নিরাপত্তা", 108, 12],
    ["আন্তর্জাতিক অর্থনীতি", 94, 9],
    ["সাম্প্রতিক বিশ্ব", 180, 14],
  ],
};

export default function GovernmentPrep({ exit }: { exit: () => void }) {
  const [step, setStep] = useState(0);
  const [exam, setExam] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [planDone, setPlanDone] = useState<number[]>([]);
  const [practice, setPractice] = useState<number[]>([]);
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("বাংলা");
  const [selectedTopic, setSelectedTopic] = useState("ধ্বনি ও বর্ণ");
  const [mcqStarted, setMcqStarted] = useState(false);
  const [mcqAnswer, setMcqAnswer] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [resourceTab, setResourceTab] = useState<"papers" | "books">("papers");

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => (step ? setStep((s) => s - 1) : exit());
  const screens = [
    <section className="gp-screen" key="exam">
      <div className="gp-title">
        <span>ধাপ ০১ · লক্ষ্য নির্বাচন</span>
        <h1>কোন পরীক্ষার জন্য প্রস্তুতি নিতে চান?</h1>
        <p>
          একটি পরীক্ষা দিয়ে শুরু করুন। পরে আপনার ড্যাশবোর্ড থেকে অন্য লক্ষ্য
          যোগ করতে পারবেন।
        </p>
      </div>
      <div className="gp-exam-grid">
        {examOptions.map((item, i) => (
          <button
            key={item[0]}
            className={exam === i ? "selected" : ""}
            onClick={() => setExam(i)}
          >
            <div
              className={`gp-exam-art art-${i}`}
              aria-hidden="true"
            >
              <strong>{item[0]}</strong>
            </div>
            <div className="gp-exam-copy">
              <b>{item[0]} প্রস্তুতি</b>
              <small>{item[1]}</small>
              <em>{exam === i ? "✓ নির্বাচিত" : "নির্বাচন করুন →"}</em>
            </div>
          </button>
        ))}
      </div>
      <div className="gp-info">
        <b>আপনার নির্বাচিত লক্ষ্য</b>
        <span>
          {examOptions[exam][0]} · {examOptions[exam][1]}
        </span>
      </div>
    </section>,
    <AdaptivePractice key="diagnostic" onComplete={() => setStep(3)} />,
    <section className="gp-screen gp-dashboard" key="plan">
      <div className="gp-dash-welcome">
        <div>
          <span>আপনার ব্যক্তিগত প্রস্তুতি ড্যাশবোর্ড</span>
          <h1>শুভ সন্ধ্যা, রহিম 👋</h1>
          <p>
            আপনার লক্ষ্য: <b>{examOptions[exam][0]} পরীক্ষা</b> · আজকের সর্বোচ্চ
            প্রভাবের বিষয় <b>গণিত → জ্যামিতি</b>
          </p>
        </div>
        <button className="gp-primary" onClick={() => setStep(3)}>
          আমার পরিকল্পনা চালিয়ে যান →
        </button>
      </div>
      <div className="gp-dash-top">
        <article className="gp-readiness-card">
          <div className="gp-score-ring large">
            <b>৬৮%</b>
            <span>প্রস্তুতি</span>
          </div>
          <div>
            <small>{examOptions[exam][0]} প্রস্তুতি স্কোর</small>
            <h2>ভিত্তি তৈরি হয়েছে</h2>
            <p>
              আপনার সিলেবাস কভারেজ ভালো। গণিত ও আন্তর্জাতিক বিষয়াবলিতে মনোযোগ
              দিলে দ্রুত উন্নতি হবে।
            </p>
            <div className="gp-trend">
              গত ১৪ দিনে <b>+৯%</b> উন্নতি
            </div>
          </div>
        </article>
        <article className="gp-next-card">
          <small>AI-এর পরবর্তী সুপারিশ</small>
          <h2>জ্যামিতির ভিত্তি</h2>
          <p>
            এই বিষয়টি উন্নত করলে আপনার সম্ভাব্য স্কোরে সর্বোচ্চ প্রভাব পড়বে।
          </p>
          <div>
            <span>২০ মিনিট পাঠ</span>
            <span>১৫টি MCQ</span>
            <span>১টি মিনি টেস্ট</span>
          </div>
          <button onClick={() => setStep(3)}>এখন শুরু করুন →</button>
        </article>
      </div>
      <div className="gp-dash-grid">
        <section className="gp-today">
          <header>
            <div>
              <small>আজকের ব্যক্তিগত পরিকল্পনা</small>
              <h2>১ ঘণ্টা ২০ মিনিট</h2>
            </div>
            <b>{planDone.length}/4 সম্পন্ন</b>
          </header>
          {[
            ["গণিত · জ্যামিতি", "ধারণা + উদাহরণ · ২০ মিনিট"],
            ["ইংরেজি · Grammar", "Subject–verb agreement · ১৫ মিনিট"],
            ["ব্যক্তিগত MCQ সেট", "দুর্বল বিষয় থেকে ২০ প্রশ্ন · ১৫ মিনিট"],
            ["দৈনিক মিনি টেস্ট", "মিশ্র ২৫ প্রশ্ন · ১০ মিনিট"],
          ].map((x, i) => (
            <button
              onClick={() =>
                setPlanDone((v) =>
                  v.includes(i) ? v.filter((n) => n !== i) : [...v, i],
                )
              }
              className={planDone.includes(i) ? "done" : ""}
              key={x[0]}
            >
              <i>{planDone.includes(i) ? "✓" : i + 1}</i>
              <span>
                <b>{x[0]}</b>
                <small>{x[1]}</small>
              </span>
              <em>{planDone.includes(i) ? "সম্পন্ন" : "শুরু →"}</em>
            </button>
          ))}
        </section>
        <section className="gp-map">
          <header>
            <small>আপনার নলেজ ম্যাপ</small>
            <h2>বিষয়ভিত্তিক দক্ষতা</h2>
          </header>
          {[
            ["সাধারণ বিজ্ঞান", 86, "strong"],
            ["ICT", 82, "strong"],
            ["বাংলাদেশ বিষয়াবলি", 78, "developing"],
            ["ইংরেজি", 59, "developing"],
            ["গণিত", 52, "focus"],
            ["আন্তর্জাতিক বিষয়াবলি", 41, "focus"],
          ].map((x) => (
            <div key={x[0]}>
              <span>
                {x[0]}
                <b>{x[1]}%</b>
              </span>
              <i>
                <em className={String(x[2])} style={{ width: x[1] + "%" }} />
              </i>
            </div>
          ))}
          <footer>
            <span>
              <i className="strong" /> শক্তিশালী
            </span>
            <span>
              <i className="developing" /> উন্নয়নশীল
            </span>
            <span>
              <i className="focus" /> এখনই গুরুত্ব দিন
            </span>
          </footer>
        </section>
      </div>
      <section className="gp-path">
        <header>
          <div>
            <small>আপনার ৩০ দিনের অভিযোজিত রোডম্যাপ</small>
            <h2>পারফরম্যান্স বদলালে পরিকল্পনাও বদলাবে</h2>
          </div>
          <span>১২ / ৪৮ টপিক সম্পন্ন</span>
        </header>
        <div className="gp-path-track">
          {[
            ["সপ্তাহ ১", "Algebra + Grammar", "current"],
            ["সপ্তাহ ২", "Geometry + Vocabulary", ""],
            ["সপ্তাহ ৩", "Bangladesh Affairs + Revision", ""],
            ["সপ্তাহ ৪", "Mixed MCQ + Full Mock", ""],
          ].map((x, i) => (
            <button
              className={x[2]}
              onClick={() => setStep(i < 2 ? 3 : 4)}
              key={x[0]}
            >
              <i>{i + 1}</i>
              <small>{x[0]}</small>
              <b>{x[1]}</b>
              <span>{i === 0 ? "চলছে" : "পরিকল্পিত"}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="gp-mastery">
        <header>
          <div>
            <small>ধারাবাহিক মূল্যায়ন</small>
            <h2>Algebra দক্ষতার অগ্রগতি</h2>
          </div>
          <b>বর্তমান দক্ষতা ৭৮% ↑</b>
        </header>
        <div className="gp-mastery-chart">
          <i style={{ height: "25%" }}>
            <span>২৫%</span>
            <small>ডায়াগনস্টিক</small>
          </i>
          <i style={{ height: "43%" }}>
            <span>৪৩%</span>
            <small>সপ্তাহ ১</small>
          </i>
          <i style={{ height: "61%" }}>
            <span>৬১%</span>
            <small>সপ্তাহ ২</small>
          </i>
          <i className="current" style={{ height: "78%" }}>
            <span>৭৮%</span>
            <small>বর্তমান</small>
          </i>
        </div>
      </section>
    </section>,
    <section className="gp-screen" key="learn">
      <div className="gp-title">
        <span>ধাপ ০৪ · ভিডিও লার্নিং ও AI টিউটর</span>
        <h1>আগে শিখুন, তারপর অনুশীলন করুন</h1>
        <p>
          প্রতিটি দুর্বল টপিকের জন্য ছোট ভিডিও, নোট, উদাহরণ এবং সংশ্লিষ্ট MCQ
          রয়েছে।
        </p>
      </div>
      <div className="video-learning">
        <aside>
          <b>আজকের ভিডিও পাঠ</b>
          {[
            ["শতকরা পরিবর্তন", "১২ মিনিট"],
            ["অনুপাত ও সমানুপাত", "১০ মিনিট"],
            ["লাভ ও ক্ষতি", "১৪ মিনিট"],
            ["সময় ও কাজ", "১১ মিনিট"],
          ].map((x, i) => (
            <button
              onClick={() => {
                setActiveVideo(i);
                setVideoPlaying(false);
              }}
              className={activeVideo === i ? "active" : ""}
              key={x[0]}
            >
              <i>{activeVideo === i ? "▶" : "○"}</i>
              <span>
                <b>{x[0]}</b>
                <small>{x[1]}</small>
              </span>
            </button>
          ))}
        </aside>
        <main>
          <div className={"video-stage " + (videoPlaying ? "playing" : "")}>
            <button
              aria-label={videoPlaying ? "ভিডিও থামান" : "ভিডিও চালান"}
              onClick={() => setVideoPlaying((v) => !v)}
            >
              <i>{videoPlaying ? "❚❚" : "▶"}</i>
              <span>{videoPlaying ? "ভিডিও চলছে" : "ভিডিও পাঠ চালু করুন"}</span>
            </button>
            <div className="video-progress">
              <i style={{ width: videoPlaying ? "38%" : "0%" }} />
            </div>
            <small>গণিত · {[12, 10, 14, 11][activeVideo]} মিনিট</small>
          </div>
          <article>
            <small>VIDEO LESSON {activeVideo + 1}</small>
            <h2>
              {
                [
                  "শতকরা পরিবর্তন কীভাবে কাজ করে?",
                  "অনুপাত দ্রুত সমাধানের কৌশল",
                  "লাভ-ক্ষতির সহজ সূত্র",
                  "সময় ও কাজের শর্টকাট",
                ][activeVideo]
              }
            </h2>
            <p>
              ধারণাটি ধাপে ধাপে বাংলায় ব্যাখ্যা করা হয়েছে। ভিডিও শেষে উদাহরণ,
              নোট এবং পাঁচটি যাচাই প্রশ্ন থাকবে।
            </p>
            <div className="video-resources">
              <button>▤ লেসন নোট</button>
              <button>✓ Worked example</button>
              <button onClick={() => setStep(4)}>◎ সংশ্লিষ্ট MCQ</button>
            </div>
          </article>
        </main>
      </div>
      <section className="exam-resources" id="exam-resources">
        <header>
          <div>
            <small>EXAM PREP RESOURCES</small>
            <h2>প্রয়োজনীয় রিসোর্স লাইব্রেরি</h2>
            <p>
              বিগত বছরের প্রশ্নপত্র, উত্তর-ব্যাখ্যা এবং বিষয়ভিত্তিক প্রস্তাবিত
              বই এক জায়গায়।
            </p>
          </div>
          <div className="resource-tabs">
            <button
              className={resourceTab === "papers" ? "active" : ""}
              onClick={() => setResourceTab("papers")}
            >
              ▤ বিগত প্রশ্নপত্র
            </button>
            <button
              className={resourceTab === "books" ? "active" : ""}
              onClick={() => setResourceTab("books")}
            >
              ▥ প্রস্তাবিত বই
            </button>
          </div>
        </header>
        {resourceTab === "papers" ? (
          <div className="paper-grid">
            {pastPapers.map((paper, i) => (
              <article key={paper[0]}>
                <div>
                  <i>BCS</i>
                  <span>{i === 0 ? "PDF + সমাধান" : "প্র্যাকটিস সেট"}</span>
                </div>
                <h3>{paper[0]}</h3>
                <p>{paper[1]}</p>
                {paper[2] === "download" ? (
                  <a
                    href="/resources/46th-bcs-preliminary-question.pdf"
                    download
                  >
                    PDF ডাউনলোড ↓
                  </a>
                ) : (
                  <button onClick={() => setStep(4)}>MCQ অনুশীলন →</button>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="book-list">
            {recommendedBooks.map((book, i) => (
              <article key={book[0]}>
                <i>{i + 1}</i>
                <div>
                  <small>{book[0]}</small>
                  <h3>{book[1]}</h3>
                  <p>{book[2]}</p>
                </div>
                <span>{book[3]}</span>
              </article>
            ))}
            <p className="book-note">
              নোট: বইয়ের সর্বশেষ সংস্করণ ব্যবহার করুন। কপিরাইটযুক্ত বই
              প্ল্যাটফর্মে বিনা অনুমতিতে আপলোড করা হবে না।
            </p>
          </div>
        )}
      </section>
    </section>,
    <section className="gp-screen" key="practice">
      <div className="gp-title">
        <span>ধাপ ০৫ · অধ্যায়ভিত্তিক প্রশ্নব্যাংক</span>
        <h1>প্রতিটি অধ্যায় থেকে MCQ অনুশীলন করুন</h1>
        <p>
          বিষয় নির্বাচন করলে সব অধ্যায়, প্রশ্নসংখ্যা ও আপনার অগ্রগতি দেখা
          যাবে।
        </p>
      </div>
      <div className="topic-practice">
        <section className="topic-picker">
          <div>
            <label>
              বিষয়
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedTopic(chapterBank[e.target.value][0][0]);
                  setMcqStarted(false);
                }}
              >
                <option>বাংলা</option>
                <option>ইংরেজি</option>
                <option>গণিত</option>
                <option>বাংলাদেশ বিষয়াবলি</option>
                <option>সাধারণ বিজ্ঞান</option>
                <option>আন্তর্জাতিক বিষয়াবলি</option>
              </select>
            </label>
            <label>
              অধ্যায়
              <select
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setMcqStarted(false);
                }}
              >
                {chapterBank[selectedSubject].map((x) => (
                  <option key={x[0]}>{x[0]}</option>
                ))}
              </select>
            </label>
            <label>
              প্রশ্নের সংখ্যা
              <select>
                <option>১০টি MCQ</option>
                <option>২০টি MCQ</option>
                <option>৩০টি MCQ</option>
              </select>
            </label>
          </div>
          <button
            className="gp-primary"
            onClick={() => {
              setMcqStarted(true);
              setMcqAnswer(null);
            }}
          >
            অভিযোজিত MCQ শুরু করুন →
          </button>
        </section>
        {mcqStarted ? (
          <section className="topic-question">
            <header>
              <div>
                <small>
                  {selectedSubject} · {selectedTopic}
                </small>
                <b>প্রশ্ন ১ / ১০ · লেভেল ১</b>
              </div>
              <span>রেটিং ৫৮</span>
            </header>
            <h2>
              {selectedSubject === "বাংলা"
                ? "বাংলা ভাষায় কোন স্বরধ্বনি উচ্চারণকালে জিহ্বা উচ্চ অবস্থানে থাকে?"
                : "একটি সংখ্যার ২৫% যদি ২০ হয়, সংখ্যাটি কত?"}
            </h2>
            <div>
              {(selectedSubject === "বাংলা"
                ? ["আ", "এ", "ও", "উ"]
                : ["৬০", "৭০", "৮০", "১০০"]
              ).map((x, i) => (
                <button
                  className={
                    mcqAnswer === null
                      ? ""
                      : i === 3 || (selectedSubject !== "বাংলা" && i === 2)
                        ? "correct"
                        : mcqAnswer === i
                          ? "wrong"
                          : ""
                  }
                  onClick={() => setMcqAnswer(i)}
                  disabled={mcqAnswer !== null}
                  key={x}
                >
                  <i>{String.fromCharCode(65 + i)}</i>
                  {x}
                </button>
              ))}
            </div>
            {mcqAnswer !== null && (
              <article>
                <b>
                  {(
                    selectedSubject === "বাংলা"
                      ? mcqAnswer === 3
                      : mcqAnswer === 2
                  )
                    ? "✓ সঠিক—পরবর্তী প্রশ্ন কঠিন হবে"
                    : "✕ ভুল—পরবর্তী প্রশ্ন সহজ হবে"}
                </b>
                <p>
                  <strong>সমাধান:</strong>{" "}
                  {selectedSubject === "বাংলা"
                    ? "‘উ’ একটি উচ্চ স্বরধ্বনি; উচ্চারণের সময় জিহ্বা উঁচু অবস্থানে থাকে।"
                    : "২০ ÷ ২৫ × ১০০ = ৮০।"}
                </p>
                <button onClick={() => setMcqAnswer(null)}>
                  পরবর্তী প্রশ্ন →
                </button>
              </article>
            )}
          </section>
        ) : (
          <section className="chapter-bank">
            <header>
              <div>
                <small>QUESTION BANK</small>
                <h2>{selectedSubject} অধ্যায়সমূহ</h2>
              </div>
              <span>
                {chapterBank[selectedSubject].reduce((a, x) => a + x[1], 0)}টি
                প্রশ্ন
              </span>
            </header>
            <div>
              {chapterBank[selectedSubject].map((x, i) => (
                <button
                  onClick={() => {
                    setSelectedTopic(x[0]);
                    setMcqStarted(true);
                    setMcqAnswer(null);
                  }}
                  key={x[0]}
                >
                  <i>{i + 1}</i>
                  <span>
                    <b>{x[0]}</b>
                    <small>{x[1]}টি MCQ · সহজ, মাঝারি ও কঠিন</small>
                    <em>
                      <strong style={{ width: x[2] + "%" }} />
                    </em>
                  </span>
                  <div>
                    <b>{x[2]}%</b>
                    <small>সম্পন্ন</small>
                  </div>
                  <strong>অনুশীলন →</strong>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>,
    <div className="journey-library" key="resources">
      <ExamStudyLibrary startGov={() => setStep(4)} />
    </div>,
    <section className="gp-screen" key="mock">
      <div className="gp-title">
        <span>ধাপ ০৬ · মক পরীক্ষা</span>
        <h1>{examOptions[exam][0]} পূর্ণাঙ্গ মক পরীক্ষা</h1>
        <p>
          বাস্তব পরীক্ষার মতো সময়সীমা, নেগেটিভ মার্কিং ও বিষয়ভিত্তিক প্রশ্ন।
        </p>
      </div>
      <div className="gp-mock">
        <div className="gp-clock">
          <small>বাকি সময়</small>
          <b>১:৪২:১৮</b>
        </div>
        <div className="gp-mock-meta">
          <span>
            <b>১০০</b> প্রশ্ন
          </span>
          <span>
            <b>২০০</b> নম্বর
          </span>
          <span>
            <b>১২০</b> মিনিট
          </span>
          <span>
            <b>-০.৫</b> ভুল উত্তরে
          </span>
        </div>
        <div className="gp-palette">
          {Array.from({ length: 20 }, (_, i) => (
            <i
              className={i < 12 ? "answered" : i === 12 ? "current" : ""}
              key={i}
            >
              {i + 1}
            </i>
          ))}
        </div>
        <button className="gp-primary" onClick={() => setMockSubmitted(true)}>
          {mockSubmitted ? "✓ পরীক্ষা জমা হয়েছে" : "মক পরীক্ষা জমা দিন"}
        </button>
      </div>
    </section>,
    <section className="gp-screen" key="feedback">
      <div className="gp-title">
        <span>ধাপ ০৭ · AI ফিডব্যাক</span>
        <h1>কোথায় ভুল হয়েছে এবং কেন</h1>
        <p>
          প্রতিটি ভুলের ব্যাখ্যা, সময় ব্যবস্থাপনা এবং পরবর্তী অনুশীলনের
          সুপারিশ।
        </p>
      </div>
      <div className="gp-feedback">
        <div className="gp-score-ring">
          <b>৭৪</b>
          <small>/১০০</small>
          <span>মক স্কোর</span>
        </div>
        <div className="gp-analysis">
          <h3>AI বিশ্লেষণ</h3>
          <p>
            আপনি জ্ঞানভিত্তিক প্রশ্নে ভালো করেছেন, কিন্তু গণিতে দীর্ঘ সময়
            নিয়েছেন এবং শেষ ১২টি প্রশ্ন দ্রুত শেষ করেছেন।
          </p>
          <div>
            <span>
              সঠিক উত্তর <b>৭৪</b>
            </span>
            <span>
              ভুল উত্তর <b>১৮</b>
            </span>
            <span>
              উত্তরহীন <b>৮</b>
            </span>
          </div>
        </div>
      </div>
      <div className="gp-gaps">
        <article>
          <small>প্রধান দুর্বলতা</small>
          <h3>ইংরেজি বাক্য সংশোধন</h3>
          <p>Subject–verb agreement এবং modifier অনুশীলন করুন।</p>
        </article>
        <article>
          <small>সময় ব্যবস্থাপনা</small>
          <h3>গণিতে ১২ মিনিট বেশি</h3>
          <p>কঠিন প্রশ্ন চিহ্নিত করে পরে ফেরার কৌশল ব্যবহার করুন।</p>
        </article>
        <article>
          <small>পরবর্তী পদক্ষেপ</small>
          <h3>২টি লক্ষ্যভিত্তিক সেট</h3>
          <p>আগামীকাল ২০টি ইংরেজি ও ১৫টি গণিত প্রশ্ন।</p>
        </article>
      </div>
    </section>,
    <section className="gp-screen" key="readiness">
      <div className="gp-title">
        <span>ধাপ ০৮ · প্রস্তুতি রিপোর্ট</span>
        <h1>আপনার পরীক্ষার প্রস্তুতি অবস্থান</h1>
        <p>ডায়াগনস্টিক, দৈনিক অনুশীলন ও মক পরীক্ষার সামগ্রিক বিশ্লেষণ।</p>
      </div>
      <div className="gp-ready">
        <div className="gp-score-ring large">
          <b>৭৬%</b>
          <span>প্রস্তুত</span>
        </div>
        <div>
          <small>{examOptions[exam][0]} প্রস্তুতি</small>
          <h2>ভালো অগ্রগতি—আরও ধারাবাহিক অনুশীলন দরকার</h2>
          <p>
            বর্তমান গতিতে পরিকল্পনা অনুসরণ করলে পরীক্ষার আগে প্রধান দুর্বল
            বিষয়গুলো সম্পন্ন করা সম্ভব।
          </p>
          <button className="gp-primary">
            আমার পরবর্তী ৭ দিনের পরিকল্পনা →
          </button>
        </div>
      </div>
      <div className="gp-readiness-bars">
        {[
          ["সিলেবাস কভারেজ", 78],
          ["MCQ নির্ভুলতা", 74],
          ["সময় ব্যবস্থাপনা", 62],
          ["মক পরীক্ষার ধারাবাহিকতা", 81],
        ].map((x) => (
          <div key={x[0]}>
            <span>
              {x[0]}
              <b>{x[1]}%</b>
            </span>
            <i>
              <em style={{ width: x[1] + "%" }} />
            </i>
          </div>
        ))}
      </div>
    </section>,
  ];
  const journeyScreens = [
    screens[0],
    screens[5],
    screens[1],
    screens[2],
    screens[3],
    <div className="gp-cycle-screen" key="quiz-mock-cycle">
      {screens[6]}
      {screens[7]}
    </div>,
    screens[8],
  ];

  return (
    <main className="gp-portal">
      <header className="gp-nav">
        <button className="gp-logo" onClick={exit}>
          <img src="/careerhub-logo.png" alt="Career Hub" />
        </button>
        <nav>
          <button onClick={exit}>হোম</button>
          <button>ক্যারিয়ার ও চাকরি</button>
          <button className="active">পরীক্ষার প্রস্তুতি</button>
          <button onClick={() => setStep(1)}>রিসোর্স</button>
          <button>কাউন্সেলিং</button>
          <button>CV টুলস</button>
        </nav>
        <div>
          <button>English</button>
          <button className="gp-login">লগইন</button>
        </div>
      </header>
      <div className="gp-layout">
        <aside className="gp-sidebar">
          <div className="gp-side-title">
            <small>{examOptions[exam][0]} প্রস্তুতি</small>
            <b>আপনার অগ্রগতি</b>
            <div>
              <i style={{ width: (step + 1) * (100 / 7) + "%" }} />
            </div>
            <span>৭টি ধাপের মধ্যে {step + 1}টি</span>
          </div>
          {prepSteps.map((x, i) => (
            <button
              onClick={() => setStep(i)}
              className={
                (step === i ? "active " : "") + (i < step ? "done" : "")
              }
              key={x}
            >
              <i>{i < step ? "✓" : i + 1}</i>
              <span>
                <b>{x}</b>
                <small>
                  {
                    [
                      "BCS, Bank, NTRCA বা Primary",
                      "MCQ, কনটেন্ট, বই ও বিগত প্রশ্ন",
                      "সিলেবাস ও অধ্যায়ভিত্তিক বর্তমান অবস্থা",
                      "দুর্বলতা অনুযায়ী কঠিনতার স্তর ও টপিক মাস্টারি",
                      "ভিডিও, MCQ ও লিখিত অনুশীলন",
                      "ঘন ঘন মূল্যায়ন, AI ফিডব্যাক ও নতুন পরিকল্পনা",
                      "পাস নম্বরের ব্যবধান ও পরবর্তী করণীয়",
                    ][i]
                  }
                </small>
              </span>
            </button>
          ))}
          <div className="gp-help">
            <b>বিশেষজ্ঞ সহায়তা</b>
            <p>পরিকল্পনা বুঝতে সমস্যা হলে একজন কাউন্সেলরের সঙ্গে কথা বলুন।</p>
            <button>সেশন বুক করুন →</button>
          </div>
        </aside>
        <div className="gp-workspace">
          <div className="gp-content">{journeyScreens[step]}</div>
          <footer>
            <button onClick={back}>← {step ? "পেছনে" : "হোম"}</button>
            <button className="gp-primary" onClick={step === 6 ? exit : next}>
              {step === 6 ? "ড্যাশবোর্ডে ফিরুন ✓" : "সংরক্ষণ করে এগিয়ে যান →"}
            </button>
          </footer>
        </div>
      </div>
    </main>
  );
}
