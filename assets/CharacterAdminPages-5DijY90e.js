import { f as createContextScope, r as reactExports, s as useControllableState, j as jsxRuntimeExports, k as Primitive, i as composeEventHandlers, P as Presence, d as cn, L as Link } from "./index-WzxPZzqU.js";
import { N as Navbar, B as Button, I as Input } from "./Navbar-DY2ajiLQ.js";
import { p as useId, A as ApiErrorToast, P as Plus, S as Search, L as LoadingOverlay, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, f as PageControls, g as AlertDialog, h as AlertDialogContent, i as AlertDialogHeader, j as AlertDialogTitle, k as AlertDialogDescription, l as AlertDialogFooter, m as AlertDialogCancel, n as AlertDialogAction, r as readApiErrorResponse, t as toClientApiError } from "./apiError-Bp3oYuQD.js";
import { P as Popover, a as PopoverTrigger, b as ChevronsUpDown, c as PopoverContent, d as Command, e as CommandInput, f as CommandList, g as CommandEmpty, h as CommandGroup, i as CommandItem, C as Check } from "./popover-9empWYoC.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-vJ1Ivy2A.js";
import { c as createRovingFocusGroupScope, u as useDirection, R as Root, I as Item } from "./index-5pBiS0w_.js";
import { d as defaultPageMeta, b as withPagination, g as getPageContent, a as getPageMeta, w as withPageSize } from "./page-DKdY7PVC.js";
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const API_BASE_URL = "https://figure-market-core.onrender.com/api";
const EntityCombobox = ({
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: selectedOption ? selectedOption.label : nullable ? "None" : placeholder }),
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
const emptyOptions = {
  franchises: [],
  characters: [],
  characterForms: [],
  figures: []
};
const loadMethodOptions = [
  { id: 0, label: "MANUAL" },
  { id: 1, label: "SCRAPED" },
  { id: 2, label: "GENERATED" },
  { id: 3, label: "IMPORTED" }
];
const endpoints = {
  characters: `${API_BASE_URL}/v1/characters`,
  characterAliases: `${API_BASE_URL}/v1/character-aliases`,
  characterForms: `${API_BASE_URL}/v1/character-forms`,
  characterFormAliases: `${API_BASE_URL}/v1/character-form-aliases`,
  figureCharacters: `${API_BASE_URL}/v1/figure-characters`,
  franchises: `${API_BASE_URL}/v1/franchises`,
  figures: `${API_BASE_URL}/v1/figures`
};
const adminRouteByEndpoint = {
  [endpoints.characterAliases]: "/character-admin/character-aliases",
  [endpoints.characterForms]: "/character-admin/character-forms",
  [endpoints.characterFormAliases]: "/character-admin/character-form-aliases",
  [endpoints.figureCharacters]: "/character-admin/figure-characters"
};
const relationLoaders = {
  franchises: {
    endpoint: endpoints.franchises,
    map: (item) => ({ id: Number(item.id), label: String(item.name || item.slug || item.id) })
  },
  characters: {
    endpoint: endpoints.characters,
    map: (item) => ({ id: Number(item.id), label: String(item.canonicalName || item.characterName || item.id) })
  },
  characterForms: {
    endpoint: endpoints.characterForms,
    map: (item) => {
      const formName = String(item.canonicalName || item.characterFormName || item.id);
      const characterName = item.characterName ? String(item.characterName) : "";
      return {
        id: Number(item.id),
        label: characterName ? `${characterName} - ${formName}` : formName
      };
    }
  },
  figures: {
    endpoint: endpoints.figures,
    map: (item) => ({ id: Number(item.id), label: String(item.name || item.slug || item.id) })
  }
};
const valueToString = (value) => {
  if (value === void 0 || value === null) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};
