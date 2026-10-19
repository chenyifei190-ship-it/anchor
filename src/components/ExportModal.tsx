import React, { useState } from 'react';
import { ScreenId } from '../types/navigation';
import { SCREENS_DATA, ALL_SCREEN_IDS } from '../data/screensData';
import {
  generateScreenSvg,
  generateAllScreensCanvasSvg,
  copySvgToClipboard,
  downloadFile
} from '../utils/figmaExport';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreenId: ScreenId;
  lang: 'zh' | 'en';
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  currentScreenId,
  lang
}) => {
  if (!isOpen) return null;

  const isZh = lang === 'zh';
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const currentScreen = SCREENS_DATA[currentScreenId];

  const handleCopyCurrent = async () => {
    const svg = generateScreenSvg(currentScreen, lang);
    const success = await copySvgToClipboard(svg);
    if (success) {
      setCopiedType('CURRENT');
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleCopyAll = async () => {
    const svg = generateAllScreensCanvasSvg(lang);
    const success = await copySvgToClipboard(svg);
    if (success) {
      setCopiedType('ALL');
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleDownloadCurrent = () => {
    const svg = generateScreenSvg(currentScreen, lang);
    downloadFile(svg, `eldernay_screen_${currentScreen.orderNumber}_${currentScreen.id}.svg`);
  };

  const handleDownloadAll = () => {
    const svg = generateAllScreensCanvasSvg(lang);
    downloadFile(svg, 'eldernay_hospital_wearable_figma_complete_system.svg');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-5 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-white">
              {isZh ? '导出至 Figma (Editable Figma Export)' : 'Export to Figma'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions banner */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>{isZh ? '直接粘贴至 Figma 功能说明' : 'Direct Paste into Figma'}</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {isZh
              ? '点击下方按钮将矢量图形复制到系统剪贴板。打开 Figma 后直接按键盘【Cmd + V】（Mac）或【Ctrl + V】（Windows），Figma 会自动将 SVG 解析为包含原生矢量路径、图层组、文字与圆屏蒙版的完整可编辑画板！'
              : 'Click below to copy SVG vector data. Press Cmd+V in any Figma canvas to paste native vector frames, layers, and text elements directly!'}
          </p>
        </div>

        {/* Export Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Current Screen */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-white block">
                {isZh ? '当前单屏画板' : 'Current Screen'}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {isZh ? currentScreen.titleCN : currentScreen.titleEN}
              </span>
              <span className="text-[10px] font-mono text-orange-400">360 × 360 px</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCopyCurrent}
                className="w-full py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                {copiedType === 'CURRENT' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>{isZh ? '已复制！去Figma按Cmd+V' : 'Copied! Paste in Figma'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isZh ? '复制单屏至 Figma' : 'Copy Screen to Figma'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadCurrent}
                className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isZh ? '下载单屏 .SVG' : 'Download .SVG'}</span>
              </button>
            </div>
          </div>

          {/* Option 2: All 12 Screens Full System */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-white block">
                {isZh ? '全部 12 张画板矩阵' : 'All 12 Artboards Matrix'}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {isZh ? '包含主流程、语音问路、重定向与求助' : 'Full clinic flow & branches'}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">12 Frames Bundle</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCopyAll}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                {copiedType === 'ALL' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>{isZh ? '已复制全部！去Figma按Cmd+V' : 'Copied All! Paste in Figma'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isZh ? '复制全部12屏至 Figma' : 'Copy All to Figma'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadAll}
                className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isZh ? '下载全部画板 .SVG' : 'Download Complete .SVG'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-2 border-t border-slate-800 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer transition-colors"
          >
            {isZh ? '完成 / 关闭' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
