import { useEffect, useMemo, useRef, useState } from 'react';
import { practiceBriefStorageKey } from '../data/practiceBriefContent.js';
import { agentStudioStorageKey } from '../data/agentStudioContent.js';

const portfolioStorageKey = 'ai-integrator-bangla-lab-portfolio';

const defaultPortfolioFields = {
  projectName: '',
  problemSolved: '',
  assistantType: '',
  knowledgeBase: '',
  howItWorks: '',
  testing: '',
  safetyLimitations: '',
  learning: '',
  futurePlan: '',
};

const portfolioFields = [
  {
    id: 'projectName',
    label: 'প্রকল্পের নাম',
    type: 'input',
    placeholder: 'যেমন: রেস্টুরেন্ট প্রশ্নোত্তর সহকারী',
  },
  {
    id: 'problemSolved',
    label: 'কোন সমস্যার সমাধান করা হয়েছে',
    placeholder: 'ব্যবহারকারীরা কোন প্রশ্ন বা কাজ নিয়ে সমস্যায় পড়ছিলেন তা সংক্ষেপে লিখুন।',
  },
  {
    id: 'assistantType',
    label: 'কোন ধরনের সহকারী তৈরি করা হয়েছে',
    type: 'input',
    placeholder: 'যেমন: ডকুমেন্ট সহকারী, ওয়েবসাইট সহকারী, গ্রাহক সহকারী',
  },
  {
    id: 'knowledgeBase',
    label: 'কোন তথ্য বা নলেজ বেস ব্যবহার করা হয়েছে',
    placeholder: 'প্রশ্নোত্তর তালিকা, পণ্য তথ্য, নীতিমালা বা অনুশীলনের নিরাপদ তথ্য লিখুন।',
  },
  {
    id: 'howItWorks',
    label: 'সহকারী কীভাবে কাজ করবে',
    placeholder: 'সহকারী কীভাবে প্রশ্ন বুঝবে, কোন তথ্য ব্যবহার করবে এবং কীভাবে উত্তর দেবে তা লিখুন।',
  },
  {
    id: 'testing',
    label: 'কীভাবে পরীক্ষা করা হয়েছে',
    placeholder: 'কয়েকটি পরীক্ষার প্রশ্ন, অস্পষ্ট প্রশ্ন এবং তথ্য না থাকলে প্রতিক্রিয়া পরীক্ষা করার পদ্ধতি লিখুন।',
  },
  {
    id: 'safetyLimitations',
    label: 'নিরাপত্তা ও সীমাবদ্ধতা',
    placeholder: 'কোন বিষয়ে সহকারী অনুমান করবে না, ব্যক্তিগত তথ্য চাইবে না বা মানুষের সাহায্য নিতে বলবে তা লিখুন।',
  },
  {
    id: 'learning',
    label: 'এই কাজ থেকে কী শেখা হয়েছে',
    placeholder: 'নলেজ বেস, নির্দেশনা, গার্ডরেইল বা পরীক্ষা নিয়ে আপনার শেখা বিষয় লিখুন।',
  },
  {
    id: 'futurePlan',
    label: 'পরবর্তী উন্নতির পরিকল্পনা',
    placeholder: 'আরও ভালো নলেজ বেস, বেশি টেস্ট প্রশ্ন, ডেমো স্ক্রিনশট বা রিডমি উন্নতির পরিকল্পনা লিখুন।',
  },
];

const checklistItems = [
  'সমস্যাটি পরিষ্কারভাবে লেখা হয়েছে',
  'সহকারীর কাজ ব্যাখ্যা করা হয়েছে',
  'তথ্য উৎস বা নলেজ বেস উল্লেখ করা হয়েছে',
  'পরীক্ষার প্রশ্ন বা পদ্ধতি লেখা হয়েছে',
  'সীমাবদ্ধতা ও নিরাপত্তা নোট যোগ করা হয়েছে',
  'ভবিষ্যৎ উন্নতির পরিকল্পনা লেখা হয়েছে',
  'রিডমি বা পোস্ট হিসেবে কপি করার জন্য প্রস্তুত',
];

