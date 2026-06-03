import { useEffect, useMemo, useState } from 'react';
import {
  defaultPracticeSelections,
  formatPracticeBrief,
  generatePracticeBrief,
  practiceBriefIntro,
  practiceBriefStorageKey,
  practiceFormFields,
} from '../data/practiceBriefContent.js';

function readStoredBrief() {
  try {
    const savedBrief = window.localStorage.getItem(practiceBriefStorageKey);

    if (!savedBrief) {
      return null;
    }

    const parsedBrief = JSON.parse(savedBrief);
    if (!parsedBrief?.sections || !parsedBrief?.selections) {
      return null;
    }

    return parsedBrief;
  } catch {
    return null;
  }
}

function saveStoredBrief(brief) {
  try {
    window.localStorage.setItem(practiceBriefStorageKey, JSON.stringify(brief));
  } catch {
    // The builder still works when browser local storage is unavailable.
  }
}

function clearStoredBrief() {
  try {
    window.localStorage.removeItem(practiceBriefStorageKey);
  } catch {
    // The builder still works when browser local storage is unavailable.
  }
}

async function writeClipboardText(text) {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard API unavailable');
  }

  await navigator.clipboard.writeText(text);
}

export default function PracticeBriefBuilder() {
  const [selections, setSelections] = useState(defaultPracticeSelections);
  const [brief, setBrief] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const storedBrief = readStoredBrief();

    if (storedBrief) {
      setBrief(storedBrief);
      setSelections({ ...defaultPracticeSelections, ...storedBrief.selections });
    }
  }, []);

  const briefText = useMemo(() => formatPracticeBrief(brief), [brief]);

  function handleSelectionChange(fieldId, value) {
    setSelections((currentSelections) => ({
      ...currentSelections,
      [fieldId]: value,
    }));
    setStatusMessage('');
  }

  function handleGenerateBrief(event) {
    event.preventDefault();
    const generatedBrief = generatePracticeBrief(selections);
    setBrief(generatedBrief);
    saveStoredBrief(generatedBrief);
    setStatusMessage('ব্রিফ তৈরি হয়েছে');
  }

  async function handleCopyBrief() {
    try {
      await writeClipboardText(briefText);
      setStatusMessage('ব্রিফ কপি হয়েছে');
    } catch {
      setStatusMessage('ব্রিফ কপি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  }

  function handleResetBrief() {
    clearStoredBrief();
    setSelections(defaultPracticeSelections);
    setBrief(null);
    setStatusMessage('ব্রিফ মুছে ফেলা হয়েছে');
  }

  return (
    <section className="practice-builder" id="practice" aria-labelledby="practice-title">
      <div className="section-heading practice-heading">
        <p className="eyebrow">{practiceBriefIntro.eyebrow}</p>
        <h2 id="practice-title">{practiceBriefIntro.title}</h2>
        <p className="practice-subtitle">{practiceBriefIntro.subtitle}</p>
        <p>{practiceBriefIntro.description}</p>
        <p className="practice-note">{practiceBriefIntro.safetyNote}</p>
      </div>

      <div className="practice-builder-grid">
        <form className="practice-form" onSubmit={handleGenerateBrief}>
          <div className="practice-form-header">
            <span className="practice-chip">আমি এখন কী নিয়ে অনুশীলন করব?</span>
            <h3>আপনার অনুশীলনের ধরন বেছে নিন</h3>
          </div>

          {practiceFormFields.map((field) => (
            <div className="practice-field" key={field.id}>
              <label htmlFor={`practice-${field.id}`}>{field.label}</label>
              <select
                id={`practice-${field.id}`}
                name={field.id}
                value={selections[field.id]}
                onChange={(event) => handleSelectionChange(field.id, event.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="practice-actions">
            <button className="button button-primary" type="submit">
              ব্রিফ তৈরি করুন
            </button>
            <button className="button practice-reset" type="button" onClick={handleResetBrief}>
              নতুন করে শুরু করুন
            </button>
          </div>
        </form>

        <div className="practice-result" aria-live="polite">
          {brief ? (
            <article className="practice-result-card" aria-labelledby="practice-result-title">
              <div className="practice-result-topline">
                <div>
                  <p className="readiness-card-label">তৈরি করা ব্রিফ</p>
                  <h3 id="practice-result-title">{brief.sections[0].content}</h3>
                </div>
                <div className="practice-result-actions">
                  <button className="practice-brief-copy" type="button" onClick={handleCopyBrief}>
                    ব্রিফ কপি করুন
                  </button>
                  <a className="practice-agent-link" href="#prompt-builder">
                    এজেন্ট প্যাক তৈরি করুন
                  </a>
                </div>
              </div>

              <div className="practice-result-meta" aria-label="নির্বাচিত তথ্য">
                <span>{brief.selections.businessType}</span>
                <span>{brief.selections.problemType}</span>
                <span>{brief.selections.assistantType}</span>
                <span>{brief.selections.difficultyLevel}</span>
                <span>{brief.selections.learningStage}</span>
              </div>

              <div className="practice-brief-sections">
                {brief.sections.map((section) => (
                  <section className="practice-brief-section" key={section.label}>
                    <h4>{section.label}</h4>
                    <p>{section.content}</p>
                  </section>
                ))}
              </div>
            </article>
          ) : (
            <article className="practice-result-card practice-empty" aria-labelledby="practice-empty-title">
              <p className="readiness-card-label">ফলাফল</p>
              <h3 id="practice-empty-title">এখনও কোনো ব্রিফ তৈরি হয়নি</h3>
              <p>
                বাম পাশের ফর্ম থেকে ব্যবসা, সমস্যা, সহকারীর ধরন, কঠিনতার স্তর এবং শেখার ধাপ বেছে
                নিয়ে ব্রিফ তৈরি করুন। তৈরি করা সর্বশেষ ব্রিফ এই ব্রাউজারে সংরক্ষিত থাকবে।
              </p>
            </article>
          )}

          <p className="practice-status" role="status" aria-live="polite">
            {statusMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
