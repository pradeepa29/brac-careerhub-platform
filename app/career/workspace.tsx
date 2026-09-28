"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "../student/ui";
import { actions, navigation, sampleProfile, text, type Language, type Page, type Profile, type Status, type Booking } from "./data";
import { LanguageSwitch, Questionnaire, Analysis } from "./onboarding";
import { Overview, ActionPlan, RecommendedJobs } from "./explore";
import { Counselling, MyProfile } from "./support";
import { CVStudio } from "./cv-studio";
import "./career.css";

export default function CareerWorkspace({active,entry,exit}:{active:boolean;entry:Page;exit:()=>void}) {
  const [language,setLanguage]=useState<Language>("en");
  const [phase,setPhase]=useState<"welcome"|"questionnaire"|"analysis"|"ready">("welcome");
  const [profile,setProfile]=useState<Profile>(()=>sampleProfile("en"));
  const [assessment,setAssessment]=useState<Profile>({});
  const [page,setPage]=useState<Page>("overview");
  const [lastEntry,setLastEntry]=useState({active,entry});
  if(lastEntry.active!==active || lastEntry.entry!==entry){
    setLastEntry({active,entry});
    if(active)setPage(entry);
  }
  const [returning,setReturning]=useState(false);
  const [statuses,setStatuses]=useState<Record<string,Status>>(()=>Object.fromEntries(actions.map(a=>[a.id,"todo"])));
  const [booking,setBooking]=useState<Booking|null>(null);
  const [hasCV,setHasCV]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const menu=useRef<HTMLDialogElement>(null);
  const main=useRef<HTMLElement>(null);
  const t=(copy:readonly[string,string])=>text(language,copy);
  const update=(key:string,value:string)=>setProfile(p=>({...p,[key]:value}));
  useEffect(()=>{
    if(active&&phase==="ready"){
      main.current?.focus({preventScroll:true});
      window.scrollTo({top:0,behavior:"instant"});
    }
  },[active,phase,page]);
  useEffect(()=>{
    const dialog=menu.current;
    if(!dialog)return;
    if(mobileOpen){
      dialog.showModal();const old=document.body.style.overflow;document.body.style.overflow="hidden";
      const closeFromBackdrop=(event:MouseEvent)=>{if(event.target===dialog)setMobileOpen(false);};
      dialog.addEventListener("click",closeFromBackdrop);
      return()=>{dialog.removeEventListener("click",closeFromBackdrop);dialog.close();document.body.style.overflow=old;};
    }
  },[mobileOpen]);
  function go(destination:Page){setPage(destination);setMobileOpen(false);window.scrollTo({top:0,behavior:"instant"});}
  function returningAccount(){
    const preset=sampleProfile(language);setProfile(preset);setAssessment({...preset});setReturning(true);
    setStatuses(Object.fromEntries(actions.map(a=>[a.id,a.initial])));setHasCV(true);setPage(entry);setPhase("ready");
  }
  const sidebar=<>
    <div className="career-brand"><Image src="/careerhub-logo.png" width={108} height={74} alt="BRAC Career Hub"/><span>{t(["CAREER & JOBS","ক্যারিয়ার ও চাকরি"])}</span></div>
    <nav aria-label={t(["Career navigation","ক্যারিয়ার নেভিগেশন"])}>{navigation.map((item,i)=><div key={item.id}>{i===1&&<span className="career-nav-label">{t(["YOUR NEXT STEPS","পরবর্তী পদক্ষেপ"])}</span>}{i===5&&<span className="career-nav-label">{t(["ACCOUNT","অ্যাকাউন্ট"])}</span>}<button className={page===item.id?"active":""} aria-current={page===item.id?"page":undefined} onClick={()=>go(item.id)}><Icon name={item.icon}/><span>{t(item.title)}</span></button></div>)}</nav>
    <div className="career-sidebar-bottom"><LanguageSwitch language={language} onChange={setLanguage}/><button className="career-account" onClick={()=>go("profile")}><Icon name="profile"/><span><strong>{profile.name}</strong><small>{t(["Career Hub member","ক্যারিয়ার হাব সদস্য"])}</small></span></button>
      <button className="career-link" onClick={()=>{setMobileOpen(false);exit();}}>← {t(["Back to home","হোমে ফিরুন"])}</button><p>{t(["Demo session · resets on refresh","ডেমো সেশন · রিফ্রেশে রিসেট হবে"])}</p></div>
  </>;
  if(phase!=="ready")return <div className="career-app career-entry" lang={language}>
    <header className="career-entry-header"><button className="career-brand-button" onClick={exit} aria-label={t(["Back to home","হোমে ফিরুন"])}><Image src="/careerhub-logo.png" width={98} height={65} alt="BRAC Career Hub"/></button><div><LanguageSwitch language={language} onChange={setLanguage}/><button className="career-link" onClick={exit}>{t(["Back to home","হোমে ফিরুন"])}</button></div></header>
    {phase==="welcome"&&<main className="career-welcome"><section><span className="career-kicker">{t(["CAREER & JOBS","ক্যারিয়ার ও চাকরি"])}</span><h1>{t(["Your potential.\nA clearer direction.","আপনার সম্ভাবনা।\nআরও স্পষ্ট দিকনির্দেশনা।"])}</h1><p>{t(["Get a practical plan for your next career step, built around your background and ambitions.","আপনার পটভূমি ও লক্ষ্য অনুযায়ী পরবর্তী ক্যারিয়ার পদক্ষেপের বাস্তব পরিকল্পনা পান।"])}</p>
      <ol><li><span>01</span><div><strong>{t(["Tell us about yourself","নিজের সম্পর্কে জানান"])}</strong><p>{t(["Education, experience and what comes next.","শিক্ষা, অভিজ্ঞতা ও পরবর্তী লক্ষ্য।"])}</p></div></li><li><span>02</span><div><strong>{t(["Understand your starting point","বর্তমান অবস্থান জানুন"])}</strong><p>{t(["A report with strengths and priorities.","শক্তি ও অগ্রাধিকার নিয়ে প্রতিবেদন।"])}</p></div></li><li><span>03</span><div><strong>{t(["Take the next step","পরবর্তী পদক্ষেপ নিন"])}</strong><p>{t(["Your plan, opportunities and support in one place.","পরিকল্পনা, সুযোগ ও সহায়তা এক জায়গায়।"])}</p></div></li></ol>
    </section><section className="career-signup"><h2>{t(["Start your career profile","আপনার ক্যারিয়ার প্রোফাইল শুরু করুন"])}</h2><p>{t(["Create a demo account, then complete your background questionnaire.","ডেমো অ্যাকাউন্ট তৈরি করে পটভূমির প্রশ্নমালা পূরণ করুন।"])}</p>
      <form onSubmit={e=>{e.preventDefault();if(profile.name?.trim()&&profile.email?.trim())setPhase("questionnaire");}}>
        <label><span>{t(["Full name","পুরো নাম"])}</span><input name="name" autoComplete="name" required value={profile.name||""} onChange={e=>update("name",e.target.value)}/></label>
        <label><span>{t(["Email address","ইমেইল ঠিকানা"])}</span><input type="email" name="email" autoComplete="email" required value={profile.email||""} onChange={e=>update("email",e.target.value)}/></label>
        <button className="career-button primary" type="submit">{t(["Create demo account","ডেমো অ্যাকাউন্ট তৈরি করুন"])} →</button>
        <button type="button" className="career-link" onClick={()=>setProfile(sampleProfile(language))}>{t(["Fill with a sample student","নমুনা শিক্ষার্থীর তথ্য পূরণ করুন"])}</button>
      </form><div className="career-returning"><span>{t(["Already completed your profile?","প্রোফাইল আগে পূরণ করেছেন?"])}</span><button className="career-button" onClick={returningAccount}>{t(["Log in as returning demo user","ফিরতি ডেমো ব্যবহারকারী হিসেবে লগইন"])}</button></div>
      <small>{t(["No password or verification is needed for this demonstration.","এই ডেমোতে পাসওয়ার্ড বা যাচাই প্রয়োজন নেই।"])}</small>
    </section></main>}
    {phase==="questionnaire"&&<Questionnaire profile={profile} update={update} language={language} onComplete={()=>{setAssessment({...profile});setPhase("analysis");}}/>}
    {phase==="analysis"&&<Analysis language={language} onComplete={()=>{setStatuses(s=>({...s,goals:"done"}));setPage(entry);setPhase("ready");}}/>}
  </div>;
  return <div className="career-app career-shell" lang={language}>
    <a className="career-skip" href="#career-content">{t(["Skip to content","মূল অংশে যান"])}</a>
    <aside className="career-sidebar">{sidebar}</aside>
    <dialog className="career-mobile-menu" ref={menu} aria-label={t(["Career navigation","ক্যারিয়ার নেভিগেশন"])} onCancel={()=>setMobileOpen(false)}><div><button className="career-menu-close" aria-label={t(["Close menu","মেনু বন্ধ করুন"])} onClick={()=>setMobileOpen(false)}>×</button>{sidebar}</div></dialog>
    <main id="career-content" ref={main} tabIndex={-1} className="career-main">
      <div className="career-mobile-bar"><button className="career-button" onClick={()=>setMobileOpen(true)}><Icon name="menu"/>{t(["Menu","মেনু"])}</button><LanguageSwitch language={language} onChange={setLanguage}/></div>
      <div className="career-main-inner">
        <div hidden={page!=="overview"}><Overview language={language} profile={assessment} statuses={statuses} go={go} booking={booking} hasCV={hasCV}/></div>
        <div hidden={page!=="plan"}><ActionPlan language={language} profile={assessment} statuses={statuses} onStatus={(id,status)=>setStatuses(s=>({...s,[id]:status}))} go={go}/></div>
        <div hidden={page!=="jobs"}><RecommendedJobs language={language} profile={assessment}/></div>
        <div hidden={page!=="cv"}><CVStudio language={language} profile={profile} seeded={returning} onDraft={()=>{setHasCV(true);setStatuses(s=>({...s,cv:s.cv==="done"?"done":"doing"}));}}/></div>
        <div hidden={page!=="counselling"}><Counselling language={language} booking={booking} onBook={setBooking}/></div>
        <div hidden={page!=="profile"}><MyProfile language={language} profile={profile} onSave={setProfile}/></div>
      </div>
    </main>
  </div>;
}
