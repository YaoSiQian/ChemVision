import type { ElementSymbol  } from '@/types/molecule';
import { elementDatabase } from '@/data/moleculeDatabase';

// 解析分子式中的元素和数量
export interface ParsedElement {
  element: ElementSymbol;
  count: number;
}

export interface ParsedFormula {
  elements: ParsedElement[];
  isValid: boolean;
  error?: string;
}

// 解析分子式
export function parseMolecularFormula(formula: string): ParsedFormula {
  const normalizedFormula = formula.replace(/\s/g, '');
  const elements: ParsedElement[] = [];
  
  // 正则表达式匹配元素符号和数量
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  
  while ((match = regex.exec(normalizedFormula)) !== null) {
    const symbol = match[1] as ElementSymbol;
    const count = match[2] ? parseInt(match[2]) : 1;
    
    if (!elementDatabase[symbol]) {
      return {
        elements: [],
        isValid: false,
        error: `Unknown element: ${symbol}`,
      };
    }
    
    const existingElement = elements.find((e) => e.element === symbol);
    if (existingElement) {
      existingElement.count += count;
    } else {
      elements.push({ element: symbol, count });
    }
  }
  
  if (elements.length === 0) {
    return {
      elements: [],
      isValid: false,
      error: 'Invalid formula format',
    };
  }
  
  return { elements, isValid: true };
}

// 计算分子量
export function calculateMolecularWeight(elements: ParsedElement[]): number {
  return elements.reduce((total, { element, count }) => {
    const elementData = elementDatabase[element];
    return total + (elementData?.atomicMass || 0) * count;
  }, 0);
}

// 计算总电子数
export function calculateTotalElectrons(elements: ParsedElement[]): number {
  return elements.reduce((total, { element, count }) => {
    const elementData = elementDatabase[element];
    return total + (elementData?.atomicNumber || 0) * count;
  }, 0);
}

// 计算价电子数
export function calculateValenceElectrons(elements: ParsedElement[]): number {
  return elements.reduce((total, { element, count }) => {
    const elementData = elementDatabase[element];
    return total + (elementData?.valenceElectrons || 0) * count;
  }, 0);
}

// 验证分子式是否有效
export function validateFormula(formula: string): boolean {
  const parsed = parseMolecularFormula(formula);
  return parsed.isValid;
}

// 格式化分子式（添加下标）
export function formatFormula(formula: string): string {
  return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}

// 获取元素的常见化合价
export function getCommonValences(element: ElementSymbol): number[] {
  return elementDatabase[element]?.commonValences || [];
}

// 推断分子类型
export function inferMoleculeType(formula: string): string {
  const parsed = parseMolecularFormula(formula);
  if (!parsed.isValid) return 'Unknown';
  
  const hasCarbon = parsed.elements.some((e) => e.element === 'C');
  const hasHydrogen = parsed.elements.some((e) => e.element === 'H');
  const hasOxygen = parsed.elements.some((e) => e.element === 'O');
  const hasNitrogen = parsed.elements.some((e) => e.element === 'N');
  
  if (hasCarbon && hasHydrogen) {
    if (hasOxygen) {
      return 'Organic (Oxygen-containing)';
    }
    return 'Hydrocarbon';
  }
  
  if (hasNitrogen && hasHydrogen) {
    return 'Amine/Ammonia derivative';
  }
  
  if (parsed.elements.length === 2) {
    return 'Binary compound';
  }
  
  return 'Inorganic compound';
}

