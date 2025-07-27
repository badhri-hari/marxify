import { useEffect, useState } from "react";
import sampleData from "../../data/courseworkFiles.json";

import "./CourseworkTable.css";
import "./CourseworkTable-mobile.css";

import {
  parseTags,
  filterCoursework,
} from "../../helpers/courseworkComponents";

function sortCoursework(data, sortOption) {
  if (sortOption === "latest" || sortOption === "oldest") {
    return [...data].sort((a, b) => {
      const { month: ma, year: ya } = parseTags(a.tags);
      const { month: mb, year: yb } = parseTags(b.tags);

      const monthMap = { May: 5, November: 11 };
      const dateA = new Date(Number(ya), monthMap[ma] || 0);
      const dateB = new Date(Number(yb), monthMap[mb] || 0);

      return sortOption === "latest" ? dateB - dateA : dateA - dateB;
    });
  }

  if (sortOption === "marks") {
    return [...data].sort((a, b) => b.rawMark - a.rawMark);
  }

  return data;
}

export default function CourseworkTable({
  selectedCoursework,
  selectedSubject,
  selectedLevels,
  selectedGrades,
  selectedSessionMonths,
  selectedSessionYears,
  sortOption,
}) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredData = filterCoursework(sampleData, {
    selectedCoursework,
    selectedSubject,
    selectedLevels,
    selectedGrades,
    selectedSessionMonths,
    selectedSessionYears,
  });

  const sortedData = sortCoursework(filteredData, sortOption);

  return (
    <div
      className="coursework-table-wrapper"
      role="region"
      aria-label="Coursework results"
    >
      {sortedData.length === 0 ? (
        <p role="status" className="no-results">
          No coursework matches the selected filters.
        </p>
      ) : (
        <table className="coursework-table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Subject</th>
              <th scope="col">Type</th>
              <th scope="col">Session</th>
              <th scope="col">Score</th>
              {width > 900 && <th scope="col">Mark</th>}
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(
              ({ id, title, tags, comment, rawMark, score, link }) => {
                const { subject, type, month, year } = parseTags(tags);
                const session = month && year ? `${month} ${year}` : "";

                return (
                  <tr key={id} className="table-row">
                    <td className="table-title-td" aria-label={title}>
                      <a
                        href={link}
                        className="table-title-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {title}
                      </a>
                    </td>
                    <td className="table-subject-td" aria-label={subject}>
                      <span>{subject}</span>
                    </td>
                    <td className="table-type-td" aria-label={type}>
                      <span>{type}</span>
                    </td>
                    <td className="table-session-td" aria-label={session || ""}>
                      {session || <span aria-hidden="true">—</span>}
                    </td>
                    <td className="table-score-td">{score}</td>
                    {width > 900 && (
                      <td className="table-mark-td" aria-hidden>
                        {rawMark != null ? (
                          rawMark
                        ) : (
                          <span aria-hidden="true">—</span>
                        )}
                      </td>
                    )}
                    <td className="table-comment-td">
                      {comment ? (
                        <span aria-label={comment}>{comment}</span>
                      ) : (
                        <span aria-hidden="true">—</span>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
