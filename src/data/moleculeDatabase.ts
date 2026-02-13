import type { MoleculeDataRaw, ElementDataRaw, ElementSymbol, Language, MoleculeData, ElementData } from '@/types/molecule';

// 元素周期表数据 / Element Periodic Table Data
export const elementDatabase: Record<ElementSymbol, ElementDataRaw> = {
  H: { symbol: 'H', name: { en: 'Hydrogen', zh: '氢' }, atomicNumber: 1, atomicMass: 1.008, color: '#FFFFFF', covalentRadius: 0.31, vanDerWaalsRadius: 1.20, valenceElectrons: 1, commonValences: [1] },
  He: { symbol: 'He', name: { en: 'Helium', zh: '氦' }, atomicNumber: 2, atomicMass: 4.003, color: '#D9FFFF', covalentRadius: 0.28, vanDerWaalsRadius: 1.40, valenceElectrons: 2, commonValences: [0] },
  Li: { symbol: 'Li', name: { en: 'Lithium', zh: '锂' }, atomicNumber: 3, atomicMass: 6.941, color: '#CC80FF', covalentRadius: 1.28, vanDerWaalsRadius: 1.82, valenceElectrons: 1, commonValences: [1] },
  Be: { symbol: 'Be', name: { en: 'Beryllium', zh: '铍' }, atomicNumber: 4, atomicMass: 9.012, color: '#C2FF00', covalentRadius: 0.96, vanDerWaalsRadius: 1.53, valenceElectrons: 2, commonValences: [2] },
  B: { symbol: 'B', name: { en: 'Boron', zh: '硼' }, atomicNumber: 5, atomicMass: 10.811, color: '#FFB5B5', covalentRadius: 0.84, vanDerWaalsRadius: 1.92, valenceElectrons: 3, commonValences: [3] },
  C: { symbol: 'C', name: { en: 'Carbon', zh: '碳' }, atomicNumber: 6, atomicMass: 12.011, color: '#909090', covalentRadius: 0.76, vanDerWaalsRadius: 1.70, valenceElectrons: 4, commonValences: [4] },
  N: { symbol: 'N', name: { en: 'Nitrogen', zh: '氮' }, atomicNumber: 7, atomicMass: 14.007, color: '#3050F8', covalentRadius: 0.71, vanDerWaalsRadius: 1.55, valenceElectrons: 5, commonValences: [3] },
  O: { symbol: 'O', name: { en: 'Oxygen', zh: '氧' }, atomicNumber: 8, atomicMass: 15.999, color: '#FF0D0D', covalentRadius: 0.66, vanDerWaalsRadius: 1.52, valenceElectrons: 6, commonValences: [2] },
  F: { symbol: 'F', name: { en: 'Fluorine', zh: '氟' }, atomicNumber: 9, atomicMass: 18.998, color: '#90E050', covalentRadius: 0.57, vanDerWaalsRadius: 1.47, valenceElectrons: 7, commonValences: [1] },
  Ne: { symbol: 'Ne', name: { en: 'Neon', zh: '氖' }, atomicNumber: 10, atomicMass: 20.180, color: '#B3E3F5', covalentRadius: 0.58, vanDerWaalsRadius: 1.54, valenceElectrons: 8, commonValences: [0] },
  Na: { symbol: 'Na', name: { en: 'Sodium', zh: '钠' }, atomicNumber: 11, atomicMass: 22.990, color: '#AB5CF2', covalentRadius: 1.66, vanDerWaalsRadius: 2.27, valenceElectrons: 1, commonValences: [1] },
  Mg: { symbol: 'Mg', name: { en: 'Magnesium', zh: '镁' }, atomicNumber: 12, atomicMass: 24.305, color: '#8AFF00', covalentRadius: 1.41, vanDerWaalsRadius: 1.73, valenceElectrons: 2, commonValences: [2] },
  Al: { symbol: 'Al', name: { en: 'Aluminum', zh: '铝' }, atomicNumber: 13, atomicMass: 26.982, color: '#BFA6A6', covalentRadius: 1.21, vanDerWaalsRadius: 1.84, valenceElectrons: 3, commonValences: [3] },
  Si: { symbol: 'Si', name: { en: 'Silicon', zh: '硅' }, atomicNumber: 14, atomicMass: 28.086, color: '#F0C8A0', covalentRadius: 1.11, vanDerWaalsRadius: 2.10, valenceElectrons: 4, commonValences: [4] },
  P: { symbol: 'P', name: { en: 'Phosphorus', zh: '磷' }, atomicNumber: 15, atomicMass: 30.974, color: '#FF8000', covalentRadius: 1.07, vanDerWaalsRadius: 1.80, valenceElectrons: 5, commonValences: [3, 5] },
  S: { symbol: 'S', name: { en: 'Sulfur', zh: '硫' }, atomicNumber: 16, atomicMass: 32.065, color: '#FFFF30', covalentRadius: 1.05, vanDerWaalsRadius: 1.80, valenceElectrons: 6, commonValences: [2] },
  Cl: { symbol: 'Cl', name: { en: 'Chlorine', zh: '氯' }, atomicNumber: 17, atomicMass: 35.453, color: '#1FF01F', covalentRadius: 1.02, vanDerWaalsRadius: 1.75, valenceElectrons: 7, commonValences: [1] },
  Ar: { symbol: 'Ar', name: { en: 'Argon', zh: '氩' }, atomicNumber: 18, atomicMass: 39.948, color: '#80D1E3', covalentRadius: 1.06, vanDerWaalsRadius: 1.88, valenceElectrons: 8, commonValences: [0] },
  K: { symbol: 'K', name: { en: 'Potassium', zh: '钾' }, atomicNumber: 19, atomicMass: 39.098, color: '#8F40D4', covalentRadius: 2.03, vanDerWaalsRadius: 2.75, valenceElectrons: 1, commonValences: [1] },
  Ca: { symbol: 'Ca', name: { en: 'Calcium', zh: '钙' }, atomicNumber: 20, atomicMass: 40.078, color: '#3DFF00', covalentRadius: 1.76, vanDerWaalsRadius: 2.31, valenceElectrons: 2, commonValences: [2] },
  Sc: { symbol: 'Sc', name: { en: 'Scandium', zh: '钪' }, atomicNumber: 21, atomicMass: 44.956, color: '#E6E6E6', covalentRadius: 1.70, vanDerWaalsRadius: 2.11, valenceElectrons: 3, commonValences: [3] },
  Ti: { symbol: 'Ti', name: { en: 'Titanium', zh: '钛' }, atomicNumber: 22, atomicMass: 47.867, color: '#BFC2C7', covalentRadius: 1.60, vanDerWaalsRadius: 2.15, valenceElectrons: 4, commonValences: [4] },
  V: { symbol: 'V', name: { en: 'Vanadium', zh: '钒' }, atomicNumber: 23, atomicMass: 50.942, color: '#A6A6AB', covalentRadius: 1.53, vanDerWaalsRadius: 2.05, valenceElectrons: 5, commonValences: [5] },
  Cr: { symbol: 'Cr', name: { en: 'Chromium', zh: '铬' }, atomicNumber: 24, atomicMass: 51.996, color: '#8A99C7', covalentRadius: 1.39, vanDerWaalsRadius: 2.00, valenceElectrons: 6, commonValences: [3, 6] },
  Mn: { symbol: 'Mn', name: { en: 'Manganese', zh: '锰' }, atomicNumber: 25, atomicMass: 54.938, color: '#9C7AC7', covalentRadius: 1.39, vanDerWaalsRadius: 2.05, valenceElectrons: 7, commonValences: [2, 4, 7] },
  Fe: { symbol: 'Fe', name: { en: 'Iron', zh: '铁' }, atomicNumber: 26, atomicMass: 55.845, color: '#E06633', covalentRadius: 1.32, vanDerWaalsRadius: 2.05, valenceElectrons: 8, commonValences: [2, 3] },
  Co: { symbol: 'Co', name: { en: 'Cobalt', zh: '钴' }, atomicNumber: 27, atomicMass: 58.933, color: '#F090A0', covalentRadius: 1.26, vanDerWaalsRadius: 2.00, valenceElectrons: 9, commonValences: [2, 3] },
  Ni: { symbol: 'Ni', name: { en: 'Nickel', zh: '镍' }, atomicNumber: 28, atomicMass: 58.693, color: '#50D050', covalentRadius: 1.21, vanDerWaalsRadius: 2.00, valenceElectrons: 10, commonValences: [2] },
  Cu: { symbol: 'Cu', name: { en: 'Copper', zh: '铜' }, atomicNumber: 29, atomicMass: 63.546, color: '#C78033', covalentRadius: 1.38, vanDerWaalsRadius: 2.00, valenceElectrons: 11, commonValences: [1, 2] },
  Zn: { symbol: 'Zn', name: { en: 'Zinc', zh: '锌' }, atomicNumber: 30, atomicMass: 65.380, color: '#7D80B0', covalentRadius: 1.31, vanDerWaalsRadius: 2.10, valenceElectrons: 12, commonValences: [2] },
  Ga: { symbol: 'Ga', name: { en: 'Gallium', zh: '镓' }, atomicNumber: 31, atomicMass: 69.723, color: '#C28F8F', covalentRadius: 1.26, vanDerWaalsRadius: 1.87, valenceElectrons: 13, commonValences: [3] },
  Ge: { symbol: 'Ge', name: { en: 'Germanium', zh: '锗' }, atomicNumber: 32, atomicMass: 72.640, color: '#668F8F', covalentRadius: 1.22, vanDerWaalsRadius: 2.11, valenceElectrons: 14, commonValences: [4] },
  As: { symbol: 'As', name: { en: 'Arsenic', zh: '砷' }, atomicNumber: 33, atomicMass: 74.922, color: '#BD80E3', covalentRadius: 1.19, vanDerWaalsRadius: 1.85, valenceElectrons: 15, commonValences: [3, 5] },
  Se: { symbol: 'Se', name: { en: 'Selenium', zh: '硒' }, atomicNumber: 34, atomicMass: 78.960, color: '#FFA100', covalentRadius: 1.20, vanDerWaalsRadius: 1.90, valenceElectrons: 16, commonValences: [2, 4, 6] },
  Br: { symbol: 'Br', name: { en: 'Bromine', zh: '溴' }, atomicNumber: 35, atomicMass: 79.904, color: '#A62929', covalentRadius: 1.20, vanDerWaalsRadius: 1.85, valenceElectrons: 17, commonValences: [1] },
  Kr: { symbol: 'Kr', name: { en: 'Krypton', zh: '氪' }, atomicNumber: 36, atomicMass: 83.798, color: '#5CB8D1', covalentRadius: 1.16, vanDerWaalsRadius: 2.02, valenceElectrons: 18, commonValences: [0] },
  Rb: { symbol: 'Rb', name: { en: 'Rubidium', zh: '铷' }, atomicNumber: 37, atomicMass: 85.468, color: '#702EB0', covalentRadius: 2.20, vanDerWaalsRadius: 3.03, valenceElectrons: 1, commonValences: [1] },
  Sr: { symbol: 'Sr', name: { en: 'Strontium', zh: '锶' }, atomicNumber: 38, atomicMass: 87.620, color: '#00FF00', covalentRadius: 1.95, vanDerWaalsRadius: 2.49, valenceElectrons: 2, commonValences: [2] },
  Y: { symbol: 'Y', name: { en: 'Yttrium', zh: '钇' }, atomicNumber: 39, atomicMass: 88.906, color: '#94FFFF', covalentRadius: 1.90, vanDerWaalsRadius: 2.20, valenceElectrons: 3, commonValences: [3] },
  Zr: { symbol: 'Zr', name: { en: 'Zirconium', zh: '锆' }, atomicNumber: 40, atomicMass: 91.224, color: '#94E0E0', covalentRadius: 1.75, vanDerWaalsRadius: 2.20, valenceElectrons: 4, commonValences: [4] },
  Nb: { symbol: 'Nb', name: { en: 'Niobium', zh: '铌' }, atomicNumber: 41, atomicMass: 92.906, color: '#73C2C9', covalentRadius: 1.64, vanDerWaalsRadius: 2.10, valenceElectrons: 5, commonValences: [5] },
  Mo: { symbol: 'Mo', name: { en: 'Molybdenum', zh: '钼' }, atomicNumber: 42, atomicMass: 95.960, color: '#54B5B5', covalentRadius: 1.54, vanDerWaalsRadius: 2.10, valenceElectrons: 6, commonValences: [6] },
  Tc: { symbol: 'Tc', name: { en: 'Technetium', zh: '锝' }, atomicNumber: 43, atomicMass: 98.000, color: '#3B9E9E', covalentRadius: 1.47, vanDerWaalsRadius: 2.05, valenceElectrons: 7, commonValences: [7] },
  Ru: { symbol: 'Ru', name: { en: 'Ruthenium', zh: '钌' }, atomicNumber: 44, atomicMass: 101.070, color: '#248F8F', covalentRadius: 1.46, vanDerWaalsRadius: 2.05, valenceElectrons: 8, commonValences: [3, 4] },
  Rh: { symbol: 'Rh', name: { en: 'Rhodium', zh: '铑' }, atomicNumber: 45, atomicMass: 102.906, color: '#0A7D8C', covalentRadius: 1.42, vanDerWaalsRadius: 2.00, valenceElectrons: 9, commonValences: [3] },
  Pd: { symbol: 'Pd', name: { en: 'Palladium', zh: '钯' }, atomicNumber: 46, atomicMass: 106.420, color: '#006985', covalentRadius: 1.39, vanDerWaalsRadius: 2.05, valenceElectrons: 10, commonValences: [2, 4] },
  Ag: { symbol: 'Ag', name: { en: 'Silver', zh: '银' }, atomicNumber: 47, atomicMass: 107.868, color: '#C0C0C0', covalentRadius: 1.45, vanDerWaalsRadius: 2.10, valenceElectrons: 11, commonValences: [1] },
  Cd: { symbol: 'Cd', name: { en: 'Cadmium', zh: '镉' }, atomicNumber: 48, atomicMass: 112.411, color: '#FFD98F', covalentRadius: 1.44, vanDerWaalsRadius: 2.20, valenceElectrons: 12, commonValences: [2] },
  In: { symbol: 'In', name: { en: 'Indium', zh: '铟' }, atomicNumber: 49, atomicMass: 114.818, color: '#A67573', covalentRadius: 1.42, vanDerWaalsRadius: 2.20, valenceElectrons: 13, commonValences: [3] },
  Sn: { symbol: 'Sn', name: { en: 'Tin', zh: '锡' }, atomicNumber: 50, atomicMass: 118.710, color: '#668080', covalentRadius: 1.39, vanDerWaalsRadius: 2.25, valenceElectrons: 14, commonValences: [2, 4] },
  Sb: { symbol: 'Sb', name: { en: 'Antimony', zh: '锑' }, atomicNumber: 51, atomicMass: 121.760, color: '#9E63B5', covalentRadius: 1.39, vanDerWaalsRadius: 2.20, valenceElectrons: 15, commonValences: [3, 5] },
  Te: { symbol: 'Te', name: { en: 'Tellurium', zh: '碲' }, atomicNumber: 52, atomicMass: 127.600, color: '#D47A00', covalentRadius: 1.38, vanDerWaalsRadius: 2.10, valenceElectrons: 16, commonValences: [2, 4, 6] },
  I: { symbol: 'I', name: { en: 'Iodine', zh: '碘' }, atomicNumber: 53, atomicMass: 126.904, color: '#940094', covalentRadius: 1.39, vanDerWaalsRadius: 1.98, valenceElectrons: 17, commonValences: [1] },
  Xe: { symbol: 'Xe', name: { en: 'Xenon', zh: '氙' }, atomicNumber: 54, atomicMass: 131.293, color: '#429EB0', covalentRadius: 1.40, vanDerWaalsRadius: 2.16, valenceElectrons: 18, commonValences: [0] },
  Cs: { symbol: 'Cs', name: { en: 'Cesium', zh: '铯' }, atomicNumber: 55, atomicMass: 132.905, color: '#57178F', covalentRadius: 2.44, vanDerWaalsRadius: 3.43, valenceElectrons: 1, commonValences: [1] },
  Ba: { symbol: 'Ba', name: { en: 'Barium', zh: '钡' }, atomicNumber: 56, atomicMass: 137.327, color: '#00C900', covalentRadius: 2.15, vanDerWaalsRadius: 2.68, valenceElectrons: 2, commonValences: [2] },
  La: { symbol: 'La', name: { en: 'Lanthanum', zh: '镧' }, atomicNumber: 57, atomicMass: 138.905, color: '#70D4FF', covalentRadius: 2.07, vanDerWaalsRadius: 2.50, valenceElectrons: 3, commonValences: [3] },
  Ce: { symbol: 'Ce', name: { en: 'Cerium', zh: '铈' }, atomicNumber: 58, atomicMass: 140.116, color: '#FFFFC7', covalentRadius: 2.04, vanDerWaalsRadius: 2.48, valenceElectrons: 4, commonValences: [3, 4] },
  Pr: { symbol: 'Pr', name: { en: 'Praseodymium', zh: '镨' }, atomicNumber: 59, atomicMass: 140.908, color: '#D9FFC7', covalentRadius: 2.03, vanDerWaalsRadius: 2.47, valenceElectrons: 5, commonValences: [3] },
  Nd: { symbol: 'Nd', name: { en: 'Neodymium', zh: '钕' }, atomicNumber: 60, atomicMass: 144.242, color: '#C7FFC7', covalentRadius: 2.01, vanDerWaalsRadius: 2.45, valenceElectrons: 6, commonValences: [3] },
  Pm: { symbol: 'Pm', name: { en: 'Promethium', zh: '钷' }, atomicNumber: 61, atomicMass: 145.000, color: '#A3FFC7', covalentRadius: 1.99, vanDerWaalsRadius: 2.43, valenceElectrons: 7, commonValences: [3] },
  Sm: { symbol: 'Sm', name: { en: 'Samarium', zh: '钐' }, atomicNumber: 62, atomicMass: 150.360, color: '#8FFFC7', covalentRadius: 1.98, vanDerWaalsRadius: 2.42, valenceElectrons: 8, commonValences: [3] },
  Eu: { symbol: 'Eu', name: { en: 'Europium', zh: '铕' }, atomicNumber: 63, atomicMass: 151.964, color: '#61FFC7', covalentRadius: 1.98, vanDerWaalsRadius: 2.40, valenceElectrons: 9, commonValences: [3] },
  Gd: { symbol: 'Gd', name: { en: 'Gadolinium', zh: '钆' }, atomicNumber: 64, atomicMass: 157.250, color: '#45FFC7', covalentRadius: 1.96, vanDerWaalsRadius: 2.38, valenceElectrons: 10, commonValences: [3] },
  Tb: { symbol: 'Tb', name: { en: 'Terbium', zh: '铽' }, atomicNumber: 65, atomicMass: 158.925, color: '#30FFC7', covalentRadius: 1.94, vanDerWaalsRadius: 2.37, valenceElectrons: 11, commonValences: [3] },
  Dy: { symbol: 'Dy', name: { en: 'Dysprosium', zh: '镝' }, atomicNumber: 66, atomicMass: 162.500, color: '#1FFFC7', covalentRadius: 1.92, vanDerWaalsRadius: 2.35, valenceElectrons: 12, commonValences: [3] },
  Ho: { symbol: 'Ho', name: { en: 'Holmium', zh: '钬' }, atomicNumber: 67, atomicMass: 164.930, color: '#00FF9C', covalentRadius: 1.92, vanDerWaalsRadius: 2.33, valenceElectrons: 13, commonValences: [3] },
  Er: { symbol: 'Er', name: { en: 'Erbium', zh: '铒' }, atomicNumber: 68, atomicMass: 167.259, color: '#00E675', covalentRadius: 1.89, vanDerWaalsRadius: 2.32, valenceElectrons: 14, commonValences: [3] },
  Tm: { symbol: 'Tm', name: { en: 'Thulium', zh: '铥' }, atomicNumber: 69, atomicMass: 168.934, color: '#00D452', covalentRadius: 1.90, vanDerWaalsRadius: 2.30, valenceElectrons: 15, commonValences: [3] },
  Yb: { symbol: 'Yb', name: { en: 'Ytterbium', zh: '镱' }, atomicNumber: 70, atomicMass: 173.054, color: '#00BF38', covalentRadius: 1.87, vanDerWaalsRadius: 2.28, valenceElectrons: 16, commonValences: [3] },
  Lu: { symbol: 'Lu', name: { en: 'Lutetium', zh: '镥' }, atomicNumber: 71, atomicMass: 174.967, color: '#00AB24', covalentRadius: 1.87, vanDerWaalsRadius: 2.27, valenceElectrons: 17, commonValences: [3] },
  Hf: { symbol: 'Hf', name: { en: 'Hafnium', zh: '铪' }, atomicNumber: 72, atomicMass: 178.490, color: '#4DC2FF', covalentRadius: 1.75, vanDerWaalsRadius: 2.25, valenceElectrons: 4, commonValences: [4] },
  Ta: { symbol: 'Ta', name: { en: 'Tantalum', zh: '钽' }, atomicNumber: 73, atomicMass: 180.948, color: '#4DA6FF', covalentRadius: 1.70, vanDerWaalsRadius: 2.20, valenceElectrons: 5, commonValences: [5] },
  W: { symbol: 'W', name: { en: 'Tungsten', zh: '钨' }, atomicNumber: 74, atomicMass: 183.840, color: '#2194D6', covalentRadius: 1.62, vanDerWaalsRadius: 2.10, valenceElectrons: 6, commonValences: [6] },
  Re: { symbol: 'Re', name: { en: 'Rhenium', zh: '铼' }, atomicNumber: 75, atomicMass: 186.207, color: '#267DAB', covalentRadius: 1.51, vanDerWaalsRadius: 2.05, valenceElectrons: 7, commonValences: [7] },
  Os: { symbol: 'Os', name: { en: 'Osmium', zh: '锇' }, atomicNumber: 76, atomicMass: 190.230, color: '#266696', covalentRadius: 1.44, vanDerWaalsRadius: 2.00, valenceElectrons: 8, commonValences: [4] },
  Ir: { symbol: 'Ir', name: { en: 'Iridium', zh: '铱' }, atomicNumber: 77, atomicMass: 192.217, color: '#175487', covalentRadius: 1.41, vanDerWaalsRadius: 2.00, valenceElectrons: 9, commonValences: [4] },
  Pt: { symbol: 'Pt', name: { en: 'Platinum', zh: '铂' }, atomicNumber: 78, atomicMass: 195.084, color: '#D0D0E0', covalentRadius: 1.36, vanDerWaalsRadius: 2.05, valenceElectrons: 10, commonValences: [4] },
  Au: { symbol: 'Au', name: { en: 'Gold', zh: '金' }, atomicNumber: 79, atomicMass: 196.967, color: '#FFD123', covalentRadius: 1.36, vanDerWaalsRadius: 2.10, valenceElectrons: 11, commonValences: [3] },
  Hg: { symbol: 'Hg', name: { en: 'Mercury', zh: '汞' }, atomicNumber: 80, atomicMass: 200.590, color: '#B8B8D0', covalentRadius: 1.32, vanDerWaalsRadius: 2.05, valenceElectrons: 12, commonValences: [2] },
  Tl: { symbol: 'Tl', name: { en: 'Thallium', zh: '铊' }, atomicNumber: 81, atomicMass: 204.383, color: '#A6544D', covalentRadius: 1.45, vanDerWaalsRadius: 2.20, valenceElectrons: 13, commonValences: [1, 3] },
  Pb: { symbol: 'Pb', name: { en: 'Lead', zh: '铅' }, atomicNumber: 82, atomicMass: 207.200, color: '#575961', covalentRadius: 1.46, vanDerWaalsRadius: 2.30, valenceElectrons: 14, commonValences: [2, 4] },
  Bi: { symbol: 'Bi', name: { en: 'Bismuth', zh: '铋' }, atomicNumber: 83, atomicMass: 208.980, color: '#9E4FB5', covalentRadius: 1.48, vanDerWaalsRadius: 2.30, valenceElectrons: 15, commonValences: [3] },
  Po: { symbol: 'Po', name: { en: 'Polonium', zh: '钋' }, atomicNumber: 84, atomicMass: 209.000, color: '#AB5C00', covalentRadius: 1.40, vanDerWaalsRadius: 2.00, valenceElectrons: 16, commonValences: [2, 4] },
  At: { symbol: 'At', name: { en: 'Astatine', zh: '砹' }, atomicNumber: 85, atomicMass: 210.000, color: '#754F45', covalentRadius: 1.50, vanDerWaalsRadius: 2.00, valenceElectrons: 17, commonValences: [1] },
  Rn: { symbol: 'Rn', name: { en: 'Radon', zh: '氡' }, atomicNumber: 86, atomicMass: 222.000, color: '#428296', covalentRadius: 1.50, vanDerWaalsRadius: 2.00, valenceElectrons: 18, commonValences: [0] },
  Fr: { symbol: 'Fr', name: { en: 'Francium', zh: '钫' }, atomicNumber: 87, atomicMass: 223.000, color: '#420066', covalentRadius: 2.60, vanDerWaalsRadius: 2.00, valenceElectrons: 1, commonValences: [1] },
  Ra: { symbol: 'Ra', name: { en: 'Radium', zh: '镭' }, atomicNumber: 88, atomicMass: 226.000, color: '#007D00', covalentRadius: 2.21, vanDerWaalsRadius: 2.00, valenceElectrons: 2, commonValences: [2] },
  Ac: { symbol: 'Ac', name: { en: 'Actinium', zh: '锕' }, atomicNumber: 89, atomicMass: 227.000, color: '#70ABFA', covalentRadius: 2.15, vanDerWaalsRadius: 2.00, valenceElectrons: 3, commonValences: [3] },
  Th: { symbol: 'Th', name: { en: 'Thorium', zh: '钍' }, atomicNumber: 90, atomicMass: 232.038, color: '#00BAFF', covalentRadius: 2.06, vanDerWaalsRadius: 2.00, valenceElectrons: 4, commonValences: [4] },
  Pa: { symbol: 'Pa', name: { en: 'Protactinium', zh: '镤' }, atomicNumber: 91, atomicMass: 231.036, color: '#00A1FF', covalentRadius: 2.00, vanDerWaalsRadius: 2.00, valenceElectrons: 5, commonValences: [5] },
  U: { symbol: 'U', name: { en: 'Uranium', zh: '铀' }, atomicNumber: 92, atomicMass: 238.029, color: '#008FFF', covalentRadius: 1.96, vanDerWaalsRadius: 2.00, valenceElectrons: 6, commonValences: [6] },
  Np: { symbol: 'Np', name: { en: 'Neptunium', zh: '镎' }, atomicNumber: 93, atomicMass: 237.000, color: '#0080FF', covalentRadius: 1.90, vanDerWaalsRadius: 2.00, valenceElectrons: 7, commonValences: [5] },
  Pu: { symbol: 'Pu', name: { en: 'Plutonium', zh: '钚' }, atomicNumber: 94, atomicMass: 244.000, color: '#006BFF', covalentRadius: 1.87, vanDerWaalsRadius: 2.00, valenceElectrons: 8, commonValences: [4] },
  Am: { symbol: 'Am', name: { en: 'Americium', zh: '镅' }, atomicNumber: 95, atomicMass: 243.000, color: '#545CF2', covalentRadius: 1.80, vanDerWaalsRadius: 2.00, valenceElectrons: 9, commonValences: [3] },
  Cm: { symbol: 'Cm', name: { en: 'Curium', zh: '锔' }, atomicNumber: 96, atomicMass: 247.000, color: '#785CE3', covalentRadius: 1.69, vanDerWaalsRadius: 2.00, valenceElectrons: 10, commonValences: [3] },
  Bk: { symbol: 'Bk', name: { en: 'Berkelium', zh: '锫' }, atomicNumber: 97, atomicMass: 247.000, color: '#8A4FE3', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 11, commonValences: [3] },
  Cf: { symbol: 'Cf', name: { en: 'Californium', zh: '锎' }, atomicNumber: 98, atomicMass: 251.000, color: '#A136D4', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 12, commonValences: [3] },
  Es: { symbol: 'Es', name: { en: 'Einsteinium', zh: '锿' }, atomicNumber: 99, atomicMass: 252.000, color: '#B31FD4', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 13, commonValences: [3] },
  Fm: { symbol: 'Fm', name: { en: 'Fermium', zh: '镄' }, atomicNumber: 100, atomicMass: 257.000, color: '#B31FBA', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 14, commonValences: [3] },
  Md: { symbol: 'Md', name: { en: 'Mendelevium', zh: '钔' }, atomicNumber: 101, atomicMass: 258.000, color: '#B30DA6', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 15, commonValences: [3] },
  No: { symbol: 'No', name: { en: 'Nobelium', zh: '锘' }, atomicNumber: 102, atomicMass: 259.000, color: '#BD0D87', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 16, commonValences: [3] },
  Lr: { symbol: 'Lr', name: { en: 'Lawrencium', zh: '铹' }, atomicNumber: 103, atomicMass: 262.000, color: '#C70066', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 17, commonValences: [3] },
  Rf: { symbol: 'Rf', name: { en: 'Rutherfordium', zh: '𬬻' }, atomicNumber: 104, atomicMass: 267.000, color: '#CC0059', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 4, commonValences: [4] },
  Db: { symbol: 'Db', name: { en: 'Dubnium', zh: '𬭊' }, atomicNumber: 105, atomicMass: 268.000, color: '#D1004F', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 5, commonValences: [5] },
  Sg: { symbol: 'Sg', name: { en: 'Seaborgium', zh: '𬭳' }, atomicNumber: 106, atomicMass: 271.000, color: '#D90045', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 6, commonValences: [6] },
  Bh: { symbol: 'Bh', name: { en: 'Bohrium', zh: '𬭛' }, atomicNumber: 107, atomicMass: 272.000, color: '#E00038', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 7, commonValences: [7] },
  Hs: { symbol: 'Hs', name: { en: 'Hassium', zh: '𬭶' }, atomicNumber: 108, atomicMass: 270.000, color: '#E6002E', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 8, commonValences: [8] },
  Mt: { symbol: 'Mt', name: { en: 'Meitnerium', zh: '鿏' }, atomicNumber: 109, atomicMass: 276.000, color: '#EB0026', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 9, commonValences: [9] },
  Ds: { symbol: 'Ds', name: { en: 'Darmstadtium', zh: '𫟼' }, atomicNumber: 110, atomicMass: 281.000, color: '#FF1493', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 10, commonValences: [10] },
  Rg: { symbol: 'Rg', name: { en: 'Roentgenium', zh: '𬬭' }, atomicNumber: 111, atomicMass: 280.000, color: '#FF69B4', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 11, commonValences: [11] },
  Cn: { symbol: 'Cn', name: { en: 'Copernicium', zh: '𫓧' }, atomicNumber: 112, atomicMass: 285.000, color: '#FFB6C1', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 12, commonValences: [12] },
  Nh: { symbol: 'Nh', name: { en: 'Nihonium', zh: '𫓧' }, atomicNumber: 113, atomicMass: 284.000, color: '#FFC0CB', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 13, commonValences: [13] },
  Fl: { symbol: 'Fl', name: { en: 'Flerovium', zh: '𫓧' }, atomicNumber: 114, atomicMass: 289.000, color: '#FFD1DC', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 14, commonValences: [14] },
  Mc: { symbol: 'Mc', name: { en: 'Moscovium', zh: '镆' }, atomicNumber: 115, atomicMass: 288.000, color: '#FFDAB9', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 15, commonValences: [15] },
  Lv: { symbol: 'Lv', name: { en: 'Livermorium', zh: '𫟷' }, atomicNumber: 116, atomicMass: 293.000, color: '#FFE4B5', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 16, commonValences: [16] },
  Ts: { symbol: 'Ts', name: { en: 'Tennessine', zh: '𫠧' }, atomicNumber: 117, atomicMass: 294.000, color: '#FFE4E1', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 17, commonValences: [17] },
  Og: { symbol: 'Og', name: { en: 'Oganesson', zh: '𫠧' }, atomicNumber: 118, atomicMass: 294.000, color: '#FFF0F5', covalentRadius: 1.60, vanDerWaalsRadius: 2.00, valenceElectrons: 18, commonValences: [18] },
};

