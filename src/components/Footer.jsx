export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>AI Integrator Bangla Lab</strong>
        <p>বাংলা ভাষাভাষী শিক্ষার্থীদের জন্য নিরাপদ, ব্যবহারিক ও পোর্টফোলিওভিত্তিক শেখার জায়গা।</p>
      </div>
      <div className="footer-meta">
        <p className="creator-credit">Built by Enamul Haque</p>
        <nav className="footer-links" aria-label="Creator links">
          <a href="https://www.linkedin.com/in/haquenam/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/haquenam" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
        <p className="footer-note">No login · No backend · No API keys · Public learning only</p>
      </div>
    </footer>
  );
}
