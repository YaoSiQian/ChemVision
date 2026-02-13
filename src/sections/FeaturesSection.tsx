import React from 'react';
import { useLanguage } from '@/i18n';
import { 
  Box, 
  Layers, 
  Zap, 
  Microscope, 
  Shield, 
  BarChart3,
  Atom,
  FlaskConical,
  Radio
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: <Box className="w-8 h-8" />,
      title: t.feature3DTitle,
      description: t.feature3DDesc,
      color: 'from-md-primary 500 to-blue-500',
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: t.featureLewisTitle,
      description: t.featureLewisDesc,
      color: 'from-tertiary 500 to-pink-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t.electronicProperties,
      description: t.featurePropertyDesc,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: t.geometry,
      description: t.featurePropertyDesc,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t.physicalProperties,
      description: t.featurePropertyDesc,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <Radio className="w-8 h-8" />,
      title: t.spectralData,
      description: t.featureSpectralDesc,
      color: 'from-rose-500 to-red-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t.safetyInfo,
      description: t.featurePropertyDesc,
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: t.reactions,
      description: t.featureReactionDesc,
      color: 'from-violet-500 to-tertiary 500',
    },
  ];

  return (
    <section className="relative py-24 px-4 bg-background overflow-hidden">
      {/* 有机模糊装饰 / Organic blur shapes */}
      <div aria-hidden="true" className="absolute bottom-20 -left-32 w-[400px] h-[400px] bg-md-primary/10 rounded-full blur-3xl mix-blend-multiply" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* 标题 / Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-md-primary/10 rounded-full text-md-primary text-sm mb-4">
            <Atom className="w-4 h-4" />
            <span>{t.featuresTitle}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            {t.featuresTitle}
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            {t.featuresSubtitle}
          </p>
        </div>
        
        {/* 特性网格 / Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-surface-container rounded-[24px] shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              {/* 发光效果 / Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-[24px] transition-opacity duration-300`} />
              
              {/* 图标 / Icon */}
              <div className={`w-14 h-14 rounded-[24px] bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* 内容 / Content */}
              <h3 className="text-lg font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* 统计数据 / Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '100+', label: language === 'zh' ? '支持分子' : 'Molecules' },
            { value: '15+', label: language === 'zh' ? '数据维度' : 'Data Dimensions' },
            { value: '3D', label: language === 'zh' ? '实时渲染' : 'Real-time Rendering' },
            { value: '0s', label: language === 'zh' ? '响应时间' : 'Response Time' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-on-surface-variant">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
