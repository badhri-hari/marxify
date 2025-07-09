import "./Footer.css";
import "./Footer-mobile.css";

export default function Footer() {
  return (
    <footer>
      Originally compiled by IB Documents (1) Team · Recovered thanks to{" "}
      <a
        href="https://archive.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        Internet Archive
      </a>{" "}
      · Provided by{" "}
      <a
        href="https://pirateib.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
        aria-label="Visit pirateib dot xyz for more IB resources"
      >
        pirateIB
      </a>
    </footer>
  );
}
