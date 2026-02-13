import { useState, useRef } from 'react';
import { HeroSection } from '@/sections/HeroSection';
import { ResultSection } from '@/sections/ResultSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import type { MoleculeData  } from '@/types/molecule';
import { getMoleculeData } from '@/data/moleculeDatabase';
import { parseMolecularFormula } from '@/utils/moleculeParser';
import { Toaster, toast } from 'sonner';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function App() {
  const [molecule, setMolecule] = useState<MoleculeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // 处理搜索
  const handleSearch = async (formula: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // 验证分子式格式
      const parsed = parseMolecularFormula(formula);
      if (!parsed.isValid) {
        throw new Error(parsed.error || 'Invalid formula');
      }

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 获取分子数据
      const data = getMoleculeData(formula);
      
      if (data) {
        setMolecule(data);
        toast.success(`成功分析 ${formula}`, {
          description: `已加载 ${data.name} 的完整数据`,
          icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
        });
        
        // 滚动到结果区域
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // 如果数据库中没有，生成基本数据
        const basicData = generateBasicMoleculeData(formula, parsed.elements);
        setMolecule(basicData);
        toast.info(`已生成 ${formula} 的基础数据`, {
          description: '部分属性基于理论计算',
          icon: <AlertCircle className="w-4 h-4 text-blue-500" />,
        });
        
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('分析失败', {
        description: err instanceof Error ? err.message : '请检查分子式格式',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 生成基础分子数据（用于数据库中不存在的分子）
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
      name: `${formula} Molecule`,
      iupacName: formula,
      smiles: formula,
      description: `A chemical compound with formula ${formula}.`,
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
      {/* Toast通知 */}
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
      
      {/* 主视觉区 */}
      <HeroSection onSearch={handleSearch} isLoading={isLoading} />
      
      {/* 结果区域 */}
      <div ref={resultRef}>
        <ResultSection 
          molecule={molecule} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
      
      {/* 特性介绍（仅在未搜索时显示） */}
      {!hasSearched && <FeaturesSection />}
    </div>
  );
}

export default App;
