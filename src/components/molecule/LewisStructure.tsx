import { useMemo } from 'react';
import type { Atom, Bond, LonePair  } from '@/types/molecule';
import { useElementData } from '@/data/moleculeDatabaseHooks';

interface LewisStructureProps {
  atoms: Atom[];
  bonds: Bond[];
  lonePairs: LonePair[];
  width?: number;
  height?: number;
  className?: string;
}

interface PositionedAtom extends Atom {
  screenX: number;
  screenY: number;
}

export const LewisStructure: React.FC<LewisStructureProps> = ({
  atoms,
  bonds,
  lonePairs,
  width = 400,
  height = 400,
  className = '',
}) => {
  // 计算2D布局
  const positionedAtoms = useMemo((): PositionedAtom[] => {
    if (atoms.length === 0) return [];
    
    // 简单的2D投影算法
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 6;
    
    return atoms.map((atom, index) => {
      // 使用原子的x,y坐标进行投影
      // 对于简单的分子，可以使用环形布局
      let x: number, y: number;
      
      if (atoms.length === 1) {
        // 单原子在中心
        x = centerX;
        y = centerY;
      } else if (atoms.length === 2) {
        // 双原子水平排列
        const offset = index === 0 ? -scale : scale;
        x = centerX + offset;
        y = centerY;
      } else if (atoms.length === 3) {
        // 三原子三角形排列（如水分子）
        const angle = (index * 120 - 90) * (Math.PI / 180);
        x = centerX + Math.cos(angle) * scale;
        y = centerY + Math.sin(angle) * scale * 0.8;
      } else {
        // 更多原子使用圆形布局
        const angle = (index / atoms.length) * 2 * Math.PI;
        x = centerX + Math.cos(angle) * scale * 1.5;
        y = centerY + Math.sin(angle) * scale * 1.5;
      }
      
      return {
        ...atom,
        screenX: x,
        screenY: y,
      };
    });
  }, [atoms, width, height]);
  
  // 获取原子的连接关系
  const atomConnections = useMemo(() => {
    const connections: Record<string, string[]> = {};
    
    bonds.forEach((bond) => {
      if (!connections[bond.atom1]) connections[bond.atom1] = [];
      if (!connections[bond.atom2]) connections[bond.atom2] = [];
      connections[bond.atom1].push(bond.atom2);
      connections[bond.atom2].push(bond.atom1);
    });
    
    return connections;
  }, [bonds]);
  
  // 获取原子的孤对电子位置
  const getLonePairPositions = (atomId: string): { x: number; y: number }[] => {
    const lonePair = lonePairs.find((lp) => lp.atomId === atomId);
    if (!lonePair) return [];
    
    const atom = positionedAtoms.find((a) => a.id === atomId);
    if (!atom) return [];
    
    const connectedAtoms = atomConnections[atomId] || [];
    const angleStep = (2 * Math.PI) / (connectedAtoms.length + lonePair.count);
    
    return Array.from({ length: lonePair.count }, (_, i) => {
      const angle = angleStep * (connectedAtoms.length + i);
      return {
        x: atom.screenX + Math.cos(angle) * 35,
        y: atom.screenY + Math.sin(angle) * 35,
      };
    });
  };
  
  // 渲染化学键
  const renderBonds = () => {
    const bondElements: React.ReactNode[] = [];
    
    for (let i = 0; i < bonds.length; i++) {
      const bond = bonds[i];
      const atom1 = positionedAtoms.find((a) => a.id === bond.atom1);
      const atom2 = positionedAtoms.find((a) => a.id === bond.atom2);
      
      if (!atom1 || !atom2) continue;
      
      if (bond.type === 'single') {
        bondElements.push(
          <line
            key={`bond-${i}`}
            x1={atom1.screenX}
            y1={atom1.screenY}
            x2={atom2.screenX}
            y2={atom2.screenY}
            stroke="#64748b"
            strokeWidth="3"
          />
        );
      } else if (bond.type === 'double') {
        // 双线表示双键
        const dx = atom2.screenX - atom1.screenX;
        const dy = atom2.screenY - atom1.screenY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const offset = 4;
        
        const perpX = (-dy / length) * offset;
        const perpY = (dx / length) * offset;
        
        bondElements.push(
          <g key={`bond-${i}`}>
            <line
              x1={atom1.screenX + perpX}
              y1={atom1.screenY + perpY}
              x2={atom2.screenX + perpX}
              y2={atom2.screenY + perpY}
              stroke="#64748b"
              strokeWidth="2"
            />
            <line
              x1={atom1.screenX - perpX}
              y1={atom1.screenY - perpY}
              x2={atom2.screenX - perpX}
              y2={atom2.screenY - perpY}
              stroke="#64748b"
              strokeWidth="2"
            />
          </g>
        );
      } else if (bond.type === 'triple') {
        // 三线表示三键
        const dx = atom2.screenX - atom1.screenX;
        const dy = atom2.screenY - atom1.screenY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const offset = 5;
        
        const perpX = (-dy / length) * offset;
        const perpY = (dx / length) * offset;
        
        bondElements.push(
          <g key={`bond-${i}`}>
            <line
              x1={atom1.screenX}
              y1={atom1.screenY}
              x2={atom2.screenX}
              y2={atom2.screenY}
              stroke="#64748b"
              strokeWidth="2"
            />
            <line
              x1={atom1.screenX + perpX}
              y1={atom1.screenY + perpY}
              x2={atom2.screenX + perpX}
              y2={atom2.screenY + perpY}
              stroke="#64748b"
              strokeWidth="2"
            />
            <line
              x1={atom1.screenX - perpX}
              y1={atom1.screenY - perpY}
              x2={atom2.screenX - perpX}
              y2={atom2.screenY - perpY}
              stroke="#64748b"
              strokeWidth="2"
            />
          </g>
        );
      }
    }
    
    return bondElements;
  };
  
  // 渲染原子 - Now uses reactive hook
  const AtomComponent = ({ atom }: { atom: PositionedAtom }) => {
    const elementData = useElementData(atom.element as any);
    const color = atom.color || elementData?.color || '#94a3b8';
    const lonePairPositions = getLonePairPositions(atom.id);
    
    return (
      <g key={atom.id} className="lewis-atom">
        {/* 原子符号背景 */}
        <circle
          cx={atom.screenX}
          cy={atom.screenY}
          r="18"
          fill={color}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        
        {/* 原子符号 */}
        <text
          x={atom.screenX}
          y={atom.screenY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#1e293b"
          fontSize="14"
          fontWeight="600"
        >
          {atom.element}
        </text>
        
        {/* 孤对电子 */}
        {lonePairPositions.map((pos, idx) => (
          <g key={`lp-${atom.id}-${idx}`}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r="3"
              fill="#a855f7"
            />
          </g>
        ))}
      </g>
    );
  };
  
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`lewis-structure ${className}`}
    >
      {/* 化学键 */}
      {renderBonds()}
      
      {/* 原子 */}
      {positionedAtoms.map((atom) => (
        <AtomComponent key={atom.id} atom={atom} />
      ))}
    </svg>
  );
};

export default LewisStructure;
