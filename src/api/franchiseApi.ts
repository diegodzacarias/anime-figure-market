import type { Franchise } from "@/types/franchise";
import { apiRequest } from "@/lib/apiClient";
import { getPageContent, type PageResponse } from "@/lib/page";

export async function getFranchises(): Promise<Franchise[]> {
    const data = await apiRequest<PageResponse<Franchise> | Franchise[]>("/v1/franchises", {
        query: { page: 0, size: 1000, sort: "name,asc" },
        fallbackMessage: "Error fetching franchises.",
    });
    return getPageContent<Franchise>(data);
}
