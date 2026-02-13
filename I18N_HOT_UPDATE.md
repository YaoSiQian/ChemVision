# Database i18n Hot Update System

## Overview

The molecule database now supports **hot updates** - when the user changes the language, all molecule data automatically updates without requiring a page reload.

## Architecture

### 1. **Reactive Database Layer** (`src/data/moleculeDatabaseHooks.ts`)

```typescript
// Global state
let currentLanguage: Language = 'en';
const listeners = new Set<() => void>();

// Notify all subscribers when language changes
export function notifyLanguageChange(lang: Language): void {
  currentLanguage = lang;
  listeners.forEach((callback) => callback());
}

// Hook for components to get reactive molecule data
export function useMoleculeData(formula: string): MoleculeData | null {
  const [data, setData] = useState<MoleculeData | null>(...);
  
  useEffect(() => {
    const updateData = () => {
      // Re-fetch localized data when language changes
      const raw = moleculeDatabase[formula.toUpperCase()];
      setData(raw ? localizeMoleculeData(raw, currentLanguage) : null);
    };
    
    // Subscribe to language changes
    const unsubscribe = subscribeToLanguageChange(updateData);
    return unsubscribe;
  }, [formula]);
  
  return data;
}
```

### 2. **Integration with LanguageContext**

When the user changes language:
```typescript
const setLanguage = useCallback((lang: Language) => {
  setLanguageState(lang);
  localStorage.setItem(STORAGE_KEY, lang);
  // 🔥 Notify database to update all localized data
  notifyLanguageChange(lang);
}, []);
```

### 3. **Component-Level Hot Updates**

#### App.tsx (Main Controller)
```typescript
// Hot update: Refresh molecule data when language changes
useEffect(() => {
  if (currentFormula && molecule && !isLoading) {
    const updatedData = getMoleculeData(currentFormula, language);
    if (updatedData) {
      setMolecule(updatedData); // 🔄 Updates the displayed molecule
    }
  }
}, [language, currentFormula]);
```

#### LewisStructure.tsx (SVG Component)
```typescript
// Uses reactive hook - automatically updates when language changes
const AtomComponent = ({ atom }: { atom: PositionedAtom }) => {
  const elementData = useElementData(atom.element as ElementSymbol);
  // elementData.name automatically updates when language changes!
  const color = atom.color || elementData?.color || '#94a3b8';
  // ...
};
```

#### Molecule3DViewer.tsx (Canvas Component)
```typescript
// Hidden fetcher components update element data in real-time
<div style={{ display: 'none' }}>
  {uniqueElements.map((element) => (
    <ElementDataFetcher
      key={element}
      element={element}
      onData={handleElementData} // Updates ref when language changes
    />
  ))}
</div>
```

## How It Works

1. **User clicks language switcher** → `setLanguage('zh')`
2. **LanguageContext updates** → calls `notifyLanguageChange('zh')`
3. **All subscribers are notified**:
   - `useMoleculeData` hooks re-fetch localized data
   - `useElementData` hooks re-fetch element names
   - App.tsx useEffect updates the displayed molecule
4. **Components automatically re-render** with new language data
5. **Canvas redraws** with updated element names/colors

## Available Hooks

| Hook | Purpose |
|------|---------|
| `useMoleculeData(formula)` | Get reactive molecule data |
| `useElementData(symbol)` | Get reactive element data |
| `useAllMolecules()` | Get all molecules (reactive) |
| `useSearchMolecules(query)` | Search molecules (reactive) |
| `useOnLanguageChange(callback)` | Execute callback on language change |

## Example Usage

```typescript
// In a component that displays molecule info
import { useMoleculeData } from '@/data/moleculeDatabase';

function MoleculeDisplay({ formula }: { formula: string }) {
  // Automatically updates when language changes!
  const molecule = useMoleculeData(formula);
  
  if (!molecule) return <div>Not found</div>;
  
  return (
    <div>
      <h1>{molecule.name}</h1> {/* Updates automatically! */}
      <p>{molecule.description}</p> {/* Updates automatically! */}
    </div>
  );
}
```

## Benefits

✅ **Instant Updates** - No page reload required
✅ **Automatic Propagation** - All components update automatically
✅ **Performance Optimized** - Only re-localizes data when language changes
✅ **Type Safe** - Full TypeScript support
✅ **Easy to Use** - Just use the hooks instead of direct database calls

## Migration Guide

**Before (manual):**
```typescript
const data = getMoleculeData(formula, language); // Static, won't update
```

**After (reactive):**
```typescript
const data = useMoleculeData(formula); // Reactive, auto-updates!
```

For non-React contexts, use the subscription system:
```typescript
const unsubscribe = subscribeToLanguageChange(() => {
  // Re-fetch your data here
});
```
