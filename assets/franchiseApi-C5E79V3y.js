import { b as withPagination, g as getPageContent } from "./page-DKdY7PVC.js";
const BASE_URL = "https://figure-market-core.onrender.com/api";
async function getFranchises() {
  const res = await fetch(withPagination(`${BASE_URL}/v1/franchises`, 0, 1e3, "name,asc"));
  if (!res.ok) {
    throw new Error("Error fetching franchises");
  }
  const data = await res.json();
  return getPageContent(data);
}
export {
  getFranchises as g
};
