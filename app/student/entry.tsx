"use client";

import { useState } from "react";
import Image from "next/image";
import { fields, initialProfile } from "./data";

export function StudyAbroadEntry({
  exit,
  onContinue,
}: {
  exit: () => void;
  onContinue: (name: string, email: string) => void;
}) {
  const [name, setName] = useState(initialProfile.name);
  const [email, setEmail] = useState(initialProfile.email);
  const [password, setPassword] = useState("demo1234");
  const [interests, setInterests] = useState<string[]>(initialProfile.fields);

  const toggleInterest = (field: string) => {
    setInterests((current) =>
      current.includes(field)
        ? current.filter((item) => item !== field)
        : [...current, field],
    );
  };

  return (
    <main className="sa-portal hub hub-entry">
      <header className="hub-entry-header">
        <button type="button" className="hub-entry-brand" onClick={exit} aria-label="Back to home">
          <Image src="/careerhub-logo.png" width={102} height={64} alt="BRAC Career Hub" />
        </button>
        <button type="button" className="hub-entry-home" onClick={exit}>← Back to home</button>
      </header>

      <div className="hub-entry-layout">
        <section className="hub-entry-intro" aria-labelledby="study-entry-title">
          <span className="hub-entry-kicker">STUDY ABROAD</span>
          <h1 id="study-entry-title">Make your next move with a clearer view.</h1>
          <p>Explore programs, prepare your application documents, and keep your plans together in one workspace.</p>
          <div className="hub-entry-steps" aria-label="Your study abroad workspace">
            <div><span>01</span><strong>Explore your options</strong><p>Browse the curated program catalog.</p></div>
            <div><span>02</span><strong>Prepare your application</strong><p>Work on documents at your own pace.</p></div>
            <div><span>03</span><strong>Follow your progress</strong><p>See what is ready and what comes next.</p></div>
          </div>
        </section>

        <section className="hub-entry-form-panel" aria-labelledby="study-signup-title">
          <h2 id="study-signup-title">Start your study abroad profile</h2>
          <p>Create a demo account to enter your workspace.</p>
          <form onSubmit={(event) => {
            event.preventDefault();
            if (interests.length) onContinue(name.trim(), email.trim());
          }}>
            <label className="hub-entry-field">
              <span>Full name</span>
              <input name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <label className="hub-entry-field">
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label className="hub-entry-field">
              <span>Password</span>
              <input name="password" type="password" autoComplete="new-password" minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <fieldset className="hub-entry-interests">
              <legend>Study interests</legend>
              <p>Which subjects would you like to pursue? Select any that appeal to you.</p>
              <div className="hub-entry-pills">
                {fields.map((field) => (
                  <button key={field} type="button" aria-pressed={interests.includes(field)} onClick={() => toggleInterest(field)}>
                    {field}
                  </button>
                ))}
              </div>
              {!interests.length && <small role="status">Select at least one study interest to continue.</small>}
            </fieldset>
            <button className="hub-entry-submit" type="submit" disabled={!interests.length}>Create demo account <span aria-hidden="true">→</span></button>
          </form>
          <div className="hub-entry-returning">
            <span>Already have a demo profile?</span>
            <button type="button" onClick={() => onContinue(initialProfile.name, initialProfile.email)}>Log in as returning demo user</button>
          </div>
          <small className="hub-entry-note">Demo only. No account is created, and these interests do not change the program catalog.</small>
        </section>
      </div>
    </main>
  );
}
