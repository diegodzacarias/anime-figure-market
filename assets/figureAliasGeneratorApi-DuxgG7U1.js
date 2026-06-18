import { c as createLucideIcon } from "./index-CPEOJgG6.js";
import { r as readApiErrorResponse } from "./apiError-Cq2EJZkP.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
const BASE_URL = "https://figure-market-core.onrender.com/api";
const FIGURE_ALIASES_ENDPOINT = `${BASE_URL}/figure-aliases`;
const FIGURE_ALIAS_GENERATOR_FIGURES_ENDPOINT = `${FIGURE_ALIASES_ENDPOINT}/generator/figures`;
const requestJson = async (url, init) => {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw await readApiErrorResponse(response, "Backend request failed.");
  }
  return response.json();
};
const getFiguresForAliasGenerator = (page, size, query, filters = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: "figureName,asc"
  });
  if (query.trim()) {
    params.set("q", query.trim());
  }
  if (filters.franchiseId) {
    params.set("franchiseId", filters.franchiseId);
  }
  if (filters.status) {
    params.set("status", filters.status);
  }
  if (filters.hasAliases !== void 0) {
    params.set("hasAliases", String(filters.hasAliases));
  }
  if (filters.hasGeneratedAliases !== void 0) {
    params.set("hasGeneratedAliases", String(filters.hasGeneratedAliases));
  }
  if (filters.mayNeedRegeneration !== void 0) {
    params.set("mayNeedRegeneration", String(filters.mayNeedRegeneration));
  }
  return requestJson(
    `${FIGURE_ALIAS_GENERATOR_FIGURES_ENDPOINT}?${params.toString()}`
  );
};
const getExistingFigureAliases = (figureId, page = 0, size = 20) => requestJson(
  `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}?page=${page}&size=${size}`
);
const previewGeneratedFigureAliases = (figureId) => requestJson(
  `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/preview-generated`
);
const generateFigureAliases = (figureId) => requestJson(`${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/generate`, {
  method: "POST"
});
const getFigureAliasScrapingQueries = (figureId, max) => {
  const params = new URLSearchParams();
  if (max !== void 0) {
    params.set("max", max.toString());
  }
  const queryString = params.toString();
  return requestJson(
    `${FIGURE_ALIASES_ENDPOINT}/figure/${figureId}/scraping-queries${queryString ? `?${queryString}` : ""}`
  );
};
export {
  RefreshCw as R,
  getExistingFigureAliases as a,
  getFigureAliasScrapingQueries as b,
  generateFigureAliases as c,
  getFiguresForAliasGenerator as g,
  previewGeneratedFigureAliases as p
};
