import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n';
import { Search, X, Sparkles, History } from 'lucide-react';
import { getFormulaSuggestions } from '@/utils/moleculeParser';

interface MoleculeSearchProps {
  onSearch: (formula: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const MoleculeSearch: React.FC<MoleculeSearchProps> = ({
  onSearch,
  isLoading = false,
  className = '',
}) => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);
  
  // Save recent search
  const saveRecentSearch = (formula: string) => {
    const updated = [formula, ...recentSearches.filter((s) => s !== formula)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.length > 0) {
      const newSuggestions = getFormulaSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  // Handle search
  const handleSearch = (formula: string) => {
    if (!formula.trim()) return;
    
    setInput(formula);
    setShowSuggestions(false);
    saveRecentSearch(formula);
    onSearch(formula);
  };
  
  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(input);
  };
  
  // Clear input
  const handleClear = () => {
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };
  
  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Search icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">
            <Search className="w-5 h-5" />
          </div>
          
          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onFocus={() => {
              if (input.length > 0) setShowSuggestions(true);
              if (input.length === 0 && recentSearches.length > 0) setShowSuggestions(true);
            }}
            placeholder={t.searchPlaceholder}
            className="w-full h-14 pl-12 pr-24 bg-surface-container-low border-0 border-b-2 border-outline rounded-t-[12px] rounded-bl-none rounded-br-none text-foreground placeholder-on-surface-variant/60 focus:outline-none focus:border-b-2 focus:border-b-primary transition-colors duration-200"
            disabled={isLoading}
          />
          
          {/* Clear button */}
          {input && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant/60 hover:text-on-surface-variant transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Search button */}
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-md-primary text-primary-foreground rounded-full font-medium hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.searchButton}</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && (suggestions.length > 0 || (input.length === 0 && recentSearches.length > 0)) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container border border-outline rounded-[16px] overflow-hidden shadow-md z-50">
          {/* Recent searches */}
          {input.length === 0 && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface-variant">
                <History className="w-3 h-3" />
                <span>{language === 'zh' ? '最近搜索' : 'Recent Searches'}</span>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={`recent-${index}`}
                  onClick={() => handleSearch(search)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-md-primary/5 rounded-[20px] transition-colors text-left"
                >
                  <History className="w-4 h-4 text-on-surface-variant" />
                  <span className="text-foreground">{search}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Search suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs text-on-surface-variant">
                {language === 'zh' ? '建议' : 'Suggestions'}
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-md-primary/5 rounded-[20px] transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-on-surface-variant" />
                  <span className="text-foreground">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoleculeSearch;
