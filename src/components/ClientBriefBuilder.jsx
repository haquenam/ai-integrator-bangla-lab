import { useEffect, useMemo, useState } from 'react';
import {
  clientBriefGroups,
  clientBriefStorageKey,
  defaultClientBriefFields,
  featureOptions,
  futureClientBriefItems,
  mvpExcludeOptions,
  mvpIncludeOptions,
} from '../data/clientBriefContent.js';

const defaultOutputs = {
  clientBrief: '',
  mvpScope: '',
  aiBuildPrompt: '',
  confirmationNote: '',
};

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
    // The client brief builder still works when browser local storage is unavailable.
  }
}

function removeStorageItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // The client brief builder still works when browser local storage is unavailable.
  }
}

function cleanText(value) {
  return String(value || '').trim();
}

function toBanglaNumber(value) {
  return String(value).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[Number(digit)]);
}

function valueOrPlaceholder(value, placeholder = 'ক্লায়েন্টের তথ্য অনুযায়ী পূরণ করুন') {
  return cleanText(value) || placeholder;
}

function listOrPlaceholder(items, placeholder = 'এখনো নির্বাচন করা হয়নি') {
  const cleanedItems = items.map(cleanText).filter(Boolean);

  if (!cleanedItems.length) {
    return placeholder;
  }

  return cleanedItems.map((item) => `- ${item}`).join('\n');
}

function createLinksList(fields) {
  const links = [
    ['ওয়েবসাইট', fields.websiteLink],
    ['ভিডিও', fields.videoLink],
    ['ডকুমেন্ট বা গাইড', fields.documentLink],
    ['চ্যাটবট বা সহকারী', fields.assistantLink],
    ['প্রোফাইল বা পরিচিতি', fields.profileLink],
    ['অন্যান্য', fields.otherLinks],
  ]
    .filter(([, value]) => cleanText(value))
    .map(([label, value]) => `- ${label}: ${cleanText(value)}`);

  return links.length ? links.join('\n') : 'প্রয়োজনীয় লিংক পরে যোগ করা হবে।';
}

