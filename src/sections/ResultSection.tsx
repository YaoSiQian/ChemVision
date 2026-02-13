import { useState } from 'react';
import { useLanguage } from '@/i18n';
import type { MoleculeData, ViewerSettings  } from '@/types/molecule';
import { Molecule3DViewer } from '@/components/molecule/Molecule3DViewer';
import { LewisStructure } from '@/components/molecule/LewisStructure';
import { PropertyPanel } from '@/components/molecule/PropertyPanel';
import { IsomerSelector } from '@/components/molecule/IsomerSelector';
import { 
  Box, 
  Layers, 
  Maximize2, 
  Info,
  AlertCircle
} from 'lucide-react';

interface ResultSectionProps {
  molecule: MoleculeData | null;
  isLoading: boolean;
  error: string | null;
}

type ViewMode = '3d' | 'lewis';

export const ResultSection: React.FC<ResultSectionProps> = ({
  molecule,
  isLoading,
  error,
}) => {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [selectedIsomer, setSelectedIsomer] = useState<string>('');
  const [viewerSettings, setViewerSettings] = useState<ViewerSettings>({
    mode: 'ball-stick',
    showLabels: false,
    showBonds: true,
    backgroundColor: 'transparent',
    atomScale: 1,
    bondScale: 1,
  });
  
  // Handle isomer selection
  const handleIsomerSelect = (smiles: string) => {
    setSelectedIsomer(smiles);
  };
  
  // Toggle 3D viewer mode
  const toggleViewerMode = () => {
    setViewerSettings((prev) => ({
      ...prev,
      mode: prev.mode === 'ball-stick' ? 'space-fill' : 'ball-stick',
    }));
  };
  
  // Toggle labels
  const toggleLabels = () => {
    setViewerSettings((prev) => ({
      ...prev,
      showLabels: !prev.showLabels,
    }));
  };
  
  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-background overflow-hidden">
        {/* 有机模糊装饰 */}
        <div aria-hidden="true" className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-secondary-container/12 rounded-full blur-3xl mix-blend-multiply" />
        
        <div className="relative text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-md-primary/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-md-primary border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-4 border-4 border-tertiary/20 rounded-full" />
            <div className="absolute inset-4 border-4 border-tertiary border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse'}} />
          </div>
          <h2 className="text-2xl font-medium text-foreground mb-2">{t.analyzing}</h2>
          <p className="text-on-surface-variant">{language === 'zh' ? '请稍候，我们正在生成3D模型和理化性质数据' : 'Please wait while we generate the 3D model and property data'}</p>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-background overflow-hidden">
        {/* 有机模糊装饰 */}
        <div aria-hidden="true" className="absolute top-20 -left-32 w-[480px] h-[480px] bg-md-primary/10 rounded-full blur-3xl mix-blend-multiply" />
        <div aria-hidden="true" className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] bg-secondary-container/12 rounded-full blur-3xl mix-blend-multiply" />
        
        <div className="relative text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-medium text-foreground mb-2">{t.analysisError}</h2>
          <p className="text-on-surface-variant mb-6">{error}</p>
          <p className="text-sm text-on-surface-variant">
            {language === 'zh' ? '请尝试输入其他分子式，如 H2O、CO2、CH4、NH3、C2H5OH 等' : 'Try other formulas like H2O, CO2, CH4, NH3, C2H5OH, etc.'}
          </p>
        </div>
      </section>
    );
  }
  
  if (!molecule) {
    return null;
  }
  
  return (
    <section className="relative min-h-screen py-12 px-4 bg-background overflow-hidden">
      {/* 有机模糊装饰 / Organic blur shapes */}
      <div aria-hidden="true" className="absolute -top-40 left-1/4 w-[480px] h-[480px] bg-md-primary/10 rounded-full blur-3xl mix-blend-multiply transform -translate-x-1/4 -translate-y-1/2" />
      <div aria-hidden="true" className="absolute bottom-0 -right-40 w-[400px] h-[400px] bg-secondary-container/12 rounded-full blur-3xl mix-blend-multiply" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* 结果标题 / Result Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-md-primary/20 rounded-full text-md-primary text-300 text-sm mb-4">
            <Info className="w-4 h-4" />
            <span>{language === 'zh' ? '分析完成' : 'Analysis Complete'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2">
            {molecule.name}
          </h2>
          <p className="text-xl text-md-primary text-400 font-mono">{molecule.formula}</p>
        </div>
        
        {/* 同分异构体选择器 / Isomer Selector */}
        {molecule.isomers && molecule.isomers.length > 1 && (
          <div className="mb-8">
            <IsomerSelector
              isomers={molecule.isomers}
              selectedIsomer={selectedIsomer || molecule.smiles}
              onSelect={handleIsomerSelect}
            />
          </div>
        )}
        
        {/* 主内容区 / Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：分子可视化 / Left: Molecular Visualization */}
          <div className="space-y-4">
            {/* 视图切换 / View Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[20px] transition-all ${
                    viewMode === '3d'
                      ? 'bg-md-primary text-white'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-white'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>{t.molecularStructure}</span>
                </button>
                <button
                  onClick={() => setViewMode('lewis')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[20px] transition-all ${
                    viewMode === 'lewis'
                      ? 'bg-md-primary text-white'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>{t.featureLewisTitle}</span>
                </button>
              </div>
              
              {viewMode === '3d' && (
                <div className="flex gap-2">
                  <button
                    onClick={toggleViewerMode}
                    className="p-2 bg-surface-container-low text-on-surface-variant hover:text-white rounded-[20px] transition-colors"
                    title={viewerSettings.mode === 'ball-stick' 
                      ? (language === 'zh' ? '切换到比例模型' : 'Switch to space-fill model')
                      : (language === 'zh' ? '切换到球棍模型' : 'Switch to ball-stick model')
                    }
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleLabels}
                    className={`p-2 rounded-[20px] transition-colors ${
                      viewerSettings.showLabels
                        ? 'bg-md-primary text-white'
                        : 'bg-surface-container-low text-on-surface-variant hover:text-white'
                    }`}
                    title={language === 'zh' ? '显示/隐藏标签' : 'Show/Hide labels'}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* 可视化区域 / Visualization Area */}
            <div className="bg-surface-container rounded-[24px] shadow-sm p-4 aspect-square flex items-center justify-center">
              {viewMode === '3d' ? (
                <Molecule3DViewer
                  atoms={molecule.structure.atoms}
                  bonds={molecule.structure.bonds}
                  settings={viewerSettings}
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              ) : (
                <LewisStructure
                  atoms={molecule.structure.atoms}
                  bonds={molecule.structure.bonds}
                  lonePairs={molecule.structure.lonePairs}
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              )}
            </div>
            
            {/* 视图说明 / View Instructions */}
            <div className="bg-surface-container rounded-[24px] shadow-sm p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">
                {viewMode === '3d' 
                  ? (language === 'zh' ? '3D模型控制' : '3D Model Controls')
                  : (language === 'zh' ? '路易斯结构式说明' : 'Lewis Structure Guide')
                }
              </h4>
              <p className="text-xs text-on-surface-variant">
                {viewMode === '3d' ? (
                  <>
                    • {language === 'zh' ? '拖动鼠标旋转分子' : 'Drag to rotate'}<br />
                    • {language === 'zh' ? '滚轮缩放视图' : 'Scroll to zoom'}<br />
                    • {language === 'zh' ? '当前模式：' : 'Current mode: '}
                    {viewerSettings.mode === 'ball-stick' 
                      ? (language === 'zh' ? '球棍模型' : 'Ball-stick model')
                      : (language === 'zh' ? '比例模型' : 'Space-fill model')
                    }
                  </>
                ) : (
                  <>
                    • {language === 'zh' ? '紫色圆点表示孤对电子' : 'Purple dots indicate lone pairs'}<br />
                    • {language === 'zh' ? '线条表示共价键（双线=双键，三线=三键）' : 'Lines indicate bonds (double=triple)'}<br />
                    • {language === 'zh' ? '原子颜色遵循CPK配色方案' : 'Atom colors follow CPK convention'}
                  </>
                )}
              </p>
            </div>
          </div>
          
          {/* 右侧：属性面板 / Right: Property Panel */}
          <div className="lg:h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar">
            <PropertyPanel molecule={molecule} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
