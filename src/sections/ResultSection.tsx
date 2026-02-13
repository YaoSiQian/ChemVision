import { useState } from 'react';
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
  
  // 处理同分异构体选择
  const handleIsomerSelect = (smiles: string) => {
    setSelectedIsomer(smiles);
    // 这里可以加载对应的异构体数据
  };
  
  // 切换3D显示模式
  const toggleViewerMode = () => {
    setViewerSettings((prev) => ({
      ...prev,
      mode: prev.mode === 'ball-stick' ? 'space-fill' : 'ball-stick',
    }));
  };
  
  // 切换标签显示
  const toggleLabels = () => {
    setViewerSettings((prev) => ({
      ...prev,
      showLabels: !prev.showLabels,
    }));
  };
  
  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-4 border-4 border-purple-500/20 rounded-full" />
            <div className="absolute inset-4 border-4 border-purple-500 border-b-transparent rounded-full animate-spin reverse" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">正在分析分子结构...</h2>
          <p className="text-slate-400">请稍候，我们正在生成3D模型和理化性质数据</p>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">分析失败</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <p className="text-sm text-slate-500">
            请尝试输入其他分子式，如 H2O、CO2、CH4、NH3、C2H5OH 等
          </p>
        </div>
      </section>
    );
  }
  
  if (!molecule) {
    return null;
  }
  
  return (
    <section className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 结果标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm mb-4">
            <Info className="w-4 h-4" />
            <span>分析完成</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {molecule.name}
          </h2>
          <p className="text-xl text-indigo-400 font-mono">{molecule.formula}</p>
        </div>
        
        {/* 同分异构体选择器 */}
        {molecule.isomers && molecule.isomers.length > 1 && (
          <div className="mb-8">
            <IsomerSelector
              isomers={molecule.isomers}
              selectedIsomer={selectedIsomer || molecule.smiles}
              onSelect={handleIsomerSelect}
            />
          </div>
        )}
        
        {/* 主内容区 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：分子可视化 */}
          <div className="space-y-4">
            {/* 视图切换 */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    viewMode === '3d'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>3D模型</span>
                </button>
                <button
                  onClick={() => setViewMode('lewis')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'lewis'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>路易斯结构式</span>
                </button>
              </div>
              
              {viewMode === '3d' && (
                <div className="flex gap-2">
                  <button
                    onClick={toggleViewerMode}
                    className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                    title={viewerSettings.mode === 'ball-stick' ? '切换到比例模型' : '切换到球棍模型'}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleLabels}
                    className={`p-2 rounded-lg transition-colors ${
                      viewerSettings.showLabels
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="显示/隐藏标签"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* 可视化区域 */}
            <div className="glass-card p-4 aspect-square flex items-center justify-center">
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
            
            {/* 视图说明 */}
            <div className="glass-card p-4">
              <h4 className="text-sm font-medium text-slate-300 mb-2">
                {viewMode === '3d' ? '3D模型控制' : '路易斯结构式说明'}
              </h4>
              <p className="text-xs text-slate-400">
                {viewMode === '3d' ? (
                  <>
                    • 拖动鼠标旋转分子<br />
                    • 滚轮缩放视图<br />
                    • 当前模式：{viewerSettings.mode === 'ball-stick' ? '球棍模型' : '比例模型'}
                  </>
                ) : (
                  <>
                    • 紫色圆点表示孤对电子<br />
                    • 线条表示共价键（双线=双键，三线=三键）<br />
                    • 原子颜色遵循CPK配色方案
                  </>
                )}
              </p>
            </div>
          </div>
          
          {/* 右侧：属性面板 */}
          <div className="lg:h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar">
            <PropertyPanel molecule={molecule} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
