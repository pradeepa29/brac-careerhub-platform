"use client";

import { useState } from "react";

const mcqTopics = [
  ["বাংলা", "ব্যাকরণ · সাহিত্য · ভাষা", "৭৮৮ MCQ", 64],
  ["ইংরেজি", "Grammar · Vocabulary · Literature", "৮২১ MCQ", 51],
  ["গণিত ও মানসিক দক্ষতা", "পাটিগণিত · বীজগণিত · জ্যামিতি", "৯৪৬ MCQ", 43],
  ["বাংলাদেশ বিষয়াবলি", "ইতিহাস · সংবিধান · অর্থনীতি", "৮৩৩ MCQ", 72],
  ["বিজ্ঞান ও ICT", "পদার্থ · রসায়ন · জীববিজ্ঞান · ICT", "৬৬৮ MCQ", 58],
  ["আন্তর্জাতিক বিষয়াবলি", "বিশ্ব রাজনীতি · সংস্থা · সাম্প্রতিক", "৫৯২ MCQ", 37],
];

const writtenTopics = [
  ["বাংলা রচনা ও সারাংশ", "রচনা, সারমর্ম, ভাবসম্প্রসারণ ও অনুবাদ", "৪৮ প্রশ্ন"],
  ["English Composition", "Essay, précis, translation and letter", "৫৬ questions"],
  ["বাংলাদেশ বিষয়াবলি", "সংবিধান, মুক্তিযুদ্ধ, অর্থনীতি ও উন্নয়ন", "৭২ প্রশ্ন"],
  ["আন্তর্জাতিক বিষয়াবলি", "বিশ্লেষণধর্মী ও সমস্যা-সমাধানভিত্তিক প্রশ্ন", "৬৪ প্রশ্ন"],
  ["গাণিতিক যুক্তি", "ধাপে ধাপে সমাধানযোগ্য লিখিত সমস্যা", "৮৫ প্রশ্ন"],
  ["বিজ্ঞান ও প্রযুক্তি", "ধারণা, প্রয়োগ ও সাম্প্রতিক প্রযুক্তি", "৫২ প্রশ্ন"],
];

const pastPapers = [
  ["৪৬তম BCS", "প্রিলিমিনারি প্রশ্ন, উত্তর ও ব্যাখ্যা", "PDF"],
  ["৪৫তম BCS", "প্রিলিমিনারি · বিষয়ভিত্তিক অনুশীলন", "MCQ"],
  ["৪৪তম BCS", "প্রিলিমিনারি · বিষয়ভিত্তিক অনুশীলন", "MCQ"],
  ["৪৩তম BCS", "প্রিলিমিনারি · বিষয়ভিত্তিক অনুশীলন", "MCQ"],
  ["BCS লিখিত", "বিগত লিখিত প্রশ্নের বিষয়ভিত্তিক সংগ্রহ", "Written"],
  ["ব্যাংক ও NTRCA", "নির্বাচিত বিগত প্রশ্ন ও সমাধান", "Archive"],
];

const learning = [
  ["শতকরা ও অনুপাত", "ভিডিও · নোট · উদাহরণ · ৫টি যাচাই প্রশ্ন", "গণিত"],
  ["বাংলা ব্যাকরণের ভিত্তি", "অধ্যায় পাঠ · নিয়ম · অনুশীলন", "বাংলা"],
  ["Subject–Verb Agreement", "ভিডিও · cheat sheet · practice", "English"],
  ["বাংলাদেশের সংবিধান", "অধ্যায়ভিত্তিক পাঠ · টাইমলাইন · কুইজ", "বাংলাদেশ"],
  ["আন্তর্জাতিক সংস্থা", "ভিজ্যুয়াল নোট · তুলনা · MCQ", "আন্তর্জাতিক"],
  ["কম্পিউটার ও ICT", "ধারণা · বাস্তব উদাহরণ · দ্রুত পরীক্ষা", "বিজ্ঞান"],
];

export default function ExamStudyLibrary({startGov}:{startGov:()=>void}) {
  const [tab,setTab]=useState<"mcq"|"written"|"papers"|"learn">("mcq");
  const tabs = [["mcq","MCQ প্রশ্নব্যাংক"],["written","লিখিত প্রশ্ন"],["papers","বিগত প্রশ্নপত্র"],["learn","শেখার কনটেন্ট"]] as const;
  const items = tab==="mcq"?mcqTopics:tab==="written"?writtenTopics:tab==="papers"?pastPapers:learning;
  return <section className="study-library" id="study-library"><div className="wrap"><header><div><span className="kicker">সম্পূর্ণ প্রস্তুতি লাইব্রেরি</span><h2>বিষয় থেকে অধ্যায়।<br/><em>শেখা থেকে পরীক্ষা।</em></h2><p>MCQ ও লিখিত প্রশ্ন, বিগত প্রশ্নপত্র এবং শেখার কনটেন্ট—সবকিছু বিষয় ও অধ্যায় অনুযায়ী সাজানো।</p></div><div className="library-stat"><b>৪,৬৪৮+</b><span>প্র্যাকটিস প্রশ্ন</span><small>নিয়মিত হালনাগাদ</small></div></header><nav>{tabs.map(x=><button className={tab===x[0]?"active":""} onClick={()=>setTab(x[0])} key={x[0]}>{x[1]}</button>)}</nav><div className="library-grid">{items.map((item,i)=><article key={item[0]}><div><i>{tab==="mcq"?"◎":tab==="written"?"✎":tab==="papers"?"▤":"▶"}</i><span>{item[2]}</span></div><h3>{item[0]}</h3><p>{item[1]}</p>{tab==="mcq"&&<div className="library-progress"><span><i style={{width:item[3]+"%"}}/></span><small>{item[3]}% সম্পন্ন</small></div>}{tab==="papers"&&i===0?<a href="/resources/46th-bcs-preliminary-question.pdf" download>PDF ডাউনলোড ↓</a>:<button onClick={startGov}>{tab==="learn"?"শেখা শুরু করুন":tab==="written"?"প্রশ্ন অনুশীলন করুন":"প্র্যাকটিস শুরু করুন"} →</button>}</article>)}</div><footer><div><b>অভিযোজিত প্রস্তুতি</b><span>আপনার উত্তর অনুযায়ী প্রশ্নের কঠিনতা ও পরবর্তী অধ্যায় বদলাবে।</span></div><button onClick={startGov}>ডায়াগনস্টিক দিয়ে শুরু করুন →</button></footer></div></section>;
}
