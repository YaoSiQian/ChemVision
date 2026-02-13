import { useMemo } from 'react';
import type { Atom, Bond, LonePair  } from '@/types/molecule';
import { getElementData } from '@/data/moleculeDatabase';

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
    
    const centerX = width / 2;
    const centerY = height / 2;
    const bondLength = Math.min(width, height) / 4;
    
    // 简单的布局算法
    const positioned: PositionedAtom[] = [];
    const visited = new Set<string>();
    
    // 找到中心原子（通常是第一个非氢原子或连接最多的原子）
    let centerAtom = atoms.find((a) => a.element !== 'H') || atoms[0];
    const connectionCount = (atomId: string) => 
      bonds.filter((b) => b.atom1 === atomId || b.atom2 === atomId).length;
    
    const maxConnections = Math.max(...atoms.map((a) => connectionCount(a.id)));
    const bestCenter = atoms.find((a) => connectionCount(a.id) === maxConnections);
    if (bestCenter) centerAtom = bestCenter;
    
    // 放置中心原子
    positioned.push({
      ...centerAtom,
      screenX: centerX,
      screenY: centerY,
    });
    visited.add(centerAtom.id);
    
    // 放置连接的原子
    const placeConnectedAtoms = (atomId: string, x: number, y: number, angleOffset: number) => {
      const connectedBonds = bonds.filter((b) => b.atom1 === atomId || b.atom2 === atomId);
      const angleStep = (2 * Math.PI) / connectedBonds.length;
      
      connectedBonds.forEach((bond, index) => {
        const connectedAtomId = bond.atom1 === atomId ? bond.atom2 : bond.atom1;
        if (visited.has(connectedAtomId)) return;
        
        const connectedAtom = atoms.find((a) => a.id === connectedAtomId);
        if (!connectedAtom) return;
        
        const angle = angleOffset + index * angleStep;
        const newX = x + Math.cos(angle) * bondLength;
        const newY = y + Math.sin(angle) * bondLength;
        
        positioned.push({
          ...connectedAtom,
          screenX: newX,
          screenY: newY,
        });
        visited.add(connectedAtomId);
        
        // 递归放置（限制深度以避免复杂结构）
        if (visited.size < 10) {
          placeConnectedAtoms(connectedAtomId, newX, newY, angle + Math.PI);
        }
      });
    };
    
    placeConnectedAtoms(centerAtom.id, centerX, centerY, 0);
    
    // 放置未连接的原子
    atoms.forEach((atom) => {
      if (!visited.has(atom.id)) {
        positioned.push({
          ...atom,
          screenX: centerX + (Math.random() - 0.5) * bondLength * 2,
          screenY: centerY + (Math.random() - 0.5) * bondLength * 2,
        });
      }
    });
    
    return positioned;
  }, [atoms, bonds, width, height]);

  // 获取原子位置
  const getAtomPosition = (atomId: string): { x: number; y: number } | null => {
    const atom = positionedAtoms.find((a) => a.id === atomId);
    return atom ? { x: atom.screenX, y: atom.screenY } : null;
  };

  // 获取孤对电子位置
  const getLonePairPositions = (atomId: string): { x: number; y: number }[] => {
    const atom = positionedAtoms.find((a) => a.id === atomId);
    if (!atom) return [];
    
    const lp = lonePairs.find((l) => l.atomId === atomId);
    if (!lp) return [];
    
    // 计算孤对电子的方向（远离化学键）
    const connectedBonds = bonds.filter((b) => b.atom1 === atomId || b.atom2 === atomId);
    const bondDirections = connectedBonds.map((bond) => {
      const otherAtomId = bond.atom1 === atomId ? bond.atom2 : bond.atom1;
      const otherAtom = positionedAtoms.find((a) => a.id === otherAtomId);
      if (!otherAtom) return 0;
      return Math.atan2(otherAtom.screenY - atom.screenY, otherAtom.screenX - atom.screenX);
    });
    
    // 找到孤对电子的最佳位置（远离化学键）
    const positions: { x: number; y: number }[] = [];
    const radius = 25;
    
    for (let i = 0; i < lp.count * 2; i += 2) {
      const angle = (i / (lp.count * 2)) * 2 * Math.PI;
      // 检查是否与化学键方向冲突
      const isConflict = bondDirections.some((dir) => 
        Math.abs(dir - angle) < 0.5 || Math.abs(dir - angle - Math.PI) < 0.5
      );
      
      const finalAngle = isConflict ? angle + Math.PI / 4 : angle;
      
      positions.push({
        x: atom.screenX + Math.cos(finalAngle) * radius,
        y: atom.screenY + Math.sin(finalAngle) * radius,
      });
      
      positions.push({
        x: atom.screenX + Math.cos(finalAngle) * radius + 8,
        y: atom.screenY + Math.sin(finalAngle) * radius,
      });
    }
    
    return positions;
  };

  // 渲染化学键
  const renderBond = (bond: Bond) => {
    const atom1Pos = getAtomPosition(bond.atom1);
    const atom2Pos = getAtomPosition(bond.atom2);
    
    if (!atom1Pos || !atom2Pos) return null;
    
    const dx = atom2Pos.x - atom1Pos.x;
    const dy = atom2Pos.y - atom1Pos.y;
    const angle = Math.atan2(dy, dx);
    
    const bondElements: React.ReactNode[] = [];
    
    if (bond.type === 'single') {
      bondElements.push(
        <line
          key={bond.id}
          x1={atom1Pos.x}
          y1={atom1Pos.y}
          x2={atom2Pos.x}
          y2={atom2Pos.y}
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
          className="lewis-bond"
        />
      );
    } else if (bond.type === 'double') {
      const offset = 4;
      const perpX = -Math.sin(angle) * offset;
      const perpY = Math.cos(angle) * offset;
      
      bondElements.push(
        <g key={bond.id}>
          <line
            x1={atom1Pos.x + perpX}
            y1={atom1Pos.y + perpY}
            x2={atom2Pos.x + perpX}
            y2={atom2Pos.y + perpY}
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="lewis-bond"
          />
          <line
            x1={atom1Pos.x - perpX}
            y1={atom1Pos.y - perpY}
            x2={atom2Pos.x - perpX}
            y2={atom2Pos.y - perpY}
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="lewis-bond"
          />
        </g>
      );
    } else if (bond.type === 'triple') {
      const offset = 5;
      const perpX = -Math.sin(angle) * offset;
      const perpY = Math.cos(angle) * offset;
      
      bondElements.push(
        <g key={bond.id}>
          <line
            x1={atom1Pos.x}
            y1={atom1Pos.y}
            x2={atom2Pos.x}
            y2={atom2Pos.y}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            className="lewis-bond"
          />
          <line
            x1={atom1Pos.x + perpX}
            y1={atom1Pos.y + perpY}
            x2={atom2Pos.x + perpX}
            y2={atom2Pos.y + perpY}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            className="lewis-bond"
          />
          <line
            x1={atom1Pos.x - perpX}
            y1={atom1Pos.y - perpY}
            x2={atom2Pos.x - perpX}
            y2={atom2Pos.y - perpY}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            className="lewis-bond"
          />
        </g>
      );
    }
    
    return bondElements;
  };

  // 渲染原子
  const renderAtom = (atom: PositionedAtom) => {
    const elementData = getElementData(atom.element);
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
          fill="white"
          fontSize="14"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          {atom.element}
        </text>
        
        {/* 孤对电子 */}
        {lonePairPositions.map((pos, index) => (
          <circle
            key={`${atom.id}-lp-${index}`}
            cx={pos.x}
            cy={pos.y}
            r="3"
            fill="#6366f1"
            className="lewis-lone-pair"
          />
        ))}
      </g>
    );
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        className="rounded-lg"
        style={{ background: 'transparent' }}
      >
        {/* 化学键 */}
        {bonds.map((bond) => renderBond(bond))}
        
        {/* 原子 */}
        {positionedAtoms.map((atom) => renderAtom(atom))}
      </svg>
      
      {/* 图例 */}
      <div className="absolute bottom-2 left-2 flex items-center gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span>孤对电子</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-0.5 bg-slate-400" />
          <span>共价键</span>
        </div>
      </div>
    </div>
  );
};

export default LewisStructure;
