import { Franchise } from "@/types/franchise";
import { getPageContent, withPageSize } from "@/lib/page";

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://figure-market-core.onrender.com/api";

export async function getFranchises(): Promise<Franchise[]> {
    const res = await fetch(withPageSize(`${BASE_URL}/v1/franchises`));

    if (!res.ok) {
        throw new Error("Error fetching franchises");
    }

    const data = await res.json();
    return getPageContent<Franchise>(data);
}
