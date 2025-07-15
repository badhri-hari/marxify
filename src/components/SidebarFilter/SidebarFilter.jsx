import { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import classNames from "classnames";

import "./SidebarFilter.css";
import "./SidebarFilter-mobile.css";

import courseworkFiles from "../../data/courseworkFiles.json";
import subjectList from "../../data/subjectList.json";

import useDarkMode from "./../../hooks/useDarkMode";
import getCustomSelectStyles from "../../helpers/sidebarDropdown";

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

  const isDarkMode = useDarkMode();

  const letterGrades = useMemo(() => ["A", "B", "C"], []);
  const numberGrades = useMemo(() => ["7", "6", "5", "4"], []);

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
  }, [letterGrades, numberGrades, selectedCoursework, setSelectedGrades]);

  useEffect(() => {
    if (!selectedCoursework || selectedSubject.length === 0) return;

    const validSubjects = new Set(
      courseworkFiles
        .filter(({ tags = [] }) => tags[1] === selectedCoursework)
        .map(({ tags = [] }) => tags[0])
    );

    const filtered = selectedSubject.filter((s) => validSubjects.has(s.value));

    if (filtered.length !== selectedSubject.length) {
      setSelectedSubject(filtered);
    }
  }, [selectedCoursework, selectedSubject, setSelectedSubject]);

  useEffect(() => {
    if (selectedCoursework === "" && selectedLevels.length > 0) {
      setSelectedCoursework("IA");
    }
  }, [selectedCoursework, selectedLevels, setSelectedCoursework]);

  const sessionMonths = ["May", "November"];
  const sessionYears = Array.from({ length: 11 }, (_, i) => 2025 - i);

  function getFilteredSubjectList(selectedCoursework) {
    const usedSubjects = new Set();

    courseworkFiles.forEach((entry) => {
      const tags = entry.tags || [];
      const subjectTag = tags[0];
      const cwTag = tags[1];

      if (!subjectTag || !cwTag) return;

      if (selectedCoursework === "" || cwTag === selectedCoursework) {
        usedSubjects.add(subjectTag);
      }
    });

    const filteredGroups = [];

    subjectList.categories.forEach((category) => {
      const filteredSubjects = category.subjects.filter((subject) =>
        usedSubjects.has(subject.name)
      );

      if (filteredSubjects.length > 0) {
        filteredGroups.push({
          group: category.group,
          subjects: filteredSubjects,
        });
      }
    });

    return {
      categories: filteredGroups,
    };
  }

  useEffect(() => {
    const filtered = getFilteredSubjectList(selectedCoursework);
    setSubjects(filtered.categories || []);
  }, [selectedCoursework]);

  function toggleCheckbox(value, list, setList) {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  const isAFilterSelected =
    selectedCoursework !== "" ||
    selectedSubject.length > 0 ||
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

        <Select
          isMulti
          closeMenuOnSelect={false}
          isDisabled={isTokSelected}
          value={selectedSubject}
          onChange={(selected) => setSelectedSubject(selected || [])}
          options={subjects.map((group) => ({
            label: group.group,
            options: group.subjects.map((subj) => ({
              value: subj.name,
              label: subj.name,
            })),
          }))}
          formatGroupLabel={(group) => {
            const groupValues = group.options.map((opt) => opt.value);
            const selectedValues = selectedSubject.map((s) => s.value);
            const allSelected = groupValues.every((v) =>
              selectedValues.includes(v)
            );

            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  let updated;

                  if (allSelected) {
                    updated = selectedSubject.filter(
                      (s) => !groupValues.includes(s.value)
                    );
                  } else {
                    const newOptions = group.options.filter(
                      (opt) => !selectedValues.includes(opt.value)
                    );
                    updated = [...selectedSubject, ...newOptions];
                  }

                  setSelectedSubject(updated);
                }}
                style={{
                  cursor: "pointer",
                  padding: "4px 8px",
                  color: isDarkMode ? "white" : "black",
                  fontSize: "12px",
                }}
                title={allSelected ? "Deselect all" : "Select all"}
              >
                {group.label}
              </div>
            );
          }}
          className="subject-select-container"
          classNamePrefix="react-select"
          styles={getCustomSelectStyles(isDarkMode)}
          menuPortalTarget={document.body}
          menuPosition="absolute"
          menuPlacement="auto"
          placeholder="Select subjects..."
          aria-label="Select subjects"
        />
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

        <fieldset style={{ marginTop: "0.8rem" }}>
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
            setSelectedSubject([]);
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
