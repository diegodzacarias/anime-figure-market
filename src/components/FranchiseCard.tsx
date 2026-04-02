import { Franchise } from "@/types/franchise";

type Props = {
    franchise: Franchise;
};

export function FranchiseCard({ franchise }: Props) {
    return (
        <div>
            <img
                src={franchise.imageUrl}
                alt={franchise.name}
                style={{ width: "200px", height: "auto" }}
            />
            <h2>{franchise.name}</h2>
            <p>{franchise.slug}</p>
        </div>
    );
}