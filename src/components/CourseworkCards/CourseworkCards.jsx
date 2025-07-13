import {
  filterCoursework,
  parseTags,
} from "../../helpers/courseworkComponents";

import Card from "./Cards";
import sampleData from "../../data/courseworkFiles.json";

import "./CourseworkCards.css";
import "./CourseworkCards-mobile.css";

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

export default function CourseworkCards(props) {
  const { sortOption, ...filterProps } = props;

  const filteredData = filterCoursework(sampleData, filterProps);
  const sortedData = sortCoursework(filteredData, sortOption);

  if (sortedData.length === 0) {
    return (
      <p role="status" className="no-results">
        No coursework matches the selected filters.
      </p>
    );
  }

  return (
    <main>
      {sortedData.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </main>
  );
}
