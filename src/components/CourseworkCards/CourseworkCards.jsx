import { useState } from "react";

import { filterCoursework } from "../../helpers/courseworkComponents";

import Card from "./Cards";

import sampleData from "../../data/courseworkFiles.json";

import "./CourseworkCards.css";

export default function CourseworkCards(props) {
  const filteredData = filterCoursework(sampleData, props);
  const [visibleCommentId, setVisibleCommentId] = useState(null);

  if (filteredData.length === 0) {
    return (
      <p role="status" className="no-results">
        No coursework matches the selected filters.
      </p>
    );
  }

  return (
    <main>
      {filteredData.map((item) => (
        <Card
          key={item.id}
          {...item}
          isOpen={visibleCommentId === item.id}
          onToggle={() =>
            setVisibleCommentId((cur) => (cur === item.id ? null : item.id))
          }
          onClose={() => setVisibleCommentId(null)}
        />
      ))}
    </main>
  );
}
