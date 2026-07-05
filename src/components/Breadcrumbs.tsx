import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * Rastro de navegacion (sistema Airbnb). El ultimo item es la pagina actual
 * (no enlazable); los previos enlazan hacia atras. `state` se propaga al Link
 * para conservar contexto (ej. la franquicia) entre paginas de detalle.
 */

export type Crumb = {
  label: string;
  to?: string;
  state?: unknown;
};

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className={className ?? "mb-6"}>
    <ol className="flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={`${item.label}-${index}`}>
            <li>
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  state={item.state}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-foreground" : "text-muted-foreground"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
            {!isLast && (
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
