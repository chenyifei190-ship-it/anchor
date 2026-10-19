import React, { useState } from 'react';
import { ScreenId } from '../types/navigation';
import { SCREENS_DATA } from '../data/screensData';
import { CircularScreen } from './CircularScreen';
import { copySvgToClipboard, downloadFile } from '../utils/figmaExport';
import {
  Palette,
  Type,
  Maximize2,
  Copy,
  Check,
  Compass,
  ArrowUp,
  ArrowRight,
  ArrowLeft,
  Building,
  CheckCircle2,
  AlertTriangle,
  Download
} from 'lucide-react';

interface DesignSystemTokensProps {
  onSelectScreen: (id: ScreenId) => void;
  lang: 'zh' | 'en';
}

export const DesignSystemTokens: React.FC<DesignSystemTokensProps> = ({
  onSelectScreen,
  lang
}) => {
  const isZh = lang === 'zh';
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const colors = [
    {
      name: isZh ? '主画布深邃海军蓝' : 'Canvas Navy',
      token: 'color-bg-navy',
      hex: '#0A1124',
      ratio: '60% 基础色',
      desc: isZh ? '提供沉静安心的底色，降低眩光与视觉刺激' : 'Calm, non-glaring background for elderly eyes'
    },
    {
      name: isZh ? '高亮导航暖橙色' : 'Beacon Warm Orange',
      token: 'color-accent-orange',
      hex: '#F97316',
      ratio: '10% 重点色',
      desc: isZh ? '核心转向箭头与当前行动焦点，具备超高视觉辨识度' : 'Directional arrows & primary action highlight'
    },
    {
      name: isZh ? '主指令纯净白' : 'Text High Contrast White',
      token: 'color-text-primary',
      hex: '#FFFFFF',
      ratio: '对比度 14.2:1 (AAA)',
      desc: isZh ? '主指令标题，最高对比度保证白内障/老花眼老人看清' : 'Maximum contrast for primary instruction'
    },
    {
      name: isZh ? '辅助说明暖浅灰' : 'Text Muted Slate',
      token: 'color-text-secondary',
      hex: '#CBD5E1',
      ratio: '对比度 8.5:1 (AA)',
      desc: isZh ? '次要说明与地标参照物' : 'Secondary context & landmark cues'
    },
    {
      name: isZh ? '毛玻璃半透明灰' : 'Surface Frosted Glass',
      token: 'color-surface-glass',
      hex: '#1E293B (80% + blur)',
      ratio: '30% 结构层',
      desc: isZh ? '目的地标签与胶囊背景，Apple风格柔和虚化' : 'Frosted glass pill containers with blur'
    },
    {
      name: isZh ? '到达安全绿' : 'Status Success Emerald',
      token: 'color-status-success',
      hex: '#10B981',
      ratio: '状态辅助色',
      desc: isZh ? '到达诊区、报到成功与就医完成' : 'Arrival, check-in, visit completion'
    },
    {
      name: isZh ? '紧急求助珊瑚红' : 'Status Emergency Rose',
      token: 'color-status-alert',
      hex: '#EF4444',
      ratio: '警示辅助色',
      desc: isZh ? '身体不适停下休息、呼叫医护人员' : 'Stop, rest, medical emergency alert'
    }
  ];

  const typography = [
    {
      level: isZh ? '主指令核心标题 (Primary Text)' : 'Primary Instruction',
      size: '28px - 32px Bold',
      lineHeight: '1.2',
      tracking: '-0.01em',
      sampleCN: '请直行 / 请乘电梯到 5 楼',
      sampleEN: 'Please walk straight / Elevator 5F',
      rule: isZh ? '每屏仅突出一个当前动作，绝不出现多层长句' : 'One single action per screen, no multi-clause sentences'
    },
    {
      level: isZh ? '次要辅助说明 (Secondary Context)' : 'Secondary Text',
      size: '16px - 18px Medium',
      lineHeight: '1.3',
      tracking: 'normal',
      sampleCN: '经过便民药房后右转 / 沿主走廊向前直行',
      sampleEN: 'Turn right after pharmacy / Walk along corridor',
      rule: isZh ? '结合实体地标，避免抽象东西南北术语' : 'Tangible physical landmarks, no abstract compass headings'
    },
    {
      level: isZh ? '目的地/楼层标签 (Auxiliary Pill)' : 'Destination Badge',
      size: '13px SemiBold',
      lineHeight: '1.0',
      tracking: '0.02em',
      sampleCN: '心内科门诊 · 5楼 / 洗手间（本层）',
      sampleEN: 'Cardiology Clinic · 5F / Restroom',
      rule: isZh ? '置于顶部毛玻璃胶囊中，位置全系统统一' : 'Consistent top frosted glass capsule position'
    },
    {
      level: isZh ? '物理按键操作提示 (Button Prompt)' : 'Physical Button Cue',
      size: '11px Medium',
      lineHeight: '1.0',
      tracking: 'normal',
      sampleCN: '按下按键可提问 / 长按呼叫协助',
      sampleEN: 'Press button to ask / Hold for help',
      rule: isZh ? '提示大号实体按键操作，降低老年人学习成本' : 'Reinforces physical button affordance for seniors'
    }
  ];

  const interchangeableStates: {
    id: ScreenId;
    nameCN: string;
    nameEN: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'straight', nameCN: '直行状态 (Go Straight)', nameEN: 'Go Straight', icon: <ArrowUp className="w-4 h-4 text-orange-400" /> },
    { id: 'turn_right', nameCN: '路口右转 (Turn Right)', nameEN: 'Turn Right', icon: <ArrowRight className="w-4 h-4 text-orange-400" /> },
    { id: 'exit_elevator_left', nameCN: '出梯左转 (Turn Left)', nameEN: 'Turn Left', icon: <ArrowLeft className="w-4 h-4 text-orange-400" /> },
    { id: 'elevator_up', nameCN: '乘坐电梯 (Take Elevator)', nameEN: 'Take Elevator', icon: <Building className="w-4 h-4 text-orange-400" /> },
    { id: 'arrived_checkin', nameCN: '到达与报到 (Arrive & Check-in)', nameEN: 'Arrived', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'next_task_exam', nameCN: '下一步检验 (Next Task)', nameEN: 'Next Task', icon: <Compass className="w-4 h-4 text-orange-400" /> },
    { id: 'return_info_desk', nameCN: '返回服务台 (Return to Desk)', nameEN: 'Return Desk', icon: <Building className="w-4 h-4 text-orange-400" /> },
    { id: 'unwell_help', nameCN: '身体不适 (Feeling Unwell)', nameEN: 'Unwell Help', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> }
  ];

  const handleCopyTokensJson = async () => {
    const tokensJson = JSON.stringify(
      {
        device: {
          screen: {
            width: 360,
            height: 360,
            shape: 'circle',
            safe_area_diameter: 310,
            safe_margin: 25
          }
        },
        colors,
        typography
      },
      null,
      2
    );
    const success = await copySvgToClipboard(tokensJson);
    if (success) {
      setCopiedToken('JSON');
      setTimeout(() => setCopiedToken(null), 2500);
    }
  };

  const handleDownloadTokens = () => {
    const tokensJson = JSON.stringify({ colors, typography }, null, 2);
    downloadFile(tokensJson, 'ElderNav_Design_Tokens.json', 'application/json');
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-10">
      {/* Header Info */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-orange-400" />
            <span>{isZh ? 'ElderNav 适老化设计规范与组件库' : 'ElderNav Design System & Tokens'}</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {isZh
              ? '针对 360×360 px 圆形穿戴屏、老年人认知与弱视特性的无障碍设计规范'
              : 'Accessible tokens & component architecture for 360x360 circular elderly wearable'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyTokensJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transition-all active:scale-95"
          >
            {copiedToken === 'JSON' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedToken === 'JSON' ? (isZh ? '已复制 Token JSON' : 'Copied Tokens!') : (isZh ? '复制 Token JSON' : 'Copy Tokens JSON')}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTokens}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isZh ? '下载规范文件' : 'Download JSON'}</span>
          </button>
        </div>
      </div>

      {/* Section 1: Interchangeable Navigation States Matrix */}
      <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-orange-400" />
            <h3 className="text-base font-bold text-white">
              {isZh ? '可复用与可互换导航状态库 (Interchangeable States)' : 'Interchangeable Navigation States'}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {isZh ? '点击任一状态，立即同步穿戴设备界面' : 'Click to preview on wearable'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {interchangeableStates.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectScreen(item.id)}
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/50 text-left transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-slate-900 group-hover:bg-slate-800 border border-slate-700">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                  {isZh ? item.nameCN : item.nameEN}
                </span>
                <span className="text-[10px] text-slate-500">360×360 px</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Safe Area & Circular Geometry Blueprint */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Blueprint */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              {isZh ? '360×360 圆屏安全区规范 (Safe Area)' : 'Circular Display Safe Area'}
            </h3>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="relative w-64 h-64 rounded-full border-2 border-slate-700 bg-slate-950 flex items-center justify-center shadow-inner">
              {/* Outer boundary */}
              <span className="absolute top-2 text-[10px] font-mono text-slate-500">Ø 360 px Canvas</span>
              
              {/* Safe Area Inner Ring */}
              <div className="w-52 h-52 rounded-full border border-dashed border-cyan-400/70 flex flex-col items-center justify-between p-3 bg-cyan-950/20">
                <span className="text-[9px] font-mono text-cyan-400 bg-slate-900/90 px-1.5 py-0.5 rounded">
                  Top Pill Area (Ø310)
                </span>
                <div className="text-center">
                  <span className="text-xs font-bold text-white block">Core Graphic</span>
                  <span className="text-[10px] text-orange-400 font-mono">Center Anchored</span>
                </div>
                <span className="text-[9px] font-mono text-cyan-400 bg-slate-900/90 px-1.5 py-0.5 rounded">
                  Primary Text (28px)
                </span>
              </div>

              {/* Crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-400/15" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-400/15" />
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <p className="font-semibold text-white">
              {isZh ? '📐 圆屏适配防裁切法则：' : '📐 Anti-Clipping Principles:'}
            </p>
            <p>
              {isZh
                ? '• 内径安全区限定为 310px（四周预留 25px 安全边距），确保文字不被圆弧切边。'
                : '• Inner safe area bounded at Ø310px (25px circular margin) preventing edge cutoff.'}
            </p>
            <p>
              {isZh
                ? '• 顶部放置紧凑毛玻璃胶囊（最大宽度 240px），规避顶部圆弧收窄区域。'
                : '• Top auxiliary pill constrained to 240px width to fit narrow circular apex.'}
            </p>
            <p>
              {isZh
                ? '• 底部主指令文字置于 Y=240~280 黄金可读区，字号不低于 26px。'
                : '• Primary headline anchored at Y=240-280px with >= 26px font size.'}
            </p>
          </div>
        </div>

        {/* Section 3: Color Token Swatches */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-orange-400" />
              <h3 className="text-base font-bold text-white">
                {isZh ? '色彩规范 (60-30-10 规则)' : 'Color Tokens (60-30-10)'}
              </h3>
            </div>
            <span className="text-xs text-slate-400">WCAG AAA</span>
          </div>

          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[420px] pr-1">
            {colors.map(c => (
              <div
                key={c.token}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 rounded-lg border border-white/20 shrink-0 shadow-sm"
                    style={{ backgroundColor: c.hex.split(' ')[0] }}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-200">{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.desc}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="font-mono text-slate-300 font-bold">{c.hex}</span>
                  <span className="text-[10px] text-orange-400 font-medium">{c.ratio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Typography & Accessibility Standards */}
      <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Type className="w-5 h-5 text-orange-400" />
          <h3 className="text-base font-bold text-white">
            {isZh ? '适老化字体排印规范 (Elderly Typography Scale)' : 'Typography Scale'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {typography.map(t => (
            <div
              key={t.level}
              className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col gap-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 text-sm">{t.level}</span>
                <span className="font-mono text-orange-400 text-xs font-semibold">{t.size}</span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 my-1">
                <p className="text-white text-base font-bold tracking-tight">
                  {isZh ? t.sampleCN : t.sampleEN}
                </p>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <span className="text-emerald-400 font-semibold">{isZh ? '设计准则：' : 'Rule: '}</span>
                {t.rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
