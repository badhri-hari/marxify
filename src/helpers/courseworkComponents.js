export function parseTags(tags) {
  const t = [...tags];
  const sessionIdx = t.findIndex((tag) => /^(May|November)\s\d{4}$/.test(tag));
  let session = "";
  if (sessionIdx > -1) {
    session = t.splice(sessionIdx, 1)[0];
  }

  const subject = t.shift() || "";

  let type = "";
  const iaIdx = t.indexOf("IA");
  if (iaIdx > -1) {
    const lvl = t.find((x) => x === "HL" || x === "SL");
    type = lvl ? `IA (${lvl})` : "IA";
    if (lvl) t.splice(t.indexOf(lvl), 1);
  } else {
    type = t.shift() || "";
  }

  const [month = "", year = ""] = session.split(" ");
  return { subject, type, month, year };
}

export function filterCoursework(
  data,
  {
    selectedCoursework,
    selectedSubject,
    selectedLevels,
    selectedGrades,
    selectedSessionMonths,
    selectedSessionYears,
  }
) {
  return data.filter((item) => {
    const { subject, type, month, year } = parseTags(item.tags);

    if (selectedCoursework) {
      const [baseType] = type.split(" ");

      if (
        baseType !== selectedCoursework &&
        !(
          ["Exhibition", "Essay"].includes(selectedCoursework) &&
          item.tags.includes("Presentation")
        )
      ) {
        return false;
      }
    }

    if (
      selectedSubject.length > 0 &&
      !selectedSubject.some(
        (s) => s.value.trim().toLowerCase() === subject.trim().toLowerCase()
      )
    ) {
      return false;
    }

    if (selectedLevels.length > 0 && type.startsWith("IA")) {
      const levelInType = type.includes("(SL)")
        ? "Standard Level"
        : type.includes("(HL)")
        ? "Higher Level"
        : "";

      if (!selectedLevels.includes(levelInType)) {
        return false;
      }
    }

    if (
      selectedGrades.length > 0 &&
      !selectedGrades.includes(String(item.score))
    ) {
      return false;
    }

    if (
      selectedSessionMonths.length > 0 &&
      !selectedSessionMonths.includes(month)
    ) {
      return false;
    }

    if (
      selectedSessionYears.length > 0 &&
      !selectedSessionYears.includes(Number(year))
    ) {
      return false;
    }

    return true;
  });
}
