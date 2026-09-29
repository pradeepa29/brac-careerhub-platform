"use client";
import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Icon } from "../student/ui";
import { actions, jobs, navigation, dimensions, groups, fieldValue, recommendedCourses, reportScores, statusLabels, formatDate, dateAfter, text, type Language, type Profile, type Page, type Status, type Booking } from "./data";
type Common = { language:Language; profile:Profile };
export function Overview({language,profile,statuses,go,booking,hasCV}:Common & {
  statuses:Record<string,Status>;go:(page:Page)=>void;booking:Booking|null;hasCV:boolean;
}) {
  const t=(copy:readonly[string,string])=>text(language,copy);
  const scores=reportScores(profile);
  const score=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);
  const done=actions.filter(action=>statuses[action.id]==="done").length;
  return <>
    <header className="career-heading"><span className="career-kicker">{t(["YOUR NEXT CHAPTER","আপনার পরবর্তী অধ্যায়"])}</span>
      <h1>{t(["Career Overview","ক্যারিয়ার সারসংক্ষেপ"])}</h1><p>{t(["Welcome,","স্বাগতম,"])} {profile.name}. {t(["Here is a starting point for your next move.","পরবর্তী পদক্ষেপের জন্য আপনার শুরুর জায়গা।"])}</p></header>
    <section className="career-report" aria-labelledby="career-report-title">
      <header><h2 id="career-report-title">{t(["Career Readiness","ক্যারিয়ার প্রস্তুতি"])}</h2><span className="career-pill">{t(["Profile assessment","প্রোফাইল মূল্যায়ন"])}</span></header>
      <div className="career-report-main">
        <div className="career-score-wrap"><div className="career-score" role="img" aria-label={t(["Readiness","প্রস্তুতি"])+": "+score+"%"} style={{"--score":score+"%"} as CSSProperties}><span><b>{score}</b><small>/ 100</small></span></div>
          <div><h3>{score>=75?t(["Building momentum","এগিয়ে চলেছেন"]):score>=50?t(["Developing","বিকাশমান"]):t(["Getting started","শুরু করছেন"])}</h3><p>{t(["Your background gives you a foundation. Focus on visible evidence of your skills and a clear application story.","আপনার পটভূমি একটি ভিত্তি তৈরি করেছে। দক্ষতার প্রমাণ ও আবেদনে নিজের অভিজ্ঞতা তুলে ধরায় মনোযোগ দিন।"])}</p></div>
        </div>
        <div className="career-dimensions">{dimensions.map((dimension,i)=><div key={i}><div><span>{t(dimension)}</span><strong>{scores[i]}%</strong></div><progress max={100} value={scores[i]} aria-label={t(dimension)}/></div>)}</div>
      </div>
    </section>
    <h2 className="career-section-title">{t(["Make your next move","পরবর্তী পদক্ষেপ নিন"])}</h2>
    <div className="career-destination-grid">{navigation.slice(1,5).map(item=><button className="career-destination" key={item.id} onClick={()=>go(item.id)}>
      <div className="career-destination-top"><Icon name={item.icon}/></div>
      <h3>{t(item.title)}</h3><p>{t(item.description)}</p>
      <small className="career-destination-status">{item.id==="plan"?t([done+" of "+actions.length+" actions completed",actions.length+"টি কাজের মধ্যে "+done+"টি সম্পন্ন"]):item.id==="jobs"?t([`${jobs.length} sample opportunities`,`${jobs.length}টি নমুনা সুযোগ`]):item.id==="cv"?(hasCV?t(["Draft in progress","খসড়া চলছে"]):t(["Ready to create","তৈরির জন্য প্রস্তুত"])):booking?t(["Session booked","সেশন বুক করা হয়েছে"]):t(["30-minute online session","৩০ মিনিটের অনলাইন সেশন"])}</small>
      <span className="career-destination-action"><span>{item.id==="plan"?t(["View my plan","আমার পরিকল্পনা দেখুন"]):item.id==="jobs"?t(["Explore jobs","চাকরি দেখুন"]):item.id==="cv"?t(["Open CV Studio","সিভি স্টুডিও খুলুন"]):booking?t(["View my booking","আমার বুকিং দেখুন"]):t(["Book a session","সেশন বুক করুন"])}</span><span className="career-destination-arrow" aria-hidden="true">→</span></span>
    </button>)}</div>
  </>;
}
export function ActionPlan({language,profile,statuses,onStatus,go}:Common & {statuses:Record<string,Status>;onStatus:(id:string,status:Status)=>void;go:(page:Page)=>void}) {
  const [filter,setFilter]=useState("all");
  const [courseStatuses,setCourseStatuses]=useState<Record<string,Status>>({});
  const t=(copy:readonly[string,string])=>text(language,copy);
  const done=actions.filter(action=>statuses[action.id]==="done").length;
  const visible=actions.filter(a=>filter==="all"||statuses[a.id]===filter);
  const courses=recommendedCourses(profile.roles);
  return <>
    <header className="career-heading career-plan-heading"><div><h1>{t(["Career Action Plan","ক্যারিয়ার কর্মপরিকল্পনা"])}</h1><p>{t(["Small, practical steps toward stronger applications.","আরও ভালো আবেদনের জন্য ছোট, বাস্তব পদক্ষেপ।"])}</p></div><a href="#career-recommendations-title">{t(["Explore recommended courses","প্রস্তাবিত কোর্স দেখুন"])} ↓</a></header>
    <div className="career-plan-progress"><div><strong>{done} / {actions.length} {t(["completed","সম্পন্ন"])}</strong><span>{t(["Your weekly learning time:","আপনার সাপ্তাহিক শেখার সময়:"])} {profile.hours} {t(["hours","ঘণ্টা"])}</span></div><progress max={actions.length} value={done} aria-label={t(["Action plan progress","কর্মপরিকল্পনার অগ্রগতি"])}/></div>
    <div className="career-tabs" role="group" aria-label={t(["Filter actions","কাজ বাছাই"])}>{["all","todo","doing","done"].map(status=><button key={status} aria-pressed={filter===status} className={filter===status?"active":""} onClick={()=>setFilter(status)}>{status==="all"?t(["All actions","সব কাজ"]):t(statusLabels[status as Status])}</button>)}</div>
    <div className="career-task-list">{visible.map(action=><article key={action.id} className={"career-task "+statuses[action.id]}>
      <div className="career-task-marker" aria-hidden="true">{statuses[action.id]==="done"?"✓":<span/>}</div>
      <div className="career-task-body"><div className="career-task-heading"><div><div className="career-task-meta"><span>{t(action.kind)}</span>{action.priority&&<span>{t(["Priority","অগ্রাধিকার"])}</span>}<span>{t(action.effort)}</span></div>
        <h2>{t(action.title)}</h2></div><select aria-label={t(action.title)+" — "+t(["Status","অবস্থা"])} value={statuses[action.id]} onChange={e=>onStatus(action.id,e.target.value as Status)}>{Object.entries(statusLabels).map(([value,label])=><option value={value} key={value}>{t(label)}</option>)}</select></div>
        <p>{t(action.why)}</p>
        <details><summary>{t(["Steps & resources","ধাপ ও রিসোর্স"])}</summary><p>{t(action.brief)}</p>
          {action.cv&&<button className="career-button" onClick={()=>go("cv")}>{t(["Open CV Studio","সিভি স্টুডিও খুলুন"])} →</button>}
        </details>
      </div>
    </article>)}</div>
    {!visible.length&&<div className="career-empty"><h2>{t(["No actions in this view","এই তালিকায় কোনো কাজ নেই"])}</h2><p>{t(["Change a task’s status or view all actions.","কাজের অবস্থা পরিবর্তন করুন বা সব কাজ দেখুন।"])}</p></div>}
    <section className="career-recommendations" aria-labelledby="career-recommendations-title">
      <header><div><span className="career-kicker">{t(["RECOMMENDED LEARNING","প্রস্তাবিত শেখার বিষয়"])}</span><h2 id="career-recommendations-title">{t(["Courses for your next step","পরবর্তী পদক্ষেপের জন্য কোর্স"])}</h2><p>{t(["Selected for your interest in","আপনার আগ্রহ অনুযায়ী বাছাই করা হয়েছে:"])} {fieldValue(groups[2].fields[0],profile,language)}.</p></div><span>{courses.length} {t(["courses","কোর্স"])}</span></header>
      <div className="career-recommendation-list">{courses.map(course=><article className="career-recommendation" key={course.id}>
        <span className="career-recommendation-image"><Image src={`/career/course-${course.id}.webp`} alt="" width={144} height={108} sizes="(max-width: 600px) 96px, 144px" /></span>
        <div><span className="career-recommendation-provider">{course.provider}</span><h3>{t(course.title)}</h3><p>{t(course.reason)}</p><small>{t(["Try it:","অনুশীলন করুন:"])} {t(course.outcome)}</small></div>
        <div className="career-recommendation-actions"><select aria-label={t(course.title)+" — "+t(["Status","অবস্থা"])} value={courseStatuses[course.id]??"todo"} onChange={e=>setCourseStatuses(current=>({...current,[course.id]:e.target.value as Status}))}>{Object.entries(statusLabels).map(([value,label])=><option key={value} value={value}>{t(label)}</option>)}</select><a href={course.url} target="_blank" rel="noopener noreferrer">{t(["View course","কোর্স দেখুন"])} <span aria-hidden="true">↗</span></a></div>
      </article>)}</div>
      <p className="career-recommendation-note">{t(["These are sample recommendations. Check access and certificate pricing on the provider site before enrolling.","এগুলো নমুনা সুপারিশ। ভর্তি হওয়ার আগে প্রদানকারীর সাইটে প্রবেশাধিকার ও সার্টিফিকেটের মূল্য দেখুন।"])}</p>
    </section>
  </>;
}
export function RecommendedJobs({language,profile}:Common) {
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("all");
  const [selected,setSelected]=useState<string|null>(null);
  const [baseDate]=useState(()=>new Date());
  const t=(copy:readonly[string,string])=>text(language,copy);
  const selectedJob=jobs.find(j=>j.id===selected);
  const deadline=(days:number|null)=>days===null?t(["Rolling applications","চলমান আবেদন"]):formatDate(dateAfter(days,baseDate),language);
  if(selectedJob)return <>
    <button className="career-link" onClick={()=>setSelected(null)}>← {t(["All opportunities","সব সুযোগ"])}</button>
    <header className="career-heading career-job-detail-heading"><div><span className="career-kicker">{selectedJob.company}</span><h1>{t(selectedJob.title)}</h1><p>{t(selectedJob.mode)} · {t(selectedJob.type)}</p></div><Image src={`/career/job-${selectedJob.id}.webp`} alt="" width={196} height={138} sizes="(max-width: 600px) 100vw, 196px" /></header>
    <div className="career-job-facts"><div><span>{t(["Experience","অভিজ্ঞতা"])}</span><strong>{t(selectedJob.experience)}</strong></div><div><span>{t(["Apply by","আবেদনের শেষ তারিখ"])}</span><strong>{deadline(selectedJob.days)}</strong></div></div>
    <section className="career-prose"><h2>{t(["Why explore this role","কেন এই পদটি বিবেচনা করবেন"])}</h2><p>{t(selectedJob.why)}</p><h2>{t(["Responsibilities & requirements","দায়িত্ব ও যোগ্যতা"])}</h2><p>{t(selectedJob.duties)}</p><h2>{t(["Before you apply","আবেদনের আগে"])}</h2><p>{t(selectedJob.gap)}</p><h2>{t(["How to apply","যেভাবে আবেদন করবেন"])}</h2><p>{t(["Prepare a tailored CV and the work samples requested in the live listing. Apply through the employer’s official site or the job board linked in that listing.","লক্ষ্যভিত্তিক সিভি ও বিজ্ঞপ্তিতে চাওয়া কাজের নমুনা তৈরি করুন। নিয়োগদাতার অফিসিয়াল সাইট বা সংশ্লিষ্ট জব বোর্ডে আবেদন করুন।"])}</p>
      <div className="career-info"><strong>{t(["Sample opportunity","নমুনা সুযোগ"])}</strong><p>{t(["This company, role and deadline are illustrative. The link below opens a live job board for your own search; it is not an application for this sample.","এই প্রতিষ্ঠান, পদ ও সময়সীমা নমুনা। নিচের লিংকে বাস্তব জব বোর্ডে অনুসন্ধান করতে পারবেন; এটি এই নমুনা পদের আবেদন নয়।"])}</p><a className="career-button primary" href="https://www.bdjobs.com/" target="_blank" rel="noreferrer">{t(["Browse live jobs on Bdjobs","বিডিজবসে বাস্তব চাকরি দেখুন"])} ↗</a></div>
    </section>
  </>;
  const visible=[...jobs].sort((a,b)=>Number(b.field===profile.roles)-Number(a.field===profile.roles)).filter(j=>(filter==="all"||j.field===filter)&&[...j.title,j.company,...j.mode].join(" ").toLowerCase().includes(search.toLowerCase()));
  return <>
    <header className="career-heading"><h1>{t(["Recommended Jobs","প্রস্তাবিত চাকরি"])}</h1><p>{t(["Explore possible roles, then apply through the original listing.","সম্ভাব্য পদ দেখুন, তারপর মূল বিজ্ঞপ্তির মাধ্যমে আবেদন করুন।"])}</p></header>
    <div className="career-toolbar"><label className="career-search"><Icon name="search"/><input aria-label={t(["Search jobs","চাকরি খুঁজুন"])} placeholder={t(["Search role, company or location","পদ, প্রতিষ্ঠান বা স্থান খুঁজুন"])} value={search} onChange={e=>setSearch(e.target.value)}/></label>
      <select aria-label={t(["Job field","চাকরির ক্ষেত্র"])} value={filter} onChange={e=>setFilter(e.target.value)}>{[["all","All fields","সব ক্ষেত্র"],["business","Business & operations","ব্যবসা ও পরিচালনা"],["data","Data & technology","ডেটা ও প্রযুক্তি"],["marketing","Marketing","বিপণন"]].map(([value,en,bn])=><option key={value} value={value}>{t([en,bn])}</option>)}</select></div>
    <p className="career-small">{visible.length} {t(["sample opportunities · Sorted by your field of interest","টি নমুনা সুযোগ · আপনার আগ্রহ অনুযায়ী সাজানো"])}</p>
    <div className="career-job-list">{visible.map(j=><article key={j.id}><button className="career-job-image" aria-label={t(["View opportunity:","সুযোগ দেখুন:"])+" "+t(j.title)} onClick={()=>setSelected(j.id)}><Image src={`/career/job-${j.id}.webp`} alt="" width={144} height={108} sizes="(max-width: 600px) 96px, 144px" /></button><div className="career-job-copy"><div className="career-task-meta"><span>{j.company}</span><span>{t(j.type)}</span></div><button className="career-job-title" onClick={()=>setSelected(j.id)}>{t(j.title)}</button><p>{t(j.mode)} · {t(j.experience)}</p><p className="career-fit">{t(j.why)}</p></div>
      <div className="career-job-action"><small>{t(["Apply by","শেষ তারিখ"])}</small><strong>{deadline(j.days)}</strong><button className="career-button" onClick={()=>setSelected(j.id)}>{t(["View opportunity","বিস্তারিত দেখুন"])} →</button></div></article>)}</div>
    {!visible.length&&<div className="career-empty"><h2>{t(["No matching opportunities","মিল পাওয়া যায়নি"])}</h2><button className="career-button" onClick={()=>{setSearch("");setFilter("all");}}>{t(["Reset search","অনুসন্ধান রিসেট করুন"])}</button></div>}
    <p className="career-small">{t(["Curated demo examples, not live vacancies. Check the original employer’s listing before applying.","ডেমোর জন্য সাজানো উদাহরণ, চলমান শূন্যপদ নয়। আবেদনের আগে নিয়োগদাতার মূল বিজ্ঞপ্তি যাচাই করুন।"])}</p>
  </>;
}
