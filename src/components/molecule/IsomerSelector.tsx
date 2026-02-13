import { Check, Info } from 'lucide-react';

interface IsomerSelectorProps {
  isomers: { name: string; smiles: string; description: string }[];
  selectedIsomer: string;
  onSelect: (smiles: string) => void;
  className?: string;
}

export const IsomerSelector: React.FC<IsomerSelectorProps> = ({
  isomers,
  selectedIsomer,
  onSelect,
  className = '',
}) => {
  if (isomers.length <= 1) return null;
  
  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-indigo-400" />
        <h3 className="text-sm font-medium text-slate-200">检测到同分异构体</h3>
      </div>
      
      <p className="text-xs text-slate-400 mb-3">
        该分子式对应多种结构，请选择您要查看的异构体：
      </p>
      
      <div className="space-y-2">
        {isomers.map((isomer, index) => (
          <button
            key={index}
            onClick={() => onSelect(isomer.smiles)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
              selectedIsomer === isomer.smiles
                ? 'border-indigo-500 bg-indigo-500/20'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <div className="text-left">
              <p className="text-sm font-medium text-slate-200">{isomer.name}</p>
              <p className="text-xs text-slate-400">{isomer.description}</p>
              <p className="text-xs font-mono text-indigo-400 mt-1">{isomer.smiles}</p>
            </div>
            
            {selectedIsomer === isomer.smiles && (
              <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IsomerSelector;
