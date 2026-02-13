import React, { useEffect, useRef } from 'react';
import { MoleculeSearch } from '@/components/molecule/MoleculeSearch';
import { useLanguage } from '@/i18n';
import { Atom, Sparkles, Beaker } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (formula: string) => void;
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const { t } = useLanguage();
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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-background">
      {/* 背景画布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* 渐变与有机模糊装饰（Material You 风格） */}
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-md-primary/12 rounded-full blur-3xl mix-blend-multiply transform -translate-x-1/4" />
      <div aria-hidden="true" className="absolute top-24 right-1/4 w-56 h-56 bg-tertiary/12 rounded-full blur-3xl mix-blend-multiply" />
      
      {/* 内容 */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <div className="bg-surface-container p-8 rounded-[48px] shadow-md">
        {/* Logo/图标 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-[32px] bg-gradient-to-br from-md-primary 500 to-tertiary 600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Atom className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        
        {/* 标题 / Title */}
        <h1 className="text-4xl md:text-6xl font-medium mb-4 leading-tight">
          <span className="text-gradient">{t.heroTitle}</span>
        </h1>
        
        {/* 副标题 / Subtitle */}
        <p className="text-lg md:text-xl text-on-surface-variant mb-8 max-w-2xl mx-auto">
          {t.heroSubtitle}
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
              className="px-6 py-2 bg-secondary-container text-secondary-container-foreground rounded-full text-sm transition-all hover:shadow-md active:scale-95 flex items-center gap-2"
            >
              <Beaker className="w-3 h-3" />
              {formula}
            </button>
          ))}
        </div>
        
        {/* 特性标签 / Feature tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>{t.feature3DTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-md-primary rounded-full" />
            <span>{t.featureLewisTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span>15+ {t.physicalProperties}</span>
          </div>
        </div>
      </div>
      
      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-outline rounded-full flex justify-center pt-2 bg-transparent">
          <div className="w-1 h-2 bg-on-surface-variant rounded-full" />
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
