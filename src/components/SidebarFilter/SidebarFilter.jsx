import { useEffect, useState } from "react";
import classNames from "classnames";

import "./SidebarFilter.css";
import "./SidebarFilter-mobile.css";

import subjectList from "../../data/subjectList.json";

const COURSEWORK = ["IA", "EE", "Exhibition", "Essay"];
const TOK_GROUP = ["Exhibition", "Essay"];

export default function Sidebar({
  selectedCoursework,
  setSelectedCoursework,
  selectedSubject,
  setSelectedSubject,
  selectedLevels,
  setSelectedLevels,
  selectedGrades,
  setSelectedGrades,
  selectedSessionMonths,
  setSelectedSessionMonths,
  selectedSessionYears,
  setSelectedSessionYears,
}) {
  const [subjects, setSubjects] = useState([]);
  const isTokSelected = TOK_GROUP.includes(selectedCoursework);

  const letterGrades = ["A", "B", "C"];
  const numberGrades = ["7", "6", "5", "4"];

  const letterSelected = selectedGrades.some((g) => letterGrades.includes(g));
  const numberSelected = selectedGrades.some((g) => numberGrades.includes(g));

  const disableNumberGrades =
    (selectedCoursework === "" && letterSelected) ||
    (selectedCoursework !== "" && selectedCoursework !== "IA");

  const disableLetterGrades =
    (selectedCoursework === "" && numberSelected) ||
    selectedCoursework === "IA";

  useEffect(() => {
    if (selectedCoursework === "IA") {
      setSelectedGrades((prev) => prev.filter((g) => numberGrades.includes(g)));
    } else if (selectedCoursework !== "" && selectedCoursework !== "IA") {
      setSelectedGrades((prev) => prev.filter((g) => letterGrades.includes(g)));
    }
  }, [selectedCoursework, setSelectedGrades]);

  useEffect(() => {
    if (isTokSelected) {
      setSelectedSubject("");
    }
  }, [isTokSelected, setSelectedSubject]);

  useEffect(() => {
    if (selectedCoursework === "" && selectedLevels.length > 0) {
      setSelectedCoursework("IA");
    }
  }, [selectedCoursework, selectedLevels, setSelectedCoursework]);

  useEffect(() => {
    setSubjects(subjectList.categories || []);
  }, []);

  const sessionMonths = ["May", "November"];
  const sessionYears = Array.from({ length: 11 }, (_, i) => 2025 - i);

  function toggleCheckbox(value, list, setList) {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  const isAFilterSelected =
    selectedCoursework !== "" ||
    selectedSubject !== "" ||
    selectedLevels.length > 0 ||
    selectedGrades.length > 0 ||
    selectedSessionMonths.length > 0 ||
    selectedSessionYears.length > 0;

  return (
    <aside>
      <section aria-labelledby="coursework-heading">
        <h2 id="coursework-heading" className="sidebar-h2">
          Coursework
        </h2>
        <hr className="sidebar-hr" />
        <div
          className="cw-buttons"
          role="group"
          aria-label="Coursework filter buttons"
        >
          {COURSEWORK.slice(0, 2).map((cw) => (
            <button
              key={cw}
              className={classNames("cw-button", {
                selected: selectedCoursework === cw,
              })}
              onClick={() =>
                setSelectedCoursework(selectedCoursework === cw ? "" : cw)
              }
              aria-pressed={selectedCoursework === cw}
              aria-label={`Filter by ${cw}`}
            >
              {cw}
            </button>
          ))}
          <div className="tok-separator">Theory of Knowledge</div>
          {COURSEWORK.slice(2).map((cw) => (
            <button
              key={cw}
              className={classNames("cw-button", {
                selected: selectedCoursework === cw,
              })}
              onClick={() =>
                setSelectedCoursework(selectedCoursework === cw ? "" : cw)
              }
              aria-pressed={selectedCoursework === cw}
              aria-label={`Filter by ${cw}`}
            >
              {cw}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="subject-heading">
        <h2 id="subject-heading" className="sidebar-h2">
          Subject
        </h2>
        <hr className="sidebar-hr" />
        <select
          id="subject-select"
          className="subject-select"
          disabled={isTokSelected}
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          aria-label="Select subject"
        >
          <option value="">-- Select a Subject --</option>
          {subjects.map((group) => (
            <optgroup key={group.group} label={group.group}>
              {group.subjects.map((subj) => (
                <option key={subj.code} value={subj.code}>
                  {subj.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </section>

      <section aria-labelledby="level-heading">
        <h2 id="level-heading" className="sidebar-h2">
          Level
        </h2>
        <hr className="sidebar-hr" />
        <fieldset>
          <div
            className="checkbox-group"
            style={
              selectedCoursework && selectedCoursework !== "IA"
                ? { opacity: 0.8 }
                : {}
            }
          >
            {["Higher Level", "Standard Level"].map((level) => (
              <label key={level} className="checkbox-label">
                <input
                  type="checkbox"
                  disabled={selectedCoursework && selectedCoursework !== "IA"}
                  style={
                    selectedCoursework && selectedCoursework !== "IA"
                      ? { cursor: "not-allowed" }
                      : {}
                  }
                  checked={selectedLevels.includes(level)}
                  onChange={() =>
                    toggleCheckbox(level, selectedLevels, setSelectedLevels)
                  }
                  aria-checked={selectedLevels.includes(level)}
                  aria-label={level}
                />
                {level}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section aria-labelledby="grade-heading">
        <h2 id="grade-heading" className="sidebar-h2">
          Grade
        </h2>
        <hr className="sidebar-hr" />
        <fieldset>
          <div className="checkbox-group">
            {letterGrades.map((opt) => (
              <label key={opt} className="checkbox-label">
                <input
                  type="checkbox"
                  disabled={disableLetterGrades}
                  style={
                    disableLetterGrades
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
                  checked={selectedGrades.includes(opt)}
                  onChange={() =>
                    toggleCheckbox(opt, selectedGrades, setSelectedGrades)
                  }
                  aria-checked={selectedGrades.includes(opt)}
                  aria-label={`Grade ${opt}`}
                />
                {opt}
              </label>
            ))}

            <div className="checkbox-group" style={{ marginTop: "8px" }}>
              {numberGrades.map((opt) => (
                <label key={opt} className="checkbox-label">
                  <input
                    type="checkbox"
                    disabled={disableNumberGrades}
                    style={
                      disableNumberGrades
                        ? { opacity: 0.5, cursor: "not-allowed" }
                        : {}
                    }
                    checked={selectedGrades.includes(opt)}
                    onChange={() =>
                      toggleCheckbox(opt, selectedGrades, setSelectedGrades)
                    }
                    aria-checked={selectedGrades.includes(opt)}
                    aria-label={`Grade ${opt}`}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </fieldset>
      </section>

      <section aria-labelledby="session-heading">
        <h2 id="session-heading" className="sidebar-h2">
          Session
        </h2>
        <hr className="sidebar-hr" />

        <fieldset>
          <legend className="series-separator">Series</legend>
          <div className="checkbox-group">
            {sessionMonths.map((month) => (
              <label key={month} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedSessionMonths.includes(month)}
                  onChange={() =>
                    toggleCheckbox(
                      month,
                      selectedSessionMonths,
                      setSelectedSessionMonths
                    )
                  }
                  aria-checked={selectedSessionMonths.includes(month)}
                  aria-label={`Session month ${month}`}
                />
                {month}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ marginTop: "1rem" }}>
          <legend className="year-separator">Year</legend>
          <div className="checkbox-group">
            {sessionYears.map((year) => (
              <label key={year} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedSessionYears.includes(year)}
                  onChange={() =>
                    toggleCheckbox(
                      year,
                      selectedSessionYears,
                      setSelectedSessionYears
                    )
                  }
                  aria-checked={selectedSessionYears.includes(year)}
                  aria-label={`Session year ${year}`}
                />
                {year}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <div className="clear-filters-container">
        <button
          className="clear-filters-button"
          style={
            !isAFilterSelected
              ? {
                  opacity: 0.5,
                  pointerEvents: "none",
                  border: "1.5px dashed #f14668",
                }
              : {}
          }
          disabled={!isAFilterSelected}
          onClick={() => {
            setSelectedCoursework("");
            setSelectedSubject("");
            setSelectedLevels([]);
            setSelectedGrades([]);
            setSelectedSessionMonths([]);
            setSelectedSessionYears([]);
          }}
          aria-label="Clear all selected filters"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
