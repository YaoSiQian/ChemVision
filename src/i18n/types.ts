export type Language = 'en' | 'zh';

export interface Translations {
  // Navigation & Common
  appName: string;
  search: string;
  analyze: string;
  loading: string;
  error: string;
  success: string;
  cancel: string;
  confirm: string;
  close: string;
  back: string;
  next: string;
  save: string;
  delete: string;
  edit: string;
  view: string;
  download: string;
  share: string;
  settings: string;
  language: string;
  theme: string;
  help: string;
  about: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  popularMolecules: string;
  tryExample: string;
  
  // Features Section
  featuresTitle: string;
  featuresSubtitle: string;
  feature3DTitle: string;
  feature3DDesc: string;
  featurePropertyTitle: string;
  featurePropertyDesc: string;
  featureSpectralTitle: string;
  featureSpectralDesc: string;
  featureReactionTitle: string;
  featureReactionDesc: string;
  featureLewisTitle: string;
  featureLewisDesc: string;
  featureIsomerTitle: string;
  featureIsomerDesc: string;
  
  // Result Section
  resultTitle: string;
  noResults: string;
  enterFormulaPrompt: string;
  analyzing: string;
  basicInfo: string;
  molecularStructure: string;
  electronicProperties: string;
  physicalProperties: string;
  thermodynamicData: string;
  spectralData: string;
  safetyInfo: string;
  applications: string;
  reactions: string;
  isomers: string;
  
  // Property Labels
  formula: string;
  name: string;
  iupacName: string;
  molecularWeight: string;
  molecularFormula: string;
  smiles: string;
  description: string;
  polarity: string;
  meltingPoint: string;
  boilingPoint: string;
  density: string;
  solubility: string;
  stateAtRoomTemp: string;
  totalElectrons: string;
  bondingElectrons: string;
  lonePairElectrons: string;
  sigmaBonds: string;
  piBonds: string;
  hybridization: string;
  vseprType: string;
  geometry: string;
  bondAngles: string;
  standardEnthalpyFormation: string;
  standardEnthalpyCombustion: string;
  entropy: string;
  gibbsFreeEnergy: string;
  heatCapacity: string;
  
  // Safety
  toxicityLevel: string;
  flammability: string;
  reactivity: string;
  biodegradability: string;
  hazards: string;
  
  // Application Categories
  industrial: string;
  research: string;
  everyday: string;
  
  // Reaction Types
  asReactant: string;
  asProduct: string;
  
  // States
  solid: string;
  liquid: string;
  gas: string;
  unknown: string;
  
  // Polarity
  polar: string;
  nonpolar: string;
  ionic: string;
  
  // Toxicity Levels
  low: string;
  moderate: string;
  high: string;
  veryHigh: string;
  
  // Flammability
  none: string;
  flammable: string;
  highlyFlammable: string;
  
  // Reactivity
  stable: string;
  unstable: string;
  reactive: string;
  highlyReactive: string;
  
  // Spectral
  irSpectrum: string;
  massSpectrum: string;
  wavenumber: string;
  intensity: string;
  bondType: string;
  mz: string;
  relativeIntensity: string;
  fragment: string;
  
  // 3D Viewer
  rotate: string;
  zoom: string;
  resetView: string;
  fullscreen: string;
  
  // Errors
  invalidFormula: string;
  formulaNotFound: string;
  networkError: string;
  unknownError: string;
  
  // Toast Messages
  analysisSuccess: string;
  analysisError: string;
  dataLoaded: string;
  basicDataGenerated: string;
  
  // Footer
  footerText: string;
  madeWith: string;
  
  // Language Names
  english: string;
  chinese: string;
}
