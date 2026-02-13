import { useState } from 'react';
import { useLanguage } from '@/i18n';
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
    <div className="bg-surface-container rounded-[24px] overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-md-primary/5 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="text-md-primary">{icon}</div>
          <span className="font-medium text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-on-surface-variant" />
        ) : (
          <ChevronDown className="w-4 h-4 text-on-surface-variant" />
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
    <div className="flex justify-between items-center py-2 border-b border-outline/50 last:border-0">
      <span className="text-on-surface-variant text-sm">{label}</span>
      <span className="text-foreground text-sm font-medium">
        {typeof value === 'number' ? value.toFixed(2) : value}
        {unit && <span className="text-on-surface-variant ml-1">{unit}</span>}
      </span>
    </div>
  );
};

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  molecule,
  className = '',
}) => {
  const { t, language } = useLanguage();

  // Helper to get translated value
  const getStateLabel = (state: string) => {
    const stateMap: Record<string, string> = {
      'Solid': t.solid,
      'Liquid': t.liquid,
      'Gas': t.gas,
      'Unknown': t.unknown,
    };
    return stateMap[state] || state;
  };

  const getPolarityLabel = (polarity: string) => {
    const polarityMap: Record<string, string> = {
      'Polar': t.polar,
      'Nonpolar': t.nonpolar,
      'Ionic': t.ionic,
      'Unknown': t.unknown,
    };
    return polarityMap[polarity] || polarity;
  };

  const getToxicityLabel = (level: string) => {
    const toxicityMap: Record<string, string> = {
      'Low': t.low,
      'Moderate': t.moderate,
      'High': t.high,
      'Very High': t.veryHigh,
    };
    return toxicityMap[level] || level;
  };

  const getFlammabilityLabel = (level: string) => {
    const flammabilityMap: Record<string, string> = {
      'None': t.none,
      'Low': t.low,
      'Moderate': t.moderate,
      'High': t.high,
      'Flammable': t.flammable,
      'Highly Flammable': t.highlyFlammable,
    };
    return flammabilityMap[level] || level;
  };

  const getReactivityLabel = (level: string) => {
    const reactivityMap: Record<string, string> = {
      'Stable': t.stable,
      'Unstable': t.unstable,
      'Reactive': t.reactive,
      'Highly Reactive': t.highlyReactive,
    };
    return reactivityMap[level] || level;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 基本信息 / Basic Information */}
      <div className="bg-surface-container rounded-[24px] p-4 shadow-sm">
        <h2 className="text-xl font-medium text-foreground mb-1">{molecule.name}</h2>
        <p className="text-md-primary text-sm font-mono mb-2">{molecule.formula}</p>
        <p className="text-on-surface-variant text-sm">{molecule.iupacName}</p>
        <p className="text-foreground text-sm mt-3 leading-relaxed">{molecule.description}</p>
      </div>
      
      {/* 电子结构 / Electronic Structure */}
      <CollapsibleSection title={t.electronicProperties} icon={<Atom className="w-5 h-5" />} defaultOpen>
        <div className="space-y-1">
          <DataRow label={t.totalElectrons} value={molecule.electronic.totalElectrons} />
          <DataRow label={t.bondingElectrons} value={molecule.electronic.bondingElectrons} />
          <DataRow label={t.lonePairElectrons} value={molecule.electronic.lonePairElectrons} />
          <DataRow label={t.sigmaBonds} value={molecule.electronic.sigmaBonds} />
          <DataRow label={t.piBonds} value={molecule.electronic.piBonds} />
          <DataRow label={t.hybridization} value={molecule.electronic.hybridization} />
          <DataRow label={t.vseprType} value={molecule.electronic.vseprType} />
          <DataRow label={t.geometry} value={molecule.electronic.geometry} />
          {Object.entries(molecule.electronic.bondAngles).map(([angle, value]) => (
            <DataRow key={angle} label={`${angle} ${t.bondAngles}`} value={value} unit="°" />
          ))}
        </div>
      </CollapsibleSection>
      
      {/* 物理性质 / Physical Properties */}
      <CollapsibleSection title={t.physicalProperties} icon={<Thermometer className="w-5 h-5" />}>
        <div className="space-y-1">
          <DataRow label={t.molecularWeight} value={molecule.physical.molecularWeight} unit="g/mol" />
          <DataRow label={t.polarity} value={getPolarityLabel(molecule.physical.polarity)} />
          <DataRow label={t.meltingPoint} value={molecule.physical.meltingPoint} unit="°C" />
          <DataRow label={t.boilingPoint} value={molecule.physical.boilingPoint} unit="°C" />
          <DataRow label={t.density} value={molecule.physical.density} unit="g/cm³" />
          <DataRow label={t.solubility} value={molecule.physical.solubility} />
          <DataRow label={t.stateAtRoomTemp} value={getStateLabel(molecule.physical.stateAtRoomTemp)} />
        </div>
      </CollapsibleSection>
      
      {/* 热力学数据 / Thermodynamic Data */}
      <CollapsibleSection title={t.thermodynamicData} icon={<Zap className="w-5 h-5" />}>
        <div className="space-y-1">
          <DataRow 
            label={t.standardEnthalpyFormation} 
            value={molecule.thermodynamic.standardEnthalpyFormation} 
            unit="kJ/mol" 
          />
          <DataRow 
            label={t.standardEnthalpyCombustion} 
            value={molecule.thermodynamic.standardEnthalpyCombustion} 
            unit="kJ/mol" 
          />
          <DataRow 
            label={t.entropy} 
            value={molecule.thermodynamic.entropy} 
            unit="J/(mol·K)" 
          />
          <DataRow 
            label={t.gibbsFreeEnergy} 
            value={molecule.thermodynamic.gibbsFreeEnergy} 
            unit="kJ/mol" 
          />
          <DataRow 
            label={t.heatCapacity} 
            value={molecule.thermodynamic.heatCapacity} 
            unit="J/(mol·K)" 
          />
        </div>
      </CollapsibleSection>
      
      {/* 光谱数据 / Spectral Data */}
      <CollapsibleSection title={t.spectralData} icon={<Radio className="w-5 h-5" />}>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">{t.irSpectrum}</h4>
            <div className="space-y-1">
              {molecule.spectral.irPeaks.map((peak, index) => (
                <div key={index} className="flex justify-between items-center py-1 text-sm">
                  <span className="text-on-surface-variant">{peak.wavenumber} cm⁻¹</span>
                  <span className="text-foreground">{peak.bondType}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    peak.intensity === 'Strong' || peak.intensity === 'Very Strong' 
                      ? 'bg-md-primary/20 text-md-primary'
                      : peak.intensity === 'Medium'
                      ? 'bg-secondary-container/30 text-foreground'
                      : 'bg-md-primary/5 text-on-surface-variant'
                  }`}>
                    {peak.intensity}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">{t.massSpectrum}</h4>
            <div className="space-y-1">
              {molecule.spectral.msPeaks.map((peak, index) => (
                <div key={index} className="flex justify-between items-center py-1 text-sm">
                  <span className="text-on-surface-variant">m/z {peak.mz}</span>
                  <span className="text-foreground">{peak.fragment}</span>
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-md-primary 500 to-tertiary 500"
                      style={{ width: `${peak.relativeIntensity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
      
      {/* 安全性数据 / Safety Information */}
      <CollapsibleSection title={t.safetyInfo} icon={<Shield className="w-5 h-5" />}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-[20px] bg-surface-container-low">
              <span className="text-xs text-on-surface-variant block mb-1">{t.toxicityLevel}</span>
              <span className={`text-sm font-medium ${
                molecule.safety.toxicityLevel === 'Low' ? 'text-green-400' :
                molecule.safety.toxicityLevel === 'Moderate' ? 'text-yellow-400' :
                molecule.safety.toxicityLevel === 'High' ? 'text-orange-400' : 'text-red-400'
              }`}>
                {getToxicityLabel(molecule.safety.toxicityLevel)}
              </span>
            </div>
            <div className="p-2 rounded-[20px] bg-surface-container-low">
              <span className="text-xs text-on-surface-variant block mb-1">{t.flammability}</span>
              <span className={`text-sm font-medium ${
                molecule.safety.flammability === 'None' ? 'text-green-400' :
                molecule.safety.flammability === 'Low' ? 'text-yellow-400' :
                molecule.safety.flammability === 'Moderate' ? 'text-orange-400' : 'text-red-400'
              }`}>
                {getFlammabilityLabel(molecule.safety.flammability)}
              </span>
            </div>
            <div className="p-2 rounded-[20px] bg-surface-container-low">
              <span className="text-xs text-on-surface-variant block mb-1">{t.reactivity}</span>
              <span className={`text-sm font-medium ${
                molecule.safety.reactivity === 'Stable' ? 'text-green-400' :
                molecule.safety.reactivity === 'Unstable' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {getReactivityLabel(molecule.safety.reactivity)}
              </span>
            </div>
            <div className="p-2 rounded-[20px] bg-surface-container-low">
              <span className="text-xs text-on-surface-variant block mb-1">{t.biodegradability}</span>
              <span className="text-sm font-medium text-foreground">
                {molecule.safety.biodegradability}
              </span>
            </div>
          </div>
          
          {molecule.safety.hazards.length > 0 && molecule.safety.hazards[0] !== 'None' && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">{t.hazards}</h4>
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
      
      {/* 应用场景 / Applications */}
      <CollapsibleSection title={t.applications} icon={<Beaker className="w-5 h-5" />}>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">{t.industrial}</h4>
            <div className="flex flex-wrap gap-2">
              {molecule.applications.industrial.map((app, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-md-primary/20 text-md-primary text-xs rounded-full"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">{t.research}</h4>
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
            <h4 className="text-sm font-medium text-foreground mb-2">{t.everyday}</h4>
            <div className="flex flex-wrap gap-2">
              {molecule.applications.everyday.map((app, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-secondary-container/30 text-foreground text-xs rounded-full"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
      
      {/* 化学反应 / Chemical Reactions */}
      <CollapsibleSection title={t.reactions} icon={<FlaskConical className="w-5 h-5" />}>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">{t.asReactant}</h4>
            <div className="space-y-2">
              {molecule.reactions.asReactant.map((reaction, index) => (
                <div key={index} className="p-2 rounded-[20px] bg-surface-container-low">
                  <p className="text-sm text-foreground font-mono">{reaction.equation}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'zh' ? '条件' : 'Conditions'}: {reaction.conditions}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">{t.asProduct}</h4>
            <div className="space-y-2">
              {molecule.reactions.asProduct.map((reaction, index) => (
                <div key={index} className="p-2 rounded-[20px] bg-surface-container-low">
                  <p className="text-sm text-foreground font-mono">{reaction.equation}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'zh' ? '条件' : 'Conditions'}: {reaction.conditions}
                  </p>
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
