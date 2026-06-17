const pad2 = (value) => value.toString().padStart(2, "0");
const formatParts = (year, month, day, hours = 0, minutes = 0, seconds = 0) => `${pad2(day)}/${pad2(month)}/${year} ${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
function formatDateTime(value) {
  if (value === void 0 || value === null || value === "") {
    return "-";
  }
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "-";
    return formatParts(
      value.getFullYear(),
      value.getMonth() + 1,
      value.getDate(),
      value.getHours(),
      value.getMinutes(),
      value.getSeconds()
    );
  }
  if (typeof value === "number") {
    return formatDateTime(new Date(value));
  }
  const trimmed = value.trim();
  if (!trimmed) return "-";
  const localMatch = trimmed.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?)?(?:([zZ])|([+-]\d{2}:?\d{2}))?$/
  );
  if (localMatch && !localMatch[7] && !localMatch[8]) {
    return formatParts(
      Number(localMatch[1]),
      Number(localMatch[2]),
      Number(localMatch[3]),
      Number(localMatch[4] || 0),
      Number(localMatch[5] || 0),
      Number(localMatch[6] || 0)
    );
  }
  const parsedDate = new Date(trimmed);
  if (Number.isNaN(parsedDate.getTime())) {
    return trimmed;
  }
  return formatDateTime(parsedDate);
}
export {
  formatDateTime as f
};