const futureItems = [
  'মার্কডাউন ডাউনলোড',
  'পিডিএফ ডাউনলোড',
  'গিটহাব পেজের জন্য প্রস্তুত ফাইল',
  'প্রকল্প প্রদর্শনী গ্যালারি',
];

function readJsonFromStorage(key) {
  try {
    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue);
  } catch {
    return null;
  }
}

function saveJsonToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The portfolio builder still works when browser local storage is unavailable.
  }
}

function removeStorageItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // The portfolio builder still works when browser local storage is unavailable.
  }
}

function getSectionContent(source, label) {
  return source?.sections?.find((section) => section.label === label)?.content || '';
}

function cleanText(value) {
  return String(value || '').trim();
}

function fieldValue(value, fallback = 'এখানে আপনার তথ্য যোগ করুন।') {
  return cleanText(value) || fallback;
}

function buildSavedWorkDraft(practiceBrief, agentStudio) {
  const agentPack = agentStudio?.agentPack;
  const practiceSelections = practiceBrief?.selections || {};
  const agentSelections = agentPack?.selections || agentStudio?.selections || {};
  const assistantName = cleanText(agentSelections.assistantName);
  const assistantType = cleanText(agentSelections.assistantType || practiceSelections.assistantType);
  const useCase = cleanText(agentSelections.useCase || practiceSelections.problemType);

  return {
    projectName:
      assistantName ||
      getSectionContent(practiceBrief, 'অনুশীলনের শিরোনাম') ||
      [practiceSelections.businessType, assistantType].filter(Boolean).join(' '),
    problemSolved:
      getSectionContent(practiceBrief, 'সমস্যার বিবরণ') ||
      [practiceSelections.businessType, useCase].filter(Boolean).join(' কাজের সমস্যা'),
    assistantType: [assistantType, useCase].filter(Boolean).join(' - '),
    knowledgeBase:
      getSectionContent(agentPack, 'নলেজ বেস প্রস্তুতি') || getSectionContent(practiceBrief, 'প্রয়োজনীয় তথ্য'),
    howItWorks:
      [getSectionContent(agentPack, 'ব্যবহারের প্রেক্ষাপট'), getSectionContent(agentPack, 'মূল নির্দেশনা')]
        .filter(Boolean)
        .join('\n\n'),
    testing:
      getSectionContent(agentPack, 'পরীক্ষার প্রশ্ন') || getSectionContent(practiceBrief, 'পরীক্ষার প্রশ্ন'),
    safetyLimitations: getSectionContent(agentPack, 'গার্ডরেইল'),
    learning: practiceSelections.learningStage
      ? `${practiceSelections.learningStage} থেকে সহকারীর লক্ষ্য, নলেজ বেস, নিরাপত্তা নিয়ম এবং পরীক্ষার প্রশ্ন গুছিয়ে লেখা শিখেছি।`
      : '',
    futurePlan:
      getSectionContent(agentPack, 'বাস্তব প্ল্যাটফর্মে নেওয়ার ধাপ') || getSectionContent(practiceBrief, 'পরবর্তী ধাপ'),
  };
}

