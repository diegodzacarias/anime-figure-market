import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor-Bhf2bzcN.js";
import { B as Button } from "./Navbar-_ItMA5Sh.js";
import { P as Popover, a as PopoverTrigger, b as PopoverContent, C as Command, c as CommandInput, d as CommandList, e as CommandEmpty, f as CommandGroup, g as CommandItem } from "./popover-0w1iJOQw.js";
import { c as cn } from "./index-DE6HQk3y.js";
import { e as ChevronsUpDown, c as Check } from "./icons-vendor-DLHCyI7j.js";
const FigureCombobox = ({
  figures,
  value,
  disabled,
  loading,
  onChange
}) => {
  const [open, setOpen] = reactExports.useState(false);
  const selectedFigure = figures.find((figure) => figure.id.toString() === value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { modal: true, open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        role: "combobox",
        disabled,
        className: "min-h-10 w-full justify-between whitespace-normal text-left font-normal",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: selectedFigure ? selectedFigure.name : loading ? "Loading figures..." : "Select a figure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { align: "start", className: "w-[min(42rem,calc(100vw-2rem))] p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { placeholder: "Search figure..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CommandList,
        {
          className: "max-h-80 overflow-y-auto",
          onWheelCapture: (event) => event.stopPropagation(),
          onTouchMoveCapture: (event) => event.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "No figure found." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { children: figures.map((figure) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              CommandItem,
              {
                value: `${figure.name} ${figure.id}`,
                onSelect: () => {
                  onChange(figure.id.toString());
                  setOpen(false);
                },
                className: "items-start gap-2 py-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Check,
                    {
                      className: cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        value === figure.id.toString() ? "opacity-100" : "opacity-0"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-normal leading-snug", children: figure.name })
                ]
              },
              figure.id
            )) })
          ]
        }
      )
    ] }) })
  ] });
};
export {
  FigureCombobox as F
};
