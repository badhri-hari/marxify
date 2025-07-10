import { useEffect, useState } from "react";
import sampleData from "../../data/courseworkFiles.json";

import "./CourseworkTable.css";
import "./CourseworkTable-mobile.css";

import { parseTags, filterCoursework } from "../../helpers/courseworkComponents";

export default function CourseworkTable({
  selectedCoursework,
  selectedSubject,
  selectedLevels,
  selectedGrades,
  selectedSessionMonths,
  selectedSessionYears,
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

  return (
    <div
      className="coursework-table-wrapper"
      role="region"
      aria-label="Coursework results"
    >
      {filteredData.length === 0 ? (
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
            {filteredData.map(
              ({ id, title, tags, comment, rawMark, score, link }) => {
                const { subject, type, month, year } = parseTags(tags);
                const session = month && year ? `${month} ${year}` : "";

                return (
                  <tr key={id} className="table-row">
                    <td className="table-title-td">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {title}
                      </a>
                    </td>
                    <td className="table-subject-td">
                      <span>{subject}</span>
                    </td>
                    <td className="table-type-td">
                      <span>{type}</span>
                    </td>
                    <td className="table-session-td">
                      {session || <span aria-hidden="true">—</span>}
                    </td>
                    <td className="table-score-td">{score}</td>
                    {width > 900 && (
                      <td className="table-mark-td">{rawMark}</td>
                    )}
                    <td className="table-comment-td">
                      {comment ? (
                        <span>{comment}</span>
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
