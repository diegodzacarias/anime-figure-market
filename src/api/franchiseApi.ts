import { Franchise } from "@/types/franchise";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getFranchises(): Promise<Franchise[]> {
    const res = await fetch(`${BASE_URL}/franchises`);

    if (!res.ok) {
        throw new Error("Error fetching franchises");
    }

    return res.json();
}