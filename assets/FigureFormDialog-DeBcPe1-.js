import { g as createContextScope, r as reactExports, i as useComposedRefs, j as jsxRuntimeExports, l as Primitive, k as composeEventHandlers, P as Presence, F as useSize, t as useControllableState, e as cn } from "./index-CM7PI_uo.js";
import { P as Plus, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-joqpe-HN.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-CC3OqF1u.js";
import { d as usePrevious, C as Check, I as Input, B as Button } from "./Navbar-DPZQnmsg.js";
import { P as Popover, a as PopoverTrigger, C as ChevronsUpDown, b as PopoverContent, c as Command, d as CommandInput, e as CommandList, f as CommandEmpty, g as CommandGroup, h as CommandItem } from "./popover-dRF_KPWm.js";
import { L as LoadingOverlay, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-gHLSZZhO.js";
import { r as readApiErrorResponse, t as toClientApiError } from "./apiError-C_Ic0PN1.js";
import { b as withPagination, g as getPageContent } from "./page-DKdY7PVC.js";
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("flex items-center justify-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const CHARACTER_ENDPOINT = `${API_BASE_URL}/v1/characters`;
const CHARACTER_FORM_ENDPOINT = `${API_BASE_URL}/v1/character-forms`;
const FIGURE_CHARACTER_ENDPOINT = `${API_BASE_URL}/v1/figure-characters`;
const FIGURE_IMAGE_ENDPOINT = `${API_BASE_URL}/v1/figure-images`;
const getFigureFranchiseId = (figure) => {
  var _a;
  return (figure == null ? void 0 : figure.franchiseId) || ((_a = figure == null ? void 0 : figure.franchise) == null ? void 0 : _a.id) || "";
};
const getFigureBrandId = (figure) => {
  var _a;
  return (figure == null ? void 0 : figure.brandId) || ((_a = figure == null ? void 0 : figure.brand) == null ? void 0 : _a.id) || "";
};
const FigureRelationCombobox = ({
  options,
  value,
  placeholder,
  disabled,
  nullable,
  onChange
}) => {
  const [open, setOpen] = reactExports.useState(false);
  const selectedOption = options.find((option) => option.id.toString() === value);
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: selectedOption ? selectedOption.label : nullable && !value ? "None" : placeholder }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { align: "start", className: "w-[min(42rem,calc(100vw-2rem))] p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { placeholder: `Search ${placeholder.toLowerCase()}...` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CommandList,
        {
          className: "max-h-80 overflow-y-auto",
          onWheelCapture: (event) => event.stopPropagation(),
          onTouchMoveCapture: (event) => event.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "No option found." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { children: [
              nullable && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                CommandItem,
                {
                  value: "none",
                  onSelect: () => {
                    onChange("");
                    setOpen(false);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: cn("mr-2 h-4 w-4", value === "" ? "opacity-100" : "opacity-0") }),
                    "None"
                  ]
                }
              ),
              options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                CommandItem,
                {
                  value: `${option.label} ${option.id}`,
                  onSelect: () => {
                    onChange(option.id.toString());
                    setOpen(false);
                  },
                  className: "items-start gap-2 py-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Check,
                      {
                        className: cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          value === option.id.toString() ? "opacity-100" : "opacity-0"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-normal leading-snug", children: option.label })
                  ]
                },
                option.id
              ))
            ] })
          ]
        }
      )
    ] }) })
  ] });
};
const FigureCharactersSection = ({
  figureId,
  onApiError
}) => {
  const [rows, setRows] = reactExports.useState([]);
  const [characters, setCharacters] = reactExports.useState([]);
  const [characterForms, setCharacterForms] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [loadingCharacters, setLoadingCharacters] = reactExports.useState(false);
  const [loadingForms, setLoadingForms] = reactExports.useState(false);
  const [savingRelation, setSavingRelation] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [rowToDelete, setRowToDelete] = reactExports.useState(null);
  const [localError, setLocalError] = reactExports.useState("");
  const [form, setRelationForm] = reactExports.useState({
    characterId: "",
    characterFormId: "",
    primaryCharacter: false,
    displayOrder: "0"
  });
  const busy = loading || savingRelation;
  const resetRelationForm = () => {
    setEditing(null);
    setLocalError("");
    setRelationForm({
      characterId: "",
      characterFormId: "",
      primaryCharacter: false,
      displayOrder: "0"
    });
    setCharacterForms([]);
  };
  const fetchFigureCharacters = async () => {
    if (!figureId) return;
    setLoading(true);
    try {
      const endpoint = `${FIGURE_CHARACTER_ENDPOINT}?figureId=${figureId}`;
      const response = await fetch(withPagination(endpoint, 0, 100));
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error loading figure characters."));
        return;
      }
      const data = await response.json();
      setRows(getPageContent(data));
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setLoading(false);
    }
  };
  const fetchCharacters = async () => {
    setLoadingCharacters(true);
    try {
      const response = await fetch(withPagination(CHARACTER_ENDPOINT, 0, 100, "canonicalName,asc"));
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error loading characters."));
        return;
      }
      const data = await response.json();
      setCharacters(
        getPageContent(data).map((item) => ({
          id: Number(item.id),
          label: String(item.canonicalName || item.characterName || item.name || item.id)
        }))
      );
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setLoadingCharacters(false);
    }
  };
  const fetchCharacterForms = async (characterId) => {
    if (!characterId) {
      setCharacterForms([]);
      return;
    }
    setLoadingForms(true);
    try {
      const endpoint = `${CHARACTER_FORM_ENDPOINT}?characterId=${characterId}`;
      const response = await fetch(withPagination(endpoint, 0, 100, "canonicalName,asc"));
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error loading character forms."));
        return;
      }
      const data = await response.json();
      setCharacterForms(
        getPageContent(data).map((item) => ({
          id: Number(item.id),
          label: String(item.canonicalName || item.characterFormName || item.name || item.id)
        }))
      );
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setLoadingForms(false);
    }
  };
  reactExports.useEffect(() => {
    if (!figureId) {
      setRows([]);
      resetRelationForm();
      return;
    }
    fetchFigureCharacters();
    fetchCharacters();
  }, [figureId]);
  reactExports.useEffect(() => {
    fetchCharacterForms(form.characterId);
  }, [form.characterId]);
  const handleCharacterChange = (characterId) => {
    setLocalError("");
    setRelationForm((current) => ({
      ...current,
      characterId,
      characterFormId: ""
    }));
  };
  const handleEdit = (row) => {
    var _a, _b, _c;
    setLocalError("");
    setEditing(row);
    setRelationForm({
      characterId: ((_a = row.characterId) == null ? void 0 : _a.toString()) || "",
      characterFormId: ((_b = row.characterFormId) == null ? void 0 : _b.toString()) || "",
      primaryCharacter: Boolean(row.primaryCharacter),
      displayOrder: ((_c = row.displayOrder) == null ? void 0 : _c.toString()) || "0"
    });
  };
  const handleSave = async () => {
    if (!figureId) return;
    setLocalError("");
    if (!form.characterId) {
      setLocalError("Character is required.");
      return;
    }
    if (form.displayOrder && Number(form.displayOrder) < 0) {
      setLocalError("Display Order must be 0 or greater.");
      return;
    }
    const characterId = Number(form.characterId);
    const characterFormId = form.characterFormId ? Number(form.characterFormId) : null;
    const duplicate = rows.some((row) => {
      const sameRecord = (editing == null ? void 0 : editing.id) && row.id === editing.id;
      return !sameRecord && row.characterId === characterId && (row.characterFormId || null) === characterFormId;
    });
    if (duplicate) {
      setLocalError("This Figure + Character + Character Form combination already exists.");
      return;
    }
    const payload = {
      figureId,
      characterId,
      characterFormId,
      primaryCharacter: form.primaryCharacter,
      displayOrder: form.displayOrder ? Number(form.displayOrder) : 0
    };
    setSavingRelation(true);
    try {
      const response = await fetch(
        (editing == null ? void 0 : editing.id) ? `${FIGURE_CHARACTER_ENDPOINT}/${editing.id}` : FIGURE_CHARACTER_ENDPOINT,
        {
          method: (editing == null ? void 0 : editing.id) ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error saving figure character."));
        return;
      }
      await fetchFigureCharacters();
      resetRelationForm();
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSavingRelation(false);
    }
  };
  const handleDelete = async (row) => {
    if (!row.id) return;
    setSavingRelation(true);
    try {
      const response = await fetch(`${FIGURE_CHARACTER_ENDPOINT}/${row.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error deleting figure character."));
        return;
      }
      await fetchFigureCharacters();
      if ((editing == null ? void 0 : editing.id) === row.id) resetRelationForm();
      setRowToDelete(null);
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSavingRelation(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/30 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-foreground", children: "Figure Characters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage Character and optional Character Form relations through Figure Character records." })
    ] }),
    !figureId ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground", children: "Save the Figure first to enable Figure Characters." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(LoadingOverlay, { active: busy, message: "Updating figure characters...", className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 rounded-md border bg-background p-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1 block text-sm font-medium text-foreground", children: [
            "Character ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FigureRelationCombobox,
            {
              options: characters,
              value: form.characterId,
              placeholder: loadingCharacters ? "Loading characters..." : "Select Character",
              disabled: loadingCharacters || savingRelation,
              onChange: handleCharacterChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Character Form" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FigureRelationCombobox,
            {
              options: characterForms,
              value: form.characterFormId,
              placeholder: loadingForms ? "Loading forms..." : "Select Character Form",
              disabled: !form.characterId || loadingForms || savingRelation,
              nullable: true,
              onChange: (value) => setRelationForm((current) => ({
                ...current,
                characterFormId: value
              }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Display Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: form.displayOrder,
              disabled: savingRelation,
              onChange: (event) => setRelationForm((current) => ({
                ...current,
                displayOrder: event.target.value
              }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 pb-2 text-sm font-medium text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: form.primaryCharacter,
                disabled: savingRelation,
                onCheckedChange: (checked) => setRelationForm((current) => ({
                  ...current,
                  primaryCharacter: checked === true
                }))
              }
            ),
            "Primary Character"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            editing && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", disabled: savingRelation, onClick: resetRelationForm, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2", disabled: savingRelation, onClick: handleSave, children: [
              !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              editing ? "Update" : "Add"
            ] })
          ] })
        ] }),
        localError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: localError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-hidden rounded-md border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Character" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Character Form" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Primary Character" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Display Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "h-20 text-center text-muted-foreground", children: "No Figure Characters found." }) }) : rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.characterName || row.characterId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.characterFormName || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.primaryCharacter ? "Yes" : "No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.displayOrder ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "outline", disabled: savingRelation, onClick: () => handleEdit(row), children: "Edit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "destructive", disabled: savingRelation, onClick: () => setRowToDelete(row), children: "Delete" })
          ] }) })
        ] }, row.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(rowToDelete),
        onOpenChange: (nextOpen) => {
          if (!nextOpen) setRowToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Figure Character?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'This will remove the relation for "',
              (rowToDelete == null ? void 0 : rowToDelete.characterName) || "this character",
              '". The Figure and Character records will not be deleted.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: savingRelation, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: savingRelation,
                onClick: () => {
                  if (rowToDelete) handleDelete(rowToDelete);
                },
                children: savingRelation ? "Deleting..." : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
const FigureImagesSection = ({
  figureId,
  onApiError
}) => {
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [savingImage, setSavingImage] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [rowToDelete, setRowToDelete] = reactExports.useState(null);
  const [localError, setLocalError] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    imageUrl: "",
    altText: "",
    sortOrder: "",
    primary: false,
    sourceType: ""
  });
  const busy = loading || savingImage;
  const resetImageForm = () => {
    setEditing(null);
    setLocalError("");
    setForm({
      imageUrl: "",
      altText: "",
      sortOrder: "",
      primary: false,
      sourceType: ""
    });
  };
  const fetchFigureImages = async () => {
    if (!figureId) return;
    setLoading(true);
    try {
      const endpoint = `${FIGURE_IMAGE_ENDPOINT}?figureId=${figureId}`;
      const response = await fetch(withPagination(endpoint, 0, 100, "sortOrder,asc"));
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error loading figure images."));
        return;
      }
      const data = await response.json();
      setRows(getPageContent(data));
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (!figureId) {
      setRows([]);
      resetImageForm();
      return;
    }
    fetchFigureImages();
  }, [figureId]);
  const handleEdit = (row) => {
    var _a;
    setLocalError("");
    setEditing(row);
    setForm({
      imageUrl: row.imageUrl || "",
      altText: row.altText || "",
      sortOrder: ((_a = row.sortOrder) == null ? void 0 : _a.toString()) || "",
      primary: row.primary === true,
      sourceType: row.sourceType || ""
    });
  };
  const buildPayload = (forcePrimary) => {
    if (!figureId) return null;
    return {
      figureId,
      imageUrl: form.imageUrl.trim(),
      altText: form.altText.trim() || null,
      sortOrder: form.sortOrder ? Number(form.sortOrder) : null,
      primary: form.primary,
      sourceType: form.sourceType.trim() || null
    };
  };
  const handleSave = async () => {
    if (!figureId) return;
    setLocalError("");
    if (!form.imageUrl.trim()) {
      setLocalError("Image URL is required.");
      return;
    }
    if (form.sortOrder && Number(form.sortOrder) < 0) {
      setLocalError("Sort Order must be 0 or greater.");
      return;
    }
    const payload = buildPayload();
    if (!payload) return;
    setSavingImage(true);
    try {
      const response = await fetch(
        (editing == null ? void 0 : editing.id) ? `${FIGURE_IMAGE_ENDPOINT}/${editing.id}` : FIGURE_IMAGE_ENDPOINT,
        {
          method: (editing == null ? void 0 : editing.id) ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error saving figure image."));
        return;
      }
      await fetchFigureImages();
      resetImageForm();
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSavingImage(false);
    }
  };
  const handleMarkPrimary = async (row) => {
    if (!figureId || !row.id) return;
    setSavingImage(true);
    try {
      const response = await fetch(`${FIGURE_IMAGE_ENDPOINT}/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figureId,
          imageUrl: row.imageUrl,
          altText: row.altText || null,
          sortOrder: row.sortOrder ?? null,
          primary: true,
          sourceType: row.sourceType || null
        })
      });
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error marking figure image as primary."));
        return;
      }
      await fetchFigureImages();
      if ((editing == null ? void 0 : editing.id) === row.id) {
        setForm((current) => ({ ...current, primary: true }));
      }
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSavingImage(false);
    }
  };
  const handleDelete = async (row) => {
    if (!row.id) return;
    setSavingImage(true);
    try {
      const response = await fetch(`${FIGURE_IMAGE_ENDPOINT}/${row.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        onApiError(await readApiErrorResponse(response, "Error deleting figure image."));
        return;
      }
      await fetchFigureImages();
      if ((editing == null ? void 0 : editing.id) === row.id) resetImageForm();
      setRowToDelete(null);
    } catch (error) {
      onApiError(toClientApiError(error, "Error connecting to backend."));
    } finally {
      setSavingImage(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/30 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-foreground", children: "Figure Images" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage optional image URLs and previews for this Figure." })
    ] }),
    !figureId ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground", children: "Save the Figure first to enable Figure Images." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(LoadingOverlay, { active: busy, message: "Updating figure images...", className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 rounded-md border bg-background p-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1 block text-sm font-medium text-foreground", children: [
            "Image URL ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "url",
              value: form.imageUrl,
              disabled: savingImage,
              onChange: (event) => setForm((current) => ({ ...current, imageUrl: event.target.value })),
              placeholder: "https://..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Alt Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.altText,
              disabled: savingImage,
              onChange: (event) => setForm((current) => ({ ...current, altText: event.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Source Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.sourceType,
              disabled: savingImage,
              onChange: (event) => setForm((current) => ({ ...current, sourceType: event.target.value })),
              placeholder: "OFFICIAL, SOURCE, MANUAL..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: "Sort Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: form.sortOrder,
              disabled: savingImage,
              onChange: (event) => setForm((current) => ({ ...current, sortOrder: event.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 pb-2 text-sm font-medium text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: form.primary,
                disabled: savingImage,
                onCheckedChange: (checked) => setForm((current) => ({
                  ...current,
                  primary: checked === true
                }))
              }
            ),
            "Primary"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            editing && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", disabled: savingImage, onClick: resetImageForm, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2", disabled: savingImage, onClick: handleSave, children: [
              !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              editing ? "Update" : "Add"
            ] })
          ] })
        ] }),
        localError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:col-span-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: localError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3", children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border border-dashed bg-background p-4 text-sm text-muted-foreground", children: "No Figure Images found." }) : rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 rounded-md border bg-background p-3 md:grid-cols-[8rem_1fr_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden rounded-md border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: row.imageUrl,
            alt: row.altText || row.figureName || "Figure image",
            className: "h-full w-full object-contain",
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium text-foreground", children: row.altText || "Untitled image" }),
            row.primary && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary", children: "Primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 break-all text-xs text-muted-foreground", children: row.imageUrl }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Sort: ",
              row.sortOrder ?? "-"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Source: ",
              row.sourceType || "-"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-end gap-2 md:flex-col md:items-stretch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "outline", disabled: savingImage, onClick: () => handleEdit(row), children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              disabled: savingImage || row.primary === true,
              onClick: () => handleMarkPrimary(row),
              children: "Set Primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "destructive", disabled: savingImage, onClick: () => setRowToDelete(row), children: "Delete" })
        ] })
      ] }, row.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(rowToDelete),
        onOpenChange: (nextOpen) => {
          if (!nextOpen) setRowToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Figure Image?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will remove this image URL from the Figure. The Figure record will not be deleted." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: savingImage, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: savingImage,
                onClick: () => {
                  if (rowToDelete) handleDelete(rowToDelete);
                },
                children: savingImage ? "Deleting..." : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
const FigureFormDialog = ({
  figure,
  franchises,
  brands,
  currencyCodes,
  figureStatuses,
  open,
  saving,
  loadingOptions,
  onOpenChange,
  onGenerateSlug,
  onValidateSlug,
  onSubmit,
  onApiError
}) => {
  const [slugEditable, setSlugEditable] = reactExports.useState(false);
  const [generatingSlug, setGeneratingSlug] = reactExports.useState(false);
  const [validatingSlug, setValidatingSlug] = reactExports.useState(false);
  const [slugMessage, setSlugMessage] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    franchiseId: "",
    brandId: "",
    name: "",
    slug: "",
    scene: "",
    lineName: "",
    material: "",
    janCode: "",
    officialProductCode: "",
    sourceReferenceUrl: "",
    isLicensed: "true",
    editionSize: "",
    baseCurrencyCode: "USD",
    status: "RELEASED",
    notes: ""
  });
  reactExports.useEffect(() => {
    var _a;
    if (!open) return;
    setForm({
      franchiseId: getFigureFranchiseId(figure).toString(),
      brandId: getFigureBrandId(figure).toString(),
      name: (figure == null ? void 0 : figure.name) || "",
      slug: (figure == null ? void 0 : figure.slug) || "",
      scene: (figure == null ? void 0 : figure.scene) || "",
      lineName: (figure == null ? void 0 : figure.lineName) || "",
      material: (figure == null ? void 0 : figure.material) || "",
      janCode: (figure == null ? void 0 : figure.janCode) || "",
      officialProductCode: (figure == null ? void 0 : figure.officialProductCode) || "",
      sourceReferenceUrl: (figure == null ? void 0 : figure.sourceReferenceUrl) || "",
      isLicensed: ((figure == null ? void 0 : figure.isLicensed) ?? true).toString(),
      editionSize: ((_a = figure == null ? void 0 : figure.editionSize) == null ? void 0 : _a.toString()) || "",
      baseCurrencyCode: (figure == null ? void 0 : figure.baseCurrencyCode) || "USD",
      status: (figure == null ? void 0 : figure.status) || "RELEASED",
      notes: (figure == null ? void 0 : figure.notes) || ""
    });
    setSlugEditable(false);
    setSlugMessage("");
  }, [figure, open]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSlugMessage("");
    if (!form.slug.trim()) {
      setSlugMessage("Generate a slug before saving, or unlock the field and enter one.");
      return;
    }
    setValidatingSlug(true);
    try {
      const slugAvailable = await onValidateSlug(form.slug.trim(), figure == null ? void 0 : figure.id);
      if (!slugAvailable) {
        setSlugMessage("This slug is already in use. Edit it or generate another one.");
        return;
      }
    } catch {
      return;
    } finally {
      setValidatingSlug(false);
    }
    const payload = {
      franchiseId: Number(form.franchiseId),
      brandId: Number(form.brandId),
      name: form.name.trim(),
      slug: form.slug.trim(),
      isLicensed: form.isLicensed === "true",
      baseCurrencyCode: form.baseCurrencyCode,
      status: form.status
    };
    if (form.scene.trim()) payload.scene = form.scene.trim();
    if (form.lineName.trim()) payload.lineName = form.lineName.trim();
    if (form.material.trim()) payload.material = form.material.trim();
    if (form.janCode.trim()) payload.janCode = form.janCode.trim();
    if (form.officialProductCode.trim()) payload.officialProductCode = form.officialProductCode.trim();
    if (form.sourceReferenceUrl.trim()) payload.sourceReferenceUrl = form.sourceReferenceUrl.trim();
    if (form.editionSize) payload.editionSize = Number(form.editionSize);
    if (form.notes.trim()) payload.notes = form.notes.trim();
    await onSubmit(payload);
  };
  const handleGenerateSlug = async () => {
    const name = form.name.trim();
    if (!name) {
      setSlugMessage("Write a name before generating the slug.");
      return;
    }
    setSlugMessage("");
    setGeneratingSlug(true);
    try {
      const slug = await onGenerateSlug(name);
      setForm((prev) => ({ ...prev, slug }));
      setSlugEditable(false);
      setSlugMessage("Slug generated and available.");
    } finally {
      setGeneratingSlug(false);
    }
  };
  const selectClass = "w-full border border-input bg-background text-foreground p-2 rounded";
  const optionClass = "bg-background text-foreground";
  const helperClass = "mt-1 text-xs text-muted-foreground";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";
  const requiredMark = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-5xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: saving, label: "Saving figure..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: figure ? "Update Figure" : "New Figure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Manage the main figure record used by aliases and source listings." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Franchise ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              name: "franchiseId",
              value: form.franchiseId,
              onChange: handleChange,
              className: selectClass,
              disabled: loadingOptions || franchises.length === 0,
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: loadingOptions ? "Loading franchises..." : "Select a franchise" }),
                franchises.map((franchise) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: franchise.id, children: franchise.name }, franchise.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Anime o universo al que pertenece la figura." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Brand ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              name: "brandId",
              value: form.brandId,
              onChange: handleChange,
              className: selectClass,
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: "Select a brand" }),
                brands.map((brand) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: brand.id, children: brand.name }, brand.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Fabricante o marca que produce la figura." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Name ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "name", maxLength: 255, value: form.name, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Nombre completo del producto." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Slug ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                name: "slug",
                maxLength: 300,
                value: form.slug,
                onChange: (event) => {
                  handleChange(event);
                  setSlugMessage("");
                },
                disabled: !slugEditable,
                required: true,
                className: "sm:flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                disabled: generatingSlug || !form.name.trim(),
                onClick: handleGenerateSlug,
                children: generatingSlug ? "Generating..." : "Generate"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setSlugEditable((current) => !current), children: slugEditable ? "Lock" : "Edit" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: slugMessage || "Generate it from the name, or unlock it if manual editing is needed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Scene" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "scene", maxLength: 255, value: form.scene, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Pose, escena o transformacion representada." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Line Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "lineName", maxLength: 150, value: form.lineName, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Linea o coleccion comercial de la marca." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Material" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "material", maxLength: 100, value: form.material, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Material principal, como PVC, ABS o resina." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "JAN/EAN Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "janCode", maxLength: 20, value: form.janCode, onChange: handleChange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Codigo JAN/EAN canonico usado para matching y verificacion." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Official Product Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "officialProductCode",
              maxLength: 100,
              value: form.officialProductCode,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Codigo oficial publicado por el fabricante o marca." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Source Reference URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "sourceReferenceUrl",
              type: "url",
              maxLength: 1e3,
              value: form.sourceReferenceUrl,
              onChange: handleChange,
              placeholder: "https://..."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "URL de referencia canonica usada para verificar la informacion principal de la figura." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Edition Size" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "editionSize",
              type: "number",
              min: "0",
              value: form.editionSize,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Cantidad producida si es una edicion limitada." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Licensed ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              name: "isLicensed",
              value: form.isLicensed,
              onChange: handleChange,
              className: selectClass,
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "true", children: "Yes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "false", children: "No" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Indica si es una figura oficial/licenciada." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Status ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              name: "status",
              value: form.status,
              onChange: handleChange,
              className: selectClass,
              required: true,
              children: figureStatuses.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: status.value, children: status.label }, status.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Disponibilidad actual: preventa, lanzada o agotada." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            "Base Currency ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              name: "baseCurrencyCode",
              value: form.baseCurrencyCode,
              onChange: handleChange,
              className: selectClass,
              required: true,
              children: currencyCodes.map((currency) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { className: optionClass, value: currency.value, children: [
                currency.label,
                currency.symbol ? ` (${currency.symbol})` : ""
              ] }, currency.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Moneda base requerida por el backend." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelClass, children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            name: "notes",
            value: form.notes,
            onChange: handleChange,
            className: "w-full rounded border border-input bg-background p-3 text-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: "Datos adicionales, variantes u observaciones internas." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FigureCharactersSection, { figureId: figure == null ? void 0 : figure.id, onApiError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FigureImagesSection, { figureId: figure == null ? void 0 : figure.id, onApiError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving || validatingSlug, children: saving ? "Saving..." : validatingSlug ? "Validating slug..." : figure ? "Update" : "Create" })
      ] })
    ] })
  ] }) });
};
export {
  FigureFormDialog as default
};
