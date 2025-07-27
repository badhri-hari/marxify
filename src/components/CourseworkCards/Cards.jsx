import { useRef, useState, useEffect } from "react";
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
  const commentRef = useRef(null);
  const wrapperRef = useRef(null);
  const [alignLeft, setAlignLeft] = useState(false);
  const [showBelow, setShowBelow] = useState(false);

  useEffect(() => {
    const checkAlignment = () => {
      if (!commentRef.current || !wrapperRef.current) return;

      const popupRect = commentRef.current.getBoundingClientRect();
      const cardRect = wrapperRef.current.getBoundingClientRect();

      const spaceRight = window.innerWidth - cardRect.right;
      const popupWidth = popupRect.width || 250;
      setAlignLeft(spaceRight < popupWidth + 20);

      const popupHeight = popupRect.height || 100;
      const spaceAbove = cardRect.top;
      const spaceBelow = window.innerHeight - cardRect.bottom;
      setShowBelow(
        spaceAbove < popupHeight + 20 && spaceBelow >= popupHeight + 20
      );
    };

    checkAlignment();
    window.addEventListener("resize", checkAlignment);
    window.addEventListener("scroll", checkAlignment, { passive: true });

    return () => {
      window.removeEventListener("resize", checkAlignment);
      window.removeEventListener("scroll", checkAlignment);
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

        {comment && (
          <div
            className="comment-wrapper"
            ref={wrapperRef}
            style={{ position: "relative" }}
          >
            <FaRegComment className="icon" aria-label={comment} />
            <div
              className={`comment-popup
       ${alignLeft ? "left" : "right"}
       ${showBelow ? "below" : "above"}`}
              ref={commentRef}
              aria-hidden
            >
              {comment}
            </div>
          </div>
        )}
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
          {tags.map((tag, idx) => {
            return (
              <span key={idx} className="tag">
                {tag}
              </span>
            );
          })}
        </div>
      </a>
    </article>
  );
}
