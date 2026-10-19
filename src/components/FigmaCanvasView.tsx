import React, { useState } from 'react';
import { ScreenId, ScreenData } from '../types/navigation';
import { SCREENS_DATA, ALL_SCREEN_IDS } from '../data/screensData';
import { CircularScreen } from './CircularScreen';
import {
  generateScreenSvg,
  generateAllScreensCanvasSvg,
  copySvgToClipboard,
  downloadFile
} from '../utils/figmaExport';
import {
  Copy,
  Download,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface FigmaCanvasViewProps {
  currentScreenId: ScreenId;
  onSelectScreen: (id: ScreenId) => void;
  lang: 'zh' | 'en';
}

export const FigmaCanvasView: React.FC<FigmaCanvasViewProps> = ({
  currentScreenId,
  onSelectScreen,
  lang
}) => {
  const isZh = lang === 'zh';
  const [zoomLevel, setZoomLevel] = useState<number>(0.75);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showWireConnections, setShowWireConnections] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<'all' | 'main' | 'branch'>('all');

  const selectedScreen = SCREENS_DATA[currentScreenId];

  const handleCopySingleScreen = async (screen: ScreenData) => {
    const svgCode = generateScreenSvg(screen, lang);
    const success = await copySvgToClipboard(svgCode);
    if (success) {
      setCopiedId(screen.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleCopyAllScreens = async () => {
    const fullSvg = generateAllScreensCanvasSvg(lang);
    const success = await copySvgToClipboard(fullSvg);
    if (success) {
      setCopiedId('ALL');
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleDownloadSingleSvg = (screen: ScreenData) => {
    const svgCode = generateScreenSvg(screen, lang);
    downloadFile(svgCode, `eldernay_${screen.orderNumber}_${screen.id}.svg`);
  };

  const handleDownloadAllCanvas = () => {
    const fullSvg = generateAllScreensCanvasSvg(lang);
    downloadFile(fullSvg, `eldernay_hospital_wearable_figma_all_screens.svg`);
  };

  const filteredIds = ALL_SCREEN_IDS.filter(id => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'main') return SCREENS_DATA[id].category === 'main';
    return SCREENS_DATA[id].category !== 'main';
  });

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Figma Canvas Toolbar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        {/* Left: View Filters & Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Layers className="w-4 h-4 text-orange-400" />
            <span>{isZh ? 'Figma 交互画板矩阵 (12个屏幕)' : 'Figma Screen Matrix (12 Artboards)'}</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700" />

          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterCategory === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isZh ? '全部 (12)' : 'All (12)'}
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('main')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterCategory === 'main' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isZh ? '就诊主流程 (8)' : 'Main (8)'}
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('branch')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterCategory === 'branch' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isZh ? '分支问路与求助 (4)' : 'Branches (4)'}
            </button>
          </div>
        </div>

        {/* Right: Zoom & Export Actions */}
        <div className="flex items-center gap-2">
          {/* Prototyping Wires Toggle */}
          <button
            type="button"
            onClick={() => setShowWireConnections(!showWireConnections)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              showWireConnections ? 'text-sky-400 bg-sky-950/60 border border-sky-600/40' : 'text-slate-400 bg-slate-800/80 hover:text-white'
            }`}
            title="Toggle interactive flow connecting wires"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>{isZh ? '连线标记' : 'Wires'}</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.15))}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-slate-300 px-1 text-[11px]">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel(Math.min(1.2, zoomLevel + 0.15))}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(0.75)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Copy All to Figma */}
          <button
            type="button"
            onClick={handleCopyAllScreens}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-sm cursor-pointer transition-all active:scale-95"
            title="Copy all artboards as SVG. In Figma, simply press Cmd+V to paste as editable vector frames!"
          >
            {copiedId === 'ALL' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'ALL' ? (isZh ? '已复制全部！去Figma粘贴(Cmd+V)' : 'Copied! Paste in Figma') : (isZh ? '复制全部12屏至 Figma' : 'Copy All to Figma')}</span>
          </button>

          {/* Download Canvas SVG */}
          <button
            type="button"
            onClick={handleDownloadAllCanvas}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition-colors"
            title="Download full Figma-ready SVG canvas"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isZh ? '导出 .SVG' : 'Export SVG'}</span>
          </button>
        </div>
      </div>

      {/* Main Split: Artboard Infinite Canvas on Left, Figma Property Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Infinite Artboard Workspace (3 Columns on Large Screens) */}
        <div className="lg:col-span-3 bg-slate-950/80 rounded-3xl border border-slate-800/80 p-6 overflow-x-auto min-h-[680px] shadow-2xl relative">
          {/* Subtle Figma Dot Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div
            className="relative flex flex-wrap gap-8 items-start justify-center transition-transform origin-top"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {filteredIds.map((id, index) => {
              const screen = SCREENS_DATA[id];
              const isSelected = screen.id === currentScreenId;

              return (
                <div
                  key={screen.id}
                  className={`flex flex-col items-center gap-2 p-3 rounded-3xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-500/10 border-2 border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.35)]'
                      : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                  }`}
                  onClick={() => onSelectScreen(screen.id)}
                >
                  {/* Artboard Figma Header Label */}
                  <div className="w-full flex items-center justify-between px-2 text-xs">
                    <span className="font-bold text-slate-300">
                      {isZh ? screen.titleCN : screen.titleEN}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">360×360</span>
                  </div>

                  {/* Circular 360x360 Render Frame */}
                  <div className="rounded-full shadow-2xl">
                    <CircularScreen screen={screen} lang={lang} />
                  </div>

                  {/* Artboard Footer Actions */}
                  <div className="w-full flex items-center justify-between px-1 pt-1 text-[11px]">
                    <span className="text-slate-500">
                      {screen.category === 'main'
                        ? isZh
                          ? '主就诊链'
                          : 'Main Flow'
                        : isZh
                        ? '分支流程'
                        : 'Branch'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopySingleScreen(screen);
                        }}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        title="Copy single screen SVG to Figma clipboard"
                      >
                        {copiedId === screen.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">{isZh ? '已复制' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{isZh ? '复制SVG' : 'Copy'}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadSingleSvg(screen);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors"
                        title="Download SVG file"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Figma Properties & Component Inspector (1 Column) */}
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-5 flex flex-col gap-4 shadow-xl text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <h3 className="font-bold text-white text-sm">
                {isZh ? 'Figma 图层与属性检查器' : 'Figma Inspector'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">PROPERTIES</span>
          </div>

          {/* Current Selected Artboard Summary */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <span className="text-slate-400 font-semibold">
              {isZh ? selectedScreen.titleCN : selectedScreen.titleEN}
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div>
                <span className="text-slate-500 block">Frame:</span>
                <span className="font-mono text-slate-200">360 × 360 px</span>
              </div>
              <div>
                <span className="text-slate-500 block">Safe Diameter:</span>
                <span className="font-mono text-emerald-400">Ø 310 px</span>
              </div>
              <div>
                <span className="text-slate-500 block">Radius:</span>
                <span className="font-mono text-slate-200">180px (Circle)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Accent Color:</span>
                <span className="font-mono text-orange-400">#F97316</span>
              </div>
            </div>
          </div>

          {/* Elderly Accessibility Verification Spec */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{isZh ? '适老化无障碍设计原则' : 'Elderly Accessibility Specs'}</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {isZh ? selectedScreen.accessibleNotesCN : selectedScreen.accessibleNotesEN}
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1 text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>{isZh ? '主指令字号:' : 'Primary Text:'}</span>
                <span className="font-mono text-white">28px Bold (AA 14.2:1)</span>
              </div>
              <div className="flex justify-between">
                <span>{isZh ? '辅助说明字号:' : 'Secondary Text:'}</span>
                <span className="font-mono text-white">16px Medium</span>
              </div>
              <div className="flex justify-between">
                <span>{isZh ? '单一当前行动:' : 'Single Current Action:'}</span>
                <span className="text-emerald-400 font-medium">{isZh ? '严格遵循' : 'Enforced'}</span>
              </div>
            </div>
          </div>

          {/* Quick Copy to Figma Button */}
          <button
            type="button"
            onClick={() => handleCopySingleScreen(selectedScreen)}
            className="w-full py-2.5 px-4 rounded-xl font-semibold bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md"
          >
            {copiedId === selectedScreen.id ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{isZh ? '已复制！在Figma按 Cmd+V' : 'Copied! Press Cmd+V in Figma'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{isZh ? '复制选中屏幕矢量到 Figma' : 'Copy Selected Screen to Figma'}</span>
              </>
            )}
          </button>

          {/* Instructions for Figma Import */}
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-400 flex flex-col gap-1">
            <span className="font-semibold text-slate-300">
              {isZh ? '💡 如何在 Figma 中使用：' : '💡 How to use in Figma:'}
            </span>
            <span>
              {isZh
                ? '1. 点击“复制到 Figma”按钮'
                : '1. Click "Copy to Figma"'}
            </span>
            <span>
              {isZh
                ? '2. 打开 Figma 任意文件，按 Cmd+V / Ctrl+V 粘贴'
                : '2. Open any Figma canvas, press Cmd+V'}
            </span>
            <span>
              {isZh
                ? '3. 画布将自动生成包含矢量路径、图层组与文字样式的原生画板！'
                : '3. Generates native vector layers, text objects & circular frames.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