function createPortfolioOutputs(fields) {
  const projectName = fieldValue(fields.projectName, 'আপনার পোর্টফোলিও প্রকল্প');
  const problemSolved = fieldValue(fields.problemSolved);
  const assistantType = fieldValue(fields.assistantType);
  const knowledgeBase = fieldValue(fields.knowledgeBase);
  const howItWorks = fieldValue(fields.howItWorks);
  const testing = fieldValue(fields.testing);
  const safetyLimitations = fieldValue(fields.safetyLimitations);
  const learning = fieldValue(fields.learning);
  const futurePlan = fieldValue(fields.futurePlan);

  const fullDraft = [
    `প্রকল্পের নাম\n${projectName}`,
    `সমস্যার প্রেক্ষাপট\n${problemSolved}`,
    `সমাধানের সারাংশ\nএই প্রকল্পে ${assistantType} তৈরি করার পরিকল্পনা করা হয়েছে, যাতে নির্দিষ্ট সমস্যাটি নিরাপদ ও পরিষ্কারভাবে সমাধান করা যায়।`,
    `সহকারীর ভূমিকা\n${howItWorks}`,
    `ব্যবহৃত তথ্য\n${knowledgeBase}`,
    `কাজের ধাপ\n১. সমস্যাটি লেখা হয়েছে।\n২. সহকারীর ভূমিকা নির্ধারণ করা হয়েছে।\n৩. নলেজ বেস সাজানো হয়েছে।\n৪. নিরাপত্তা নিয়ম যুক্ত করা হয়েছে।\n৫. টেস্ট প্রশ্ন দিয়ে খসড়া যাচাই করা হয়েছে।`,
    `পরীক্ষার পদ্ধতি\n${testing}`,
    `নিরাপত্তা ও সীমাবদ্ধতা\n${safetyLimitations}`,
    `শেখার ফলাফল\n${learning}`,
    `পরবর্তী উন্নতি\n${futurePlan}`,
  ].join('\n\n');

  const readmeDraft = [
    `# ${projectName}`,
    `## Problem\n${problemSolved}`,
    `## Solution\nএই প্রকল্পে ${assistantType} তৈরি করার একটি শেখার খসড়া প্রস্তুত করা হয়েছে।`,
    `## How It Works\n${howItWorks}`,
    `## Knowledge Source\n${knowledgeBase}`,
    `## Test Approach\n${testing}`,
    `## Safety And Limitations\n${safetyLimitations}`,
    `## What I Learned\n${learning}`,
    `## Future Improvements\n${futurePlan}`,
  ].join('\n\n');

  const linkedInDraft = [
    'আজ AI Integrator Bangla Lab এর অনুশীলন থেকে একটি ছোট পোর্টফোলিও প্রকল্প তৈরি করলাম।',
    '',
    `প্রকল্পের নাম: ${projectName}`,
    `সমস্যা: ${problemSolved}`,
    `সমাধান: ${assistantType} ব্যবহার করে নির্দিষ্ট তথ্যের ভিত্তিতে সহায়ক উত্তর দেওয়ার একটি খসড়া তৈরি করেছি।`,
    `যা শিখেছি: ${learning}`,
    `পরবর্তী ধাপ: ${futurePlan}`,
    '',
    'এটি শেখার কাজ গুছিয়ে দেখানোর একটি অনুশীলন খসড়া। আরও পরীক্ষা, নলেজ বেস উন্নতি এবং পরিষ্কার ডকুমেন্টেশন যোগ করার পরিকল্পনা আছে।',
  ].join('\n');

  return { fullDraft, readmeDraft, linkedInDraft };
}

async function writeClipboardText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error('Copy command failed');
  }
}

