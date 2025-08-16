import { useRef, useState, useEffect } from "preact/hooks";
import { FaRegComment } from "react-icons/fa";

export default function Cards({
  id,
  title,
  tags,
  comment,
  rawMark,
  score,
  link,
}) {
  const commentPopupRef = useRef(null);
  const commentIconRef = useRef(null);
  const ibPopupRef = useRef(null);
  const ibIconRef = useRef(null);
  const crapifyPopupRef = useRef(null);
  const crapifyIconRef = useRef(null);

  const [alignLeft, setAlignLeft] = useState(false);
  const [showBelow, setShowBelow] = useState(false);
  const [ibAlignLeft, setIbAlignLeft] = useState(false);
  const [ibShowBelow, setIbShowBelow] = useState(false);
  const [crapifyAlignLeft, setCrapifyAlignLeft] = useState(false);
  const [crapifyShowBelow, setCrapifyShowBelow] = useState(false);
  const [ibHover, setIbHover] = useState(false);
  const [crapifyHover, setCrapifyHover] = useState(false);
  const [commentHover, setCommentHover] = useState(false);

  const hasIBTag = tags.some((tag) => tag.trim() === "IB Exemplar");
  const hasCrapifyTag = tags.some((tag) => tag.trim() === "Crapify");

  const updateCommentPosition = () => {
    if (!commentPopupRef.current || !commentIconRef.current) return;

    const popupRect = commentPopupRef.current.getBoundingClientRect();
    const iconRect = commentIconRef.current.getBoundingClientRect();

    const spaceRight = window.innerWidth - iconRect.right;
    const popupWidth = popupRect.width || 250;
    setAlignLeft(spaceRight < popupWidth + 20);

    const popupHeight = popupRect.height || 100;
    const spaceAbove = iconRect.top;
    const spaceBelow = window.innerHeight - iconRect.bottom;
    setShowBelow(
      spaceAbove < popupHeight + 20 && spaceBelow >= popupHeight + 20
    );
  };

  const updateIBPosition = () => {
    if (!ibPopupRef.current || !ibIconRef.current) return;

    const popupRect = ibPopupRef.current.getBoundingClientRect();
    const iconRect = ibIconRef.current.getBoundingClientRect();

    const spaceRight = window.innerWidth - iconRect.right;
    const popupWidth = popupRect.width || 250;
    setIbAlignLeft(spaceRight < popupWidth + 20);

    const popupHeight = popupRect.height || 100;
    const spaceAbove = iconRect.top;
    const spaceBelow = window.innerHeight - iconRect.bottom;
    setIbShowBelow(
      spaceAbove < popupHeight + 20 && spaceBelow >= popupHeight + 20
    );
  };

  const updateCrapifyPosition = () => {
    if (!crapifyPopupRef.current || !crapifyIconRef.current) return;

    const popupRect = crapifyPopupRef.current.getBoundingClientRect();
    const iconRect = crapifyIconRef.current.getBoundingClientRect();

    const spaceRight = window.innerWidth - iconRect.right;
    const popupWidth = popupRect.width || 250;
    setCrapifyAlignLeft(spaceRight < popupWidth + 20);

    const popupHeight = popupRect.height || 100;
    const spaceAbove = iconRect.top;
    const spaceBelow = window.innerHeight - iconRect.bottom;
    setCrapifyShowBelow(
      spaceAbove < popupHeight + 20 && spaceBelow >= popupHeight + 20
    );
  };

  useEffect(() => {
    const updatePositions = () => {
      requestAnimationFrame(() => {
        updateCommentPosition();
        updateIBPosition();
        updateCrapifyPosition();
      });
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, []);

  return (
    <article key={id} className="card">
      <div className="overlay-info">
        <div
          className="mark-score-badge"
          aria-label={
            rawMark != null
              ? `Raw mark: ${rawMark}, Score: ${score}`
              : `Score: ${score}`
          }
        >
          {score}
          {rawMark != null && (
            <>
              &nbsp;
              {"\u2027"}
              &nbsp;
              <span>{rawMark}</span>
            </>
          )}
        </div>

        <div className="comment-wrapper" style={{ position: "relative" }}>
          {hasIBTag && (
            <div
              onMouseEnter={() => {
                setIbHover(true);
                updateIBPosition();
              }}
              onMouseLeave={() => setIbHover(false)}
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src="/ib.png"
                alt="IB Logo"
                className="icon ib-icon"
                ref={ibIconRef}
              />
              <div
                ref={ibPopupRef}
                className={`comment-popup ib-popup ${
                  ibAlignLeft ? "left" : "right"
                } ${ibShowBelow ? "below" : "above"}`}
                style={{
                  visibility: ibHover ? "visible" : "hidden",
                  pointerEvents: ibHover ? "auto" : "none",
                }}
                aria-label="This is a graded exemplar provided by the IB."
              >
                This is a graded exemplar provided by the IB.
              </div>
            </div>
          )}

          {hasCrapifyTag && (
            <div
              onMouseEnter={() => {
                setCrapifyHover(true);
                updateCrapifyPosition();
              }}
              onMouseLeave={() => setCrapifyHover(false)}
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src="/crapify.png"
                alt="Crapify Logo"
                className="icon crapify-icon"
                ref={crapifyIconRef}
              />
              <div
                ref={crapifyPopupRef}
                className={`comment-popup crapify-popup ${
                  crapifyAlignLeft ? "left" : "right"
                } ${crapifyShowBelow ? "below" : "above"}`}
                style={{
                  visibility: crapifyHover ? "visible" : "hidden",
                  pointerEvents: crapifyHover ? "auto" : "none",
                }}
                aria-label="Liberated from Crapify."
              >
                Liberated from Crapify.
              </div>
            </div>
          )}

          {comment && (
            <div
              onMouseEnter={() => {
                setCommentHover(true);
                updateCommentPosition();
              }}
              onMouseLeave={() => setCommentHover(false)}
              style={{ position: "relative", display: "inline-block" }}
            >
              <span ref={commentIconRef} style={{ display: "inline-block" }}>
                <FaRegComment className="icon" aria-label={comment} />
              </span>
              <div
                aria-hidden
                ref={commentPopupRef}
                className={`comment-popup ${alignLeft ? "left" : "right"} ${
                  showBelow ? "below" : "above"
                }`}
                style={{
                  visibility: commentHover ? "visible" : "hidden",
                  pointerEvents: commentHover ? "auto" : "none",
                }}
              >
                {comment}
              </div>
            </div>
          )}
        </div>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link"
      >
        <h3 className="card-title" title={title} aria-label={title}>
          {title}
        </h3>
        <div className="card-tags" aria-hidden>
          {tags
            .filter(
              (tag) => tag.trim() !== "IB Exemplar" && tag.trim() !== "Crapify"
            )
            .map((tag, idx) => (
              <span key={idx} className="tag">
                {tag}
              </span>
            ))}
        </div>
      </a>
    </article>
  );
}
