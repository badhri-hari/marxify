import { filterCoursework } from "../../helpers/courseworkComponents";

import Card from "./Cards";

import sampleData from "../../data/courseworkFiles.json";

import "./CourseworkCards.css";
import "./CourseworkCards-mobile.css";

export default function CourseworkCards(props) {
  const filteredData = filterCoursework(sampleData, props);

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
        <Card key={item.id} {...item} />
      ))}
    </main>
  );
}
