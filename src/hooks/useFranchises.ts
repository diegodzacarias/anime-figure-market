import { useQuery } from "@tanstack/react-query";
import { getFranchises } from "@/api/franchiseApi";
import { Franchise } from "@/types/franchise";

export function useFranchises() {
    return useQuery<Franchise[]>({
        queryKey: ["franchises"],
        queryFn: getFranchises,
    });
}