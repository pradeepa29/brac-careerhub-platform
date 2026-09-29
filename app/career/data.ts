export type Language = "en" | "bn";
export type Copy = readonly [string, string];
export const text = (language: Language, copy: Copy) => copy[language === "en" ? 0 : 1];
export type Page = "overview" | "plan" | "jobs" | "cv" | "counselling" | "profile";
export type Status = "todo" | "doing" | "done";
export const statusLabels: Record<Status, Copy> = { todo: ["To do", "বাকি"], doing: ["In progress", "চলমান"], done: ["Completed", "সম্পন্ন"] };
export const navigation: { id: Page; title: Copy; description: Copy; icon: string }[] = [
  { id: "overview", title: ["Career Overview", "ক্যারিয়ার সারসংক্ষেপ"], description: ["Your starting point and next steps.", "আপনার বর্তমান অবস্থান ও পরবর্তী পদক্ষেপ।"], icon: "catalog" },
  { id: "plan", title: ["Career Action Plan", "ক্যারিয়ার কর্মপরিকল্পনা"], description: ["Build experience and strengthen your professional profile.", "অভিজ্ঞতা বাড়ান এবং পেশাগত প্রোফাইল উন্নত করুন।"], icon: "pathway" },
  { id: "jobs", title: ["Recommended Jobs", "প্রস্তাবিত চাকরি"], description: ["Explore opportunities aligned with your skills and interests.", "আপনার দক্ষতা ও আগ্রহের সঙ্গে মানানসই সুযোগ দেখুন।"], icon: "programs" },
  { id: "cv", title: ["CV Studio", "সিভি স্টুডিও"], description: ["Turn your education and experience into a focused CV.", "শিক্ষা ও অভিজ্ঞতা দিয়ে লক্ষ্যভিত্তিক সিভি তৈরি করুন।"], icon: "documents" },
  { id: "counselling", title: ["Career Counselling", "ক্যারিয়ার কাউন্সেলিং"], description: ["Talk through your next steps with the Career Hub team.", "ক্যারিয়ার হাবের সঙ্গে পরবর্তী পদক্ষেপ নিয়ে কথা বলুন।"], icon: "tracker" },
  { id: "profile", title: ["My Profile", "আমার প্রোফাইল"], description: ["Keep your background and preferences up to date.", "আপনার তথ্য ও পছন্দ হালনাগাদ রাখুন।"], icon: "profile" },
];
export type Field = {
  key: string; label: Copy; type?: "textarea" | "number" | "url" | "email";
  options?: { value: string; label: Copy }[]; optional?: boolean; min?: number; max?: number;
};
const option = (value: string, en: string, bn: string) => ({ value, label: [en, bn] as Copy });
export const groups: { title: Copy; description: Copy; fields: Field[] }[] = [
  { title: ["Education & background", "শিক্ষা ও পটভূমি"], description: ["Start with where you are today.", "আপনার বর্তমান অবস্থান দিয়ে শুরু করুন।"], fields: [
    { key: "situation", label: ["Current situation", "বর্তমান অবস্থা"], options: [option("student","Student","শিক্ষার্থী"),option("graduate","Recent graduate","সদ্য স্নাতক"),option("working","Working professional","কর্মজীবী"),option("seeking","Looking for work","চাকরি খুঁজছি")] },
    { key: "qualification", label: ["Highest qualification", "সর্বোচ্চ শিক্ষাগত যোগ্যতা"], options: [option("secondary","SSC / O Levels","এসএসসি / ও লেভেল"),option("higher","HSC / A Levels","এইচএসসি / এ লেভেল"),option("diploma","Diploma","ডিপ্লোমা"),option("bachelor","Bachelor’s degree","স্নাতক"),option("master","Master’s degree","স্নাতকোত্তর")] },
    { key: "institution", label: ["Institution", "শিক্ষাপ্রতিষ্ঠান"] }, { key: "subject", label: ["Subject / major", "বিষয় / বিভাগ"] },
    { key: "graduation", label: ["Graduation year (actual or expected)", "পাসের বছর (সম্পন্ন বা প্রত্যাশিত)"], type: "number", min: 1970, max: 2040 },
    { key: "scale", label: ["Grading scale", "ফলাফলের স্কেল"], options: [option("4","CGPA out of 4","সিজিপিএ ৪ এর মধ্যে"),option("5","GPA out of 5","জিপিএ ৫ এর মধ্যে"),option("100","Percentage","শতকরা"),option("pending","Result pending / other","ফলাফল অপেক্ষমাণ / অন্যান্য")] },
    { key: "grade", label: ["Grade / score", "ফলাফল / স্কোর"], type: "number", min: 0 },
  ] },
  { title: ["Skills & experience", "দক্ষতা ও অভিজ্ঞতা"], description: ["Projects and volunteering count, too.", "প্রকল্প ও স্বেচ্ছাসেবার অভিজ্ঞতাও গুরুত্বপূর্ণ।"], fields: [
    { key: "skills", label: ["Skills you can demonstrate", "আপনার প্রমাণযোগ্য দক্ষতা"], type: "textarea" },
    { key: "proficiency", label: ["Confidence using these skills", "এই দক্ষতাগুলো ব্যবহারে আত্মবিশ্বাস"], options: [option("beginner","Learning the basics","মৌলিক বিষয় শিখছি"),option("intermediate","Comfortable with everyday tasks","নিয়মিত কাজে স্বচ্ছন্দ"),option("advanced","Can work independently","স্বাধীনভাবে কাজ করতে পারি")] },
    { key: "experience", label: ["Work experience", "কাজের অভিজ্ঞতা"], options: [option("none","No work experience yet","এখনো কাজের অভিজ্ঞতা নেই"),option("intern","Internship / part-time work","ইন্টার্নশিপ / খণ্ডকালীন কাজ"),option("experienced","One year or more","এক বছর বা বেশি")] },
    { key: "experienceDetail", label: ["Responsibilities and results", "দায়িত্ব ও অর্জন"], type: "textarea" },
    { key: "projects", label: ["Projects / volunteering (write “None yet” if needed)", "প্রকল্প / স্বেচ্ছাসেবা (প্রযোজ্য হলে লিখুন ‘এখনো নেই’)"], type: "textarea" },
    { key: "certifications", label: ["Certifications", "সার্টিফিকেট"], optional: true },
    { key: "linkedin", label: ["LinkedIn URL", "লিংকডইন লিংক"], type: "url", optional: true },
    { key: "portfolio", label: ["Portfolio URL", "পোর্টফোলিও লিংক"], type: "url", optional: true },
  ] },
  { title: ["Career preferences", "ক্যারিয়ার পছন্দ"], description: ["Tell us what you want to explore.", "কোন দিকে এগোতে চান তা জানান।"], fields: [
    { key: "roles", label: ["Roles or fields of interest", "পছন্দের পদ বা ক্ষেত্র"], options: [option("business","Business & operations","ব্যবসা ও পরিচালনা"),option("data","Data & technology","ডেটা ও প্রযুক্তি"),option("marketing","Marketing & communication","বিপণন ও যোগাযোগ"),option("unsure","Not sure yet","এখনো নিশ্চিত নই")] },
    { key: "location", label: ["Preferred location", "পছন্দের কর্মস্থল"], options: [option("dhaka","Dhaka","ঢাকা"),option("chattogram","Chattogram","চট্টগ্রাম"),option("anywhere","Anywhere in Bangladesh","বাংলাদেশের যেকোনো স্থান")] },
    { key: "workMode", label: ["Work arrangement", "কাজের ধরন"], options: [option("any","Open to all","সব ধরনের কাজে আগ্রহী"),option("onsite","On-site","অফিসে"),option("hybrid","Hybrid","হাইব্রিড"),option("remote","Remote","দূর থেকে")] },
    { key: "employment", label: ["Employment type", "নিয়োগের ধরন"], options: [option("full","Full-time","পূর্ণকালীন"),option("internship","Internship","ইন্টার্নশিপ"),option("part","Part-time","খণ্ডকালীন"),option("any","Open to all","সব ধরনের")] },
    { key: "availability", label: ["When can you start?", "কবে শুরু করতে পারবেন?"], options: [option("now","Immediately","এখনই"),option("month","Within a month","এক মাসের মধ্যে"),option("later","After graduation","পড়াশোনা শেষে")] },
  ] },
  { title: ["Goals & development", "লক্ষ্য ও উন্নয়ন"], description: ["We will shape the plan around your priorities.", "আপনার অগ্রাধিকার অনুযায়ী পরিকল্পনা সাজাব।"], fields: [
    { key: "goal", label: ["Your immediate goal", "এখনকার প্রধান লক্ষ্য"], options: [option("first","Find my first job","প্রথম চাকরি পাওয়া"),option("intern","Find an internship","ইন্টার্নশিপ পাওয়া"),option("change","Change career direction","ক্যারিয়ারের দিক পরিবর্তন"),option("explore","Explore my options","সুযোগগুলো সম্পর্কে জানা")] },
    { key: "cvConfidence", label: ["CV preparation", "সিভির প্রস্তুতি"], options: [option("start","Need help starting","শুরু করতে সাহায্য দরকার"),option("draft","Have a draft to improve","খসড়া আছে, উন্নতি দরকার"),option("ready","Have a tailored CV","লক্ষ্যভিত্তিক সিভি আছে")] },
    { key: "interview", label: ["Interview confidence", "সাক্ষাৎকারে আত্মবিশ্বাস"], options: [option("low","Need practice","অনুশীলন দরকার"),option("medium","Somewhat confident","মোটামুটি আত্মবিশ্বাসী"),option("high","Confident","আত্মবিশ্বাসী")] },
    { key: "hours", label: ["Weekly learning time", "সাপ্তাহিক শেখার সময়"], options: [option("2","About 2 hours","প্রায় ২ ঘণ্টা"),option("5","About 5 hours","প্রায় ৫ ঘণ্টা"),option("10","10 hours or more","১০ ঘণ্টা বা বেশি")] },
    { key: "budget", label: ["Learning budget", "শেখার বাজেট"], options: [option("free","Free resources first","আগে বিনামূল্যের রিসোর্স"),option("paid","Open to paid courses","পেইড কোর্সেও আগ্রহী")] },
  ] },
];
export type Profile = Record<string, string>;
export const exampleProfile: Profile = {
  name: "Ayesha Rahman", email: "ayesha@example.com", situation: "graduate", qualification: "bachelor",
  institution: "BRAC University", subject: "Business Administration", graduation: "2026", scale: "4", grade: "3.45",
  skills: "Excel, presentation, research, teamwork", proficiency: "intermediate", experience: "intern",
  experienceDetail: "Supported weekly sales reports during a three-month internship.",
  projects: "Student club event planning and a market research group project.", certifications: "BRAC University leadership workshop",
  linkedin: "https://example.com/ayesha-linkedin", portfolio: "https://example.com/ayesha-portfolio", roles: "business", location: "dhaka", workMode: "any", employment: "full", availability: "now",
  goal: "first", cvConfidence: "draft", interview: "medium", hours: "5", budget: "free",
};
export const sampleProfile = (language: Language): Profile => language === "en" ? { ...exampleProfile } : {
  ...exampleProfile, subject: "ব্যবসায় প্রশাসন", skills: "এক্সেল, প্রেজেন্টেশন, গবেষণা, দলগত কাজ",
  experienceDetail: "তিন মাসের ইন্টার্নশিপে সাপ্তাহিক বিক্রয় প্রতিবেদন তৈরিতে সহায়তা করেছি।",
  projects: "স্টুডেন্ট ক্লাবের অনুষ্ঠান আয়োজন ও বাজার গবেষণার দলীয় প্রকল্প।",
};
export function visibleFields(group: number, profile: Profile) {
  return groups[group].fields.filter(f => !(f.key === "grade" && profile.scale === "pending") && !(f.key === "experienceDetail" && profile.experience === "none"));
}
export function fieldValue(field: Field, profile: Profile, language: Language) {
  const raw = profile[field.key] || "";
  const selected = field.options?.find(o => o.value === raw);
  return selected ? text(language, selected.label) : raw;
}
export function validProfile(profile: Profile) {
  return groups.every((_, i) => visibleFields(i, profile).every(f => {
    const value = (profile[f.key] || "").trim();
    if (!value) return !!f.optional;
    if (f.options && !f.options.some(o => o.value === value)) return false;
    if (f.type === "url") { try { if (!["https:", "http:"].includes(new URL(value).protocol)) return false; } catch { return false; } }
    if (f.type === "number") return Number.isFinite(Number(value)) && Number(value) >= (f.min ?? 0) && Number(value) <= (f.key === "grade" ? Number(profile.scale) : f.max ?? Infinity);
    return true;
  }));
}
export const dimensions: Copy[] = [["Skills you can demonstrate","প্রমাণযোগ্য দক্ষতা"],["Hands-on experience","হাতে-কলমে অভিজ্ঞতা"],["Professional presence","পেশাগত পরিচিতি"],["CV & interview preparation","সিভি ও সাক্ষাৎকারের প্রস্তুতি"]];
export function reportScores(profile: Profile) {
  return [
    profile.proficiency === "advanced" ? 86 : profile.proficiency === "intermediate" ? 72 : 45,
    profile.experience === "experienced" ? 84 : profile.experience === "intern" ? 64 : 36,
    50 + (profile.linkedin ? 15 : 0) + (profile.portfolio ? 15 : 0) + (profile.certifications ? 10 : 0),
    (profile.cvConfidence === "ready" ? 45 : profile.cvConfidence === "draft" ? 30 : 15) + (profile.interview === "high" ? 45 : profile.interview === "medium" ? 30 : 15),
  ];
}
export type Action = { id: string; title: Copy; why: Copy; brief: Copy; effort: Copy; kind: Copy; priority: boolean; cv?: boolean; initial: Status };
export const actions: Action[] = [
  { id:"project",title:["Publish one practical portfolio project","একটি বাস্তব প্রকল্প পোর্টফোলিওতে প্রকাশ করুন"],why:["Give employers a concrete example of your problem-solving.","নিয়োগদাতাকে আপনার সমস্যা সমাধানের বাস্তব প্রমাণ দিন।"],brief:["Choose a question in your target field. Gather a small dataset or research sample, explain your approach, and publish a one-page summary with your results. Finish with a shareable project link.","পছন্দের ক্ষেত্রের একটি সমস্যা বেছে নিন। কিছু তথ্য সংগ্রহ করুন, পদ্ধতি ব্যাখ্যা করুন এবং ফলাফলসহ এক পাতার সারসংক্ষেপ প্রকাশ করুন। প্রকল্পের লিংক সংরক্ষণ করুন।"],effort:["4–6 hours","৪–৬ ঘণ্টা"],kind:["Project","প্রকল্প"],priority:true,initial:"todo" },
  { id:"cv",title:["Prepare a CV for your target role","পছন্দের পদের জন্য সিভি তৈরি করুন"],why:["Connect your existing experience to the work you want to do.","বর্তমান অভিজ্ঞতার সঙ্গে কাঙ্ক্ষিত কাজের সম্পর্ক তুলে ধরুন।"],brief:["Use CV Studio to create a draft. Check every detail, lead with relevant experience, and use specific outcomes instead of generic claims.","সিভি স্টুডিওতে খসড়া তৈরি করুন। প্রতিটি তথ্য যাচাই করুন, প্রাসঙ্গিক অভিজ্ঞতা আগে রাখুন এবং নির্দিষ্ট ফলাফল লিখুন।"],effort:["1 hour","১ ঘণ্টা"],kind:["Application","আবেদন"],priority:true,cv:true,initial:"doing" },
  { id:"linkedin",title:["Update your LinkedIn introduction","লিংকডইন পরিচিতি হালনাগাদ করুন"],why:["Make your target role, skills and evidence visible together.","পছন্দের পদ, দক্ষতা ও কাজের প্রমাণ একসঙ্গে তুলে ধরুন।"],brief:["Write a clear headline, a short About section, and three specific achievements. Add your project link and check that your education dates are accurate.","স্পষ্ট শিরোনাম, সংক্ষিপ্ত পরিচিতি এবং তিনটি নির্দিষ্ট অর্জন লিখুন। প্রকল্পের লিংক যোগ করুন ও শিক্ষার তারিখ যাচাই করুন।"],effort:["45 minutes","৪৫ মিনিট"],kind:["Professional profile","পেশাগত প্রোফাইল"],priority:false,initial:"done" },
  { id:"interview",title:["Practice three interview stories","সাক্ষাৎকারের জন্য তিনটি অভিজ্ঞতা অনুশীলন করুন"],why:["Explain your contribution with structure and confidence.","নিজের অবদান গুছিয়ে ও আত্মবিশ্বাসের সঙ্গে ব্যাখ্যা করুন।"],brief:["Prepare examples of teamwork, solving a problem, and learning from a mistake. For each, describe the situation, your task, action and result. Record a two-minute answer.","দলগত কাজ, সমস্যা সমাধান ও ভুল থেকে শেখার উদাহরণ তৈরি করুন। পরিস্থিতি, দায়িত্ব, পদক্ষেপ ও ফলাফল বলুন। দুই মিনিটের উত্তর রেকর্ড করুন।"],effort:["1 hour","১ ঘণ্টা"],kind:["Practice","অনুশীলন"],priority:false,initial:"todo" },
];
export type CourseRecommendation = { id: string; title: Copy; provider: string; url: string; reason: Copy; outcome: Copy };
export const courseRecommendations: CourseRecommendation[] = [
  { id:"excel",title:["Excel Skills for Business: Essentials","ব্যবসায় এক্সেল দক্ষতা: মৌলিক বিষয়"],provider:"Macquarie University · Coursera",url:"https://www.coursera.org/learn/excel-essentials",reason:["Build stronger spreadsheet and reporting skills for entry-level business roles.","প্রাথমিক পর্যায়ের ব্যবসায়িক পদের জন্য স্প্রেডশিট ও রিপোর্ট তৈরির দক্ষতা বাড়ান।"],outcome:["Practice with formulas and charts","ফর্মুলা ও চার্ট অনুশীলন"] },
  { id:"analytics",title:["Introduction to Business Analytics: Communicating with Data","ব্যবসায়িক বিশ্লেষণের পরিচিতি: ডেটা দিয়ে যোগাযোগ"],provider:"University of Illinois Urbana-Champaign · Coursera",url:"https://www.coursera.org/learn/intro-business-analytics",reason:["Learn to turn analysis into a clear story for business decisions.","ব্যবসায়িক সিদ্ধান্তের জন্য বিশ্লেষণ স্পষ্টভাবে উপস্থাপন করতে শিখুন।"],outcome:["Explain insights with data","ডেটা দিয়ে ফলাফল ব্যাখ্যা"] },
  { id:"writing",title:["Business Writing","ব্যবসায়িক লেখা"],provider:"University of Colorado Boulder · Coursera",url:"https://www.coursera.org/learn/writing-for-business",reason:["Strengthen the emails, reports and written updates employers expect.","কর্মক্ষেত্রে প্রয়োজনীয় ইমেইল, প্রতিবেদন ও লিখিত আপডেট উন্নত করুন।"],outcome:["Write a concise business update","সংক্ষিপ্ত ব্যবসায়িক আপডেট লেখা"] },
  { id:"sql",title:["SQL for Data Science","ডেটা বিশ্লেষণের জন্য এসকিউএল"],provider:"University of California, Davis · Coursera",url:"https://www.coursera.org/learn/sql-for-data-science",reason:["Learn to retrieve and summarize data for analyst roles.","বিশ্লেষক পদের জন্য ডেটা খুঁজে বের করা ও সারসংক্ষেপ তৈরি শিখুন।"],outcome:["Query and filter a dataset","ডেটাসেটে কুয়েরি ও ফিল্টার করা"] },
  { id:"digital-marketing",title:["Foundations of Digital Marketing and E-commerce","ডিজিটাল মার্কেটিং ও ই-কমার্সের ভিত্তি"],provider:"Google · Coursera",url:"https://www.coursera.org/learn/foundations-of-digital-marketing-and-e-commerce",reason:["Explore entry-level marketing work, customer journeys and campaign goals.","প্রাথমিক পর্যায়ের বিপণন কাজ, গ্রাহকের যাত্রা ও প্রচারণার লক্ষ্য সম্পর্কে জানুন।"],outcome:["Map a customer journey","গ্রাহকের যাত্রা চিত্রায়ন"] },
  { id:"marketing-analytics",title:["Marketing Analytics Foundation","মার্কেটিং বিশ্লেষণের ভিত্তি"],provider:"Meta · Coursera",url:"https://www.coursera.org/learn/marketing-analytics-foundation/",reason:["Understand how campaign data informs marketing decisions.","প্রচারণার তথ্য কীভাবে বিপণনের সিদ্ধান্তে কাজে লাগে তা বুঝুন।"],outcome:["Read campaign performance data","প্রচারণার ফলাফল বিশ্লেষণ"] },
];
export function recommendedCourses(role: string): CourseRecommendation[] {
  const ids = role === "data" ? ["excel", "sql", "analytics"] : role === "marketing" ? ["digital-marketing", "marketing-analytics", "writing"] : role === "business" ? ["excel", "analytics", "writing"] : ["excel", "writing", "digital-marketing"];
  return ids.map(id => courseRecommendations.find(course => course.id === id)!);
}
export type Job = { id: string; title: Copy; company: string; field: string; mode: Copy; type: Copy; experience: Copy; days: number | null; why: Copy; duties: Copy; gap: Copy };
export const jobs: Job[] = [
  {id:"analyst",title:["Junior Business Analyst","জুনিয়র বিজনেস অ্যানালিস্ট"],company:"Meridian Insights",field:"business",mode:["Hybrid · Dhaka","হাইব্রিড · ঢাকা"],type:["Full-time","পূর্ণকালীন"],experience:["0–1 year","০–১ বছর"],days:12,why:["A starting point for research, spreadsheets and business communication.","গবেষণা, স্প্রেডশিট ও ব্যবসায়িক যোগাযোগের দক্ষতার জন্য উপযুক্ত শুরু।"],duties:["Maintain reports, investigate trends and communicate findings. Basic Excel and clear writing are expected.","প্রতিবেদন হালনাগাদ, প্রবণতা বিশ্লেষণ ও ফলাফল জানানো। এক্সেলের মৌলিক জ্ঞান ও স্পষ্ট লেখার দক্ষতা প্রয়োজন।"],gap:["Prepare a small analysis project to demonstrate your approach.","নিজের পদ্ধতি দেখাতে একটি ছোট বিশ্লেষণ প্রকল্প তৈরি করুন।"]},
  {id:"operations",title:["Operations Associate","অপারেশনস অ্যাসোসিয়েট"],company:"Northstar Commerce",field:"business",mode:["On-site · Dhaka","অফিসে · ঢাকা"],type:["Full-time","পূর্ণকালীন"],experience:["Fresh graduates welcome","সদ্য স্নাতকদের সুযোগ"],days:18,why:["Suitable for an interest in coordination and day-to-day business.","সমন্বয় ও ব্যবসার দৈনন্দিন কাজে আগ্রহীদের জন্য উপযুক্ত।"],duties:["Coordinate orders, track service issues and maintain accurate records. Organisation and communication matter.","অর্ডার সমন্বয়, সেবার সমস্যা পর্যবেক্ষণ ও সঠিক রেকর্ড রাখা। গুছিয়ে কাজ ও যোগাযোগ গুরুত্বপূর্ণ।"],gap:["Add an example of organising a project or event.","প্রকল্প বা অনুষ্ঠান আয়োজনের একটি উদাহরণ যোগ করুন।"]},
  {id:"data",title:["Data Analyst Intern","ডেটা অ্যানালিস্ট ইন্টার্ন"],company:"Riverbend Labs",field:"data",mode:["Hybrid · Dhaka","হাইব্রিড · ঢাকা"],type:["Internship","ইন্টার্নশিপ"],experience:["No professional experience required","পেশাগত অভিজ্ঞতা প্রয়োজন নেই"],days:9,why:["An exploratory option for an interest in data and analytical work.","ডেটা ও বিশ্লেষণধর্মী কাজে আগ্রহীদের জন্য একটি সুযোগ।"],duties:["Clean datasets, build charts and document findings. Spreadsheet skills and basic SQL are useful.","ডেটা পরিষ্কার, চার্ট তৈরি ও ফলাফল লেখা। স্প্রেডশিট ও এসকিউএলের মৌলিক জ্ঞান সহায়ক।"],gap:["Practise SQL basics and share a simple dashboard.","এসকিউএলের মৌলিক বিষয় অনুশীলন করুন ও একটি ড্যাশবোর্ড দেখান।"]},
  {id:"marketing",title:["Digital Marketing Assistant","ডিজিটাল মার্কেটিং অ্যাসিস্ট্যান্ট"],company:"Canvas Collective",field:"marketing",mode:["Remote · Bangladesh","রিমোট · বাংলাদেশ"],type:["Full-time","পূর্ণকালীন"],experience:["0–1 year","০–১ বছর"],days:21,why:["Combines communication, audience research and basic reporting.","যোগাযোগ, গ্রাহক গবেষণা ও প্রাথমিক প্রতিবেদন তৈরির সমন্বয়।"],duties:["Plan social content, track campaigns and prepare weekly summaries. Clear writing and attention to detail are important.","সোশ্যাল কনটেন্ট পরিকল্পনা, প্রচারণা পর্যবেক্ষণ ও সাপ্তাহিক সারসংক্ষেপ। স্পষ্ট লেখা ও মনোযোগ গুরুত্বপূর্ণ।"],gap:["Create a sample content calendar with campaign goals.","লক্ষ্যসহ একটি নমুনা কনটেন্ট ক্যালেন্ডার তৈরি করুন।"]},
  {id:"research",title:["Research Assistant","রিসার্চ অ্যাসিস্ট্যান্ট"],company:"Delta Research",field:"data",mode:["Hybrid · Dhaka","হাইব্রিড · ঢাকা"],type:["Part-time","খণ্ডকালীন"],experience:["Students and graduates","শিক্ষার্থী ও স্নাতক"],days:15,why:["Builds on research, organisation and structured writing.","গবেষণা, সংগঠন ও গুছিয়ে লেখার দক্ষতা কাজে লাগে।"],duties:["Collect information, check sources and summarise interviews. Careful note-taking and spreadsheets are expected.","তথ্য সংগ্রহ, উৎস যাচাই ও সাক্ষাৎকারের সারসংক্ষেপ। যত্নশীল নোট ও স্প্রেডশিটের জ্ঞান প্রয়োজন।"],gap:["Share a short research summary with sources.","উৎসসহ একটি সংক্ষিপ্ত গবেষণা সারসংক্ষেপ দেখান।"]},
  {id:"content",title:["Content & Communications Intern","কনটেন্ট ও কমিউনিকেশনস ইন্টার্ন"],company:"Common Ground Studio",field:"marketing",mode:["Remote · Bangladesh","রিমোট · বাংলাদেশ"],type:["Internship","ইন্টার্নশিপ"],experience:["No experience required","অভিজ্ঞতা প্রয়োজন নেই"],days:null,why:["A place to develop writing and presentation skills.","লেখা ও উপস্থাপনের দক্ষতা বাড়ানোর সুযোগ।"],duties:["Draft short articles, support newsletters and organise content. Strong written communication is useful.","ছোট নিবন্ধ লেখা, নিউজলেটারে সহায়তা ও কনটেন্ট সংগঠিত করা। লেখার দক্ষতা সহায়ক।"],gap:["Prepare two short writing samples.","দুটি সংক্ষিপ্ত লেখার নমুনা তৈরি করুন।"]},
];
export function dateAfter(days: number, base: Date = new Date()) {
  const date = new Date(base); date.setDate(date.getDate() + days); return date;
}
export function formatDate(date: Date, language: Language) {
  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "bn-BD", { day:"numeric", month:"short", year:"numeric", timeZone:"Asia/Dhaka" }).format(date);
}
export type Booking = { day: string; time: string; topic: string; language: Language; note: string };
export const topics: Copy[] = [["Career direction","ক্যারিয়ারের দিকনির্দেশনা"],["Job search","চাকরি খোঁজা"],["CV feedback","সিভি পর্যালোচনা"],["Interview preparation","সাক্ষাৎকারের প্রস্তুতি"]];
