import React, { useEffect, useRef } from 'react';
import { MoleculeSearch } from '@/components/molecule/MoleculeSearch';
import { Atom, Sparkles, Beaker } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (formula: string) => void;
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // 背景动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      connections: number[];
    }> = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(30, Math.floor(window.innerWidth / 50));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2,
          color: ['#6366f1', '#a855f7', '#818cf8'][Math.floor(Math.random() * 3)],
          connections: [],
        });
      }
    };
    
    const drawParticle = (p: typeof particles[0]) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // 发光效果
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      gradient.addColorStop(0, p.color + '40');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    };
    
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新粒子位置
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // 边界反弹
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        drawParticle(p);
      });
      
      drawConnections();
      animationId = requestAnimationFrame(animate);
    };
    
    resize();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* 背景画布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900 pointer-events-none" />
      
      {/* 装饰元素 */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
      
      {/* 内容 */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        {/* Logo/图标 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
              <Atom className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        
        {/* 标题 */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">分子结构</span>
          <span className="text-white">，可视化呈现</span>
        </h1>
        
        {/* 副标题 */}
        <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          输入分子式，即可在几秒内获得即时的
          <span className="text-indigo-400">3D模型</span>、
          <span className="text-purple-400">路易斯结构式</span>
          和详细的理化性质分析
        </p>
        
        {/* 搜索框 */}
        <div className="mb-8">
          <MoleculeSearch onSearch={onSearch} isLoading={isLoading} />
        </div>
        
        {/* 快捷入口 */}
        <div className="flex flex-wrap justify-center gap-3">
          {['H2O', 'CO2', 'CH4', 'NH3', 'C2H5OH'].map((formula) => (
            <button
              key={formula}
              onClick={() => onSearch(formula)}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-indigo-500/50 rounded-full text-sm text-slate-300 hover:text-white transition-all flex items-center gap-2"
            >
              <Beaker className="w-3 h-3" />
              {formula}
            </button>
          ))}
        </div>
        
        {/* 特性标签 */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>即时3D渲染</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            <span>路易斯结构式</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span>15+理化性质</span>
          </div>
        </div>
      </div>
      
      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-slate-400 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
