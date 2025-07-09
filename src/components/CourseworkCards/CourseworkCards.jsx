import { FaRegComment } from "react-icons/fa";

import "./CourseworkCards.css";

import sampleData from "../../data/courseworkFiles.json";

import { filterCoursework } from "../../helpers/helpers";

export default function CourseworkCards({
  selectedCoursework,
  selectedSubject,
  selectedLevels,
  selectedGrades,
  selectedSessionMonths,
  selectedSessionYears,
}) {
  const filteredData = filterCoursework(sampleData, {
    selectedCoursework,
    selectedSubject,
    selectedLevels,
    selectedGrades,
    selectedSessionMonths,
    selectedSessionYears,
  });

  return (
    <main>
      {filteredData.length === 0 ? (
        <p role="status" className="no-results">
          No coursework matches the selected filters.
        </p>
      ) : (
        filteredData.map(
          ({ id, title, tags, comment, rawMark, score, link }) => (
            <article
              key={id}
              className="card"
              aria-labelledby={`title-${id}`}
              tabIndex={0}
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open ${title} as a PDF file in a new tab"
              >
                <div className="overlay-info">
                  <div
                    className="mark-score-badge"
                    aria-label={`Raw mark: ${rawMark}, Score: ${score}`}
                  >
                    <div>
                      {score} <span>| {rawMark}</span>
                    </div>
                  </div>

                  {comment && (
                    <div className="card-icons">
                      <FaRegComment
                        className="icon"
                        tabIndex={0}
                        title={comment}
                        aria-label={comment}
                      />
                    </div>
                  )}
                </div>

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
                        aria-label={
                          isExamSession ? `${tag} exam session` : undefined
                        }
                        aria-hidden={!isExamSession}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </a>
            </article>
          )
        )
      )}
    </main>
  );
}
