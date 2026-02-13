// 分子数据类型定义 / Molecule Data Type Definitions

export type Language = 'en' | 'zh';

export interface Atom {
  id: string;
  element: string;
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
  mass: number;
  electronegativity?: number;
}

export interface Bond {
  id: string;
  atom1: string;
  atom2: string;
  type: 'single' | 'double' | 'triple';
  length: number;
  energy?: number;
}

export interface LonePair {
  atomId: string;
  count: number;
  position: { x: number; y: number }[];
}

export interface MoleculeStructure {
  atoms: Atom[];
  bonds: Bond[];
  lonePairs: LonePair[];
}

export interface ElectronicStructure {
  totalElectrons: number;
  bondingElectrons: number;
  lonePairElectrons: number;
  sigmaBonds: number;
  piBonds: number;
  hybridization: string;
  vseprType: string;
  geometry: string;
  bondAngles: Record<string, number>;
}

export interface PhysicalProperties {
  molecularWeight: number;
  polarity: string;
  meltingPoint?: number;
  boilingPoint?: number;
  density?: number;
  solubility: string;
  stateAtRoomTemp: string;
}

export interface ThermodynamicData {
  standardEnthalpyFormation?: number;
  standardEnthalpyCombustion?: number;
  entropy?: number;
  gibbsFreeEnergy?: number;
  heatCapacity?: number;
}

export interface SpectralData {
  irPeaks: { wavenumber: number; intensity: string; bondType: string }[];
  msPeaks: { mz: number; relativeIntensity: number; fragment: string }[];
  uvVisible?: { wavelength: number; absorbance: number }[];
}

export interface SafetyData {
  toxicityLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  flammability: 'None' | 'Low' | 'Moderate' | 'High';
  reactivity: 'Stable' | 'Unstable' | 'Reactive' | 'Highly Reactive';
  biodegradability: string;
  hazards: string[];
}

export interface Application {
  industrial: string[];
  research: string[];
  everyday: string[];
}

export interface Reaction {
  asReactant: { equation: string; conditions: string }[];
  asProduct: { equation: string; conditions: string }[];
}

// 多语言文本 / Multilingual Text
export interface MultilingualText {
  en: string;
  zh: string;
}

// 多语言字符串数组 / Multilingual String Array
export interface MultilingualArray {
  en: string[];
  zh: string[];
}

// 原始分子数据（带多语言支持）/ Raw Molecule Data (with i18n support)
export interface MoleculeDataRaw {
  formula: string;
  name: MultilingualText;
  iupacName: MultilingualText;
  smiles: string;
  description: MultilingualText;
  structure: MoleculeStructure;
  electronic: ElectronicStructure;
  physical: PhysicalProperties;
  thermodynamic: ThermodynamicData;
  spectral: SpectralData;
  safety: SafetyData;
  applications: {
    industrial: MultilingualArray;
    research: MultilingualArray;
    everyday: MultilingualArray;
  };
  reactions: Reaction;
  isomers?: { name: MultilingualText; smiles: string; description: MultilingualText }[];
}

// 本地化后的分子数据 / Localized Molecule Data
export interface MoleculeData {
  formula: string;
  name: string;
  iupacName: string;
  smiles: string;
  description: string;
  structure: MoleculeStructure;
  electronic: ElectronicStructure;
  physical: PhysicalProperties;
  thermodynamic: ThermodynamicData;
  spectral: SpectralData;
  safety: SafetyData;
  applications: Application;
  reactions: Reaction;
  isomers?: { name: string; smiles: string; description: string }[];
}

export interface ViewerSettings {
  mode: 'ball-stick' | 'space-fill' | 'wireframe';
  showLabels: boolean;
  showBonds: boolean;
  backgroundColor: string;
  atomScale: number;
  bondScale: number;
}

export type ElementSymbol = 
  | 'H' | 'He' | 'Li' | 'Be' | 'B' | 'C' | 'N' | 'O' | 'F' | 'Ne'
  | 'Na' | 'Mg' | 'Al' | 'Si' | 'P' | 'S' | 'Cl' | 'Ar' | 'K' | 'Ca'
  | 'Sc' | 'Ti' | 'V' | 'Cr' | 'Mn' | 'Fe' | 'Co' | 'Ni' | 'Cu' | 'Zn'
  | 'Ga' | 'Ge' | 'As' | 'Se' | 'Br' | 'Kr' | 'Rb' | 'Sr' | 'Y' | 'Zr'
  | 'Nb' | 'Mo' | 'Tc' | 'Ru' | 'Rh' | 'Pd' | 'Ag' | 'Cd' | 'In' | 'Sn'
  | 'Sb' | 'Te' | 'I' | 'Xe' | 'Cs' | 'Ba' | 'La' | 'Ce' | 'Pr' | 'Nd'
  | 'Pm' | 'Sm' | 'Eu' | 'Gd' | 'Tb' | 'Dy' | 'Ho' | 'Er' | 'Tm' | 'Yb'
  | 'Lu' | 'Hf' | 'Ta' | 'W' | 'Re' | 'Os' | 'Ir' | 'Pt' | 'Au' | 'Hg'
  | 'Tl' | 'Pb' | 'Bi' | 'Po' | 'At' | 'Rn' | 'Fr' | 'Ra' | 'Ac' | 'Th'
  | 'Pa' | 'U' | 'Np' | 'Pu' | 'Am' | 'Cm' | 'Bk' | 'Cf' | 'Es' | 'Fm'
  | 'Md' | 'No' | 'Lr' | 'Rf' | 'Db' | 'Sg' | 'Bh' | 'Hs' | 'Mt' | 'Ds'
  | 'Rg' | 'Cn' | 'Nh' | 'Fl' | 'Mc' | 'Lv' | 'Ts' | 'Og';

// 原始元素数据（带多语言支持）/ Raw Element Data (with i18n support)
export interface ElementDataRaw {
  symbol: ElementSymbol;
  name: MultilingualText;
  atomicNumber: number;
  atomicMass: number;
  color: string;
  covalentRadius: number;
  vanDerWaalsRadius: number;
  valenceElectrons: number;
  commonValences: number[];
}

// 本地化后的元素数据 / Localized Element Data
export interface ElementData {
  symbol: ElementSymbol;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  color: string;
  covalentRadius: number;
  vanDerWaalsRadius: number;
  valenceElectrons: number;
  commonValences: number[];
}
