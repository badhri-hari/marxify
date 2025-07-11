import { useState, useEffect, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <article
      key={id}
      className="card"
      style={isOpen ? { zIndex: 100000, position: "relative" } : {}}
    >
      <div className="overlay-info">
        <div
          className="mark-score-badge"
          aria-label={`Raw mark: ${rawMark}, Score: ${score}`}
        >
          {score} <span>| {rawMark}</span>
        </div>

        {comment && (
          <div
            className="comment-wrapper"
            ref={wrapperRef}
            style={{ position: "relative" }}
          >
            <FaRegComment
              className="icon"
              aria-label={comment}
              tabIndex={0}
              title={comment}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((open) => !open);
              }}
            />
            {isOpen && (
              <div className="comment-popup" aria-hidden>
                {comment}
              </div>
            )}
          </div>
        )}
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} as a PDF file in a new tab`}
        className="card-link"
      >
        <h3 id={`title-${id}`} className="card-title" title={title}>
          {title}
        </h3>

        <div className="card-tags">
          {tags.map((tag, idx) => {
            const isExamSession = /^(May|Nov)\s\d{4}$/.test(tag);
            return (
              <span
                key={idx}
                className="tag"
                aria-label={isExamSession ? `${tag} exam session` : undefined}
                aria-hidden={!isExamSession}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </a>
    </article>
  );
}
