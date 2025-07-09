import { useState, useEffect } from "react";
import { FaTh } from "react-icons/fa";
import { PiListLight } from "react-icons/pi";

import Header from "../components/Header/Header";
import SidebarFilter from "../components/SidebarFilter/SidebarFilter";
import CourseworkCards from "../components/CourseworkCards/CourseworkCards";
import CourseworkTable from "../components/CourseworkTable/CourseworkTable";
import Footer from "../components/Footer/Footer";

import "./App.css";
import "./App-dark-mode.css";

export default function App() {
  const [selectedCoursework, setSelectedCoursework] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSessionMonths, setSelectedSessionMonths] = useState([]);
  const [selectedSessionYears, setSelectedSessionYears] = useState([]);
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
            <div className="toggle-container">
              <button
                className={`icon-toggle ${
                  viewMode === "card" ? "selected" : ""
                }`}
                onClick={() => setViewMode("card")}
                aria-label="Card view"
              >
                <FaTh size={18} className="icon-toggle-icon" />
              </button>
              <button
                className={`icon-toggle ${
                  viewMode === "row" ? "selected" : ""
                }`}
                onClick={() => setViewMode("row")}
                aria-label="Row view"
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
            />
          ) : (
            <CourseworkTable
              selectedCoursework={selectedCoursework}
              selectedSubject={selectedSubject}
              selectedLevels={selectedLevels}
              selectedGrades={selectedGrades}
              selectedSessionMonths={selectedSessionMonths}
              selectedSessionYears={selectedSessionYears}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