// 分子数据库 / Molecule Database
export const moleculeDatabase: Record<string, MoleculeDataRaw> = {
  'H2O': {
    formula: 'H2O',
    name: { en: 'Water', zh: '水' },
    iupacName: { en: 'Oxidane', zh: '氧化烷' },
    smiles: 'O',
    description: { en: 'Water is a polar inorganic compound that is at room temperature a tasteless and odorless liquid. It is the most abundant substance on Earth and essential for all known forms of life.', zh: '水是一种极性无机化合物，在室温下为无味无色的液体。它是地球上最丰富的物质，对所有已知生命形式都必不可少。' },
    structure: {
      atoms: [
        { id: 'O1', element: 'O', x: 0, y: 0, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
        { id: 'H1', element: 'H', x: 0.757, y: 0.586, z: 0, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H2', element: 'H', x: -0.757, y: 0.586, z: 0, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
      ],
      bonds: [
        { id: 'b1', atom1: 'O1', atom2: 'H1', type: 'single', length: 0.96 },
        { id: 'b2', atom1: 'O1', atom2: 'H2', type: 'single', length: 0.96 },
      ],
      lonePairs: [
        { atomId: 'O1', count: 2, position: [{ x: -0.5, y: -0.5 }, { x: 0.5, y: -0.5 }] },
      ],
    },
    electronic: {
      totalElectrons: 8,
      bondingElectrons: 4,
      lonePairElectrons: 4,
      sigmaBonds: 2,
      piBonds: 0,
      hybridization: 'sp3',
      vseprType: 'AX2E2',
      geometry: 'Bent (V-shaped)',
      bondAngles: { 'H-O-H': 104.5 },
    },
    physical: {
      molecularWeight: 18.015,
      polarity: 'Polar',
      meltingPoint: 0,
      boilingPoint: 100,
      density: 1.0,
      solubility: 'Universal solvent',
      stateAtRoomTemp: 'Liquid',
    },
    thermodynamic: {
      standardEnthalpyFormation: -285.8,
      standardEnthalpyCombustion: 0,
      entropy: 69.9,
      gibbsFreeEnergy: -237.1,
      heatCapacity: 75.3,
    },
    spectral: {
      irPeaks: [
        { wavenumber: 3400, intensity: 'Strong', bondType: 'O-H stretch' },
        { wavenumber: 1640, intensity: 'Medium', bondType: 'H-O-H bend' },
      ],
      msPeaks: [
        { mz: 18, relativeIntensity: 100, fragment: 'H2O+' },
        { mz: 17, relativeIntensity: 20, fragment: 'OH+' },
      ],
    },
    safety: {
      toxicityLevel: 'Low',
      flammability: 'None',
      reactivity: 'Stable',
      biodegradability: '100%',
      hazards: ['None'],
    },
    applications: {
      industrial: { en: ['Steam generation', 'Coolant', 'Solvent', 'Chemical synthesis'], zh: ['蒸汽发生', '冷却剂', '溶剂', '化学合成'] },
      research: { en: ['Buffer preparation', 'Chromatography', 'Spectroscopy'], zh: ['缓冲液制备', '色谱法', '光谱学'] },
      everyday: { en: ['Drinking', 'Cooking', 'Cleaning', 'Hydration'], zh: ['饮用', '烹饪', '清洁', '补水'] },
    },
    reactions: {
      asReactant: [
        { equation: '2H2O → 2H2 + O2', conditions: 'Electrolysis' },
        { equation: 'H2O + CO2 → H2CO3', conditions: 'Room temperature' },
      ],
      asProduct: [
        { equation: '2H2 + O2 → 2H2O', conditions: 'Combustion' },
        { equation: 'HCl + NaOH → NaCl + H2O', conditions: 'Neutralization' },
      ],
    },
  },
  'CO2': {
    formula: 'CO2',
    name: { en: 'Carbon Dioxide', zh: '二氧化碳' },
    iupacName: { en: 'Carbon Dioxide', zh: '二氧化碳' },
    smiles: 'C(=O)=O',
    description: { en: 'Carbon dioxide is a colorless gas with a density about 53% higher than that of dry air. It is a greenhouse gas and plays a crucial role in photosynthesis.', zh: '二氧化碳是一种无色气体，密度比干燥空气高约53%。它是一种温室气体，在光合作用中起着关键作用。' },
    structure: {
      atoms: [
        { id: 'C1', element: 'C', x: 0, y: 0, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'O1', element: 'O', x: -1.16, y: 0, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
        { id: 'O2', element: 'O', x: 1.16, y: 0, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
      ],
      bonds: [
        { id: 'b1', atom1: 'C1', atom2: 'O1', type: 'double', length: 1.16 },
        { id: 'b2', atom1: 'C1', atom2: 'O2', type: 'double', length: 1.16 },
      ],
      lonePairs: [
        { atomId: 'O1', count: 2, position: [{ x: -1.5, y: 0.5 }, { x: -1.5, y: -0.5 }] },
        { atomId: 'O2', count: 2, position: [{ x: 1.5, y: 0.5 }, { x: 1.5, y: -0.5 }] },
      ],
    },
    electronic: {
      totalElectrons: 16,
      bondingElectrons: 8,
      lonePairElectrons: 8,
      sigmaBonds: 2,
      piBonds: 2,
      hybridization: 'sp',
      vseprType: 'AX2',
      geometry: 'Linear',
      bondAngles: { 'O-C-O': 180 },
    },
    physical: {
      molecularWeight: 44.01,
      polarity: 'Nonpolar',
      meltingPoint: -78.5,
      boilingPoint: -78.5,
      density: 1.98,
      solubility: 'Slightly soluble in water',
      stateAtRoomTemp: 'Gas',
    },
    thermodynamic: {
      standardEnthalpyFormation: -393.5,
      standardEnthalpyCombustion: 0,
      entropy: 213.7,
      gibbsFreeEnergy: -394.4,
      heatCapacity: 37.1,
    },
    spectral: {
      irPeaks: [
        { wavenumber: 2349, intensity: 'Very Strong', bondType: 'C=O asymmetric stretch' },
        { wavenumber: 1333, intensity: 'Strong', bondType: 'C=O symmetric stretch' },
      ],
      msPeaks: [
        { mz: 44, relativeIntensity: 100, fragment: 'CO2+' },
        { mz: 28, relativeIntensity: 10, fragment: 'CO+' },
        { mz: 16, relativeIntensity: 5, fragment: 'O+' },
      ],
    },
    safety: {
      toxicityLevel: 'Low',
      flammability: 'None',
      reactivity: 'Stable',
      biodegradability: 'N/A',
      hazards: ['Asphyxiant at high concentrations'],
    },
    applications: {
      industrial: { en: ['Refrigerant', 'Fire extinguisher', 'Carbonated beverages', 'Welding'], zh: ['制冷剂', '灭火器', '碳酸饮料', '焊接'] },
      research: { en: ['Supercritical fluid extraction', 'pH control'], zh: ['超临界流体萃取', 'pH控制'] },
      everyday: { en: ['Beverage carbonation', 'Plant growth enhancement'], zh: ['饮料碳酸化', '植物生长促进'] },
    },
    reactions: {
      asReactant: [
        { equation: '6CO2 + 6H2O → C6H12O6 + 6O2', conditions: 'Photosynthesis' },
        { equation: 'CO2 + H2O → H2CO3', conditions: 'Room temperature' },
      ],
      asProduct: [
        { equation: 'C + O2 → CO2', conditions: 'Combustion' },
        { equation: 'CaCO3 → CaO + CO2', conditions: 'Thermal decomposition' },
      ],
    },
  },
  'CH4': {
    formula: 'CH4',
    name: { en: 'Methane', zh: '甲烷' },
    iupacName: { en: 'Methane', zh: '甲烷' },
    smiles: 'C',
    description: { en: 'Methane is the simplest hydrocarbon and the main constituent of natural gas. It is a potent greenhouse gas and is used as a fuel.', zh: '甲烷是最简单的碳氢化合物，也是天然气的主要成分。它是一种强效温室气体，也被用作燃料。' },
    structure: {
      atoms: [
        { id: 'C1', element: 'C', x: 0, y: 0, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'H1', element: 'H', x: 0.63, y: 0.63, z: 0.63, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H2', element: 'H', x: -0.63, y: -0.63, z: 0.63, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H3', element: 'H', x: -0.63, y: 0.63, z: -0.63, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H4', element: 'H', x: 0.63, y: -0.63, z: -0.63, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
      ],
      bonds: [
        { id: 'b1', atom1: 'C1', atom2: 'H1', type: 'single', length: 1.09 },
        { id: 'b2', atom1: 'C1', atom2: 'H2', type: 'single', length: 1.09 },
        { id: 'b3', atom1: 'C1', atom2: 'H3', type: 'single', length: 1.09 },
        { id: 'b4', atom1: 'C1', atom2: 'H4', type: 'single', length: 1.09 },
      ],
      lonePairs: [],
    },
    electronic: {
      totalElectrons: 8,
      bondingElectrons: 8,
      lonePairElectrons: 0,
      sigmaBonds: 4,
      piBonds: 0,
      hybridization: 'sp3',
      vseprType: 'AX4',
      geometry: 'Tetrahedral',
      bondAngles: { 'H-C-H': 109.5 },
    },
    physical: {
      molecularWeight: 16.04,
      polarity: 'Nonpolar',
      meltingPoint: -182.5,
      boilingPoint: -161.5,
      density: 0.656,
      solubility: 'Slightly soluble in water',
      stateAtRoomTemp: 'Gas',
    },
    thermodynamic: {
      standardEnthalpyFormation: -74.6,
      standardEnthalpyCombustion: -890.4,
      entropy: 186.3,
      gibbsFreeEnergy: -50.5,
      heatCapacity: 35.7,
    },
    spectral: {
      irPeaks: [
        { wavenumber: 3019, intensity: 'Strong', bondType: 'C-H stretch' },
        { wavenumber: 1306, intensity: 'Medium', bondType: 'C-H bend' },
      ],
      msPeaks: [
        { mz: 16, relativeIntensity: 100, fragment: 'CH4+' },
        { mz: 15, relativeIntensity: 85, fragment: 'CH3+' },
        { mz: 14, relativeIntensity: 15, fragment: 'CH2+' },
      ],
    },
    safety: {
      toxicityLevel: 'Low',
      flammability: 'High',
      reactivity: 'Stable',
      biodegradability: 'Biodegradable',
      hazards: ['Highly flammable', 'Asphyxiant'],
    },
    applications: {
      industrial: { en: ['Fuel gas', 'Hydrogen production', 'Chemical synthesis'], zh: ['燃气', '氢气生产', '化学合成'] },
      research: { en: ['Fuel cell research', 'Atmospheric studies'], zh: ['燃料电池研究', '大气研究'] },
      everyday: { en: ['Cooking fuel', 'Heating'], zh: ['烹饪燃料', '取暖'] },
    },
    reactions: {
      asReactant: [
        { equation: 'CH4 + 2O2 → CO2 + 2H2O', conditions: 'Combustion' },
        { equation: 'CH4 + H2O → CO + 3H2', conditions: 'Steam reforming' },
      ],
      asProduct: [
        { equation: 'CO2 + 4H2 → CH4 + 2H2O', conditions: 'Sabatier reaction' },
      ],
    },
  },
  'NH3': {
    formula: 'NH3',
    name: { en: 'Ammonia', zh: '氨' },
    iupacName: { en: 'Azane', zh: '氮烷' },
    smiles: 'N',
    description: { en: 'Ammonia is a compound of nitrogen and hydrogen. It is a colorless gas with a characteristic pungent smell. It is a common nitrogenous waste and is used in fertilizers.', zh: '氨是氮和氢的化合物。它是一种无色气体，具有特征性的刺激性气味。它是一种常见的含氮废物，被用于肥料中。' },
    structure: {
      atoms: [
        { id: 'N1', element: 'N', x: 0, y: 0, z: 0, color: '#3050F8', radius: 0.71, mass: 14.007 },
        { id: 'H1', element: 'H', x: 0.94, y: 0.38, z: 0, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H2', element: 'H', x: -0.47, y: 0.38, z: 0.81, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H3', element: 'H', x: -0.47, y: 0.38, z: -0.81, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
      ],
      bonds: [
        { id: 'b1', atom1: 'N1', atom2: 'H1', type: 'single', length: 1.01 },
        { id: 'b2', atom1: 'N1', atom2: 'H2', type: 'single', length: 1.01 },
        { id: 'b3', atom1: 'N1', atom2: 'H3', type: 'single', length: 1.01 },
      ],
      lonePairs: [
        { atomId: 'N1', count: 1, position: [{ x: 0, y: -1 }] },
      ],
    },
    electronic: {
      totalElectrons: 8,
      bondingElectrons: 6,
      lonePairElectrons: 2,
      sigmaBonds: 3,
      piBonds: 0,
      hybridization: 'sp3',
      vseprType: 'AX3E',
      geometry: 'Trigonal Pyramidal',
      bondAngles: { 'H-N-H': 107.8 },
    },
    physical: {
      molecularWeight: 17.03,
      polarity: 'Polar',
      meltingPoint: -77.7,
      boilingPoint: -33.3,
      density: 0.73,
      solubility: 'Very soluble in water',
      stateAtRoomTemp: 'Gas',
    },
    thermodynamic: {
      standardEnthalpyFormation: -45.9,
      standardEnthalpyCombustion: -382.6,
      entropy: 192.8,
      gibbsFreeEnergy: -16.4,
      heatCapacity: 35.1,
    },
    spectral: {
      irPeaks: [
        { wavenumber: 3336, intensity: 'Strong', bondType: 'N-H stretch' },
        { wavenumber: 950, intensity: 'Medium', bondType: 'N-H wag' },
      ],
      msPeaks: [
        { mz: 17, relativeIntensity: 100, fragment: 'NH3+' },
        { mz: 16, relativeIntensity: 80, fragment: 'NH2+' },
      ],
    },
    safety: {
      toxicityLevel: 'Moderate',
      flammability: 'Moderate',
      reactivity: 'Reactive',
      biodegradability: 'Biodegradable',
      hazards: ['Toxic', 'Corrosive', 'Irritant'],
    },
    applications: {
      industrial: { en: ['Fertilizer production', 'Refrigeration', 'Chemical synthesis'], zh: ['化肥生产', '制冷', '化学合成'] },
      research: { en: ['pH control', 'Nitrogen source'], zh: ['pH控制', '氮源'] },
      everyday: { en: ['Cleaning products', 'Refrigerant'], zh: ['清洁产品', '制冷剂'] },
    },
    reactions: {
      asReactant: [
        { equation: '4NH3 + 5O2 → 4NO + 6H2O', conditions: 'Ostwald process' },
        { equation: 'NH3 + HCl → NH4Cl', conditions: 'Room temperature' },
      ],
      asProduct: [
        { equation: 'N2 + 3H2 → 2NH3', conditions: 'Haber process' },
      ],
    },
  },
  'C2H5OH': {
    formula: 'C2H5OH',
    name: { en: 'Ethanol', zh: '乙醇' },
    iupacName: { en: 'Ethanol', zh: '乙醇' },
    smiles: 'CCO',
    description: { en: 'Ethanol is a volatile, flammable, colorless liquid with a slight characteristic odor. It is the principal type of alcohol found in alcoholic beverages.', zh: '乙醇是一种挥发性、易燃、无色的液体，具有轻微的特征性气味。它是酒精饮料中发现的主要酒精类型。' },
    structure: {
      atoms: [
        { id: 'C1', element: 'C', x: -0.77, y: 0, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'C2', element: 'C', x: 0.77, y: 0, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'O1', element: 'O', x: 1.43, y: 1.18, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
        { id: 'H1', element: 'H', x: -1.13, y: -0.54, z: 0.89, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H2', element: 'H', x: -1.13, y: -0.54, z: -0.89, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H3', element: 'H', x: -1.13, y: 1.09, z: 0, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H4', element: 'H', x: 0.77, y: -0.54, z: 0, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H5', element: 'H', x: 2.40, y: 1.09, z: 0, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
        { id: 'H6', element: 'H', x: 1.43, y: 1.72, z: 0.89, color: '#FFFFFF', radius: 0.31, mass: 1.008 },
      ],
      bonds: [
        { id: 'b1', atom1: 'C1', atom2: 'C2', type: 'single', length: 1.54 },
        { id: 'b2', atom1: 'C2', atom2: 'O1', type: 'single', length: 1.43 },
        { id: 'b3', atom1: 'C1', atom2: 'H1', type: 'single', length: 1.09 },
        { id: 'b4', atom1: 'C1', atom2: 'H2', type: 'single', length: 1.09 },
        { id: 'b5', atom1: 'C1', atom2: 'H3', type: 'single', length: 1.09 },
        { id: 'b6', atom1: 'C2', atom2: 'H4', type: 'single', length: 1.09 },
        { id: 'b7', atom1: 'O1', atom2: 'H5', type: 'single', length: 0.96 },
      ],
      lonePairs: [
        { atomId: 'O1', count: 2, position: [{ x: 1.43, y: 1.18 }] },
      ],
    },
    electronic: {
      totalElectrons: 26,
      bondingElectrons: 14,
      lonePairElectrons: 4,
      sigmaBonds: 8,
      piBonds: 0,
      hybridization: 'sp3',
      vseprType: 'AX4',
      geometry: 'Tetrahedral (around C)',
      bondAngles: { 'C-C-O': 108.5, 'H-C-H': 109.5 },
    },
    physical: {
      molecularWeight: 46.07,
      polarity: 'Polar',
      meltingPoint: -114.1,
      boilingPoint: 78.4,
      density: 0.789,
      solubility: 'Miscible with water',
      stateAtRoomTemp: 'Liquid',
    },
    thermodynamic: {
      standardEnthalpyFormation: -277.6,
      standardEnthalpyCombustion: -1366.8,
      entropy: 160.7,
      gibbsFreeEnergy: -174.8,
      heatCapacity: 112.4,
    },
    spectral: {
      irPeaks: [
        { wavenumber: 3350, intensity: 'Broad', bondType: 'O-H stretch' },
        { wavenumber: 2970, intensity: 'Strong', bondType: 'C-H stretch' },
        { wavenumber: 1050, intensity: 'Strong', bondType: 'C-O stretch' },
      ],
      msPeaks: [
        { mz: 46, relativeIntensity: 20, fragment: 'C2H5OH+' },
        { mz: 45, relativeIntensity: 60, fragment: 'C2H5O+' },
        { mz: 31, relativeIntensity: 100, fragment: 'CH2OH+' },
      ],
    },
    safety: {
      toxicityLevel: 'Low',
      flammability: 'High',
      reactivity: 'Stable',
      biodegradability: 'Biodegradable',
      hazards: ['Flammable', 'Central nervous system depressant'],
    },
    applications: {
      industrial: { en: ['Solvent', 'Fuel additive', 'Chemical synthesis'], zh: ['溶剂', '燃料添加剂', '化学合成'] },
      research: { en: ['Disinfectant', 'Preservative'], zh: ['消毒剂', '防腐剂'] },
      everyday: { en: ['Alcoholic beverages', 'Hand sanitizer', 'Fuel'], zh: ['酒精饮料', '洗手液', '燃料'] },
    },
    reactions: {
      asReactant: [
        { equation: 'C2H5OH + 3O2 → 2CO2 + 3H2O', conditions: 'Combustion' },
        { equation: 'C2H5OH → C2H4 + H2O', conditions: 'Acid-catalyzed dehydration' },
      ],
      asProduct: [
        { equation: 'C2H4 + H2O → C2H5OH', conditions: 'Acid-catalyzed hydration' },
        { equation: 'C6H12O6 → 2C2H5OH + 2CO2', conditions: 'Fermentation' },
      ],
    },
    isomers: [
      { name: { en: 'Ethanol', zh: '乙醇' }, smiles: 'CCO', description: { en: 'Primary alcohol', zh: '伯醇' } },
      { name: { en: 'Dimethyl Ether', zh: '二甲醚' }, smiles: 'COC', description: { en: 'Ether isomer', zh: '醚异构体' } },
    ],
  },
  'C6H12O6': {
    formula: 'C6H12O6',
    name: { en: 'Glucose', zh: '葡萄糖' },
    iupacName: { en: '(2R,3S,4R,5R)-2,3,4,5,6-Pentahydroxyhexanal', zh: '(2R,3S,4R,5R)-2,3,4,5,6-五羟基己醛' },
    smiles: 'C(C1C(C(C(C(O1)O)O)O)O)O',
    description: { en: 'Glucose is a simple sugar with the molecular formula C6H12O6. It is the most abundant monosaccharide and is the primary source of energy for living organisms.', zh: '葡萄糖是一种分子式为C6H12O6的单糖。它是最丰富的单糖，也是生物体的主要能量来源。' },
    structure: {
      atoms: [
        { id: 'C1', element: 'C', x: 0, y: 0, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'C2', element: 'C', x: 1.54, y: 0, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'C3', element: 'C', x: 2.31, y: 1.27, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'C4', element: 'C', x: 3.85, y: 1.27, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'C5', element: 'C', x: 4.62, y: 0, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'C6', element: 'C', x: 6.16, y: 0, z: 0, color: '#909090', radius: 0.76, mass: 12.011 },
        { id: 'O1', element: 'O', x: 0, y: -1.43, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
        { id: 'O2', element: 'O', x: 1.54, y: 1.43, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
        { id: 'O3', element: 'O', x: 2.31, y: 2.70, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
        { id: 'O4', element: 'O', x: 3.85, y: 2.70, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
        { id: 'O5', element: 'O', x: 4.62, y: -1.43, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
        { id: 'O6', element: 'O', x: 6.16, y: 1.43, z: 0, color: '#FF0D0D', radius: 0.66, mass: 15.999 },
      ],
      bonds: [
        { id: 'b1', atom1: 'C1', atom2: 'C2', type: 'single', length: 1.54 },
        { id: 'b2', atom1: 'C2', atom2: 'C3', type: 'single', length: 1.54 },
        { id: 'b3', atom1: 'C3', atom2: 'C4', type: 'single', length: 1.54 },
        { id: 'b4', atom1: 'C4', atom2: 'C5', type: 'single', length: 1.54 },
        { id: 'b5', atom1: 'C5', atom2: 'C6', type: 'single', length: 1.54 },
        { id: 'b6', atom1: 'C1', atom2: 'O1', type: 'double', length: 1.23 },
        { id: 'b7', atom1: 'C2', atom2: 'O2', type: 'single', length: 1.43 },
        { id: 'b8', atom1: 'C3', atom2: 'O3', type: 'single', length: 1.43 },
        { id: 'b9', atom1: 'C4', atom2: 'O4', type: 'single', length: 1.43 },
        { id: 'b10', atom1: 'C5', atom2: 'O5', type: 'single', length: 1.43 },
        { id: 'b11', atom1: 'C6', atom2: 'O6', type: 'single', length: 1.43 },
      ],
      lonePairs: [],
    },
    electronic: {
      totalElectrons: 96,
      bondingElectrons: 44,
      lonePairElectrons: 12,
      sigmaBonds: 23,
      piBonds: 1,
      hybridization: 'sp2/sp3',
      vseprType: 'AX4/AX3',
      geometry: 'Cyclic/Pyranose ring',
      bondAngles: { 'C-C-C': 109.5, 'C-O-C': 108 },
    },
    physical: {
      molecularWeight: 180.16,
      polarity: 'Polar',
      meltingPoint: 146,
      boilingPoint: 410,
      density: 1.54,
      solubility: 'Very soluble in water',
      stateAtRoomTemp: 'Solid',
    },
    thermodynamic: {
      standardEnthalpyFormation: -1268,
      standardEnthalpyCombustion: -2805,
      entropy: 212,
      gibbsFreeEnergy: -910,
      heatCapacity: 276,
    },
    spectral: {
      irPeaks: [
        { wavenumber: 3400, intensity: 'Broad', bondType: 'O-H stretch' },
        { wavenumber: 1730, intensity: 'Strong', bondType: 'C=O stretch' },
        { wavenumber: 1080, intensity: 'Strong', bondType: 'C-O stretch' },
      ],
      msPeaks: [
        { mz: 180, relativeIntensity: 5, fragment: 'C6H12O6+' },
        { mz: 162, relativeIntensity: 30, fragment: 'M-H2O' },
        { mz: 144, relativeIntensity: 20, fragment: 'M-2H2O' },
      ],
    },
    safety: {
      toxicityLevel: 'Low',
      flammability: 'Low',
      reactivity: 'Stable',
      biodegradability: '100% Biodegradable',
      hazards: ['None significant'],
    },
    applications: {
      industrial: { en: ['Food industry', 'Pharmaceuticals', 'Fermentation'], zh: ['食品工业', '制药', '发酵'] },
      research: { en: ['Cell culture', 'Metabolic studies'], zh: ['细胞培养', '代谢研究'] },
      everyday: { en: ['Energy source', 'Sweetener', 'Sports drinks'], zh: ['能量来源', '甜味剂', '运动饮料'] },
    },
    reactions: {
      asReactant: [
        { equation: 'C6H12O6 + 6O2 → 6CO2 + 6H2O', conditions: 'Cellular respiration' },
        { equation: 'C6H12O6 → 2C2H5OH + 2CO2', conditions: 'Fermentation' },
      ],
      asProduct: [
        { equation: '6CO2 + 6H2O → C6H12O6 + 6O2', conditions: 'Photosynthesis' },
      ],
    },
    isomers: [
      { name: { en: 'α-D-Glucose', zh: 'α-D-葡萄糖' }, smiles: 'C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O)O)O)O)O', description: { en: 'Alpha anomer', zh: 'α异构体' } },
      { name: { en: 'β-D-Glucose', zh: 'β-D-葡萄糖' }, smiles: 'C([C@@H]1[C@H]([C@@H]([C@H]([C@@H](O1)O)O)O)O)O', description: { en: 'Beta anomer', zh: 'β异构体' } },
      { name: { en: 'Fructose', zh: '果糖' }, smiles: 'C(C(C(C(C(=O)CO)O)O)O)O', description: { en: 'Ketohexose isomer', zh: '酮己糖异构体' } },
    ],
  },
  'NaCl': {
    formula: 'NaCl',
    name: { en: 'Sodium Chloride', zh: '氯化钠' },
    iupacName: { en: 'Sodium Chloride', zh: '氯化钠' },
    smiles: '[Na+].[Cl-]',
    description: { en: 'Sodium chloride, commonly known as salt, is an ionic compound with the formula NaCl. It is essential for life and is the primary source of sodium and chloride ions in the diet.', zh: '氯化钠，俗称食盐，是一种分子式为NaCl的离子化合物。它对生命至关重要，是饮食中钠离子和氯离子的主要来源。' },
    structure: {
      atoms: [
        { id: 'Na1', element: 'Na', x: 0, y: 0, z: 0, color: '#AB5CF2', radius: 1.66, mass: 22.990 },
        { id: 'Cl1', element: 'Cl', x: 2.82, y: 0, z: 0, color: '#1FF01F', radius: 1.02, mass: 35.453 },
      ],
      bonds: [
        { id: 'b1', atom1: 'Na1', atom2: 'Cl1', type: 'single', length: 2.82 },
      ],
      lonePairs: [],
    },
    electronic: {
      totalElectrons: 28,
      bondingElectrons: 0,
      lonePairElectrons: 8,
      sigmaBonds: 0,
      piBonds: 0,
      hybridization: 'Ionic',
      vseprType: 'Ionic',
      geometry: 'Crystal lattice',
      bondAngles: {},
    },
    physical: {
      molecularWeight: 58.44,
      polarity: 'Ionic',
      meltingPoint: 801,
      boilingPoint: 1413,
      density: 2.16,
      solubility: 'Soluble in water (357 g/L)',
      stateAtRoomTemp: 'Solid',
    },
    thermodynamic: {
      standardEnthalpyFormation: -411.2,
      standardEnthalpyCombustion: 0,
      entropy: 72.1,
      gibbsFreeEnergy: -384.1,
      heatCapacity: 50.5,
    },
    spectral: {
      irPeaks: [
        { wavenumber: 400, intensity: 'Strong', bondType: 'Na-Cl lattice vibration' },
      ],
      msPeaks: [
        { mz: 58, relativeIntensity: 100, fragment: 'NaCl+' },
        { mz: 23, relativeIntensity: 80, fragment: 'Na+' },
        { mz: 35, relativeIntensity: 75, fragment: 'Cl+' },
      ],
    },
    safety: {
      toxicityLevel: 'Low',
      flammability: 'None',
      reactivity: 'Stable',
      biodegradability: 'N/A',
      hazards: ['Excessive intake may cause hypertension'],
    },
    applications: {
      industrial: { en: ['Chemical production', 'Water treatment', 'De-icing'], zh: ['化学生产', '水处理', '除冰'] },
      research: { en: ['Buffer preparation', 'Cell culture'], zh: ['缓冲液制备', '细胞培养'] },
      everyday: { en: ['Food seasoning', 'Preservative', 'Cooking'], zh: ['食品调味', '防腐剂', '烹饪'] },
    },
    reactions: {
      asReactant: [
        { equation: '2NaCl + H2SO4 → Na2SO4 + 2HCl', conditions: 'Acid treatment' },
        { equation: 'NaCl + AgNO3 → AgCl + NaNO3', conditions: 'Precipitation' },
      ],
      asProduct: [
        { equation: 'NaOH + HCl → NaCl + H2O', conditions: 'Neutralization' },
      ],
    },
  },
};

// Localize molecule data to a specific language
export function localizeMoleculeData(raw: MoleculeDataRaw, lang: Language): MoleculeData {
  return {
    ...raw,
    name: raw.name[lang],
    iupacName: raw.iupacName[lang],
    description: raw.description[lang],
    applications: {
      industrial: raw.applications.industrial[lang],
      research: raw.applications.research[lang],
      everyday: raw.applications.everyday[lang],
    },
    isomers: raw.isomers?.map(isomer => ({
      ...isomer,
      name: isomer.name[lang],
      description: isomer.description[lang],
    })),
  };
}

// Localize element data to a specific language
export function localizeElementData(raw: ElementDataRaw, lang: Language): ElementData {
  return {
    ...raw,
    name: raw.name[lang],
  };
}

// 获取分子数据 / Get Molecule Data
export function getMoleculeData(formula: string, lang: Language): MoleculeData | null {
  const normalizedFormula = formula.replace(/\s/g, '').toUpperCase();
  const raw = moleculeDatabase[normalizedFormula];
  if (!raw) return null;
  return localizeMoleculeData(raw, lang);
}

// 搜索分子 / Search Molecules
export function searchMolecules(query: string, lang: Language): MoleculeData[] {
  const normalizedQuery = query.toLowerCase();
  return Object.values(moleculeDatabase)
    .filter((molecule) => {
      const name = molecule.name[lang].toLowerCase();
      const iupacName = molecule.iupacName[lang].toLowerCase();
      const description = molecule.description[lang].toLowerCase();
      return (
        molecule.formula.toLowerCase().includes(normalizedQuery) ||
        name.includes(normalizedQuery) ||
        iupacName.includes(normalizedQuery) ||
        description.includes(normalizedQuery)
      );
    })
    .map((molecule) => localizeMoleculeData(molecule, lang));
}

// 获取所有分子列表 / Get All Molecules
export function getAllMolecules(lang: Language): MoleculeData[] {
  return Object.values(moleculeDatabase).map((molecule) => localizeMoleculeData(molecule, lang));
}

// 获取元素数据 / Get Element Data
export function getElementData(symbol: string, lang: Language): ElementData | null {
  const raw = elementDatabase[symbol as ElementSymbol];
  if (!raw) return null;
  return localizeElementData(raw, lang);
}

// Export reactive hooks for components
export { 
  useMoleculeData, 
  useElementData, 
  useAllMolecules, 
  useSearchMolecules,
  useOnLanguageChange,
  subscribeToLanguageChange,
  notifyLanguageChange,
  getCurrentLanguage
} from './moleculeDatabaseHooks';
