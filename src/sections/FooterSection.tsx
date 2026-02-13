import React from 'react';
import { Atom, Github, Twitter, Mail, Heart } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* 品牌 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Atom className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">ChemVision</h3>
                <p className="text-xs text-slate-500">分子结构分析平台</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              ChemVision 是一个超低门槛的化学教育与科研辅助平台，
              让分子结构可视化变得简单直观。输入分子式，即可获得完整的3D模型和理化性质分析。
            </p>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">快速链接</h4>
            <ul className="space-y-2">
              {['首页', '分子搜索', '特性介绍', '关于我们'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 联系我们 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">联系我们</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* 底部版权 */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2024 ChemVision. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for chemistry enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
