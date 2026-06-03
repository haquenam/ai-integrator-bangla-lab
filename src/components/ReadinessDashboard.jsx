import { useEffect, useMemo, useState } from 'react';
import {
  getReadinessLevel,
  readinessChecklistGroups,
  readinessIntro,
  readinessStorageKey,
  readinessTotalItems,
} from '../data/readinessContent.js';

const banglaNumberFormatter = new Intl.NumberFormat('bn-BD');
const banglaDateFormatter = new Intl.DateTimeFormat('bn-BD', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function toBanglaNumber(value) {
  return banglaNumberFormatter.format(value);
}

function formatSavedDate(value) {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return banglaDateFormatter.format(parsedDate);
}

async function writeClipboardText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const summaryField = document.createElement('textarea');
  summaryField.value = text;
  summaryField.setAttribute('readonly', '');
  summaryField.style.position = 'fixed';
  summaryField.style.left = '-9999px';
  document.body.appendChild(summaryField);
  summaryField.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(summaryField);

  if (!copied) {
    throw new Error('Clipboard copy failed');
  }
}

function getCheckedItems(checkedItems) {
  return readinessChecklistGroups.flatMap((group) =>
    group.items.filter((item) => checkedItems[item.id]).map((item) => item.label),
  );
}

export default function ReadinessDashboard() {
  const [checkedItems, setCheckedItems] = useState({});
  const [lastUpdated, setLastUpdated] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const savedReadiness = window.localStorage.getItem(readinessStorageKey);

    if (!savedReadiness) {
      return;
    }

    try {
      const parsedReadiness = JSON.parse(savedReadiness);
      setCheckedItems(parsedReadiness.checkedItems ?? {});
      setLastUpdated(parsedReadiness.lastUpdated ?? '');
    } catch {
      window.localStorage.removeItem(readinessStorageKey);
    }
  }, []);

  const completedItems = useMemo(() => getCheckedItems(checkedItems), [checkedItems]);
  const score = completedItems.length;
  const progressPercentage = Math.round((score / readinessTotalItems) * 100);
  const readinessLevel = getReadinessLevel(score);
  const formattedLastUpdated = formatSavedDate(lastUpdated);

  function saveProgress(nextCheckedItems) {
    const nextLastUpdated = new Date().toISOString();
    window.localStorage.setItem(
      readinessStorageKey,
      JSON.stringify({
        checkedItems: nextCheckedItems,
        lastUpdated: nextLastUpdated,
      }),
    );
    setLastUpdated(nextLastUpdated);
  }

  function handleCheckChange(itemId) {
    setStatusMessage('');
    setCheckedItems((currentItems) => {
      const nextCheckedItems = {
        ...currentItems,
        [itemId]: !currentItems[itemId],
      };

      if (!nextCheckedItems[itemId]) {
        delete nextCheckedItems[itemId];
      }

      saveProgress(nextCheckedItems);
      return nextCheckedItems;
    });
  }

  async function handleCopySummary() {
    const summaryText = [
      'AI Integrator Bangla Lab readiness summary',
      `Readiness level: ${readinessLevel.level}`,
      `Score: ${score}/${readinessTotalItems}`,
      `Progress percentage: ${progressPercentage}%`,
      'Completed checklist items:',
      ...(completedItems.length > 0 ? completedItems.map((item) => `- ${item}`) : ['- কোনো আইটেম সম্পন্ন হয়নি']),
      'Recommended next steps:',
      ...readinessLevel.nextSteps.map((step) => `- ${step}`),
      `Last updated date: ${formattedLastUpdated || 'এখনও সংরক্ষণ হয়নি'}`,
    ].join('\n');

    try {
      await writeClipboardText(summaryText);
      setStatusMessage('সারাংশ কপি হয়েছে');
    } catch {
      setStatusMessage('সারাংশ কপি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  }

  function handleResetProgress() {
    window.localStorage.removeItem(readinessStorageKey);
    setCheckedItems({});
    setLastUpdated('');
    setStatusMessage('অগ্রগতি মুছে ফেলা হয়েছে');
  }

  return (
    <section className="readiness-dashboard" id="readiness" aria-labelledby="readiness-title">
      <div className="section-heading readiness-heading">
        <p className="eyebrow">নিজেকে যাচাই</p>
        <h2 id="readiness-title">{readinessIntro.title}</h2>
        <p className="readiness-subtitle">{readinessIntro.subtitle}</p>
        <p>{readinessIntro.description}</p>
      </div>

      <div className="readiness-summary" aria-label="প্রস্তুতির সারাংশ">
        <article className="readiness-score-card">
          <p className="readiness-card-label">বর্তমান স্তর</p>
          <h3>{readinessLevel.level}</h3>
          <p className="readiness-message">{readinessLevel.message}</p>
          <div className="readiness-score-grid">
            <div>
              <span>{toBanglaNumber(score)}</span>
              <p>স্কোর</p>
            </div>
            <div>
              <span>{toBanglaNumber(progressPercentage)}%</span>
              <p>অগ্রগতি</p>
            </div>
          </div>
        </article>

        <article className="readiness-progress" aria-label="অগ্রগতি">
          <div className="readiness-progress-topline">
            <span>{toBanglaNumber(progressPercentage)}% সম্পন্ন</span>
            <span>
              {toBanglaNumber(score)}টি সম্পন্ন হয়েছে {toBanglaNumber(readinessTotalItems)}টির মধ্যে
            </span>
          </div>
          <div
            className="readiness-progress-track"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="প্রস্তুতি অগ্রগতি"
          >
            <span className="readiness-progress-bar" style={{ width: `${progressPercentage}%` }} />
          </div>
          <p className="readiness-note">অগ্রগতি স্বয়ংক্রিয়ভাবে এই ব্রাউজারে সংরক্ষিত হয়।</p>
          {formattedLastUpdated ? (
            <p className="readiness-updated">শেষ হালনাগাদ: {formattedLastUpdated}</p>
          ) : (
            <p className="readiness-updated">এখনও অগ্রগতি সংরক্ষণ হয়নি</p>
          )}
        </article>
      </div>

      <div className="readiness-body">
        <div className="readiness-groups" aria-label="প্রস্তুতি যাচাই তালিকা">
          {readinessChecklistGroups.map((group) => (
            <fieldset className="readiness-group" key={group.id}>
              <legend>{group.title}</legend>
              {group.items.map((item) => (
                <label className="readiness-check-item" htmlFor={item.id} key={item.id}>
                  <input
                    id={item.id}
                    type="checkbox"
                    checked={Boolean(checkedItems[item.id])}
                    onChange={() => handleCheckChange(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </fieldset>
          ))}
        </div>

        <aside className="readiness-recommendations" aria-labelledby="readiness-next-steps-title">
          <p className="readiness-card-label">পরবর্তী কাজ</p>
          <h3 id="readiness-next-steps-title">আপনার জন্য সুপারিশ</h3>
          <p>{readinessLevel.message}</p>
          <ol>
            {readinessLevel.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="readiness-note">{readinessIntro.privacyNote}</p>
          <div className="readiness-actions">
            <button className="button button-primary" type="button" onClick={handleCopySummary}>
              সারাংশ কপি করুন
            </button>
            <button className="button readiness-reset-button" type="button" onClick={handleResetProgress}>
              অগ্রগতি মুছে ফেলুন
            </button>
          </div>
          <p className="readiness-status" role="status" aria-live="polite">
            {statusMessage}
          </p>
        </aside>
      </div>
    </section>
  );
}
