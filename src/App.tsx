/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, CSSProperties } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { CVPreview } from './components/CVPreview';
import { CVToolbar } from './components/CVToolbar';
import { TemplateGallery } from './components/TemplateGallery';
import { TEMPLATE_CONFIG } from './templates';
import { ResumeData, TemplateType, StyleConfig } from './types';
import { mockResumeData } from './mockData';
import { Layout, Sparkles, FileText, Eye, EyeOff, Menu, X, Palette, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import { useEffect } from 'react';

export default function App() {
  const [data, setData] = useState<ResumeData>(mockResumeData);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    fontFamily: 'Inter',
    fontSize: 'medium',
    lineHeight: 1.5,
    primaryColor: TEMPLATE_CONFIG['modern']?.primaryColor || '#3b82f6',
  });

  // Switch Effect: Update primaryColor and fontFamily when template changes
  useEffect(() => {
    const config = TEMPLATE_CONFIG[template];
    if (config) {
      setStyleConfig(prev => ({
        ...prev,
        primaryColor: config.primaryColor,
        fontFamily: config.fontFamily,
        fontSize: 'medium',
        lineHeight: 1.5
      }));
    }
  }, [template]);

  const handlePrint = () => {
    console.log("Print triggered - this will work in production");
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
            <FileText size={18} />
          </div>
          <span className="font-bold tracking-tight text-lg hidden sm:inline">CraftCV</span>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
              showTemplates ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            )}
          >
            <Palette size={18} />
            <span className="hidden md:inline">Templates</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="relative z-50 flex items-center gap-2 px-3 md:px-5 py-2 bg-zinc-900 text-white rounded-xl text-xs md:text-sm font-semibold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 active:scale-95"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Print / Save PDF</span>
          </button>

          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden p-2 bg-zinc-100 rounded-xl text-zinc-600 hover:bg-zinc-200 transition-colors"
          >
            {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Template Sidebar */}
        <AnimatePresence>
          {showTemplates && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTemplates(false)}
                className="fixed inset-0 bg-black/40 z-[55]"
              />
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="fixed inset-y-0 left-0 w-80 bg-white border-r border-zinc-200 z-[60] p-6 overflow-y-auto shadow-2xl h-screen"
              >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Choose Template</h2>
                <button onClick={() => setShowTemplates(false)} className="p-2 hover:bg-zinc-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <TemplateGallery currentTemplate={template} onSelect={(id) => { setTemplate(id); }} />
            </motion.div>
          </>
          )}
        </AnimatePresence>

        {/* Left Side: Form */}
        {!isFullScreen && (
          <div className={cn(
            "w-full lg:w-1/2 overflow-y-auto p-4 md:p-8 border-r border-zinc-200 custom-scrollbar transition-all duration-300",
            showPreview ? "hidden lg:block" : "block"
          )}>
            <div className="max-w-2xl mx-auto">
              <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Build your resume</h1>
                <p className="text-zinc-500 text-sm">Fill in your details and watch your CV come to life.</p>
              </header>
              <ResumeForm data={data} onChange={setData} onPrint={() => handlePrint()} />
            </div>
          </div>
        )}

        {/* Right Side: Preview */}
        <div className={cn(
          "bg-zinc-200 overflow-y-auto p-4 md:p-12 flex flex-col items-center gap-8 custom-scrollbar transition-all duration-300 relative",
          isFullScreen ? "w-full" : "w-full lg:w-1/2",
          showPreview ? "block fixed inset-0 z-40 lg:relative lg:z-0 lg:block bg-white lg:bg-zinc-200" : "hidden lg:flex"
        )}>
          {isFullScreen && (
            <button 
              onClick={() => setIsFullScreen(false)}
              className="fixed top-6 left-6 z-[60] flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-sm font-bold shadow-2xl hover:bg-zinc-800 transition-all active:scale-95"
            >
              <X size={18} />
              <span>Close Full Screen</span>
            </button>
          )}
          
          {showPreview && !isFullScreen && (
            <button 
              onClick={() => setShowPreview(false)}
              className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-zinc-900 text-white rounded-full shadow-xl"
            >
              <X size={24} />
            </button>
          )}
          
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="origin-top antialiased flex flex-col items-center gap-8 pb-32"
          >
            <div 
              id="cv-preview-root"
              className="resume-preview-container w-full" 
              ref={cvRef}
            >
              <CVPreview data={data} template={template} styleConfig={styleConfig} />
            </div>
          </motion.div>
        </div>
      </main>

      <CVToolbar 
        style={styleConfig} 
        setStyle={setStyleConfig}
        template={template}
        setTemplate={setTemplate}
        onToggleTemplates={() => setShowTemplates(true)}
        onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
        isFullScreen={isFullScreen}
        onPrint={handlePrint}
      />

      {/* Floating Sparkle for AI vibe (optional) */}
      <div className="fixed bottom-8 right-8 pointer-events-none opacity-10 hidden lg:block">
        <Sparkles size={120} className="text-zinc-300" />
      </div>
    </div>
  );
}
