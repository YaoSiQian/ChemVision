import type { Translations } from '../types';

export const zhTranslations: Translations = {
  // Navigation & Common
  appName: 'ChemVision',
  search: '搜索',
  analyze: '分析',
  loading: '加载中...',
  error: '错误',
  success: '成功',
  cancel: '取消',
  confirm: '确认',
  close: '关闭',
  back: '返回',
  next: '下一步',
  save: '保存',
  delete: '删除',
  edit: '编辑',
  view: '查看',
  download: '下载',
  share: '分享',
  settings: '设置',
  language: '语言',
  theme: '主题',
  help: '帮助',
  about: '关于',
  
  // Hero Section
  heroTitle: '化学分子分析仪',
  heroSubtitle: '通过先进的可视化技术探索分子结构、性质和反应',
  searchPlaceholder: '输入分子式（例如：H2O、CO2、C6H12O6）',
  searchButton: '分析分子',
  popularMolecules: '热门分子',
  tryExample: '试试这些示例',
  
  // Features Section
  featuresTitle: '强大功能',
  featuresSubtitle: '了解化学分子所需的一切',
  feature3DTitle: '3D可视化',
  feature3DDesc: '支持旋转和缩放的交互式3D分子模型',
  featurePropertyTitle: '全面性质',
  featurePropertyDesc: '详细的物理、化学和热力学数据',
  featureSpectralTitle: '光谱分析',
  featureSpectralDesc: '红外光谱和质谱可视化与解析',
  featureReactionTitle: '反应数据库',
  featureReactionDesc: '涉及该分子的常见反应',
  featureLewisTitle: '路易斯结构',
  featureLewisDesc: '电子分布的可视化表示',
  featureIsomerTitle: '异构体选择器',
  featureIsomerDesc: '探索不同的结构异构体',
  
  // Result Section
  resultTitle: '分析结果',
  noResults: '未找到结果',
  enterFormulaPrompt: '在上方输入分子式开始分析',
  analyzing: '正在分析分子...',
  basicInfo: '基本信息',
  molecularStructure: '分子结构',
  electronicProperties: '电子性质',
  physicalProperties: '物理性质',
  thermodynamicData: '热力学数据',
  spectralData: '光谱数据',
  safetyInfo: '安全信息',
  applications: '应用',
  reactions: '反应',
  isomers: '异构体',
  
  // Property Labels
  formula: '分子式',
  name: '名称',
  iupacName: 'IUPAC名称',
  molecularWeight: '分子量',
  molecularFormula: '分子式',
  smiles: 'SMILES',
  description: '描述',
  polarity: '极性',
  meltingPoint: '熔点',
  boilingPoint: '沸点',
  density: '密度',
  solubility: '溶解性',
  stateAtRoomTemp: '室温状态',
  totalElectrons: '总电子数',
  bondingElectrons: '成键电子数',
  lonePairElectrons: '孤对电子数',
  sigmaBonds: 'σ键',
  piBonds: 'π键',
  hybridization: '杂化类型',
  vseprType: 'VSEPR类型',
  geometry: '几何构型',
  bondAngles: '键角',
  standardEnthalpyFormation: '标准生成焓',
  standardEnthalpyCombustion: '标准燃烧焓',
  entropy: '熵',
  gibbsFreeEnergy: '吉布斯自由能',
  heatCapacity: '热容',
  
  // Safety
  toxicityLevel: '毒性等级',
  flammability: '可燃性',
  reactivity: '反应性',
  biodegradability: '生物降解性',
  hazards: '危险',
  
  // Application Categories
  industrial: '工业',
  research: '研究',
  everyday: '日常',
  
  // Reaction Types
  asReactant: '作为反应物',
  asProduct: '作为产物',
  
  // States
  solid: '固态',
  liquid: '液态',
  gas: '气态',
  unknown: '未知',
  
  // Polarity
  polar: '极性',
  nonpolar: '非极性',
  ionic: '离子性',
  
  // Toxicity Levels
  low: '低',
  moderate: '中等',
  high: '高',
  veryHigh: '非常高',
  
  // Flammability
  none: '无',
  flammable: '可燃',
  highlyFlammable: '高度可燃',
  
  // Reactivity
  stable: '稳定',
  unstable: '不稳定',
  reactive: '反应性',
  highlyReactive: '高度反应性',
  
  // Spectral
  irSpectrum: '红外光谱',
  massSpectrum: '质谱',
  wavenumber: '波数 (cm⁻¹)',
  intensity: '强度',
  bondType: '键类型',
  mz: '质荷比',
  relativeIntensity: '相对强度 (%)',
  fragment: '碎片',
  
  // 3D Viewer
  rotate: '旋转',
  zoom: '缩放',
  resetView: '重置视图',
  fullscreen: '全屏',
  
  // Errors
  invalidFormula: '无效的分子式',
  formulaNotFound: '数据库中未找到该分子式',
  networkError: '网络错误，请重试',
  unknownError: '发生未知错误',
  
  // Toast Messages
  analysisSuccess: '分析成功',
  analysisError: '分析失败',
  dataLoaded: '数据加载成功',
  basicDataGenerated: '基础数据已生成',
  
  // Footer
  footerText: '© 2026 ChemVision. 保留所有权利。',
  madeWith: '用',
  
  // Language Names
  english: 'English',
  chinese: '中文',
};
