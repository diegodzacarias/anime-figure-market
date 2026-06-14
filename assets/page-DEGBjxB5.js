const defaultPageMeta = {
  totalElements: 0,
  totalPages: 0,
  page: 0,
  size: 20
};
function getPageContent(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data == null ? void 0 : data.content)) return data.content;
  return [];
}
function getPageMeta(data, fallbackSize = 20) {
  if (Array.isArray(data)) {
    return {
      totalElements: data.length,
      totalPages: data.length > 0 ? 1 : 0,
      page: 0,
      size: data.length || fallbackSize
    };
  }
  return {
    totalElements: (data == null ? void 0 : data.totalElements) ?? 0,
    totalPages: (data == null ? void 0 : data.totalPages) ?? 0,
    page: (data == null ? void 0 : data.number) ?? 0,
    size: (data == null ? void 0 : data.size) ?? fallbackSize
  };
}
function withPageSize(endpoint, size = 1e3) {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}size=${size}`;
}
function withPagination(endpoint, page, size, sort = "id,asc") {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`;
}
export {
  getPageMeta as a,
  withPageSize as b,
  defaultPageMeta as d,
  getPageContent as g,
  withPagination as w
};