export default function PortfolioBuilder() {
  const [fields, setFields] = useState(defaultPortfolioFields);
  const [checklist, setChecklist] = useState(() => checklistItems.map(() => false));
  const [savedPracticeBrief, setSavedPracticeBrief] = useState(null);
  const [savedAgentStudio, setSavedAgentStudio] = useState(null);
  const [useSavedWork, setUseSavedWork] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const didHydrate = useRef(false);

  const generatedOutputs = useMemo(() => createPortfolioOutputs(fields), [fields]);
  const hasSavedWork = Boolean(savedPracticeBrief?.sections || savedAgentStudio?.agentPack?.sections);

  useEffect(() => {
    const storedPortfolio = readJsonFromStorage(portfolioStorageKey);
    const storedPracticeBrief = readJsonFromStorage(practiceBriefStorageKey);
    const storedAgentStudio = readJsonFromStorage(agentStudioStorageKey);

    if (storedPortfolio?.fields) {
      setFields({ ...defaultPortfolioFields, ...storedPortfolio.fields });
      setChecklist(
        checklistItems.map((_, index) => Boolean(storedPortfolio.checklist?.[index])),
      );
      setUseSavedWork(Boolean(storedPortfolio.useSavedWork));
    }

    if (storedPracticeBrief?.sections) {
      setSavedPracticeBrief(storedPracticeBrief);
    }

    if (storedAgentStudio?.agentPack?.sections) {
      setSavedAgentStudio(storedAgentStudio);
    }

  }, []);

  useEffect(() => {
    if (!didHydrate.current) {
      didHydrate.current = true;
      return;
    }

    saveJsonToStorage(portfolioStorageKey, {
      fields,
      checklist,
      generatedOutputs,
      useSavedWork,
      updatedAt: new Date().toISOString(),
    });
  }, [fields, checklist, generatedOutputs, useSavedWork]);

  function handleFieldChange(fieldId, value) {
    setFields((currentFields) => ({ ...currentFields, [fieldId]: value }));
    setStatusMessage('');
  }

  function handleUseSavedWorkChange(event) {
    const shouldUseSavedWork = event.target.checked;
    setUseSavedWork(shouldUseSavedWork);

    if (shouldUseSavedWork) {
      setFields((currentFields) => ({
        ...currentFields,
        ...buildSavedWorkDraft(savedPracticeBrief, savedAgentStudio),
      }));
      setStatusMessage('সর্বশেষ অনুশীলনের তথ্য যুক্ত হয়েছে');
      return;
    }

    setStatusMessage('');
  }

  function handleChecklistChange(index) {
    setChecklist((currentChecklist) =>
      currentChecklist.map((item, itemIndex) => (itemIndex === index ? !item : item)),
    );
    setStatusMessage('');
  }

  async function handleCopy(text) {
    try {
      await writeClipboardText(text);
      setStatusMessage('কপি হয়েছে');
    } catch {
      setStatusMessage('কপি করা যায়নি। দয়া করে হাতে কপি করুন।');
    }
  }

  function handleSavePortfolio() {
    saveJsonToStorage(portfolioStorageKey, {
      fields,
      checklist,
      generatedOutputs,
      useSavedWork,
      updatedAt: new Date().toISOString(),
    });
    setStatusMessage('পোর্টফোলিও খসড়া সংরক্ষণ হয়েছে');
  }

  function handleResetPortfolio() {
    removeStorageItem(portfolioStorageKey);
    setFields(defaultPortfolioFields);
    setChecklist(checklistItems.map(() => false));
    setUseSavedWork(false);
    setStatusMessage('পোর্টফোলিও অংশ রিসেট হয়েছে');
  }

  return (
    <section className="portfolio-builder" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-intro-card">
        <div className="section-heading portfolio-heading">
          <p className="eyebrow">কাজের প্রমাণ</p>
          <h2 id="portfolio-title">পোর্টফোলিও প্রস্তুতকারী</h2>
          <p className="portfolio-subtitle">
            আপনার অনুশীলন ও এজেন্ট প্যাককে প্রকাশযোগ্য কাজের প্রমাণে রূপ দিন
          </p>
          <p>
            এখানে আপনি আপনার শেখা কাজকে গুছিয়ে এমনভাবে লিখতে পারবেন, যাতে সেটি গিটহাব,
            লিংকডইন, ব্যক্তিগত ওয়েবসাইট অথবা ভবিষ্যৎ ক্লায়েন্ট আলোচনায় দেখানো যায়।
          </p>
        </div>

        <div className="portfolio-notes">
          <p className="portfolio-note portfolio-guardrail">
            এটি শেখা কাজ গুছিয়ে দেখানোর জন্য একটি পোর্টফোলিও খসড়া। এটি চাকরি, ক্লায়েন্ট,
            আয় বা সার্টিফিকেটের নিশ্চয়তা দেয় না।
          </p>
          <p className="portfolio-note">
            এই অংশে কোনো লগইন, ডাটাবেস বা সার্ভারে তথ্য পাঠানো হয় না। আপনার লেখা শুধু এই
            ব্রাউজারে সংরক্ষিত থাকে।
          </p>
        </div>
      </div>

      <div className="portfolio-saved-work portfolio-card">
        <p>
          {hasSavedWork
            ? 'আপনার আগের অনুশীলন পাওয়া গেছে। চাইলে সেই তথ্য ব্যবহার করে পোর্টফোলিও খসড়া তৈরি করা যাবে।'
            : 'আগের অনুশীলন পাওয়া যায়নি। আপনি চাইলে নিচের ফর্ম থেকে নতুন করে পোর্টফোলিও খসড়া তৈরি করতে পারেন।'}
        </p>
        {hasSavedWork && (
          <label className="portfolio-checkbox" htmlFor="portfolio-use-saved-work">
            <input
              id="portfolio-use-saved-work"
              type="checkbox"
              checked={useSavedWork}
              onChange={handleUseSavedWorkChange}
            />
            <span>সর্বশেষ অনুশীলন ব্যবহার করুন</span>
          </label>
        )}
      </div>

      <div className="portfolio-grid">
        <div className="portfolio-left-column">
          <form className="portfolio-form portfolio-card">
            <div className="portfolio-card-header">
              <span className="portfolio-chip">ধাপ ৪ প্রকাশের প্রস্তুতি</span>
              <h3>পোর্টফোলিও তথ্য লিখুন</h3>
            </div>

            <div className="portfolio-form-grid">
              {portfolioFields.map((field) => (
                <div className="portfolio-field" key={field.id}>
                  <label htmlFor={`portfolio-${field.id}`}>{field.label}</label>
                  {field.type === 'input' ? (
                    <input
                      id={`portfolio-${field.id}`}
                      name={field.id}
                      type="text"
                      value={fields[field.id]}
                      placeholder={field.placeholder}
                      onChange={(event) => handleFieldChange(field.id, event.target.value)}
                    />
                  ) : (
                    <textarea
                      id={`portfolio-${field.id}`}
                      name={field.id}
                      rows="3"
                      value={fields[field.id]}
                      placeholder={field.placeholder}
                      onChange={(event) => handleFieldChange(field.id, event.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="portfolio-actions">
              <button className="button button-primary" type="button" onClick={handleSavePortfolio}>
                সংরক্ষণ করুন
              </button>
              <button className="button portfolio-reset" type="button" onClick={handleResetPortfolio}>
                রিসেট করুন
              </button>
            </div>
          </form>

          <aside className="portfolio-checklist portfolio-card" aria-labelledby="portfolio-checklist-title">
            <div className="portfolio-card-header">
              <span className="portfolio-chip">চেকলিস্ট</span>
              <h3 id="portfolio-checklist-title">প্রকাশের আগে যাচাই</h3>
            </div>
            <div className="portfolio-checklist-items">
              {checklistItems.map((item, index) => (
                <label className="portfolio-checkbox portfolio-check-item" key={item}>
                  <input
                    type="checkbox"
                    checked={checklist[index]}
                    onChange={() => handleChecklistChange(index)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </aside>
        </div>

        <div className="portfolio-output-column" aria-live="polite">
          <article className="portfolio-output-card portfolio-card">
            <div className="portfolio-output-header">
              <h3>পূর্ণ পোর্টফোলিও খসড়া</h3>
              <button type="button" onClick={() => handleCopy(generatedOutputs.fullDraft)}>
                পূর্ণ খসড়া কপি করুন
              </button>
            </div>
            <pre>{generatedOutputs.fullDraft}</pre>
          </article>

          <article className="portfolio-output-card portfolio-card">
            <div className="portfolio-output-header">
              <h3>রিডমি খসড়া</h3>
              <button type="button" onClick={() => handleCopy(generatedOutputs.readmeDraft)}>
                রিডমি কপি করুন
              </button>
            </div>
            <pre>{generatedOutputs.readmeDraft}</pre>
          </article>

          <article className="portfolio-output-card portfolio-card">
            <div className="portfolio-output-header">
              <h3>লিংকডইন পোস্ট খসড়া</h3>
              <button type="button" onClick={() => handleCopy(generatedOutputs.linkedInDraft)}>
                লিংকডইন পোস্ট কপি করুন
              </button>
            </div>
            <pre>{generatedOutputs.linkedInDraft}</pre>
          </article>

          <aside className="portfolio-future portfolio-card" aria-labelledby="portfolio-future-title">
            <div className="portfolio-card-header">
              <span className="portfolio-chip">ভবিষ্যৎ ধারণা</span>
              <h3 id="portfolio-future-title">পরবর্তী সংস্করণে আসতে পারে</h3>
            </div>
            <p>নিচের সুবিধাগুলো এখনো নেই; এগুলো ভবিষ্যৎ পরিকল্পনা হিসেবে রাখা হয়েছে।</p>
            <ul>
              {futureItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <p className="portfolio-status" role="status" aria-live="polite">
            {statusMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