// 推断可能的结构
export function inferPossibleStructures(formula: string): string[] {
  const parsed = parseMolecularFormula(formula);
  if (!parsed.isValid) return [];
  
  const structures: string[] = [];
  
  // 检查特定分子式
  const formulaKey = parsed.elements
    .map((e) => `${e.element}${e.count > 1 ? e.count : ''}`)
    .join('');
  
  // 常见分子的结构推断
  const commonStructures: Record<string, string[]> = {
    'H2O': ['Bent (V-shaped)'],
    'CO2': ['Linear'],
    'CH4': ['Tetrahedral'],
    'NH3': ['Trigonal pyramidal'],
    'C2H6': ['Ethane (staggered)', 'Ethane (eclipsed)'],
    'C2H4': ['Planar (Ethene)'],
    'C2H2': ['Linear (Ethyne)'],
    'C6H6': ['Benzene (planar ring)'],
  };
  
  if (commonStructures[formulaKey]) {
    structures.push(...commonStructures[formulaKey]);
  }
  
  // 基于VSEPR理论的推断
  const centerAtom = parsed.elements.find((e) => 
    ['C', 'N', 'P', 'S', 'Si'].includes(e.element)
  );
  
  if (centerAtom) {
    const valence = elementDatabase[centerAtom.element].valenceElectrons;
    const bondedAtoms = parsed.elements
      .filter((e) => e.element !== centerAtom.element)
      .reduce((sum, e) => sum + e.count, 0);
    
    // 简单的VSEPR推断
    const electronPairs = Math.ceil(valence / 2);
    const lonePairs = electronPairs - bondedAtoms;
    
    if (lonePairs >= 0) {
      const totalRegions = bondedAtoms + lonePairs;
      const vseprStructures: Record<number, string[]> = {
        2: ['Linear'],
        3: lonePairs > 0 ? ['Bent'] : ['Trigonal planar'],
        4: lonePairs === 1 ? ['Trigonal pyramidal'] : 
           lonePairs === 2 ? ['Bent'] : ['Tetrahedral'],
        5: ['Trigonal bipyramidal'],
        6: ['Octahedral'],
      };
      
      if (vseprStructures[totalRegions] && structures.length === 0) {
        structures.push(...vseprStructures[totalRegions]);
      }
    }
  }
  
  return structures.length > 0 ? structures : ['Complex structure'];
}

// 生成SMILES字符串（简化版本）
export function generateSMILES(formula: string): string | null {
  const parsed = parseMolecularFormula(formula);
  if (!parsed.isValid) return null;
  
  // 常见分子的SMILES
  const smilesMap: Record<string, string> = {
    'H2O': 'O',
    'CO2': 'O=C=O',
    'CH4': 'C',
    'NH3': 'N',
    'C2H6': 'CC',
    'C2H4': 'C=C',
    'C2H2': 'C#C',
    'C6H6': 'c1ccccc1',
    'CH3OH': 'CO',
    'C2H5OH': 'CCO',
    'CH3COOH': 'CC(=O)O',
    'HCl': 'Cl',
    'NaCl': '[Na+].[Cl-]',
  };
  
  const formulaKey = parsed.elements
    .map((e) => `${e.element}${e.count > 1 ? e.count : ''}`)
    .join('');
  
  return smilesMap[formulaKey] || null;
}

// 获取分子建议
export function getFormulaSuggestions(input: string): string[] {
  const suggestions: string[] = [];
  const commonFormulas = [
    'H2O', 'CO2', 'CH4', 'NH3', 'O2', 'N2', 'H2',
    'C2H6', 'C2H4', 'C2H2', 'C6H6', 'CH3OH', 'C2H5OH',
    'HCl', 'NaCl', 'H2SO4', 'HNO3', 'NaOH', 'CaCO3',
    'C6H12O6', 'C12H22O11', 'C8H10N4O2',
  ];
  
  const normalizedInput = input.toUpperCase();
  
  // 前缀匹配
  const prefixMatches = commonFormulas.filter((f) =>
    f.toUpperCase().startsWith(normalizedInput)
  );
  
  // 包含匹配
  const containsMatches = commonFormulas.filter((f) =>
    f.toUpperCase().includes(normalizedInput) && !f.toUpperCase().startsWith(normalizedInput)
  );
  
  suggestions.push(...prefixMatches, ...containsMatches);
  
  return suggestions.slice(0, 5);
}
