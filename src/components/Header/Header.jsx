import "./Header.css";
import "./Header-mobile.css";

export default function Header() {
  return (
    <header>
      <div className="image-container">
        <a
          href="https://pirateib.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
          aria-label="Visit pirateib dot xyz for more IB resources"
        >
          <img
            src="/karl.svg"
            style={{ height: "140px" }}
            alt="Stylized image of Karl Marx"
          />

          <img
            src="/logo.png"
            style={{ height: "130px", borderRadius: "100%" }}
            alt="PirateIB logo"
          />
        </a>
      </div>

      <h1 className="header-h1">
        <strong className="header-strong">Marxify</strong> – because excellent
        IB coursework should be free.
      </h1>

      <h2 className="header-h2">PirateIB Exemplars Repository</h2>

      <hr className="header-hr" />

      <p className="header-paragraph">
        If you would like to donate your IB coursework and contribute to
        Marxify, please email us at{" "}
        <a
          href="mailto:pirateib.qfz17@aleeas.com"
          className="header-link"
          aria-label="Email PirateIB at pirateib.qfz17 at aleeas dot com to donate your IB coursework"
        >
          pirateib.qfz17@aleeas.com
        </a>
      </p>
    </header>
  );
}
