import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenData } from '../types/navigation';
import {
  Heart,
  Volume2,
  Mic,
  MapPin,
  HelpCircle,
  AlertOctagon,
  CheckCircle2,
  Building2,
  Sparkles
} from 'lucide-react';

interface CircularScreenProps {
  screen: ScreenData;
  lang: 'zh' | 'en';
  showSafeAreaGuides?: boolean;
  onScreenClick?: () => void;
  isListening?: boolean;
  isSpeaking?: boolean;
}

export const CircularScreen: React.FC<CircularScreenProps> = ({
  screen,
  lang,
  showSafeAreaGuides = false,
  onScreenClick,
  isListening = false,
  isSpeaking = false
}) => {
  const isZh = lang === 'zh';
  const primaryText = isZh ? screen.primaryInstructionCN : screen.primaryInstructionEN;
  const secondaryText = isZh ? screen.secondaryInstructionCN : screen.secondaryInstructionEN;
  const destinationText = isZh ? screen.destinationTagCN : screen.destinationTagEN;
  const buttonPrompt = isZh ? screen.buttonPromptCN : screen.buttonPromptEN;

  return (
    <div
      onClick={onScreenClick}
      className="relative w-[360px] h-[360px] rounded-full overflow-hidden select-none cursor-pointer flex flex-col items-center justify-between p-5 text-center transition-all duration-300"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #152243 0%, #0c1427 65%, #070b14 100%)',
        boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.9), inset 0 2px 4px rgba(255, 255, 255, 0.15)'
      }}
      role="region"
      aria-label={primaryText}
    >
      {/* Subtle Circular Glass Reflection */}
      <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/30" />

      {/* Safe Area Measurement Guidelines (Toggleable) */}
      {showSafeAreaGuides && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Safe Area Inner Ring: Ø310px (25px margin) */}
          <div className="absolute inset-[25px] rounded-full border border-dashed border-cyan-400/50 flex items-center justify-center">
            <span className="absolute top-1 text-[10px] font-mono text-cyan-300 bg-slate-900/80 px-1.5 py-0.5 rounded">
              SAFE AREA Ø310px
            </span>
          </div>
          {/* Center Crosshairs */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-cyan-400/20 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-400/20 -translate-y-1/2" />
          <div className="absolute top-2 right-6 text-[9px] font-mono text-cyan-400">
            360×360 px
          </div>
        </div>
      )}

      {/* Top Zone: Frosted Glass Destination Badge (Auxiliary Info) */}
      <div className="z-10 w-full pt-2 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {destinationText && (
            <motion.div
              key={destinationText}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="px-3.5 py-1 rounded-full bg-slate-800/70 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-medium tracking-wide flex items-center gap-1.5 shadow-sm max-w-[240px] truncate"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="truncate">{destinationText}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio Speaking Wave Indicator */}
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-1 flex items-center gap-1 text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full"
          >
            <Volume2 className="w-3 h-3 animate-pulse" />
            <span>{isZh ? '正在语音播报...' : 'Speaking...'}</span>
          </motion.div>
        )}
      </div>

      {/* Center Zone: Core Graphic Icon / Arrow (Opaque & High Contrast) */}
      <div className="z-10 flex-1 flex items-center justify-center w-full my-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen.id}
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.82, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="flex items-center justify-center"
          >
            {renderGraphic(screen.graphicType, isListening, isZh)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Zone: Primary Instruction & Button Reminder */}
      <div className="z-10 w-full pb-3 flex flex-col items-center justify-end">
        {/* Primary Large Instruction (26px-32px High Legibility) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={primaryText}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="w-full px-4"
          >
            <h1 className="text-[26px] leading-[1.18] font-bold text-white tracking-tight drop-shadow-md">
              {primaryText}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Secondary Context Subtitle (15px-18px) */}
        {secondaryText && (
          <p className="text-[15px] font-normal text-slate-300 mt-1 max-w-[270px] leading-snug line-clamp-1">
            {secondaryText}
          </p>
        )}

        {/* Physical Button Prompt Pill (Frosted Glass / Tactile Cue) */}
        <div className="mt-2.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 text-slate-300 text-[11px] font-medium flex items-center gap-1.5 shadow-sm max-w-[250px] truncate">
          <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
          <span className="truncate">{buttonPrompt}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Renders the domain-specific graphic for each interface state
 */
