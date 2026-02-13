import { useRef, useEffect, useState, useCallback } from 'react';
import type { Atom, Bond, ViewerSettings  } from '@/types/molecule';
import { getElementData } from '@/data/moleculeDatabase';

interface Molecule3DViewerProps {
  atoms: Atom[];
  bonds: Bond[];
  settings?: Partial<ViewerSettings>;
  width?: number;
  height?: number;
  className?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const defaultSettings: ViewerSettings = {
  mode: 'ball-stick',
  showLabels: false,
  showBonds: true,
  backgroundColor: 'transparent',
  atomScale: 1,
  bondScale: 1,
};

export const Molecule3DViewer: React.FC<Molecule3DViewerProps> = ({
  atoms,
  bonds,
  settings = {},
  width = 400,
  height = 400,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState<Point3D>({ x: 0.3, y: 0.5, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState<Point3D>({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState(1);
  const animationRef = useRef<number | null>(null);
  const mergedSettings = { ...defaultSettings, ...settings };

  // 3D投影函数
  const project3D = useCallback((point: Point3D, rotation: Point3D, center: Point3D): Point3D => {
    // 绕Y轴旋转
    let x = point.x * Math.cos(rotation.y) - point.z * Math.sin(rotation.y);
    let z = point.x * Math.sin(rotation.y) + point.z * Math.cos(rotation.y);
    
    // 绕X轴旋转
    let y = point.y * Math.cos(rotation.x) - z * Math.sin(rotation.x);
    z = point.y * Math.sin(rotation.x) + z * Math.cos(rotation.x);
    
    return { x: x + center.x, y: y + center.y, z };
  }, []);

  // 绘制分子
  const drawMolecule = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 6 * zoom;
    
    // 计算原子投影位置
    const projectedAtoms = atoms.map((atom) => {
      const projected = project3D(
        { x: atom.x, y: atom.y, z: atom.z },
        rotation,
        { x: 0, y: 0, z: 0 }
      );
      return {
        ...atom,
        projectedX: centerX + projected.x * scale,
        projectedY: centerY - projected.y * scale,
        projectedZ: projected.z,
      };
    });
    
    // 按Z轴排序（远到近）
    const sortedAtoms = [...projectedAtoms].sort((a, b) => a.projectedZ - b.projectedZ);
    
    // 绘制化学键
    if (mergedSettings.showBonds && mergedSettings.mode !== 'space-fill') {
      bonds.forEach((bond) => {
        const atom1 = projectedAtoms.find((a) => a.id === bond.atom1);
        const atom2 = projectedAtoms.find((a) => a.id === bond.atom2);
        
        if (atom1 && atom2) {
          ctx.beginPath();
          ctx.moveTo(atom1.projectedX, atom1.projectedY);
          ctx.lineTo(atom2.projectedX, atom2.projectedY);
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
          ctx.lineWidth = bond.type === 'double' ? 4 : bond.type === 'triple' ? 6 : 3;
          ctx.stroke();
          
          // 双键/三键绘制
          if (bond.type === 'double') {
            const offset = 3;
            ctx.beginPath();
            ctx.moveTo(atom1.projectedX + offset, atom1.projectedY + offset);
            ctx.lineTo(atom2.projectedX + offset, atom2.projectedY + offset);
            ctx.stroke();
          }
        }
      });
    }
    
    // 绘制原子
    sortedAtoms.forEach((atom) => {
      const elementData = getElementData(atom.element);
      const radius = mergedSettings.mode === 'space-fill'
        ? (elementData?.vanDerWaalsRadius || atom.radius) * 50 * mergedSettings.atomScale
        : (elementData?.covalentRadius || atom.radius) * 80 * mergedSettings.atomScale;
      
      // 绘制原子球体（渐变效果）
      const gradient = ctx.createRadialGradient(
        atom.projectedX - radius * 0.3,
        atom.projectedY - radius * 0.3,
        0,
        atom.projectedX,
        atom.projectedY,
        radius
      );
      
      const baseColor = atom.color || elementData?.color || '#94a3b8';
      gradient.addColorStop(0, lightenColor(baseColor, 40));
      gradient.addColorStop(0.5, baseColor);
      gradient.addColorStop(1, darkenColor(baseColor, 30));
      
      ctx.beginPath();
      ctx.arc(atom.projectedX, atom.projectedY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // 高光效果
      ctx.beginPath();
      ctx.arc(
        atom.projectedX - radius * 0.3,
        atom.projectedY - radius * 0.3,
        radius * 0.25,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
      
      // 绘制标签
      if (mergedSettings.showLabels) {
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.fillText(atom.element, atom.projectedX, atom.projectedY + radius + 15);
      }
    });
  }, [atoms, bonds, rotation, zoom, width, height, mergedSettings, project3D]);

  // 颜色辅助函数
  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  const darkenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const B = Math.max(0, (num & 0x0000ff) - amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  // 动画循环
  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        setRotation((prev) => ({
          ...prev,
          y: prev.y + 0.003,
        }));
      }
      drawMolecule();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, drawMolecule]);

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY, z: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation((prev) => ({
      x: prev.x - deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
      z: prev.z,
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY, z: 0 });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(0.5, Math.min(3, prev - e.deltaY * 0.001)));
  };

  // 重置视角
  const resetView = () => {
    setRotation({ x: 0.3, y: 0.5, z: 0 });
    setZoom(1);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-grab active:cursor-grabbing rounded-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      
      {/* 控制按钮 */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          onClick={resetView}
          className="p-2 glass rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Reset View"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      {/* 缩放指示器 */}
      <div className="absolute bottom-3 left-3 px-2 py-1 glass rounded text-xs text-slate-400">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};

export default Molecule3DViewer;
