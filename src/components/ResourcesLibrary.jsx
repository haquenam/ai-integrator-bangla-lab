import {
  futureResources,
  practiceTemplates,
  quickStartResources,
  releasedVideos,
  resourcesIntro,
  safetyRules,
  upcomingResourceMap,
} from '../data/resourcesLibraryContent.js';

function SectionTitle({ id, title }) {
  return <h3 id={id}>{title}</h3>;
}

export default function ResourcesLibrary() {
  return (
    <section className="resources-library" id="resources" aria-labelledby="resources-title">
      <div className="resources-intro-card">
        <div>
          <p className="eyebrow">{resourcesIntro.eyebrow}</p>
          <h2 id="resources-title">{resourcesIntro.heading}</h2>
          <p className="resources-subtitle">{resourcesIntro.subtitle}</p>
          <p>{resourcesIntro.body}</p>
        </div>
        <aside className="resources-intro-note" aria-label="রিসোর্স লাইব্রেরির উদ্দেশ্য">
          <p>{resourcesIntro.note}</p>
          <strong>{resourcesIntro.safetyNote}</strong>
        </aside>
      </div>

      <div className="resources-quick-start" aria-label="দ্রুত শুরু করার লিংক">
        {quickStartResources.map((resource) => (
          <article className="resource-card" key={resource.title}>
            <h3>{resource.title}</h3>
            <p>{resource.text}</p>
            <a className="resource-action-link" href={resource.link}>
              {resource.button}
            </a>
          </article>
        ))}
      </div>

      <div className="resources-library-block" aria-labelledby="released-videos-title">
        <SectionTitle id="released-videos-title" title="প্রকাশিত ভিডিও" />
        <div className="resource-card-grid resource-video-grid">
          {releasedVideos.map((video) => (
            <article className="resource-video-card" key={video.title}>
              <h4>{video.title}</h4>
              <dl>
                <div>
                  <dt>ফোকাস</dt>
                  <dd>{video.focus}</dd>
                </div>
                <div>
                  <dt>অনুশীলন</dt>
                  <dd>{video.practice}</dd>
                </div>
              </dl>
              <a
                className="resource-action-link"
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${video.title} নতুন ট্যাবে দেখুন`}
              >
                ভিডিও দেখুন
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="resources-library-block" aria-labelledby="upcoming-resources-title">
        <SectionTitle id="upcoming-resources-title" title="পরবর্তী ভিডিওর রিসোর্স পরিকল্পনা" />
        <div className="resource-card-grid">
          {upcomingResourceMap.map((item) => (
            <article className="resource-card" key={item.title}>
              <span className="resource-badge">পরবর্তী সংস্করণে আসবে</span>
              <h4>{item.title}</h4>
              <p>
                <strong>স্ট্যাটাস:</strong> {item.status}
              </p>
              <p>
                <strong>যা থাকবে:</strong> {item.includes}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="resources-library-block" aria-labelledby="practice-template-title">
        <SectionTitle id="practice-template-title" title="অনুশীলন ও টেমপ্লেট" />
        <div className="resource-card-grid">
          {practiceTemplates.map((template) => (
            <article className="resource-card" key={template.title}>
              {template.badge ? <span className="resource-badge">{template.badge}</span> : null}
              <h4>{template.title}</h4>
              <p>{template.text}</p>
              {template.link ? (
                <a className="resource-action-link" href={template.link}>
                  {template.button}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <div className="resources-library-block" aria-labelledby="resource-safety-title">
        <SectionTitle id="resource-safety-title" title="নিরাপদ অনুশীলনের নিয়ম" />
        <div className="resource-safety-panel">
          <ol>
            {safetyRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="resources-library-block" aria-labelledby="future-resources-title">
        <SectionTitle id="future-resources-title" title="ভবিষ্যৎ রিসোর্স পরিকল্পনা" />
        <div className="resource-future-panel">
          <p>এই তালিকাটি ভবিষ্যৎ পরিকল্পনা। সব উপকরণ এখনো প্রকাশিত নয়।</p>
          <ul>
            {futureResources.map((resource) => (
              <li key={resource}>{resource}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
