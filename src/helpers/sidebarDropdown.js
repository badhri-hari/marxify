export default function getCustomSelectStyles(isDark) {
  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDark ? "#242526" : "#f5f5f5",
      borderColor: state.isFocused ? "#f14668" : isDark ? "#444" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #f14668" : "none",
      opacity: state.isDisabled ? (isDark ? 0.7 : 0.8) : 1,
      pointerEvents: state.isDisabled ? "none" : "auto",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      "&:hover": {
        borderColor: state.isDisabled
          ? isDark
            ? "#444"
            : "#ccc"
          : "#f1466890",
      },
      minHeight: "38px",
      color: isDark ? "white" : "black",
      fontSize: "14px",
      zIndex: 2500000,
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
        ? "#242526"
        : "white",
      color: isSelected ? "white" : isDark ? "#ddd" : "#333",
      padding: "8px 10px",
      cursor: "pointer",
      fontSize: "12px",
      zIndex: 2500000,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#f146687a" : "#f146684a",
      fontSize: "11px",
      zIndex: 2500000,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "white" : "#4a4a4a",
      fontWeight: "500",
      fontSize: "11px",
      zIndex: 2500000,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDark ? "white" : "#666",
      fontSize: "11px",
      ":hover": {
        backgroundColor: isDark
          ? "rgba(210, 210, 210, 0.08)"
          : "rgba(210, 210, 210, 0.08)",
        color: isDark ? "white" : "black",
      },
      zIndex: 2500000,
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#242526" : "white",
      zIndex: 250000,
      fontSize: "12px",
      width: "300px",
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "60vh",
      overflowY: "auto",
      paddingTop: 0,
      paddingBottom: 0,
      zIndex: 2500000,
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "white" : "black",
      fontSize: "12px",
      zIndex: 2500000,
    }),
    input: (base) => ({
      ...base,
      color: isDark ? "white" : "black",
      fontSize: "12px",
      zIndex: 2500000,
    }),
  };
}
