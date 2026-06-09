import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Roadmap from './components/Roadmap.jsx';
import ReadinessDashboard from './components/ReadinessDashboard.jsx';
import PracticeBriefBuilder from './components/PracticeBriefBuilder.jsx';
import AgentPracticeStudio from './components/AgentPracticeStudio.jsx';
import PortfolioBuilder from './components/PortfolioBuilder.jsx';
import ClientBriefBuilder from './components/ClientBriefBuilder.jsx';
import ResourcesLibrary from './components/ResourcesLibrary.jsx';
import {
  credibilityStats,
  featureCards,
  journeySteps,
  placeholderSections,
} from './data/siteContent.js';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-eyebrow-row">
          <p className="eyebrow">বাংলা অনুশীলন ল্যাব</p>
          <span className="brand-ecosystem">
            টেক টকস বাংলা শেখার ইকোসিস্টেমের অংশ
            <a
              className="brand-ecosystem-link"
              href="https://techtalksbangla.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              টেক টকস বাংলা
            </a>
          </span>
        </div>
        <h1>AI Integrator Bangla Lab</h1>
        <p className="hero-subtitle">ভবিষ্যৎ এআই ইন্টিগ্রেটরদের জন্য বাংলা অনুশীলন ল্যাব</p>
        <p className="hero-positioning">
          ব্যবসা প্রতিষ্ঠানগুলো নতুন এআই মডেল বানাতে চায় না। তারা তাদের বিদ্যমান ওয়েবসাইট,
          ফাইল, গ্রাহক বার্তা, নীতিমালা, পণ্য তালিকা এবং কাজের প্রক্রিয়ার সঙ্গে এআই যুক্ত
          করতে চায়। এই কাজটাই করে একজন এআই ইন্টিগ্রেটর।
        </p>
        <div className="hero-actions" aria-label="প্রধান কাজের লিংক">
          <a className="button button-primary" href="#roadmap">
            শেখা শুরু করুন
          </a>
          <a className="button button-secondary" href="#practice">
            অনুশীলন ব্রিফ তৈরি করুন
          </a>
          <a className="button button-ghost" href="#portfolio">
            পোর্টফোলিও প্রস্তুত করুন
          </a>
        </div>
      </div>
      <aside className="hero-panel" aria-label="শেখার ল্যাবের মূল দিক">
        <span className="panel-kicker">প্রথম সংস্করণ</span>
        <h2>ভিডিও থেকে বাস্তব অনুশীলনে যাওয়ার পথ</h2>
        <p>
          এই ল্যাব শিক্ষার্থীকে শুধু ধারণা শেখায় না; বরং ছোট কাজ, পরিষ্কার ব্রিফ এবং প্রকাশযোগ্য
          প্রজেক্টের দিকে নিয়ে যায়।
        </p>
        <div className="panel-tags">
          <span>কাস্টম জিপিটি</span>
          <span>প্রম্পট</span>
          <span>নলেজ বেস</span>
          <span>পোর্টফোলিও</span>
        </div>
      </aside>
    </section>
  );
}

function CredibilityStrip() {
  return (
    <section className="credibility-strip" aria-label="শেখার কেন্দ্রের পরিসংখ্যান">
      {credibilityStats.map((stat) => (
        <div key={stat} className="stat-card">
          {stat}
        </div>
      ))}
    </section>
  );
}

function Journey() {
  return (
    <section className="section section-light" aria-labelledby="journey-title">
      <div className="section-heading">
        <p className="eyebrow">শিক্ষার্থীর যাত্রা</p>
        <h2 id="journey-title">দেখা থেকে তৈরি করা পর্যন্ত</h2>
        <p>প্রতিটি ধাপ শিক্ষার্থীকে পরবর্তী ব্যবহারিক কাজের জন্য প্রস্তুত করে।</p>
      </div>
      <div className="journey-grid">
        {journeySteps.map((step, index) => (
          <article className="journey-card" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section className="section" aria-labelledby="features-title">
      <div className="section-heading">
        <p className="eyebrow">ল্যাবের মূল অংশ</p>
        <h2 id="features-title">শেখা, অনুশীলন ও পোর্টফোলিওর জন্য এক জায়গা</h2>
      </div>
      <div className="feature-grid">
        {featureCards.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <div className="feature-icon" aria-hidden="true">
              ✦
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlaceholderSections() {
  return (
    <div className="placeholder-wrapper">
      {placeholderSections.map((section) => {
        if (section.id === 'readiness') {
          return <ReadinessDashboard key={section.id} />;
        }

        if (section.id === 'practice') {
          return <PracticeBriefBuilder key={section.id} />;
        }

        if (section.id === 'prompt-builder') {
          return <AgentPracticeStudio key={section.id} />;
        }

        if (section.id === 'portfolio') {
          return <PortfolioBuilder key={section.id} />;
        }

        if (section.id === 'client-brief') {
          return <ClientBriefBuilder key={section.id} />;
        }

        if (section.id === 'resources') {
          return <ResourcesLibrary key={section.id} />;
        }

        return (
          <section className="placeholder-section" id={section.id} key={section.id}>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <span className="coming-soon">পরবর্তী সংস্করণে বিস্তারিত আসছে</span>
          </section>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityStrip />
        <Journey />
        <FeatureSection />
        <Roadmap />
        <PlaceholderSections />
      </main>
      <Footer />
    </>
  );
}
