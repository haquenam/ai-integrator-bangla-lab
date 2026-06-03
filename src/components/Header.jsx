import { navigationItems } from '../data/siteContent.js';

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="AI Integrator Bangla Lab হোম">
        <span className="brand-mark">AI</span>
        <span>
          <strong>AI Integrator</strong>
          <small>Bangla Lab</small>
        </span>
      </a>
      <nav className="site-nav" aria-label="প্রধান নেভিগেশন">
        {navigationItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
