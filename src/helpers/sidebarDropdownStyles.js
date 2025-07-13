export function getCustomSelectStyles(isDark) {
  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDark ? "#181a1b" : "#f5f5f5",
      borderColor: state.isFocused ? "#f14668" : isDark ? "#444" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #f14668" : "none",
      opacity: state.isDisabled ? (isDark ? 0.7 : 0.8) : 1,
      pointerEvents: state.isDisabled ? "none" : "auto",
      "&:hover": {
        borderColor: state.isDisabled ? (isDark ? "#444" : "#ccc") : "#f14668",
      },
      minHeight: "38px",
      color: isDark ? "white" : "black",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#f14668"
        : isFocused
        ? isDark
          ? "#333"
          : "#dceeff"
        : isDark
        ? "#181a1b"
        : "white",
      color: isSelected ? "white" : isDark ? "#ddd" : "#333",
      padding: "10px 12px",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#f146687a" : "#f146684a",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "white" : "#4a4a4a",
      fontWeight: "500",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDark ? "white" : "#666",
      ":hover": {
        backgroundColor: isDark
          ? "rgba(210, 210, 210, 0.08)"
          : "rgba(210, 210, 210, 0.08)",
        color: isDark ? "white" : "black",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#181a1b" : "white",
      zIndex: 10,
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "white" : "black",
    }),
    input: (base) => ({
      ...base,
      color: isDark ? "white" : "black",
    }),
  };
}
