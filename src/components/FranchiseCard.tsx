import { Franchise } from "@/types/franchise";

type Props = {
    franchise: Franchise;
};

export function FranchiseCard({ franchise }: Props) {
    return (
        <div className="group">
            <div className="overflow-hidden rounded-[14px] bg-muted">
                <img
                    src={franchise.imageUrl}
                    alt={franchise.name}
                    className="aspect-[4/5] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
            </div>
            <h2 className="mt-3 text-base font-semibold text-foreground">{franchise.name}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{franchise.slug}</p>
        </div>
    );
}