const buildInitialForm = (fields, record) => Object.fromEntries(
  fields.map((field) => [
    field.name,
    (record == null ? void 0 : record[field.name]) === void 0 || (record == null ? void 0 : record[field.name]) === null ? field.defaultValue || "" : String(record[field.name])
  ])
);
const CharacterAdminPage = ({ config }) => {
  var _a;
  const [rows, setRows] = reactExports.useState([]);
  const [options, setOptions] = reactExports.useState(emptyOptions);
  const [form, setForm] = reactExports.useState({});
  const [editableDerivedFields, setEditableDerivedFields] = reactExports.useState({});
  const [relatedRows, setRelatedRows] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [loadingOptions, setLoadingOptions] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(0);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [pageMeta, setPageMeta] = reactExports.useState(defaultPageMeta);
  const [apiError, setApiError] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [selectedRecord, setSelectedRecord] = reactExports.useState(null);
  const [recordToDelete, setRecordToDelete] = reactExports.useState(null);
  const mutating = saving || deleting;
  const fetchRows = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await fetch(withPagination(config.endpoint, page, pageSize));
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, `Error fetching ${config.title}.`));
        return;
      }
      const data = await response.json();
      setRows(getPageContent(data));
      setPageMeta(getPageMeta(data, pageSize));
    } catch (error) {
      setApiError(toClientApiError(error, `Error fetching ${config.title}.`));
    } finally {
      if (showLoading) setLoading(false);
    }
  };
  const fetchOptions = async () => {
    setLoadingOptions(true);
    try {
      const needed = new Set(config.fields.map((field) => field.optionsKey).filter(Boolean));
      const entries = await Promise.all(
        Array.from(needed).map(async (key) => {
          const loader = relationLoaders[key];
          const response = await fetch(withPageSize(loader.endpoint));
          if (!response.ok) return [key, []];
          const data = await response.json();
          return [key, getPageContent(data).map(loader.map)];
        })
      );
      setOptions({ ...emptyOptions, ...Object.fromEntries(entries) });
    } catch (error) {
      setApiError(toClientApiError(error, "Error fetching select options."));
    } finally {
      setLoadingOptions(false);
    }
  };
  const fetchRelatedRows = async (record) => {
    if (!(record == null ? void 0 : record.id) || !config.relatedSections) {
      setRelatedRows({});
      return;
    }
    const result = {};
    await Promise.all(
      config.relatedSections.map(async (section) => {
        const response = await fetch(withPageSize(`${section.endpoint}?${section.filterParam}=${record.id}`));
        if (!response.ok) return;
        const data = await response.json();
        result[section.title] = getPageContent(data);
      })
    );
    setRelatedRows(result);
  };
  reactExports.useEffect(() => {
    fetchRows();
  }, [page, pageSize, config.endpoint]);
  reactExports.useEffect(() => {
    fetchOptions();
  }, [config.endpoint]);
  reactExports.useEffect(() => {
    setPage(0);
  }, [search]);
  const filteredRows = reactExports.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter(
      (row) => Object.values(row).filter((value) => value !== null && value !== void 0).some((value) => String(value).toLowerCase().includes(query))
    );
  }, [rows, search]);
  const openCreateDialog = () => {
    setSelectedRecord(null);
    setForm(buildInitialForm(config.fields, null));
    setEditableDerivedFields({});
    setRelatedRows({});
    setDialogOpen(true);
  };
  const openEditDialog = async (record) => {
    setSelectedRecord(record);
    setForm(buildInitialForm(config.fields, record));
    setEditableDerivedFields({});
    setDialogOpen(true);
    await fetchRelatedRows(record);
  };
  const handleChange = (name, value) => {
    setForm((current) => {
      const next = { ...current, [name]: value };
      config.fields.forEach((field) => {
        if (field.lockedDerivedFrom === name && !editableDerivedFields[field.name] && field.deriveValue) {
          next[field.name] = field.deriveValue(value);
        }
      });
      return next;
    });
  };
  const buildPayload = () => {
    const payload = {};
    config.fields.forEach((field) => {
      var _a2;
      const rawValue = ((_a2 = form[field.name]) == null ? void 0 : _a2.trim()) ?? "";
      if (!rawValue && field.nullable) {
        payload[field.name] = null;
        return;
      }
      if (!rawValue && !field.required) return;
      if (field.type === "number" || field.type === "select") {
        if (field.staticOptions) {
          payload[field.name] = rawValue;
        } else {
          payload[field.name] = Number(rawValue);
        }
        return;
      }
      if (field.type === "boolean") {
        payload[field.name] = rawValue === "true";
        return;
      }
      payload[field.name] = rawValue;
    });
    return payload;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const isEditing = Boolean(selectedRecord == null ? void 0 : selectedRecord.id);
    const endpoint = isEditing ? `${config.endpoint}/${selectedRecord == null ? void 0 : selectedRecord.id}` : config.endpoint;
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload())
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, `Error saving ${config.title}.`));
        return;
      }
      await fetchRows(false);
      setDialogOpen(false);
      setSelectedRecord(null);
    } catch (error) {
      setApiError(toClientApiError(error, `Error saving ${config.title}.`));
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!(recordToDelete == null ? void 0 : recordToDelete.id)) return;
    setDeleting(true);
    try {
      const response = await fetch(`${config.endpoint}/${recordToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        setApiError(await readApiErrorResponse(response, `Error deleting ${config.title}.`));
        return;
      }
      await fetchRows(false);
      setRecordToDelete(null);
    } catch (error) {
      setApiError(toClientApiError(error, `Error deleting ${config.title}.`));
    } finally {
      setDeleting(false);
    }
  };
  const renderField = (field) => {
    const value = form[field.name] ?? "";
    const labelClass = "mb-1 block text-sm font-medium text-foreground";
    const helperClass = "mt-1 text-xs text-muted-foreground";
    const selectClass = "w-full rounded border border-input bg-background p-2 text-foreground";
    const optionClass = "bg-background text-foreground";
    const requiredMark = field.required ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }) : null;
    const fieldClass = field.fullWidth ? "md:col-span-2" : void 0;
    if (field.type === "boolean") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
          field.label,
          " ",
          requiredMark
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: selectClass, value: value || "true", onChange: (event) => handleChange(field.name, event.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "true", children: "Yes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "false", children: "No" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: field.helper })
      ] }, field.name);
    }
    if (field.type === "select") {
      const fieldOptions = field.staticOptions || (field.optionsKey ? options[field.optionsKey] : []);
      if (field.optionsKey && !field.staticOptions) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
            field.label,
            " ",
            requiredMark
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EntityCombobox,
            {
              options: fieldOptions,
              value,
              placeholder: loadingOptions ? "Loading options..." : `Select ${field.label}`,
              disabled: loadingOptions,
              nullable: field.nullable,
              onChange: (nextValue) => handleChange(field.name, nextValue)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, required: field.required, className: "sr-only", onChange: () => void 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: field.helper })
        ] }, field.name);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
          field.label,
          " ",
          requiredMark
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: selectClass,
            value,
            required: field.required,
            disabled: loadingOptions,
            onChange: (event) => handleChange(field.name, event.target.value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: "", children: field.nullable ? "None" : loadingOptions ? "Loading options..." : `Select ${field.label}` }),
              fieldOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: optionClass, value: field.staticOptions ? option.label : option.id, children: option.label }, `${field.name}-${option.id}-${option.label}`))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: field.helper })
      ] }, field.name);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: fieldClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
        field.label,
        " ",
        requiredMark
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: field.lockedDerivedFrom ? "flex gap-2" : void 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            name: field.name,
            type: field.type,
            maxLength: field.maxLength,
            value,
            required: field.required,
            min: field.type === "number" ? 0 : void 0,
            disabled: Boolean(field.lockedDerivedFrom) && !editableDerivedFields[field.name],
            onChange: (event) => handleChange(field.name, event.target.value)
          }
        ),
        field.lockedDerivedFrom && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            onClick: () => setEditableDerivedFields((current) => ({
              ...current,
              [field.name]: !current[field.name]
            })),
            children: editableDerivedFields[field.name] ? "Lock" : "Edit"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: helperClass, children: field.helper })
    ] }, field.name);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiErrorToast, { error: apiError, onClose: () => setApiError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: config.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: config.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "gap-2 md:self-center", onClick: openCreateDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          config.newLabel
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (event) => setSearch(event.target.value), placeholder: config.searchPlaceholder, className: "pl-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filteredRows.length,
          " shown - ",
          pageMeta.totalElements,
          " total records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: mutating, message: `Updating ${config.title}...`, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          config.columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: column.label }, column.key)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-48 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { colSpan: config.columns.length + 1, className: "h-28 text-center text-muted-foreground", children: [
          "Loading ",
          config.title,
          "..."
        ] }) }) : filteredRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: config.columns.length + 1, className: "h-28 text-center text-muted-foreground", children: "No records found." }) }) : filteredRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          config.columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: valueToString(row[column.key]) || "-" }, `${row.id}-${column.key}`)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => openEditDialog(row), children: "Actualizar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "destructive", size: "sm", onClick: () => setRecordToDelete(row), children: "Eliminar" })
          ] }) })
        ] }, String(row.id))) })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageControls,
        {
          page: pageMeta.page,
          size: pageMeta.size,
          totalElements: pageMeta.totalElements,
          totalPages: pageMeta.totalPages,
          disabled: loading || mutating,
          onPageChange: setPage,
          onSizeChange: (size) => {
            setPageSize(size);
            setPage(0);
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-4xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { active: saving, label: `Saving ${config.title}...` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: selectedRecord ? `Update ${config.title}` : config.newLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: config.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: config.fields.map(renderField) }),
        (selectedRecord == null ? void 0 : selectedRecord.id) && config.relatedSections && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: (_a = config.relatedSections[0]) == null ? void 0 : _a.title, className: "mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex h-auto flex-wrap justify-start", children: config.relatedSections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: section.title, children: section.title }, section.title)) }),
          config.relatedSections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: section.title, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/30 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-foreground", children: section.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { className: "text-sm text-primary hover:underline", to: adminRouteByEndpoint[section.endpoint] || "/character-admin/characters", children: [
                "Open ",
                section.title
              ] })
            ] }),
            (relatedRows[section.title] || []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No related records found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: section.columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: column.label }, column.key)) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (relatedRows[section.title] || []).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: section.columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: valueToString(row[column.key]) || "-" }, `${row.id}-${column.key}`)) }, String(row.id))) })
            ] }) })
          ] }) }, section.title))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setDialogOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? "Saving..." : selectedRecord ? "Update" : "Create" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: Boolean(recordToDelete),
        onOpenChange: (open) => {
          if (!open) setRecordToDelete(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete record?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This action will delete record #",
              recordToDelete == null ? void 0 : recordToDelete.id,
              ". This cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleting, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", disabled: deleting, onClick: handleDelete, children: deleting ? "Deleting..." : "Delete" })
          ] })
        ] })
      }
    )
  ] });
};
const characterFields = [
  { name: "canonicalName", label: "Canonical Name", type: "text", required: true, helper: "Main character name." },
  {
    name: "normalizedName",
    label: "Normalized Name",
    type: "text",
    required: true,
    helper: "Lowercase lookup name derived from Canonical Name unless manually edited.",
    lockedDerivedFrom: "canonicalName",
    deriveValue: (value) => value.trim().toLowerCase()
  },
  { name: "franchiseId", label: "Franchise", type: "select", required: true, optionsKey: "franchises", helper: "Franchise this character belongs to." },
  { name: "active", label: "Active", type: "boolean", required: true, defaultValue: "true", helper: "Whether this character is active." }
];
const characterAliasFields = [
  { name: "characterId", label: "Character", type: "select", required: true, optionsKey: "characters", helper: "Character that owns this alias." },
  { name: "alias", label: "Character Alias", type: "text", required: true, maxLength: 255, helper: "Alternate character name." },
  {
    name: "aliasNormalized",
    label: "Character Alias Normalized",
    type: "text",
    required: true,
    maxLength: 255,
    helper: "Lowercase alias used for matching unless manually edited.",
    lockedDerivedFrom: "alias",
    deriveValue: (value) => value.trim().toLowerCase()
  },
  { name: "loadMethod", label: "Load Method", type: "select", required: true, defaultValue: "MANUAL", staticOptions: loadMethodOptions, helper: "How this alias was loaded." },
  { name: "active", label: "Active", type: "boolean", required: true, defaultValue: "true", helper: "Whether this character alias is active." }
];
const characterFormFields = [
  { name: "characterId", label: "Character", type: "select", required: true, optionsKey: "characters", helper: "Base character for this form." },
  { name: "canonicalName", label: "Character Form Canonical Name", type: "text", required: true, helper: "Canonical name of the character form." },
  {
    name: "normalizedName",
    label: "Character Form Normalized Name",
    type: "text",
    required: true,
    helper: "Lowercase form name used for lookups unless manually edited.",
    lockedDerivedFrom: "canonicalName",
    deriveValue: (value) => value.trim().toLowerCase()
  },
  { name: "active", label: "Active", type: "boolean", required: true, defaultValue: "true", helper: "Whether this character form is active." }
];
const characterFormAliasFields = [
  { name: "characterFormId", label: "Character Form", type: "select", required: true, optionsKey: "characterForms", helper: "Character form that owns this alias.", fullWidth: true },
  { name: "alias", label: "Character Form Alias", type: "text", required: true, maxLength: 255, helper: "Alternate character form name." },
  {
    name: "aliasNormalized",
    label: "Character Form Alias Normalized",
    type: "text",
    required: true,
    maxLength: 255,
    helper: "Lowercase form alias used for matching unless manually edited.",
    lockedDerivedFrom: "alias",
    deriveValue: (value) => value.trim().toLowerCase()
  },
  { name: "loadMethod", label: "Load Method", type: "select", required: true, defaultValue: "MANUAL", staticOptions: loadMethodOptions, helper: "How this form alias was loaded." },
  { name: "active", label: "Active", type: "boolean", required: true, defaultValue: "true", helper: "Whether this character form alias is active." }
];
const figureCharacterFields = [
  { name: "figureId", label: "Figure", type: "select", required: true, optionsKey: "figures", helper: "Figure being associated." },
  { name: "characterId", label: "Character", type: "select", required: true, optionsKey: "characters", helper: "Character represented by the figure." },
  { name: "characterFormId", label: "Character Form", type: "select", nullable: true, optionsKey: "characterForms", helper: "Optional character form represented by the figure." },
  { name: "primaryCharacter", label: "Primary Character", type: "boolean", required: true, defaultValue: "false", helper: "Marks the main represented character." },
  { name: "displayOrder", label: "Display Order", type: "number", required: true, defaultValue: "0", helper: "Ordering when multiple characters are attached." }
];
const CharacterPage = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  CharacterAdminPage,
  {
    config: {
      title: "Characters",
      description: "Manage canonical characters connected to franchises.",
      newLabel: "New Character",
      endpoint: endpoints.characters,
      searchPlaceholder: "Search characters",
      columns: [
        { key: "id", label: "ID" },
        { key: "canonicalName", label: "Canonical Name" },
        { key: "normalizedName", label: "Normalized Name" },
        { key: "franchiseName", label: "Franchise" },
        { key: "active", label: "Active" }
      ],
      fields: characterFields,
      relatedSections: [
        {
          title: "Character Aliases",
          endpoint: endpoints.characterAliases,
          filterParam: "characterId",
          columns: [
            { key: "id", label: "ID" },
            { key: "alias", label: "Character Alias" },
            { key: "aliasNormalized", label: "Normalized" },
            { key: "loadMethod", label: "Load Method" },
            { key: "active", label: "Active" }
          ]
        },
        {
          title: "Character Forms",
          endpoint: endpoints.characterForms,
          filterParam: "characterId",
          columns: [
            { key: "id", label: "ID" },
            { key: "canonicalName", label: "Character Form" },
            { key: "normalizedName", label: "Normalized" },
            { key: "active", label: "Active" }
          ]
        }
      ]
    }
  }
);
const CharacterAliasPage = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  CharacterAdminPage,
  {
    config: {
      title: "Character Aliases",
      description: "Manage alternate names for characters.",
      newLabel: "New Character Alias",
      endpoint: endpoints.characterAliases,
      searchPlaceholder: "Search character aliases",
      columns: [
        { key: "id", label: "ID" },
        { key: "characterName", label: "Character" },
        { key: "alias", label: "Character Alias" },
        { key: "aliasNormalized", label: "Normalized" },
        { key: "loadMethod", label: "Load Method" },
        { key: "active", label: "Active" }
      ],
      fields: characterAliasFields
    }
  }
);
const CharacterFormPage = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  CharacterAdminPage,
  {
    config: {
      title: "Character Forms",
      description: "Manage named forms, transformations, costumes, or variants of characters.",
      newLabel: "New Character Form",
      endpoint: endpoints.characterForms,
      searchPlaceholder: "Search character forms",
      columns: [
        { key: "id", label: "ID" },
        { key: "characterName", label: "Character" },
        { key: "canonicalName", label: "Character Form" },
        { key: "normalizedName", label: "Normalized" },
        { key: "active", label: "Active" }
      ],
      fields: characterFormFields,
      relatedSections: [
        {
          title: "Character Form Aliases",
          endpoint: endpoints.characterFormAliases,
          filterParam: "characterFormId",
          columns: [
            { key: "id", label: "ID" },
            { key: "alias", label: "Character Form Alias" },
            { key: "aliasNormalized", label: "Normalized" },
            { key: "loadMethod", label: "Load Method" },
            { key: "active", label: "Active" }
          ]
        }
      ]
    }
  }
);
const CharacterFormAliasPage = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  CharacterAdminPage,
  {
    config: {
      title: "Character Form Aliases",
      description: "Manage alternate names for specific character forms.",
      newLabel: "New Character Form Alias",
      endpoint: endpoints.characterFormAliases,
      searchPlaceholder: "Search character form aliases",
      columns: [
        { key: "id", label: "ID" },
        { key: "characterFormName", label: "Character Form" },
        { key: "alias", label: "Character Form Alias" },
        { key: "aliasNormalized", label: "Normalized" },
        { key: "loadMethod", label: "Load Method" },
        { key: "active", label: "Active" }
      ],
      fields: characterFormAliasFields
    }
  }
);
const FigureCharacterPage = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  CharacterAdminPage,
  {
    config: {
      title: "Figure Characters",
      description: "Associate figures with characters and optional character forms.",
      newLabel: "New Figure Character",
      endpoint: endpoints.figureCharacters,
      searchPlaceholder: "Search figure characters",
      columns: [
        { key: "id", label: "ID" },
        { key: "figureName", label: "Figure" },
        { key: "characterName", label: "Character" },
        { key: "characterFormName", label: "Character Form" },
        { key: "primaryCharacter", label: "Primary" },
        { key: "displayOrder", label: "Order" }
      ],
      fields: figureCharacterFields
    }
  }
);
export {
  CharacterAliasPage,
  CharacterFormAliasPage,
  CharacterFormPage,
  CharacterPage,
  FigureCharacterPage
};
