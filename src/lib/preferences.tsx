import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const PREFERENCES_STORAGE_KEY = "milo.preferences";

export type CurrencyCode = "USD" | "JPY";
export type LanguageCode = "es" | "en";

type Preferences = {
  currencyCode: CurrencyCode;
  languageCode: LanguageCode;
};

type PreferencesContextValue = Preferences & {
  setCurrencyCode: (currencyCode: CurrencyCode) => void;
  setLanguageCode: (languageCode: LanguageCode) => void;
};

const defaultPreferences: Preferences = {
  currencyCode: "USD",
  languageCode: "es",
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const isCurrencyCode = (value: unknown): value is CurrencyCode => value === "USD" || value === "JPY";
const isLanguageCode = (value: unknown): value is LanguageCode => value === "es" || value === "en";

const readStoredPreferences = (): Preferences => {
  if (typeof window === "undefined") return defaultPreferences;

  try {
    const rawPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!rawPreferences) return defaultPreferences;

    const parsed = JSON.parse(rawPreferences) as Partial<Preferences>;

    return {
      currencyCode: isCurrencyCode(parsed.currencyCode)
        ? parsed.currencyCode
        : defaultPreferences.currencyCode,
      languageCode: isLanguageCode(parsed.languageCode)
        ? parsed.languageCode
        : defaultPreferences.languageCode,
    };
  } catch {
    return defaultPreferences;
  }
};

const savePreferences = (preferences: Preferences) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
};

type PreferencesProviderProps = {
  children: ReactNode;
};

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
  const [preferences, setPreferences] = useState<Preferences>(readStoredPreferences);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      ...preferences,
      setCurrencyCode: (currencyCode) => {
        setPreferences((current) => {
          const nextPreferences = { ...current, currencyCode };
          savePreferences(nextPreferences);
          return nextPreferences;
        });
      },
      setLanguageCode: (languageCode) => {
        setPreferences((current) => {
          const nextPreferences = { ...current, languageCode };
          savePreferences(nextPreferences);
          return nextPreferences;
        });
      },
    }),
    [preferences]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
};
