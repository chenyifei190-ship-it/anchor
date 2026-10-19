import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { CircularScreen } from './CircularScreen';
import { ScreenData } from '../types/navigation';
import { soundManager } from '../utils/audio';
import { Mic, HeartHandshake } from 'lucide-react';

interface PhysicalWearableDeviceProps {
  screen: ScreenData;
  lang: 'zh' | 'en';
  showSafeAreaGuides: boolean;
  onScreenClick: () => void;
  onPhysicalButtonClick: () => void;
  onPhysicalButtonLongPress: () => void;
  isListening: boolean;
  isSpeaking: boolean;
}

export const PhysicalWearableDevice: React.FC<PhysicalWearableDeviceProps> = ({
  screen,
  lang,
  showSafeAreaGuides,
  onScreenClick,
  onPhysicalButtonClick,
  onPhysicalButtonLongPress,
  isListening,
  isSpeaking
}) => {
  const isZh = lang === 'zh';
  const [isPressing, setIsPressing] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const handlePointerDown = () => {
    setIsPressing(true);
    setHoldProgress(0);
    soundManager.playChime('click');

    // Trigger haptic vibration on mobile if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }

    const startTime = Date.now();
    const duration = 1200; // 1.2s hold for emergency

    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setHoldProgress(progress);
    }, 30);

    timerRef.current = window.setTimeout(() => {
      // Long press fired!
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setIsPressing(false);
      setHoldProgress(0);
      soundManager.playChime('alert');
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([80, 50, 120]);
      }
      onPhysicalButtonLongPress();
    }, duration);
  };

  const handlePointerUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // If released before 1.2s threshold, trigger short click
    if (isPressing && holdProgress < 85) {
      onPhysicalButtonClick();
    }

    setIsPressing(false);
    setHoldProgress(0);
  };

  const handlePointerLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setIsPressing(false);
    setHoldProgress(0);
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Wearable Neck Lanyard Strap Attachment */}
      <div className="w-28 flex flex-col items-center">
        {/* Soft braided hospital nylon strap */}
        <div className="w-16 h-10 bg-gradient-to-b from-sky-950 via-slate-800 to-slate-700 rounded-t-xl border-x-2 border-t-2 border-slate-600/60 shadow-md relative overflow-hidden flex items-center justify-center">
          {/* Fabric texture lines */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.06)_2px,rgba(255,255,255,0.06)_4px)]" />
          <span className="text-[9px] font-bold tracking-widest text-slate-400 z-10">
            HOSPITAL
          </span>
        </div>
        {/* Metal Carabiner Loop */}
        <div className="w-8 h-3.5 bg-slate-600 rounded-b-md border border-slate-500 shadow-sm" />
      </div>

      {/* Main Wearable Device Physical Chassis */}
      <div
        className="w-[428px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 rounded-[56px] p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_2px_rgba(71,85,105,0.4)] border border-slate-700/60 flex flex-col items-center relative transition-all"
        style={{
          boxShadow:
            '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08), inset 0 2px 4px rgba(255,255,255,0.15)'
        }}
      >
        {/* Device Top Acoustic Section: Mic Pin & Speaker Holes */}
        <div className="w-full flex items-center justify-between px-10 pt-1 pb-3 text-slate-500">
          {/* Dual Noise-Canceling Mic Pinhole */}
          <div className="flex items-center gap-1.5" title="Dual noise-canceling microphone">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-700 shadow-inner" />
            <span className="text-[10px] tracking-wider font-semibold text-slate-400">MIC</span>
          </div>

          {/* Hospital Device Brand / Asset Badge */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase">
              ElderNav · No. 042
            </span>
          </div>

          {/* Speaker Slits */}
          <div className="flex items-center gap-1" title="Acoustic speaker slits">
            <span className="w-1 h-3 rounded-full bg-slate-950 border border-slate-700" />
            <span className="w-1 h-3.5 rounded-full bg-slate-950 border border-slate-700" />
            <span className="w-1 h-3 rounded-full bg-slate-950 border border-slate-700" />
          </div>
        </div>

        {/* Circular Display Outer Bezel (Dark Titanium Matte) */}
        <div className="relative p-2.5 rounded-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9),0_4px_12px_rgba(0,0,0,0.5)] border border-slate-600/70">
          {/* Subtle Bezel Degree Tick Marks */}
          <div className="absolute inset-0 rounded-full border border-slate-700/40 pointer-events-none" />

          {/* 360 x 360 Circular Touch Screen */}
          <CircularScreen
            screen={screen}
            lang={lang}
            showSafeAreaGuides={showSafeAreaGuides}
            onScreenClick={onScreenClick}
            isListening={isListening}
            isSpeaking={isSpeaking}
          />
        </div>

        {/* Device Bottom Section: Large Physical Button */}
        <div className="w-full flex flex-col items-center pt-5 pb-1">
          {/* Physical Button Container with Tactile Recess */}
          <div className="relative p-1.5 rounded-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)] border border-slate-700/80">
            {/* Long-press Progress Ring (Circular SVG) */}
            {holdProgress > 0 && (
              <svg className="absolute -inset-1 w-[90px] h-[90px] -rotate-90 pointer-events-none z-20">
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3.5"
                  strokeDasharray="251"
                  strokeDashoffset={251 - (251 * holdProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* Tactile Large Physical Button */}
            <motion.button
              type="button"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              whileTap={{ scale: 0.94 }}
              animate={isPressing ? { scale: 0.94 } : { scale: 1 }}
              className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer transition-colors shadow-lg ${
                isPressing
                  ? 'bg-gradient-to-b from-orange-600 to-orange-700 border-2 border-orange-400'
                  : 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-500/80 hover:border-orange-500/80'
              }`}
              style={{
                boxShadow: isPressing
                  ? 'inset 0 4px 8px rgba(0,0,0,0.6), 0 0 15px rgba(249,115,22,0.4)'
                  : '0 6px 14px rgba(0,0,0,0.6), inset 0 2px 3px rgba(255,255,255,0.2)'
              }}
              title={
                isZh
                  ? '大号实体物理按键：短按提问问路，长按1.5秒紧急求助'
                  : 'Large Physical Button: Tap to ask questions, hold for emergency'
              }
            >
              {/* Concentric Tactile Ridges for Visually Impaired / Elderly */}
              <div className="absolute inset-1.5 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-3.5 rounded-full border border-white/5 pointer-events-none" />

              {/* Center Icon */}
              {holdProgress > 50 ? (
                <HeartHandshake className="w-8 h-8 text-rose-300 animate-pulse" />
              ) : (
                <Mic
                  className={`w-7 h-7 transition-colors ${
                    isPressing ? 'text-white' : 'text-orange-400'
                  }`}
                />
              )}

              <span className="text-[10px] font-bold text-slate-300 mt-0.5 tracking-wider">
                {holdProgress > 50
                  ? isZh
                    ? '呼叫中...'
                    : 'HELP...'
                  : isZh
                  ? '按键'
                  : 'TALK'}
              </span>
            </motion.button>
          </div>

          {/* Physical Button User Legend / Action Guide */}
          <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              {isZh ? '短按：问路/设目的地' : 'Tap: Ask Directions'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              {isZh ? '长按：身体不适求助' : 'Hold: Emergency Help'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