function createGeneratedOutputs(fields, features, mvpIncludes, mvpExcludes) {
  const projectName = valueOrPlaceholder(fields.projectName, 'প্রজেক্টের নাম ঠিক করতে হবে');
  const clientName = valueOrPlaceholder(fields.clientName, 'ক্লায়েন্ট বা প্রতিষ্ঠানের নাম');
  const solutionType = valueOrPlaceholder(fields.solutionType, 'সমাধানের ধরন নির্বাচন করুন');
  const purpose = valueOrPlaceholder(fields.projectPurpose, 'প্রজেক্টের উদ্দেশ্য লিখুন');
  const targetUsers = valueOrPlaceholder(fields.targetUsers, 'লক্ষ্য ব্যবহারকারী নির্ধারণ করুন');
  const userProblem = valueOrPlaceholder(fields.userProblem, 'ব্যবহারকারীর সমস্যা লিখুন');
  const selectedFeatures = listOrPlaceholder(features);
  const links = createLinksList(fields);
  const languageExperience = [
    `প্রধান ভাষা: ${valueOrPlaceholder(fields.primaryLanguage, 'নির্ধারণ করা হয়নি')}`,
    `লেখার ধরন: ${valueOrPlaceholder(fields.writingTone, 'নির্ধারণ করা হয়নি')}`,
    `প্রযুক্তিগত শব্দের নিয়ম: ${valueOrPlaceholder(fields.terminologyRule)}`,
    `ব্যবহার করা যাবে না: ${valueOrPlaceholder(fields.bannedWords)}`,
    `অবশ্যই রাখতে হবে: ${valueOrPlaceholder(fields.requiredPhrases)}`,
  ].join('\n');
  const branding = [
    `লোগো: ${valueOrPlaceholder(fields.logoStatus)}`,
    `প্রধান রং: ${valueOrPlaceholder(fields.primaryColor)}`,
    `দ্বিতীয় রং: ${valueOrPlaceholder(fields.secondaryColor)}`,
    `অ্যাকসেন্ট রং: ${valueOrPlaceholder(fields.accentColor)}`,
    `ছবি: ${valueOrPlaceholder(fields.imageStatus)}`,
    `ভিজ্যুয়াল সীমাবদ্ধতা: ${valueOrPlaceholder(fields.visualRestrictions)}`,
    `ডিজাইন পছন্দ: ${valueOrPlaceholder(fields.designPreference)}`,
  ].join('\n');
  const safety = [
    `ব্যবহার করা যাবে না: ${valueOrPlaceholder(fields.disallowedData)}`,
    `উত্তর দেওয়া যাবে না: ${valueOrPlaceholder(fields.disallowedAnswers)}`,
    `মানুষের সাহায্য লাগবে: ${valueOrPlaceholder(fields.humanHelpTrigger)}`,
    `গোপনীয়তা নোট: ${valueOrPlaceholder(fields.privacyNote)}`,
    `আইনি বা সংবেদনশীল সীমাবদ্ধতা: ${valueOrPlaceholder(fields.legalLimitations)}`,
    `অনুমোদন প্রয়োজন: ${valueOrPlaceholder(fields.approvalNeed)}`,
    'এই টুল শুধু প্রয়োজনীয় তথ্য গুছানো ও প্রম্পট প্রস্তুতির জন্য। কোনো কাজ, আয়, অনুমোদন বা সফলতার নিশ্চয়তা দেওয়া যাবে না।',
  ].join('\n');
  const extraNotes = [
    `ট্যাগলাইন: ${valueOrPlaceholder(fields.tagline)}`,
    `যোগাযোগ: ${valueOrPlaceholder(fields.contactLink)}`,
    `ব্যবহার পরিস্থিতি: ${valueOrPlaceholder(fields.mainUseCase)}`,
    `প্রধান পথ: ${valueOrPlaceholder(fields.primaryPath)}`,
    `বিকল্প পথ: ${valueOrPlaceholder(fields.alternativePath)}`,
    `অতিরিক্ত অনুরোধ: ${valueOrPlaceholder(fields.extraRequests)}`,
    `ডেডলাইন: ${valueOrPlaceholder(fields.deadline)}`,
    `প্রথম ডেমো: ${valueOrPlaceholder(fields.firstDemo)}`,
    `পরে রাখা হবে: ${valueOrPlaceholder(fields.postponedItems)}`,
    `অন্যান্য: ${valueOrPlaceholder(fields.otherNotes)}`,
  ].join('\n');

  const clientBrief = [
    `প্রজেক্টের নাম\n${projectName}`,
    `ক্লায়েন্ট বা প্রতিষ্ঠান\n${clientName}`,
    `সমাধানের ধরন\n${solutionType}`,
    `প্রজেক্টের উদ্দেশ্য\n${purpose}`,
    `লক্ষ্য ব্যবহারকারী\n${targetUsers}`,
    `ব্যবহারকারীর সমস্যা\n${userProblem}`,
    `প্রধান ফিচার\n${selectedFeatures}`,
    `প্রধান লিংক ও তথ্য\n${links}`,
    `ভাষা ও ব্যবহার অভিজ্ঞতা\n${languageExperience}`,
    `ব্র্যান্ডিং নির্দেশনা\n${branding}`,
    `নিরাপত্তা ও সীমাবদ্ধতা\n${safety}`,
    `অতিরিক্ত নোট\n${extraNotes}`,
  ].join('\n\n');

  const mvpScope = [
    `এই সংস্করণে থাকবে\n${listOrPlaceholder(mvpIncludes)}`,
    `এই সংস্করণে থাকবে না\n${listOrPlaceholder(mvpExcludes)}`,
    `পরবর্তী সংস্করণে রাখা যেতে পারে\n${valueOrPlaceholder(fields.postponedItems, 'ক্লায়েন্টের অনুমোদনের পরে উন্নত ফিচার যোগ করা যেতে পারে।')}`,
    `মূল অনুমান\nপ্রথম সংস্করণটি হালকা, কপি-ভিত্তিক এবং ব্রাউজার-কেন্দ্রিক এমভিপি হবে। ব্যাকএন্ড, লগইন, পেমেন্ট, ডাটাবেস, ফাইল আপলোড, ডাউনলোড অথবা external API call যোগ করা হবে না।`,
    `ক্লায়েন্টের অনুমোদন প্রয়োজন\n${valueOrPlaceholder(fields.approvalNeed, 'প্রথম ডেমোর আগে স্কোপ, ভাষা, নিরাপত্তা নিয়ম এবং প্রধান ফিচার অনুমোদন প্রয়োজন।')}`,
  ].join('\n\n');

  const aiBuildPrompt = [
    'You are an expert app builder.',
    'Build a lightweight MVP for the following project.',
    `Project name: ${projectName}`,
    `Solution type: ${solutionType}`,
    `Target users: ${targetUsers}`,
    `Main purpose: ${purpose}`,
    `Required screens or sections:\n${selectedFeatures}`,
    `Links to include:\n${links}`,
    `Language and tone: ${valueOrPlaceholder(fields.primaryLanguage, 'Bangla first')} with ${valueOrPlaceholder(fields.writingTone, 'clear beginner friendly tone')}. Terminology rule: ${valueOrPlaceholder(fields.terminologyRule)}. Avoid: ${valueOrPlaceholder(fields.bannedWords)}. Must include: ${valueOrPlaceholder(fields.requiredPhrases)}.`,
    `Branding guidance:\n${branding}`,
    `MVP inclusions:\n${listOrPlaceholder(mvpIncludes)}`,
    `MVP exclusions:\n${listOrPlaceholder(mvpExcludes)}`,
    `Safety and privacy rules:\n${safety}`,
    'Expected output: Create a clean, beginner friendly first version. Do not add backend, login, payment, database, file upload, direct email sending, direct publishing, downloads, external API calls, AI API calls, or features marked as excluded.',
  ].join('\n\n');

  const confirmationNote = [
    'ধন্যবাদ। আলোচনার ভিত্তিতে আমি নিচের প্রাথমিক ব্রিফটি তৈরি করেছি।',
    '',
    `প্রজেক্ট: ${projectName}`,
    `ক্লায়েন্ট বা প্রতিষ্ঠান: ${clientName}`,
    `সমাধানের ধরন: ${solutionType}`,
    `মূল উদ্দেশ্য: ${purpose}`,
    `লক্ষ্য ব্যবহারকারী: ${targetUsers}`,
    `প্রথম এমভিপিতে থাকবে: ${mvpIncludes.length ? mvpIncludes.join(', ') : 'ক্লায়েন্ট অনুমোদনের পরে নির্ধারণ করা হবে'}`,
    `প্রথম এমভিপিতে থাকবে না: ${mvpExcludes.length ? mvpExcludes.join(', ') : 'ক্লায়েন্ট অনুমোদনের পরে নির্ধারণ করা হবে'}`,
    '',
    'অনুগ্রহ করে দেখে জানান, এই স্কোপ ঠিক আছে কি না অথবা কিছু পরিবর্তন দরকার কি না।',
  ].join('\n');

  return { clientBrief, mvpScope, aiBuildPrompt, confirmationNote };
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
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export default function ClientBriefBuilder() {
  const [fields, setFields] = useState(defaultClientBriefFields);
  const [features, setFeatures] = useState([]);
  const [mvpIncludes, setMvpIncludes] = useState([]);
  const [mvpExcludes, setMvpExcludes] = useState(mvpExcludeOptions);
  const [outputs, setOutputs] = useState(defaultOutputs);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const savedState = readJsonFromStorage(clientBriefStorageKey);

    if (savedState) {
      setFields({ ...defaultClientBriefFields, ...(savedState.fields || {}) });
      setFeatures(Array.isArray(savedState.features) ? savedState.features : []);
      setMvpIncludes(Array.isArray(savedState.mvpIncludes) ? savedState.mvpIncludes : []);
      setMvpExcludes(Array.isArray(savedState.mvpExcludes) ? savedState.mvpExcludes : mvpExcludeOptions);
      setOutputs({ ...defaultOutputs, ...(savedState.outputs || {}) });
    }
  }, []);

  useEffect(() => {
    saveJsonToStorage(clientBriefStorageKey, {
      fields,
      features,
      mvpIncludes,
      mvpExcludes,
      outputs,
    });
  }, [fields, features, mvpIncludes, mvpExcludes, outputs]);

  const allOutputsText = useMemo(
    () =>
      [
        ['ক্লায়েন্ট ব্রিফ', outputs.clientBrief],
        ['এমভিপি স্কোপ', outputs.mvpScope],
        ['এআই বিল্ড প্রম্পট', outputs.aiBuildPrompt],
        ['ক্লায়েন্ট কনফার্মেশন নোট', outputs.confirmationNote],
      ]
        .map(([title, content]) => `${title}\n\n${content || 'এখনো তৈরি করা হয়নি।'}`)
        .join('\n\n---\n\n'),
    [outputs],
  );

  const handleFieldChange = (fieldId, value) => {
    setFields((currentFields) => ({ ...currentFields, [fieldId]: value }));
  };

  const toggleListItem = (item, setter) => {
    setter((currentItems) =>
      currentItems.includes(item)
        ? currentItems.filter((currentItem) => currentItem !== item)
        : [...currentItems, item],
    );
  };

  const handleGenerate = () => {
    setOutputs(createGeneratedOutputs(fields, features, mvpIncludes, mvpExcludes));
    setStatusMessage('ব্রিফ তৈরি হয়েছে');
  };

  const handleSave = () => {
    saveJsonToStorage(clientBriefStorageKey, {
      fields,
      features,
      mvpIncludes,
      mvpExcludes,
      outputs,
    });
    setStatusMessage('সংরক্ষণ হয়েছে');
  };

  const handleReset = () => {
    setFields(defaultClientBriefFields);
    setFeatures([]);
    setMvpIncludes([]);
    setMvpExcludes(mvpExcludeOptions);
    setOutputs(defaultOutputs);
    removeStorageItem(clientBriefStorageKey);
    setStatusMessage('রিসেট হয়েছে');
  };

  const handleCopy = async (text) => {
    try {
      await writeClipboardText(text || 'এখনো তৈরি করা হয়নি।');
      setStatusMessage('কপি হয়েছে');
    } catch {
      setStatusMessage('কপি করা যায়নি। দয়া করে হাতে কপি করুন।');
    }
  };

  return (
    <section className="client-brief-builder" id="client-brief" aria-labelledby="client-brief-title">
      <div className="section-heading client-brief-intro">
        <p className="eyebrow">ক্লায়েন্ট চাহিদা গুছানো</p>
        <h2 id="client-brief-title">ক্লায়েন্ট ব্রিফ বিল্ডার</h2>
        <p>ক্লায়েন্টের চাহিদা গুছিয়ে অ্যাপ, এজেন্ট বা এআই প্রজেক্টের প্রস্তুত ব্রিফ তৈরি করুন</p>
      </div>

      <div className="client-brief-note" role="note">
        <p>
          এই অংশটি ফ্রিল্যান্সার ও শিক্ষার্থীদের জন্য। ক্লায়েন্টের সঙ্গে কথা বলে প্রয়োজনীয় তথ্য এখানে লিখুন। এরপর ল্যাব একটি ক্লায়েন্ট ব্রিফ, এমভিপি স্কোপ, এআই বিল্ড প্রম্পট এবং ক্লায়েন্ট কনফার্মেশন নোট তৈরি করবে।
        </p>
        <p>
          এই অংশে কোনো লগইন, ডাটাবেস বা সার্ভারে তথ্য পাঠানো হয় না। আপনার লেখা শুধু এই ব্রাউজারে সংরক্ষিত থাকে। বাস্তব ক্লায়েন্টের ব্যক্তিগত, গোপন বা সংবেদনশীল তথ্য ব্যবহার করবেন না।
        </p>
        <p>এটি শেখা ও ক্লায়েন্ট আলোচনার প্রস্তুতির জন্য। এটি কাজ, আয়, ক্লায়েন্ট, সার্টিফিকেট বা সফলতার নিশ্চয়তা দেয় না।</p>
      </div>

      <div className="client-brief-grid">
        <form className="client-brief-form">
          {clientBriefGroups.slice(0, 4).map((group, groupIndex) => (
            <ClientBriefGroup
              fields={fields}
              group={group}
              groupIndex={groupIndex}
              key={group.title}
              onFieldChange={handleFieldChange}
            />
          ))}

          <fieldset className="client-brief-group">
            <legend className="sr-only">ফিচার নির্বাচন</legend>
            <div className="client-brief-group-heading">
              <span className="client-brief-step">০৫</span>
              <div>
                <h3>ফিচার নির্বাচন</h3>
                <p>প্রথম সংস্করণে কোন অংশগুলো দরকার হতে পারে নির্বাচন করুন।</p>
              </div>
            </div>
            <div className="client-brief-checkbox-grid">
              {featureOptions.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={features.includes(option)}
                    onChange={() => toggleListItem(option, setFeatures)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="client-brief-group">
            <legend className="sr-only">এমভিপি সীমা</legend>
            <div className="client-brief-group-heading">
              <span className="client-brief-step">০৬</span>
              <div>
                <h3>এমভিপি সীমা</h3>
                <p>প্রথম সংস্করণে কী থাকবে এবং কী পরে রাখা হবে তা আলাদা করুন।</p>
              </div>
            </div>
            <h4 className="client-brief-subheading">প্রথম এমভিপিতে থাকবে</h4>
            <div className="client-brief-checkbox-grid">
              {mvpIncludeOptions.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={mvpIncludes.includes(option)}
                    onChange={() => toggleListItem(option, setMvpIncludes)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <h4 className="client-brief-subheading">প্রথম এমভিপিতে থাকবে না</h4>
            <div className="client-brief-checkbox-grid">
              {mvpExcludeOptions.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={mvpExcludes.includes(option)}
                    onChange={() => toggleListItem(option, setMvpExcludes)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {clientBriefGroups.slice(4).map((group, index) => (
            <ClientBriefGroup
              fields={fields}
              group={group}
              groupIndex={index + 6}
              key={group.title}
              onFieldChange={handleFieldChange}
            />
          ))}

          <div className="client-brief-actions">
            <button className="button button-primary" type="button" onClick={handleGenerate}>
              ব্রিফ তৈরি করুন
            </button>
            <button className="button button-secondary" type="button" onClick={handleSave}>
              সংরক্ষণ করুন
            </button>
            <button className="button client-brief-reset" type="button" onClick={handleReset}>
              রিসেট করুন
            </button>
          </div>
        </form>

        <aside className="client-brief-output" aria-labelledby="client-brief-output-title">
          <div className="client-brief-output-heading">
            <span className="client-brief-chip">কপি করার জন্য প্রস্তুত</span>
            <h3 id="client-brief-output-title">তৈরি করা আউটপুট</h3>
            <button type="button" onClick={() => handleCopy(allOutputsText)}>
              সব আউটপুট কপি করুন
            </button>
          </div>

          <OutputCard title="ক্লায়েন্ট ব্রিফ" buttonLabel="ক্লায়েন্ট ব্রিফ কপি করুন" content={outputs.clientBrief} onCopy={handleCopy} />
          <OutputCard title="এমভিপি স্কোপ" buttonLabel="এমভিপি স্কোপ কপি করুন" content={outputs.mvpScope} onCopy={handleCopy} />
          <OutputCard title="এআই বিল্ড প্রম্পট" buttonLabel="এআই বিল্ড প্রম্পট কপি করুন" content={outputs.aiBuildPrompt} onCopy={handleCopy} />
          <OutputCard title="ক্লায়েন্ট কনফার্মেশন নোট" buttonLabel="কনফার্মেশন নোট কপি করুন" content={outputs.confirmationNote} onCopy={handleCopy} />

          <aside className="client-brief-future" aria-labelledby="client-brief-future-title">
            <h3 id="client-brief-future-title">ভবিষ্যৎ সংস্করণে আসতে পারে</h3>
            <p>নিচের সুবিধাগুলো এখন পাওয়া যাচ্ছে না; এগুলো ভবিষ্যৎ উন্নয়ন পরিকল্পনা।</p>
            <ul>
              {futureClientBriefItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <p className="client-brief-status" role="status" aria-live="polite">
            {statusMessage}
          </p>
        </aside>
      </div>
    </section>
  );
}

function ClientBriefGroup({ fields, group, groupIndex, onFieldChange }) {
  const groupNumber = toBanglaNumber(String(groupIndex + 1).padStart(2, '0'));

  return (
    <fieldset className="client-brief-group">
      <legend className="sr-only">{`${groupNumber} ${group.title}`}</legend>
      <div className="client-brief-group-heading">
        <span className="client-brief-step">{groupNumber}</span>
        <div>
          <h3>{group.title}</h3>
          {group.helper ? <p>{group.helper}</p> : null}
        </div>
      </div>
      <div className="client-brief-group-grid">
        {group.fields.map((field) => (
          <div className={`client-brief-field ${field.type === 'textarea' ? 'client-brief-field-wide' : ''}`} key={field.id}>
            <label htmlFor={`client-brief-${field.id}`}>{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={`client-brief-${field.id}`}
                name={field.id}
                value={fields[field.id]}
                onChange={(event) => onFieldChange(field.id, event.target.value)}
              >
                <option value="">নির্বাচন করুন</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={`client-brief-${field.id}`}
                name={field.id}
                placeholder={field.placeholder || ''}
                rows="4"
                value={fields[field.id]}
                onChange={(event) => onFieldChange(field.id, event.target.value)}
              />
            ) : (
              <input
                id={`client-brief-${field.id}`}
                name={field.id}
                placeholder={field.placeholder || ''}
                type="text"
                value={fields[field.id]}
                onChange={(event) => onFieldChange(field.id, event.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function OutputCard({ title, buttonLabel, content, onCopy }) {
  return (
    <article className="client-brief-output-card">
      <div className="client-brief-output-card-header">
        <h3>{title}</h3>
        <button type="button" onClick={() => onCopy(content)}>
          {buttonLabel}
        </button>
      </div>
      <pre>{content || 'ব্রিফ তৈরি করুন ক্লিক করলে এখানে আউটপুট দেখা যাবে।'}</pre>
    </article>
  );
}
