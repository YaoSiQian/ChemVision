import React from 'react';
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

const features = [
  {
    icon: <Box className="w-8 h-8" />,
    title: '3D分子模型',
    description: '支持球棍模型和比例模型，360°自由旋转，无极缩放，让分子结构一目了然。',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: '路易斯结构式',
    description: '清晰展示元素符号、共价键和孤对电子，解决学生画结构式的痛点。',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: '电子结构分析',
    description: '自动计算总电子数、成键电子数、孤对电子数，标注杂化轨道类型。',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <Microscope className="w-8 h-8" />,
    title: '几何构型判定',
    description: '基于VSEPR理论标注分子几何名称，显示键长、键角等参数。',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: '理化性质数据库',
    description: '15+维度数据：分子量、熔沸点、密度、溶解性、热力学数据等。',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Radio className="w-8 h-8" />,
    title: '光谱指纹',
    description: '提供红外(IR)峰位及质谱(MS)特征峰图谱，辅助物质鉴定。',
    color: 'from-rose-500 to-red-500',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: '安全性数据',
    description: '毒性等级、可燃性、反应性、生物降解性等安全信息。',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: <FlaskConical className="w-8 h-8" />,
    title: '反应预测',
    description: '展示该分子作为反应物和生成物的常见化学方程式。',
    color: 'from-violet-500 to-purple-500',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-4">
            <Atom className="w-4 h-4" />
            <span>强大功能</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            全方位的分子分析工具
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            为化学教育与科研量身打造，从分子式到完整分析，只需几秒钟
          </p>
        </div>
        
        {/* 特性网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative glass-card p-6 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1"
            >
              {/* 发光效果 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
              
              {/* 图标 */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* 内容 */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* 统计数据 */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '100+', label: '支持分子' },
            { value: '15+', label: '数据维度' },
            { value: '3D', label: '实时渲染' },
            { value: '0s', label: '响应时间' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
