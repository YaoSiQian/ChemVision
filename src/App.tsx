import { useState, useRef, useEffect } from 'react';
import { HeroSection } from '@/sections/HeroSection';
import { ResultSection } from '@/sections/ResultSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from '@/i18n';
import type { MoleculeData  } from '@/types/molecule';
import { getMoleculeData } from '@/data/moleculeDatabase';
import { parseMolecularFormula } from '@/utils/moleculeParser';
import { Toaster, toast } from 'sonner';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [molecule, setMolecule] = useState<MoleculeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentFormula, setCurrentFormula] = useState<string>('');
  const resultRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Hot update: Refresh molecule data when language changes
  useEffect(() => {
    if (currentFormula && molecule && !isLoading) {
      const updatedData = getMoleculeData(currentFormula, language);
      if (updatedData) {
        setMolecule(updatedData);
      }
    }
  }, [language, currentFormula]);

  // Handle search
  const handleSearch = async (formula: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Validate molecular formula
      const parsed = parseMolecularFormula(formula);
      if (!parsed.isValid) {
        throw new Error(parsed.error || t.invalidFormula);
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get molecule data
      const data = getMoleculeData(formula, language);
      
      if (data) {
        setMolecule(data);
        setCurrentFormula(formula);
        toast.success(`${t.analysisSuccess} ${formula}`, {
          description: `${t.dataLoaded} ${data.name}`,
          icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
        });
        
        // Scroll to results
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // Generate basic data if not in database
        const basicData = generateBasicMoleculeData(formula, parsed.elements);
        setMolecule(basicData);
        toast.info(`${t.basicDataGenerated} ${formula}`, {
          description: language === 'zh' ? '部分属性基于理论计算' : 'Some properties are based on theoretical calculations',
          icon: <AlertCircle className="w-4 h-4 text-blue-500" />,
        });
        
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.unknownError);
      toast.error(t.analysisError, {
        description: err instanceof Error ? err.message : t.invalidFormula,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate basic molecule data for unknown molecules
  const generateBasicMoleculeData = (formula: string, elements: { element: string; count: number }[]): MoleculeData => {
    const molecularWeight = elements.reduce((sum, e) => {
      const atomicMass = {
        H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.811, C: 12.011,
        N: 14.007, O: 15.999, F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305,
        Al: 26.982, Si: 28.086, P: 30.974, S: 32.065, Cl: 35.453, Ar: 39.948,
        K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.380, Br: 79.904,
        Ag: 107.868, I: 126.904, Au: 196.967, Hg: 200.590, Pb: 207.200,
      }[e.element] || 0;
      return sum + atomicMass * e.count;
    }, 0);

    const totalElectrons = elements.reduce((sum, e) => {
      const atomicNumber = {
        H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10,
        Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18,
        K: 19, Ca: 20, Fe: 26, Cu: 29, Zn: 30, Br: 35, Ag: 47, I: 53,
        Au: 79, Hg: 80, Pb: 82,
      }[e.element] || 0;
      return sum + atomicNumber * e.count;
    }, 0);

    return {
      formula,
      name: language === 'zh' ? `${formula} 分子` : `${formula} Molecule`,
      iupacName: formula,
      smiles: formula,
      description: language === 'zh' 
        ? `分子式为 ${formula} 的化合物。`
        : `A chemical compound with formula ${formula}.`,
      structure: {
        atoms: elements.map((e, i) => ({
          id: `${e.element}${i}`,
          element: e.element,
          x: Math.random() * 4 - 2,
          y: Math.random() * 4 - 2,
          z: Math.random() * 4 - 2,
          color: {
            H: '#FFFFFF', C: '#909090', N: '#3050F8', O: '#FF0D0D',
            F: '#90E050', Cl: '#1FF01F', Br: '#A62929', I: '#940094',
            S: '#FFFF30', P: '#FF8000', Na: '#AB5CF2', K: '#8F40D4',
            Ca: '#3DFF00', Fe: '#E06633', Cu: '#C78033', Zn: '#7D80B0',
          }[e.element] || '#94a3b8',
          radius: {
            H: 0.31, C: 0.76, N: 0.71, O: 0.66, F: 0.57, Cl: 1.02,
            Br: 1.20, I: 1.39, S: 1.05, P: 1.07, Na: 1.66, K: 2.03,
            Ca: 1.76, Fe: 1.32, Cu: 1.38, Zn: 1.31,
          }[e.element] || 1.0,
          mass: 1,
        })),
        bonds: [],
        lonePairs: [],
      },
      electronic: {
        totalElectrons,
        bondingElectrons: Math.floor(totalElectrons * 0.6),
        lonePairElectrons: Math.floor(totalElectrons * 0.4),
        sigmaBonds: elements.length > 1 ? elements.length - 1 : 0,
        piBonds: 0,
        hybridization: 'sp3',
        vseprType: 'AX4',
        geometry: 'Tetrahedral',
        bondAngles: {},
      },
      physical: {
        molecularWeight,
        polarity: 'Unknown',
        solubility: 'Unknown',
        stateAtRoomTemp: 'Unknown',
      },
      thermodynamic: {
        standardEnthalpyFormation: 0,
        standardEnthalpyCombustion: 0,
        entropy: 0,
        gibbsFreeEnergy: 0,
        heatCapacity: 0,
      },
      spectral: {
        irPeaks: [],
        msPeaks: [{ mz: Math.round(molecularWeight), relativeIntensity: 100, fragment: `${formula}+` }],
      },
      safety: {
        toxicityLevel: 'Low',
        flammability: 'None',
        reactivity: 'Stable',
        biodegradability: 'Unknown',
        hazards: ['Unknown'],
      },
      applications: {
        industrial: [],
        research: [],
        everyday: [],
      },
      reactions: {
        asReactant: [],
        asProduct: [],
      },
    };
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Toast notifications */}
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#f8fafc',
          },
        }}
      />
      
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} isLoading={isLoading} />
      
      {/* Result Section */}
      <div ref={resultRef}>
        <ResultSection 
          molecule={molecule} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
      
      {/* Features Section (only shown when no search performed) */}
      {!hasSearched && <FeaturesSection />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
