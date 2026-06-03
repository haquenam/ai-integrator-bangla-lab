import {
  coreRoadmapModules,
  target100kCards,
  vision2028Cards,
} from '../data/roadmapContent.js';

const PLACEHOLDER_PATTERNS = ['placeholder', 'example.com', 'your-video', 'ভিডিও-লিংক'];

function hasPublishedVideo(module) {
  const embedUrl = module.videoEmbedUrl?.trim();

  if (!embedUrl || embedUrl === '#') {
    return false;
  }

  return !PLACEHOLDER_PATTERNS.some((pattern) => embedUrl.toLowerCase().includes(pattern));
}

function ModuleVideo({ module }) {
  if (!hasPublishedVideo(module)) {
    return null;
  }

  const videoTitle = module.videoTitle || `${module.title} ভিডিও`;

  return (
    <div className="video-card" aria-label={`${module.title} ভিডিও`}>
      <div className="video-frame">
        <iframe
          src={module.videoEmbedUrl}
          title={videoTitle}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <a
        className="video-link"
        href={module.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        ইউটিউবে দেখুন
      </a>
    </div>
  );
}

function ModuleCard({ module }) {
  const hasVideo = hasPublishedVideo(module);

  return (
    <article className="roadmap-card">
      <div className="roadmap-card-header">
        <div className="module-meta">
          <span className="module-number">ধাপ {module.number}</span>
          {hasVideo && module.videoStatus === 'প্রকাশিত' ? (
            <span className="published-video-badge">প্রকাশিত ভিডিও</span>
          ) : null}
        </div>
        <h3>{module.title}</h3>
      </div>
      <div className="roadmap-card-body">
        <div>
          <h4>ভিডিওর মূল বিষয়</h4>
          <p>{module.videoFocus}</p>
        </div>
        <div>
          <h4>অনুশীলন</h4>
          <p>{module.practice}</p>
        </div>
        <div>
          <h4>পোর্টফোলিও প্রমাণ</h4>
          <p>{module.evidence}</p>
        </div>
      </div>
      <ModuleVideo module={module} />
    </article>
  );
}

const banglaNumbers = ['০১', '০২', '০৩', '০৪', '০৫', '০৬'];

function RoadmapMiniCard({ card, index, variant }) {
  return (
    <article className={`roadmap-mini-card ${variant}`}>
      <span className="mini-card-number">{banglaNumbers[index]}</span>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
    </article>
  );
}

export default function Roadmap() {
  return (
    <section className="roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="section-heading roadmap-heading">
        <p className="eyebrow">বর্তমান ১০ ভিডিও সিরিজ</p>
        <h2 id="roadmap-title">১০ ধাপে এআই ইন্টিগ্রেটর হওয়ার পথ</h2>
        <p>
          এই পথটি বর্তমান ১০ ভিডিও সিরিজের সঙ্গে মিলিয়ে সাজানো। প্রতিটি ধাপে থাকবে শেখা,
          অনুশীলন এবং পোর্টফোলিও প্রমাণ।
        </p>
      </div>

      <div className="roadmap-grid" aria-label="১০ ভিডিও শেখার রোডম্যাপ">
        {coreRoadmapModules.map((module) => (
          <ModuleCard key={module.number} module={module} />
        ))}
      </div>

      <div className="roadmap-layer target-layer" aria-labelledby="target-title">
        <div className="roadmap-layer-heading">
          <p className="eyebrow">কমিউনিটির পরবর্তী লক্ষ্য</p>
          <h2 id="target-title">Target 100K</h2>
          <p>৭৫,৯৩৩ জন থেকে আরও বড় শেখার কমিউনিটির পথে</p>
        </div>
        <div className="roadmap-mini-grid roadmap-mini-grid-four">
          {target100kCards.map((card, index) => (
            <RoadmapMiniCard key={card.title} card={card} index={index} variant="target-card" />
          ))}
        </div>
      </div>

      <div className="roadmap-layer vision-layer" aria-labelledby="vision-title">
        <div className="roadmap-layer-heading">
          <p className="eyebrow">ভবিষ্যৎ শেখার দিক</p>
          <h2 id="vision-title">Vision 2028</h2>
          <p>১০ ভিডিওর পরেও শেখার পথ এখানেই শেষ নয়</p>
          <span className="future-note">
            এগুলো বর্তমান ১০ ভিডিও সিরিজের প্রতিশ্রুতি নয়; দীর্ঘমেয়াদি শেখার সম্ভাব্য দিক।
          </span>
        </div>
        <div className="roadmap-mini-grid">
          {vision2028Cards.map((card, index) => (
            <RoadmapMiniCard key={card.title} card={card} index={index} variant="vision-card" />
          ))}
        </div>
      </div>
    </section>
  );
}
