import { useState, useEffect, useCallback } from 'react';
import type { Language, MoleculeData, ElementData, ElementSymbol } from '@/types/molecule';
import {
  moleculeDatabase,
  elementDatabase,
  localizeMoleculeData,
  localizeElementData,
} from './moleculeDatabase';

// Reactive database state
let currentLanguage: Language = 'en';
const listeners = new Set<() => void>();

// Subscribe to language changes
export function subscribeToLanguageChange(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// Notify all listeners
export function notifyLanguageChange(lang: Language): void {
  currentLanguage = lang;
  listeners.forEach((callback) => callback());
}

// Get current language
export function getCurrentLanguage(): Language {
  return currentLanguage;
}

// Reactive hooks for components
export function useMoleculeData(formula: string): MoleculeData | null {
  const [data, setData] = useState<MoleculeData | null>(() => {
    const raw = moleculeDatabase[formula.toUpperCase()];
    return raw ? localizeMoleculeData(raw, currentLanguage) : null;
  });

  useEffect(() => {
    const updateData = () => {
      const raw = moleculeDatabase[formula.toUpperCase()];
      setData(raw ? localizeMoleculeData(raw, currentLanguage) : null);
    };

    // Initial data
    updateData();

    // Subscribe to language changes
    const unsubscribe = subscribeToLanguageChange(updateData);
    return unsubscribe;
  }, [formula]);

  return data;
}

export function useElementData(symbol: ElementSymbol): ElementData | null {
  const [data, setData] = useState<ElementData | null>(() => {
    const raw = elementDatabase[symbol];
    return raw ? localizeElementData(raw, currentLanguage) : null;
  });

  useEffect(() => {
    const updateData = () => {
      const raw = elementDatabase[symbol];
      setData(raw ? localizeElementData(raw, currentLanguage) : null);
    };

    updateData();
    const unsubscribe = subscribeToLanguageChange(updateData);
    return unsubscribe;
  }, [symbol]);

  return data;
}

export function useAllMolecules(): MoleculeData[] {
  const [data, setData] = useState<MoleculeData[]>(() =>
    Object.values(moleculeDatabase).map((raw) => localizeMoleculeData(raw, currentLanguage))
  );

  useEffect(() => {
    const updateData = () => {
      setData(
        Object.values(moleculeDatabase).map((raw) => localizeMoleculeData(raw, currentLanguage))
      );
    };

    updateData();
    const unsubscribe = subscribeToLanguageChange(updateData);
    return unsubscribe;
  }, []);

  return data;
}

export function useSearchMolecules(query: string): MoleculeData[] {
  const [results, setResults] = useState<MoleculeData[]>([]);

  useEffect(() => {
    const performSearch = () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const normalizedQuery = query.toLowerCase();
      const matches = Object.values(moleculeDatabase).filter((molecule) => {
        const name = molecule.name[currentLanguage].toLowerCase();
        const iupacName = molecule.iupacName[currentLanguage].toLowerCase();
        const description = molecule.description[currentLanguage].toLowerCase();
        return (
          molecule.formula.toLowerCase().includes(normalizedQuery) ||
          name.includes(normalizedQuery) ||
          iupacName.includes(normalizedQuery) ||
          description.includes(normalizedQuery)
        );
      });

      setResults(matches.map((raw) => localizeMoleculeData(raw, currentLanguage)));
    };

    performSearch();
    const unsubscribe = subscribeToLanguageChange(performSearch);
    return unsubscribe;
  }, [query]);

  return results;
}

// Hook for language change callback
export function useOnLanguageChange(callback: (lang: Language) => void): void {
  useEffect(() => {
    const wrappedCallback = () => callback(currentLanguage);
    const unsubscribe = subscribeToLanguageChange(wrappedCallback);
    return unsubscribe;
  }, [callback]);
}

// Manual refresh function (if needed)
export function useRefreshMoleculeData(): () => void {
  const [, setTick] = useState(0);

  return useCallback(() => {
    setTick((t) => t + 1);
  }, []);
}
