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

  useEffect(() => {
    const checkAlignment = () => {
      if (!commentRef.current || !wrapperRef.current) return;
      const popupRect = commentRef.current.getBoundingClientRect();
      const cardRect = wrapperRef.current.getBoundingClientRect();

      const spaceRight = window.innerWidth - cardRect.right;
      const popupWidth = popupRect.width || 250;

      if (spaceRight < popupWidth + 20) {
        setAlignLeft(true);
      } else {
        setAlignLeft(false);
      }
    };

    checkAlignment();
    window.addEventListener("resize", checkAlignment);
    return () => window.removeEventListener("resize", checkAlignment);
  }, []);

  return (
    <article key={id} className="card">
      <div className="overlay-info">
        <div
          className="mark-score-badge"
          aria-label={`Raw mark: ${rawMark}, Score: ${score}`}
        >
          {score}
          &nbsp;
          {"\u2027"}
          &nbsp;
          <span>{rawMark}</span>
        </div>

        {comment && (
          <div
            className="comment-wrapper"
            ref={wrapperRef}
            style={{ position: "relative" }}
          >
            <FaRegComment className="icon" aria-label={comment} />
            <div
              className={`comment-popup ${alignLeft ? "left" : "right"}`}
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
