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
            alt="Stylized black-and-white image of Karl Marx"
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
        Would you like to donate your IB coursework and contribute to Marxify?{" "}
        <span>
          <a
            href="https://upload-to.marxify.pirateib.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link"
            aria-label="Click on this link to go to the Marxify coursework uploader page"
          >
            Click here!
          </a>
        </span>
      </p>
    </header>
  );
}
