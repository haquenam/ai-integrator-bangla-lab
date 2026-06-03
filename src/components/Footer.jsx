export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>AI Integrator Bangla Lab</strong>
        <p>বাংলা ভাষাভাষী শিক্ষার্থীদের জন্য নিরাপদ, ব্যবহারিক ও পোর্টফোলিওভিত্তিক শেখার জায়গা।</p>
      </div>
      <div className="footer-meta">
        <p className="creator-credit">Built by Enamul Haque</p>
        <nav className="footer-links" aria-label="নির্মাতার লিংক">
          <a href="https://www.linkedin.com/in/haquenam/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/haquenam" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
        <p className="footer-note">লগইন নেই। ব্যাকএন্ড নেই। এপিআই কী নেই। শুধু নিরাপদ পাবলিক শেখার জন্য।</p>
      </div>
    </footer>
  );
}
