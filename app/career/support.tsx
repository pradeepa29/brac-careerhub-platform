"use client";
import { useState } from "react";
import { Icon } from "../student/ui";
import { groups, topics, formatDate, dateAfter, text, type Language, type Profile, type Booking } from "./data";
import { ProfileFields } from "./onboarding";

export function Counselling({language,booking,onBook}:{language:Language;booking:Booking|null;onBook:(value:Booking|null)=>void}) {
  const t=(copy:readonly[string,string])=>text(language,copy);
  const [days]=useState(()=>Array.from({length:7},(_,i)=>dateAfter(i+1)));
  const [editing,setEditing]=useState(false);
  const [day,setDay]=useState("");
  const [time,setTime]=useState("");
  const [topic,setTopic]=useState("0");
  const [sessionLanguage,setSessionLanguage]=useState<Language>(language);
  const [note,setNote]=useState("");
  const [notice,setNotice]=useState(false);
  const [cancelling,setCancelling]=useState(false);
  const slots=["10:00","11:00","14:00","15:00","16:00"];
  const displayTime=(time:string)=>new Intl.DateTimeFormat(language==="en"?"en-GB":"bn-BD",{hour:"numeric",minute:"2-digit",hour12:true,timeZone:"UTC"}).format(new Date("2000-01-01T"+time+":00Z"));
  function startReschedule(){
    if(!booking)return;
    setDay(booking.day);setTime(booking.time);setTopic(booking.topic);setSessionLanguage(booking.language);setNote(booking.note);setEditing(true);
  }
  return <>
    <header className="career-heading"><h1>{t(["Career Counselling","ক্যারিয়ার কাউন্সেলিং"])}</h1><p>{t(["A little guidance for your next step.","পরবর্তী পদক্ষেপের জন্য কিছু দিকনির্দেশনা।"])}</p></header>
    <div className="career-booking-layout">
      <aside className="career-session-intro"><Icon name="tracker"/><h2>{t(["A conversation about you.","আপনাকে নিয়ে একটি আলোচনা।"])}</h2><p>{t(["Talk with the Career Hub team about your goals, your applications, or what to do next.","আপনার লক্ষ্য, আবেদন বা পরবর্তী পদক্ষেপ নিয়ে ক্যারিয়ার হাবের সঙ্গে কথা বলুন।"])}</p>
        <ul><li>{t(["30 minutes, one to one","৩০ মিনিট, একান্ত আলোচনা"])}</li><li>{t(["Online via Google Meet or Zoom","গুগল মিট বা জুমে অনলাইন"])}</li><li>{t(["English or Bangla","ইংরেজি বা বাংলা"])}</li></ul><p className="career-small">{t(["Choose a convenient time. We will arrange the session with our team.","সুবিধাজনক সময় বেছে নিন। আমাদের দলের সঙ্গে সেশনটি আয়োজন করা হবে।"])}</p>
      </aside>
      <section className="career-booking-panel">
        {booking&&!editing?<>
          <span className="career-confirmed">✓ {t(["Your session is booked","আপনার সেশন বুক হয়েছে"])}</span><h2>{t(["Your session with the Career Hub team","ক্যারিয়ার হাব দলের সঙ্গে আপনার সেশন"])}</h2>
          <dl className="career-appointment"><div><dt>{t(["Date","তারিখ"])}</dt><dd>{formatDate(new Date(booking.day),language)}</dd></div><div><dt>{t(["Time","সময়"])}</dt><dd>{displayTime(booking.time)} · {t(["30 minutes","৩০ মিনিট"])}</dd></div><div><dt>{t(["Timezone","সময় অঞ্চল"])}</dt><dd>{t(["Bangladesh time · UTC+6","বাংলাদেশ সময় · ইউটিসি+৬"])}</dd></div><div><dt>{t(["Topic","বিষয়"])}</dt><dd>{t(topics[Number(booking.topic)])}</dd></div><div><dt>{t(["Session language","সেশনের ভাষা"])}</dt><dd>{booking.language==="en"?t(["English","ইংরেজি"]):t(["Bangla","বাংলা"])}</dd></div>{booking.note&&<div><dt>{t(["Your note","আপনার নোট"])}</dt><dd>{booking.note}</dd></div>}</dl>
          <div className="career-meeting"><Icon name="tracker"/><div><strong>{t(["Google Meet · sample link","গুগল মিট · নমুনা লিংক"])}</strong><p>meet.google.com/demo-session</p></div><button className="career-button primary" onClick={()=>setNotice(true)}>{t(["Join session","সেশনে যোগ দিন"])} ↗</button></div>
          {notice&&<p className="career-info" role="status">{t(["This is a demo appointment. No live meeting is connected.","এটি একটি ডেমো অ্যাপয়েন্টমেন্ট। কোনো লাইভ মিটিং সংযুক্ত নেই।"])}</p>}
          <div className="career-inline-actions"><button className="career-button" onClick={startReschedule}>{t(["Reschedule","সময় পরিবর্তন"])}</button><button className="career-link" onClick={()=>setCancelling(true)}>{t(["Cancel booking","বুকিং বাতিল"])}</button></div>
          {cancelling&&<div className="career-info" role="alert"><strong>{t(["Cancel this appointment?","এই অ্যাপয়েন্টমেন্ট বাতিল করবেন?"])}</strong><div className="career-inline-actions"><button className="career-button" onClick={()=>{onBook(null);setCancelling(false);setNotice(false);setTime("");}}>{t(["Yes, cancel","হ্যাঁ, বাতিল করুন"])}</button><button className="career-link" onClick={()=>setCancelling(false)}>{t(["Keep booking","বুকিং রাখুন"])}</button></div></div>}
        </>:<form onSubmit={e=>{e.preventDefault();if(day&&time){onBook({day,time,topic,language:sessionLanguage,note});setEditing(false);setNotice(false);}}}>
          <h2>{editing?t(["Choose a new time","নতুন সময় বেছে নিন"]):t(["Find a time that works","সুবিধাজনক সময় বেছে নিন"])}</h2>
          <p>{t(["All times are Bangladesh time (UTC+6).","সব সময় বাংলাদেশ সময় অনুযায়ী (ইউটিসি+৬)।"])}</p>
          <fieldset><legend>{t(["1. Select a date","১. তারিখ বেছে নিন"])}</legend><div className="career-date-options">{days.map(date=><label key={date.toISOString()} className={day===date.toISOString()?"selected":""}>
            <input type="radio" name="day" required value={date.toISOString()} checked={day===date.toISOString()} onChange={e=>{setDay(e.target.value);setTime("");}}/>
            <span>{new Intl.DateTimeFormat(language==="en"?"en-GB":"bn-BD",{weekday:"short",timeZone:"Asia/Dhaka"}).format(date)}</span><strong>{new Intl.DateTimeFormat(language==="en"?"en-GB":"bn-BD",{day:"numeric",month:"short",timeZone:"Asia/Dhaka"}).format(date)}</strong>
          </label>)}</div></fieldset>
          <fieldset disabled={!day}><legend>{t(["2. Available times","২. খালি সময়"])}</legend>{!day&&<p className="career-small">{t(["Select a date to see time slots.","সময় দেখতে আগে তারিখ বেছে নিন।"])}</p>}
            <div className="career-slot-options">{slots.map((slot,i)=>{const unavailable=!!day&&(new Date(day).getDate()+i)%4===0;return <label key={slot} className={(time===slot?"selected ":"")+(unavailable?"unavailable":"")}>
              <input type="radio" required name="time" value={slot} disabled={unavailable} checked={time===slot} onChange={e=>setTime(e.target.value)}/><span>{displayTime(slot)}</span>{unavailable&&<small>{t(["Unavailable","খালি নেই"])}</small>}
            </label>;})}</div></fieldset>
          <fieldset><legend>{t(["3. What would you like to discuss?","৩. কী নিয়ে আলোচনা করতে চান?"])}</legend>
            <div className="career-fields"><label><span>{t(["Topic","বিষয়"])}</span><select value={topic} onChange={e=>setTopic(e.target.value)}>{topics.map((value,i)=><option key={i} value={String(i)}>{t(value)}</option>)}</select></label>
              <label><span>{t(["Preferred language","পছন্দের ভাষা"])}</span><select value={sessionLanguage} onChange={e=>setSessionLanguage(e.target.value as Language)}><option value="en">{t(["English","ইংরেজি"])}</option><option value="bn">{t(["Bangla","বাংলা"])}</option></select></label>
              <label className="career-full"><span>{t(["A note for the team · optional","দলের জন্য নোট · ঐচ্ছিক"])}</span><textarea rows={3} value={note} onChange={e=>setNote(e.target.value)} placeholder={t(["What would make this session useful for you?","কোন বিষয়ে আলোচনা আপনার জন্য উপকারী হবে?"])}/></label></div>
          </fieldset>
          <footer className="career-form-footer">{editing&&<button type="button" className="career-link" onClick={()=>setEditing(false)}>{t(["Keep original booking","আগের বুকিং রাখুন"])}</button>}<button disabled={!day||!time} type="submit" className="career-button primary">{editing?t(["Confirm new time","নতুন সময় নিশ্চিত করুন"]):t(["Confirm session","সেশন নিশ্চিত করুন"])} →</button></footer>
        </form>}
      </section>
    </div>
  </>;
}
export function MyProfile({language,profile,onSave}:{language:Language;profile:Profile;onSave:(profile:Profile)=>void}) {
  const [draft,setDraft]=useState({...profile});
  const [saved,setSaved]=useState(false);
  const t=(copy:readonly[string,string])=>text(language,copy);
  const update=(key:string,value:string)=>{setDraft(p=>({...p,[key]:value}));setSaved(false);};
  return <>
    <header className="career-heading"><h1>{t(["My Profile","আমার প্রোফাইল"])}</h1><p>{t(["Keep your details ready for your next opportunity.","পরবর্তী সুযোগের জন্য তথ্য হালনাগাদ রাখুন।"])}</p></header>
    <form className="career-profile-form" onSubmit={e=>{e.preventDefault();onSave({...draft});setSaved(true);}}>
      <section><h2>{t(["Personal details","ব্যক্তিগত তথ্য"])}</h2><div className="career-fields"><label><span>{t(["Full name","পুরো নাম"])}</span><input required value={draft.name||""} onChange={e=>update("name",e.target.value)}/></label><label><span>{t(["Email","ইমেইল"])}</span><input type="email" required value={draft.email||""} onChange={e=>update("email",e.target.value)}/></label></div></section>
      {groups.map((group,i)=><section key={i}><h2>{t(group.title)}</h2><ProfileFields group={i} profile={draft} update={update} language={language}/></section>)}
      <p className="career-small">{t(["Your report and recommendations reflect the original assessment. Profile edits can be used for new CV drafts.","প্রতিবেদন ও সুপারিশ প্রথম মূল্যায়নের ভিত্তিতে থাকবে। নতুন সিভি খসড়ায় পরিবর্তিত তথ্য ব্যবহার করা যাবে।"])}</p>
      <footer className="career-form-footer"><span role="status">{saved?t(["Profile updated for this session.","এই সেশনের জন্য প্রোফাইল হালনাগাদ হয়েছে।"]):""}</span><button className="career-button primary" type="submit">{t(["Save profile","প্রোফাইল সংরক্ষণ"])}</button></footer>
    </form>
  </>;
}

\n