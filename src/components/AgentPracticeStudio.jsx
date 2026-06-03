import { useEffect, useMemo, useState } from 'react';
import {
  agentStudioIntro,
  agentStudioMessages,
  agentStudioPracticeBriefStorageKey,
  agentStudioSelectFields,
  agentStudioStorageKey,
  defaultAgentStudioSelections,
  formatAgentPack,
  generateAgentPack,
  getAgentInstructions,
  getPracticeBriefContext,
} from '../data/agentStudioContent.js';

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
    // The studio still works when browser local storage is unavailable.
  }
}

function removeStorageItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // The studio still works when browser local storage is unavailable.
  }
}

async function writeClipboardText(text) {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard API unavailable');
  }

  await navigator.clipboard.writeText(text);
}

export default function AgentPracticeStudio() {
  const [selections, setSelections] = useState(defaultAgentStudioSelections);
  const [practiceBriefContext, setPracticeBriefContext] = useState(null);
  const [usePracticeBrief, setUsePracticeBrief] = useState(false);
  const [agentPack, setAgentPack] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const storedPracticeBrief = readJsonFromStorage(agentStudioPracticeBriefStorageKey);
    const storedPracticeContext = getPracticeBriefContext(storedPracticeBrief);
    const storedAgentStudio = readJsonFromStorage(agentStudioStorageKey);

    if (storedPracticeContext) {
      setPracticeBriefContext(storedPracticeContext);
    }

    if (storedAgentStudio?.agentPack?.sections) {
      setAgentPack(storedAgentStudio.agentPack);
      setSelections({ ...defaultAgentStudioSelections, ...storedAgentStudio.selections });
      setUsePracticeBrief(Boolean(storedAgentStudio.usePracticeBrief && storedPracticeContext));
    }
  }, []);

  const fullPackText = useMemo(() => formatAgentPack(agentPack), [agentPack]);
  const instructionsText = useMemo(() => getAgentInstructions(agentPack), [agentPack]);

  function handleSelectionChange(fieldId, value) {
    setSelections((currentSelections) => ({
      ...currentSelections,
      [fieldId]: value,
    }));
    setStatusMessage('');
  }

  function handleUsePracticeBriefChange(event) {
    setUsePracticeBrief(event.target.checked);
    setStatusMessage('');
  }

  function handleGeneratePack(event) {
    event.preventDefault();
    const selectedPracticeContext = usePracticeBrief ? practiceBriefContext : null;
    const generatedPack = generateAgentPack(selections, selectedPracticeContext);

    setAgentPack(generatedPack);
    saveJsonToStorage(agentStudioStorageKey, {
      selections: generatedPack.selections,
      usePracticeBrief,
      agentPack: generatedPack,
    });
    setStatusMessage(agentStudioMessages.generated);
  }

  async function handleCopyFullPack() {
    try {
      await writeClipboardText(fullPackText);
      setStatusMessage(agentStudioMessages.copiedFullPack);
    } catch {
      setStatusMessage(agentStudioMessages.copyFailed);
    }
  }

  async function handleCopyInstructions() {
    try {
      await writeClipboardText(instructionsText);
      setStatusMessage(agentStudioMessages.copiedInstructions);
    } catch {
      setStatusMessage(agentStudioMessages.copyFailed);
    }
  }

  function handleResetPack() {
    removeStorageItem(agentStudioStorageKey);
    setSelections(defaultAgentStudioSelections);
    setUsePracticeBrief(false);
    setAgentPack(null);
    setStatusMessage(agentStudioMessages.reset);
  }

  return (
    <section className="agent-studio" id="prompt-builder" aria-labelledby="agent-studio-title">
      <div className="section-heading agent-studio-heading">
        <p className="eyebrow">{agentStudioIntro.eyebrow}</p>
        <h2 id="agent-studio-title">{agentStudioIntro.title}</h2>
        <p className="agent-studio-subtitle">{agentStudioIntro.subtitle}</p>
        <p>{agentStudioIntro.description}</p>
        <p className="agent-studio-note">{agentStudioIntro.safetyNote}</p>
      </div>

      <div className="agent-studio-grid">
        <form className="agent-studio-form" onSubmit={handleGeneratePack}>
          <div className="agent-studio-form-header">
            <span className="agent-studio-chip">এই অনুশীলনকে কীভাবে সহকারী বানাব?</span>
            <h3>সহকারীর প্যাক সাজান</h3>
          </div>

          {practiceBriefContext && (
            <div className="agent-studio-note agent-studio-brief-note">
              <p>{agentStudioMessages.practiceBriefFound}</p>
              <label className="agent-studio-checkbox" htmlFor="agent-use-practice-brief">
                <input
                  id="agent-use-practice-brief"
                  type="checkbox"
                  checked={usePracticeBrief}
                  onChange={handleUsePracticeBriefChange}
                />
                <span>সর্বশেষ অনুশীলন ব্রিফ ব্যবহার করুন</span>
              </label>
            </div>
          )}

          {agentStudioSelectFields.map((field) => (
            <div className="agent-studio-field" key={field.id}>
              <label htmlFor={`agent-${field.id}`}>{field.label}</label>
              <select
                id={`agent-${field.id}`}
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

          <div className="agent-studio-field">
            <label htmlFor="agent-assistant-name">সহকারীর নাম</label>
            <input
              id="agent-assistant-name"
              name="assistantName"
              type="text"
              value={selections.assistantName}
              onChange={(event) => handleSelectionChange('assistantName', event.target.value)}
            />
          </div>

          <div className="agent-studio-field">
            <label htmlFor="agent-assistant-task">সহকারীর সংক্ষিপ্ত কাজ</label>
            <textarea
              id="agent-assistant-task"
              name="assistantTask"
              rows="4"
              value={selections.assistantTask}
              onChange={(event) => handleSelectionChange('assistantTask', event.target.value)}
            />
          </div>

          <div className="agent-studio-actions">
            <button className="button button-primary" type="submit">
              এজেন্ট প্যাক তৈরি করুন
            </button>
            <button className="button agent-studio-reset" type="button" onClick={handleResetPack}>
              নতুন করে শুরু করুন
            </button>
          </div>
        </form>

        <div className="agent-studio-result" aria-live="polite">
          {agentPack ? (
            <article className="agent-studio-result-card" aria-labelledby="agent-studio-result-title">
              <div className="agent-studio-result-topline">
                <div>
                  <p className="readiness-card-label">তৈরি করা এজেন্ট প্যাক</p>
                  <h3 id="agent-studio-result-title">{agentPack.sections[0].content}</h3>
                </div>
                <div className="agent-studio-copy" aria-label="কপি করার কাজ">
                  <button type="button" onClick={handleCopyFullPack}>
                    পুরো প্যাক কপি করুন
                  </button>
                  <button type="button" onClick={handleCopyInstructions}>
                    শুধু নির্দেশনা কপি করুন
                  </button>
                </div>
              </div>

              <div className="agent-studio-meta" aria-label="নির্বাচিত তথ্য">
                <span>{agentPack.selections.assistantType}</span>
                <span>{agentPack.selections.useCase}</span>
                <span>{agentPack.selections.tone}</span>
                <span>{agentPack.selections.safetyLevel}</span>
                <span>{agentPack.selections.knowledgeSource}</span>
                {agentPack.usedPracticeBrief && <span>অনুশীলন ব্রিফ যুক্ত</span>}
              </div>

              <div className="agent-studio-sections">
                {agentPack.sections.map((section) => (
                  <section className="agent-studio-section" key={section.label}>
                    <h4>{section.label}</h4>
                    <p>{section.content}</p>
                  </section>
                ))}
              </div>
            </article>
          ) : (
            <article className="agent-studio-result-card agent-studio-empty" aria-labelledby="agent-studio-empty-title">
              <p className="readiness-card-label">ফলাফল</p>
              <h3 id="agent-studio-empty-title">এখনও কোনো এজেন্ট প্যাক তৈরি হয়নি</h3>
              <p>
                বাম পাশের ফর্ম থেকে সহকারীর ধরন, ব্যবহারের ক্ষেত্র, ভাষা, নিরাপত্তা এবং নলেজ বেস
                বেছে নিন। এরপর কপি করার মতো নির্দেশনা, গার্ডরেইল, টেস্ট প্রশ্ন এবং ডেমো স্ক্রিপ্ট
                তৈরি হবে।
              </p>
            </article>
          )}

          <p className="agent-studio-status" role="status" aria-live="polite">
            {statusMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
