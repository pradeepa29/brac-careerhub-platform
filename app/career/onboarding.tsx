"use client";
import { useEffect, useRef, useState } from "react";
import { groups, visibleFields, validProfile, fieldValue, text, type Language, type Profile, type Field } from "./data";

export function LanguageSwitch({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return <div className="career-language" role="group" aria-label={text(language,["Language","ভাষা"])}>
    <button type="button" lang="en" aria-pressed={language === "en"} onClick={() => onChange("en")}>English</button>
    <button type="button" lang="bn" aria-pressed={language === "bn"} onClick={() => onChange("bn")}>বাংলা</button>
  </div>;
}
export function ProfileFields({ group, profile, update, language }: {
  group: number; profile: Profile; update: (key: string, value: string) => void; language: Language;
}) {
  const t = (copy: readonly [string,string]) => text(language, copy);
  function input(field: Field) {
    const props = { name:field.key, value:profile[field.key] || "", required:!field.optional, onChange:(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>update(field.key,e.target.value) };
    if (field.options) return <select {...props}><option value="">{t(["Choose an option","একটি বেছে নিন"])}</option>{field.options.map(o=><option key={o.value} value={o.value}>{t(o.label)}</option>)}</select>;
    if (field.type === "textarea") return <textarea {...props} rows={3} />;
    return <input {...props} type={field.type || "text"} min={field.min} max={field.key==="grade" ? Number(profile.scale) : field.max} step={field.key==="grade" ? "0.01" : undefined} onBlur={e=>{if(!field.optional)e.currentTarget.setCustomValidity(e.target.value.trim() ? "" : t(["Please complete this field.","এই ঘরটি পূরণ করুন।"]));}} onInput={e=>e.currentTarget.setCustomValidity("")} />;
  }
  return <div className="career-fields">{visibleFields(group,profile).map(field=><label key={field.key} className={field.type==="textarea" ? "career-full" : ""}>
    <span>{t(field.label)}{field.optional && <small> · {t(["Optional","ঐচ্ছিক"])}</small>}</span>{input(field)}
  </label>)}</div>;
}
export function Questionnaire({ profile, update, language, onComplete }: {
  profile: Profile; update:(key:string,value:string)=>void; language:Language; onComplete:()=>void;
}) {
  const [step,setStep]=useState(0);
  const [error,setError]=useState(false);
  const heading=useRef<HTMLHeadingElement>(null);
  const t=(copy:readonly [string,string])=>text(language,copy);
  useEffect(()=>{heading.current?.focus();},[step]);
  return <div className="career-onboarding">
    <aside><span className="career-kicker">{t(["YOUR STARTING POINT","আপনার শুরুর ধাপ"])}</span><h1>{t(["A career plan that starts with you.","আপনাকে ঘিরেই আপনার ক্যারিয়ার পরিকল্পনা।"])}</h1>
      <p>{t(["A few details help us understand your background, interests and next steps.","কিছু তথ্য আপনার পটভূমি, আগ্রহ ও পরবর্তী পদক্ষেপ বুঝতে সাহায্য করবে।"])}</p>
      <ol className="career-onboarding-steps">{groups.map((g,i)=><li key={i} className={i===step?"active":i<step?"complete":""}><span aria-hidden="true">{i<step?"✓":i+1}</span>{t(g.title)}</li>)}
      <li className={step===4?"active":""}><span aria-hidden="true">5</span>{t(["Review your answers","উত্তর যাচাই করুন"])}</li></ol>
      <p className="career-small">{t(["Complete each section to unlock your workspace. Your answers stay here while you move between steps.","ওয়ার্কস্পেসে যেতে প্রতিটি অংশ পূরণ করুন। ধাপ পরিবর্তন করলেও উত্তর থাকবে।"])}</p>
    </aside>
    <section className="career-question-panel">
      <div className="career-step-count">{t(["Step","ধাপ"])} {step+1} / 5</div>
      <progress max={5} value={step+1} aria-label={t(["Questionnaire progress","প্রশ্নমালার অগ্রগতি"])} />
      <h2 ref={heading} tabIndex={-1}>{step<4?t(groups[step].title):t(["Review your answers","উত্তর যাচাই করুন"])}</h2>
      <p>{step<4?t(groups[step].description):t(["Check these details before we prepare your report.","প্রতিবেদন তৈরির আগে তথ্যগুলো যাচাই করুন।"])}</p>
      <form onSubmit={e=>{e.preventDefault();if(step<4){setStep(step+1);setError(false);}else if(validProfile(profile)){onComplete();}else setError(true);}}>
        {step<4 ? <ProfileFields group={step} profile={profile} update={update} language={language}/> : <div className="career-answer-summary">{groups.map((g,i)=><section key={i}>
          <header><h3>{t(g.title)}</h3><button type="button" className="career-link" onClick={()=>setStep(i)}>{t(["Edit","সম্পাদনা"])}</button></header>
          <dl>{visibleFields(i,profile).filter(f=>profile[f.key]).map(f=><div key={f.key}><dt>{t(f.label)}</dt><dd>{fieldValue(f,profile,language)}</dd></div>)}</dl>
        </section>)}</div>}
        {error && <p role="alert" className="career-error">{t(["Please review your answers and complete all required fields with valid values.","উত্তর যাচাই করুন এবং আবশ্যক ঘরগুলো সঠিক তথ্য দিয়ে পূরণ করুন।"])}</p>}
        <footer className="career-form-footer"><button className="career-button" type="button" disabled={step===0} onClick={()=>setStep(step-1)}>{t(["Back","পেছনে"])}</button>
          <button className="career-button primary" type="submit">{step<4?t(["Continue","এগিয়ে যান"]):t(["Create my career plan","আমার পরিকল্পনা তৈরি করুন"])} <span aria-hidden="true">→</span></button></footer>
      </form>
    </section>
  </div>;
}
const analysisMessages = [
  ["Reviewing your education and experience","আপনার শিক্ষা ও অভিজ্ঞতা বিশ্লেষণ করা হচ্ছে"],
  ["Finding strengths and development areas","শক্তি ও উন্নতির ক্ষেত্র চিহ্নিত করা হচ্ছে"],
  ["Matching roles and learning resources","উপযুক্ত পদ ও শেখার রিসোর্স খোঁজা হচ্ছে"],
  ["Preparing your career report","আপনার ক্যারিয়ার প্রতিবেদন তৈরি হচ্ছে"],
] as const;
export function Analysis({language,onComplete}:{language:Language;onComplete:()=>void}) {
  const [elapsed,setElapsed]=useState(0);
  const complete=useRef(onComplete);
  useEffect(()=>{complete.current=onComplete;},[onComplete]);
  useEffect(()=>{
    const started=Date.now();
    const interval=window.setInterval(()=>setElapsed(Math.min(Date.now()-started,6000)),80);
    const timer=window.setTimeout(()=>complete.current(),6000);
    return ()=>{clearInterval(interval);clearTimeout(timer);};
  },[]);
  const current=Math.min(3,Math.floor(elapsed/1500));
  return <section className="career-analysis" aria-busy="true">
    <div className="career-analysis-orbit" aria-hidden="true"><span/><span/><b>✦</b></div>
    <span className="career-kicker">{text(language,["A LITTLE CLARITY, A NEW DIRECTION","নতুন দিকের সন্ধানে"])}</span>
    <h1>{text(language,["Connecting your potential to your next step.","আপনার সম্ভাবনা থেকে পরবর্তী পদক্ষেপ।"])}</h1>
    <p role="status" aria-live="polite">{text(language,analysisMessages[current])}</p>
    <progress max={6000} value={elapsed} aria-label={text(language,["Analysis progress","বিশ্লেষণের অগ্রগতি"])}/>
    <ol>{analysisMessages.map((message,i)=><li key={i} className={i<=current?"active":""}><span aria-hidden="true">{i<current?"✓":String(i+1).padStart(2,"0")}</span>{text(language,message)}</li>)}</ol>
    <small>{text(language,["Demo analysis · your report will be ready in a few seconds.","ডেমো বিশ্লেষণ · কয়েক সেকেন্ডেই প্রতিবেদন প্রস্তুত হবে।"])}</small>
  </section>;
}

\n