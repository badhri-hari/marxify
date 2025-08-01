import { useState, useEffect } from "react";
import { FaTh } from "react-icons/fa";
import { PiListLight } from "react-icons/pi";

import Header from "../Header/Header";
import SidebarFilter from "../SidebarFilter/SidebarFilter";
import CourseworkCards from "../CourseworkCards/CourseworkCards";
import CourseworkTable from "../CourseworkTable/CourseworkTable";
import Footer from "../Footer/Footer";

import "./App.css";
import "./App-dark-mode.css";

export default function App() {
  const [selectedCoursework, setSelectedCoursework] = useState("");
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSessionMonths, setSelectedSessionMonths] = useState([]);
  const [selectedSessionYears, setSelectedSessionYears] = useState([]);

  const [sortOption, setSortOption] = useState("default");

  const [viewMode, setViewMode] = useState(() => {
    const stored = localStorage.getItem("viewMode");
    return stored === "card" || stored === "row" ? stored : "card";
  });

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <>
      <Header />

      <div className="app-container">
        <SidebarFilter
          selectedCoursework={selectedCoursework}
          setSelectedCoursework={setSelectedCoursework}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
          selectedGrades={selectedGrades}
          setSelectedGrades={setSelectedGrades}
          selectedSessionMonths={selectedSessionMonths}
          setSelectedSessionMonths={setSelectedSessionMonths}
          selectedSessionYears={selectedSessionYears}
          setSelectedSessionYears={setSelectedSessionYears}
        />

        <div className="coursework-elements-container">
          <div className="button-container">
            <select
              className="sort-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              title="Sort coursework"
              aria-label="Sort coursework"
            >
              <option value="default">Default</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="marks">Marks</option>
            </select>

            <div className="toggle-container">
              <button
                className={`icon-toggle ${
                  viewMode === "card" ? "selected" : ""
                }`}
                onClick={() => setViewMode("card")}
                aria-label="Card view"
                title="Card view"
              >
                <FaTh size={18} className="icon-toggle-icon" />
              </button>
              <button
                className={`icon-toggle ${
                  viewMode === "row" ? "selected" : ""
                }`}
                onClick={() => setViewMode("row")}
                aria-label="Table view"
                title="Table view"
              >
                <PiListLight size={18} className="icon-toggle-icon" />
              </button>
            </div>
          </div>

          {viewMode === "card" ? (
            <CourseworkCards
              selectedCoursework={selectedCoursework}
              selectedSubject={selectedSubject}
              selectedLevels={selectedLevels}
              selectedGrades={selectedGrades}
              selectedSessionMonths={selectedSessionMonths}
              selectedSessionYears={selectedSessionYears}
              sortOption={sortOption}
            />
          ) : (
            <CourseworkTable
              selectedCoursework={selectedCoursework}
              selectedSubject={selectedSubject}
              selectedLevels={selectedLevels}
              selectedGrades={selectedGrades}
              selectedSessionMonths={selectedSessionMonths}
              selectedSessionYears={selectedSessionYears}
              sortOption={sortOption}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