function renderGraphic(graphicType: string, isListening: boolean, isZh: boolean) {
  switch (graphicType) {
    case 'ready_badge':
      return (
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-orange-500/15 border-2 border-orange-500/40 flex items-center justify-center animate-pulse">
            <div className="w-18 h-18 rounded-full bg-orange-500/30 flex items-center justify-center shadow-lg">
              <Heart className="w-9 h-9 text-orange-400 fill-orange-400" />
            </div>
          </div>
          <span className="absolute -bottom-2 bg-slate-900 border border-orange-500/50 text-orange-400 text-[11px] font-bold px-2 py-0.5 rounded-full">
            {isZh ? '准备出发' : 'START'}
          </span>
        </div>
      );

    case 'arrow_straight':
      return (
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-slate-800/80 border-2 border-slate-700 flex items-center justify-center shadow-lg">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <motion.path
                d="M30 46 L30 14 M16 26 L30 12 L44 26"
                stroke="#F97316"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0.8, y: 2 }}
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </div>
          <div className="text-[12px] font-semibold text-orange-400 mt-1 tracking-wider">
            {isZh ? '直 行' : 'STRAIGHT'}
          </div>
        </div>
      );

    case 'arrow_turn_right':
      return (
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-slate-800/80 border-2 border-slate-700 flex items-center justify-center shadow-lg">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              {/* Landmark Road Grid Cue */}
              <line x1="20" y1="48" x2="20" y2="34" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
              {/* Curved Big Turn Right Arrow */}
              <motion.path
                d="M20 48 L20 32 Q20 20 32 20 L48 20 M38 10 L50 20 L38 30"
                stroke="#F97316"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </div>
          <div className="text-[12px] font-semibold text-orange-400 mt-1 tracking-wider">
            {isZh ? '路口右转' : 'TURN RIGHT'}
          </div>
        </div>
      );

    case 'elevator_5':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-26 h-22 rounded-2xl bg-slate-800/90 border-2 border-orange-500/80 flex items-center justify-between px-3 shadow-xl relative overflow-hidden">
            {/* Elevator Door Guide Lines */}
            <div className="w-1.5 h-full bg-slate-700/60 rounded" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-orange-400 tracking-wider">
                {isZh ? '目标楼层' : 'TARGET'}
              </span>
              <span className="text-4xl font-black text-white leading-none tracking-tight">
                5F
              </span>
            </div>
            <div className="w-1.5 h-full bg-slate-700/60 rounded" />
          </div>
          <div className="text-[12px] font-semibold text-orange-400 mt-1.5">
            {isZh ? '乘梯至 5 层' : 'Elevator to 5F'}
          </div>
        </div>
      );

    case 'arrow_exit_left':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-slate-800/80 border-2 border-slate-700 flex items-center justify-center shadow-lg">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              {/* Exit Elevator icon + Left turn arrow */}
              <rect x="36" y="22" width="16" height="24" rx="2" stroke="#64748B" strokeWidth="2.5" fill="#1E293B" />
              <motion.path
                d="M40 34 L22 34 M30 24 L18 34 L30 44"
                stroke="#F97316"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ x: [0, -3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </div>
          <div className="text-[12px] font-semibold text-orange-400 mt-1">
            {isZh ? '出梯左转' : 'EXIT & TURN LEFT'}
          </div>
        </div>
      );

    case 'kiosk_checkin':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-22 h-22 rounded-full bg-emerald-950/60 border-2 border-emerald-500/80 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="text-[12px] font-semibold text-emerald-400 mt-1.5">
            {isZh ? '到达诊区 · 报到' : 'ARRIVED & CHECK-IN'}
          </div>
        </div>
      );

    case 'lab_blood':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-22 h-22 rounded-full bg-slate-800/90 border-2 border-orange-500/80 flex flex-col items-center justify-center shadow-lg relative">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center mb-0.5">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping opacity-75" />
            </div>
            <span className="text-xl font-black text-white leading-none">2F</span>
          </div>
          <div className="text-[12px] font-semibold text-orange-400 mt-1">
            {isZh ? '抽血化验 · 2楼' : 'LAB TEST · 2F'}
          </div>
        </div>
      );

    case 'voice_waveform':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-sky-950/60 border-2 border-sky-400/80 flex items-center justify-center shadow-xl relative">
            {/* Subtle Voice Waveform Bars */}
            <div className="flex items-center gap-1.5 h-10">
              {[16, 28, 40, 24, 34, 18, 30].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 rounded-full bg-sky-400"
                  animate={{
                    height: isListening ? [h * 0.4, h, h * 0.4] : [10, 16, 10]
                  }}
                  transition={{
                    duration: 0.8 + i * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
            <div className="absolute -bottom-1 bg-sky-500 text-slate-950 p-1 rounded-full shadow">
              <Mic className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-[12px] font-semibold text-sky-400 mt-1.5">
            {isZh ? '正在聆听您的提问...' : 'Listening...'}
          </div>
        </div>
      );

    case 'restroom_confirm':
    case 'restroom_walk':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-22 h-22 rounded-full bg-sky-950/50 border-2 border-sky-400/80 flex items-center justify-center shadow-lg">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-sky-400">WC</span>
              </div>
            </div>
          </div>
          <div className="text-[12px] font-semibold text-sky-400 mt-1">
            {isZh ? '本层无障碍洗手间' : 'Restroom Nearby'}
          </div>
        </div>
      );

    case 'reroute_compass':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-22 h-22 rounded-full bg-amber-950/40 border-2 border-amber-400/80 flex items-center justify-center shadow-lg">
            <motion.div
              animate={{ rotate: [0, 20, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-10 h-10 text-amber-400" />
            </motion.div>
          </div>
          <div className="text-[12px] font-semibold text-amber-400 mt-1">
            {isZh ? '正在重新规划路线' : 'Recalibrating'}
          </div>
        </div>
      );

    case 'info_desk':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-22 h-22 rounded-full bg-slate-800/90 border-2 border-orange-500/80 flex items-center justify-center shadow-lg">
            <Building2 className="w-10 h-10 text-orange-400" />
          </div>
          <div className="text-[12px] font-semibold text-orange-400 mt-1">
            {isZh ? '一楼导医总服务台' : '1F Info Desk'}
          </div>
        </div>
      );

    case 'unwell_rest':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-22 h-22 rounded-full bg-red-950/70 border-2 border-rose-500 flex items-center justify-center shadow-lg animate-pulse">
            <AlertOctagon className="w-11 h-11 text-rose-500" />
          </div>
          <div className="text-[12px] font-semibold text-rose-400 mt-1">
            {isZh ? '请停步休息 · 呼叫协助' : 'Pause & Rest'}
          </div>
        </div>
      );

    case 'complete_star':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-22 h-22 rounded-full bg-emerald-950/60 border-2 border-emerald-400 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-11 h-11 text-emerald-400" />
          </div>
          <div className="text-[12px] font-semibold text-emerald-400 mt-1">
            {isZh ? '就诊圆满结束' : 'Completed'}
          </div>
        </div>
      );

    default:
      return (
        <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
          <HelpCircle className="w-8 h-8 text-orange-400" />
        </div>
      );
  }
}
