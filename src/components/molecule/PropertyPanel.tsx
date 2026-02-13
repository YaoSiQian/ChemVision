import { useState } from 'react';
import type { MoleculeData  } from '@/types/molecule';
import { 
  ChevronDown, 
  ChevronUp, 
  Atom, 
  Zap, 
  Thermometer, 
  Shield, 
  Beaker,
  FlaskConical,
  Radio
} from 'lucide-react';

interface PropertyPanelProps {
  molecule: MoleculeData;
  className?: string;
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-indigo-400">{icon}</div>
          <span className="font-medium text-slate-200">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 animate-slide-up">
          {children}
        </div>
      )}
    </div>
  );
};

interface DataRowProps {
  label: string;
  value: string | number | undefined;
  unit?: string;
}

const DataRow: React.FC<DataRowProps> = ({ label, value, unit }) => {
  if (value === undefined || value === null) return null;
  
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-slate-200 text-sm font-medium">
        {typeof value === 'number' ? value.toFixed(2) : value}
        {unit && <span className="text-slate-500 ml-1">{unit}</span>}
      </span>
    </div>
  );
};

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  molecule,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* 基本信息 */}
      <div className="glass-card p-4">
        <h2 className="text-xl font-semibold text-white mb-1">{molecule.name}</h2>
        <p className="text-indigo-400 text-sm font-mono mb-2">{molecule.formula}</p>
        <p className="text-slate-400 text-sm">{molecule.iupacName}</p>
        <p className="text-slate-300 text-sm mt-3 leading-relaxed">{molecule.description}</p>
      </div>
      
      {/* 电子结构 */}
      <CollapsibleSection title="电子结构" icon={<Atom className="w-5 h-5" />} defaultOpen>
        <div className="space-y-1">
          <DataRow label="总电子数" value={molecule.electronic.totalElectrons} />
          <DataRow label="成键电子数" value={molecule.electronic.bondingElectrons} />
          <DataRow label="孤对电子数" value={molecule.electronic.lonePairElectrons} />
          <DataRow label="σ键数量" value={molecule.electronic.sigmaBonds} />
          <DataRow label="π键数量" value={molecule.electronic.piBonds} />
          <DataRow label="杂化轨道" value={molecule.electronic.hybridization} />
          <DataRow label="VSEPR类型" value={molecule.electronic.vseprType} />
          <DataRow label="分子几何构型" value={molecule.electronic.geometry} />
          {Object.entries(molecule.electronic.bondAngles).map(([angle, value]) => (
            <DataRow key={angle} label={`${angle}键角`} value={value} unit="°" />
          ))}
        </div>
      </CollapsibleSection>
      
      {/* 物理性质 */}
      <CollapsibleSection title="物理性质" icon={<Thermometer className="w-5 h-5" />}>
        <div className="space-y-1">
          <DataRow label="分子量" value={molecule.physical.molecularWeight} unit="g/mol" />
          <DataRow label="极性" value={molecule.physical.polarity} />
          <DataRow label="熔点" value={molecule.physical.meltingPoint} unit="°C" />
          <DataRow label="沸点" value={molecule.physical.boilingPoint} unit="°C" />
          <DataRow label="密度" value={molecule.physical.density} unit="g/cm³" />
          <DataRow label="溶解性" value={molecule.physical.solubility} />
          <DataRow label="常温状态" value={molecule.physical.stateAtRoomTemp} />
        </div>
      </CollapsibleSection>
      
      {/* 热力学数据 */}
      <CollapsibleSection title="热力学数据" icon={<Zap className="w-5 h-5" />}>
        <div className="space-y-1">
          <DataRow 
            label="标准摩尔生成焓" 
            value={molecule.thermodynamic.standardEnthalpyFormation} 
            unit="kJ/mol" 
          />
          <DataRow 
            label="标准摩尔燃烧焓" 
            value={molecule.thermodynamic.standardEnthalpyCombustion} 
            unit="kJ/mol" 
          />
          <DataRow 
            label="熵" 
            value={molecule.thermodynamic.entropy} 
            unit="J/(mol·K)" 
          />
          <DataRow 
            label="吉布斯自由能" 
            value={molecule.thermodynamic.gibbsFreeEnergy} 
            unit="kJ/mol" 
          />
          <DataRow 
            label="热容" 
            value={molecule.thermodynamic.heatCapacity} 
            unit="J/(mol·K)" 
          />
        </div>
      </CollapsibleSection>
      
      {/* 光谱数据 */}
      <CollapsibleSection title="光谱数据" icon={<Radio className="w-5 h-5" />}>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">红外光谱 (IR)</h4>
            <div className="space-y-1">
              {molecule.spectral.irPeaks.map((peak, index) => (
                <div key={index} className="flex justify-between items-center py-1 text-sm">
                  <span className="text-slate-400">{peak.wavenumber} cm⁻¹</span>
                  <span className="text-slate-300">{peak.bondType}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    peak.intensity === 'Strong' || peak.intensity === 'Very Strong' 
                      ? 'bg-indigo-500/30 text-indigo-300'
                      : peak.intensity === 'Medium'
                      ? 'bg-slate-600/30 text-slate-300'
                      : 'bg-slate-700/30 text-slate-400'
                  }`}>
                    {peak.intensity}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">质谱 (MS)</h4>
            <div className="space-y-1">
              {molecule.spectral.msPeaks.map((peak, index) => (
                <div key={index} className="flex justify-between items-center py-1 text-sm">
                  <span className="text-slate-400">m/z {peak.mz}</span>
                  <span className="text-slate-300">{peak.fragment}</span>
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${peak.relativeIntensity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
      
      {/* 安全性数据 */}
      <CollapsibleSection title="安全性数据" icon={<Shield className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-slate-800/50">
              <span className="text-xs text-slate-400 block mb-1">毒性等级</span>
              <span className={`text-sm font-medium ${
                molecule.safety.toxicityLevel === 'Low' ? 'text-green-400' :
                molecule.safety.toxicityLevel === 'Moderate' ? 'text-yellow-400' :
                molecule.safety.toxicityLevel === 'High' ? 'text-orange-400' : 'text-red-400'
              }`}>
                {molecule.safety.toxicityLevel}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/50">
              <span className="text-xs text-slate-400 block mb-1">可燃性</span>
              <span className={`text-sm font-medium ${
                molecule.safety.flammability === 'None' ? 'text-green-400' :
                molecule.safety.flammability === 'Low' ? 'text-yellow-400' :
                molecule.safety.flammability === 'Moderate' ? 'text-orange-400' : 'text-red-400'
              }`}>
                {molecule.safety.flammability}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/50">
              <span className="text-xs text-slate-400 block mb-1">反应性</span>
              <span className={`text-sm font-medium ${
                molecule.safety.reactivity === 'Stable' ? 'text-green-400' :
                molecule.safety.reactivity === 'Unstable' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {molecule.safety.reactivity}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/50">
              <span className="text-xs text-slate-400 block mb-1">生物降解性</span>
              <span className="text-sm font-medium text-slate-300">
                {molecule.safety.biodegradability}
              </span>
            </div>
          </div>
          
          {molecule.safety.hazards.length > 0 && molecule.safety.hazards[0] !== 'None' && (
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">危险特性</h4>
              <div className="flex flex-wrap gap-2">
                {molecule.safety.hazards.map((hazard, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full"
                  >
                    {hazard}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>
      
      {/* 应用场景 */}
      <CollapsibleSection title="应用场景" icon={<Beaker className="w-5 h-5" />}>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">工业应用</h4>
            <div className="flex flex-wrap gap-2">
              {molecule.applications.industrial.map((app, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">科研应用</h4>
            <div className="flex flex-wrap gap-2">
              {molecule.applications.research.map((app, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">日常生活</h4>
            <div className="flex flex-wrap gap-2">
              {molecule.applications.everyday.map((app, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-slate-600/30 text-slate-300 text-xs rounded-full"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
      
      {/* 化学反应 */}
      <CollapsibleSection title="化学反应" icon={<FlaskConical className="w-5 h-5" />}>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">作为反应物</h4>
            <div className="space-y-2">
              {molecule.reactions.asReactant.map((reaction, index) => (
                <div key={index} className="p-2 rounded-lg bg-slate-800/50">
                  <p className="text-sm text-slate-300 font-mono">{reaction.equation}</p>
                  <p className="text-xs text-slate-500 mt-1">条件: {reaction.conditions}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">作为生成物</h4>
            <div className="space-y-2">
              {molecule.reactions.asProduct.map((reaction, index) => (
                <div key={index} className="p-2 rounded-lg bg-slate-800/50">
                  <p className="text-sm text-slate-300 font-mono">{reaction.equation}</p>
                  <p className="text-xs text-slate-500 mt-1">条件: {reaction.conditions}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PropertyPanel;
