import React, { useState, useEffect, useRef } from 'react';
import { ScreenId, ScenarioType } from './types/navigation';
import { SCREENS_DATA, ALL_SCREEN_IDS } from './data/screensData';
import { PhysicalWearableDevice } from './components/PhysicalWearableDevice';
import { FlowControls } from './components/FlowControls';
import { FigmaCanvasView } from './components/FigmaCanvasView';
import { DesignSystemTokens } from './components/DesignSystemTokens';
import { GuidelinesView } from './components/GuidelinesView';
import { ExportModal } from './components/ExportModal';
import { soundManager } from './utils/audio';
import {
  HeartHandshake,
  Download,
  Info,
  CheckCircle2,
  Sparkles,
  Volume2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'prototype' | 'figma' | 'tokens' | 'guidelines'>('prototype');
  const [currentScreenId, setCurrentScreenId] = useState<ScreenId>('ready');
  const [scenario, setScenario] = useState<ScenarioType>('main_flow');
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [showSafeAreaGuides, setShowSafeAreaGuides] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const autoPlayTimerRef = useRef<number | null>(null);
  const currentScreen = SCREENS_DATA[currentScreenId];
  const isZh = lang === 'zh';

  // Trigger audio chime and spoken guidance whenever screen changes
  const triggerAudioGuidance = (screenId: ScreenId) => {
    if (isMuted) return;
    const target = SCREENS_DATA[screenId];
    soundManager.playChime(
      screenId === 'unwell_help' ? 'alert' : screenId === 'visit_complete_return' ? 'success' : 'guide'
    );
    setIsSpeaking(true);
    const textToSpeak = isZh ? target.audioPromptCN : target.audioPromptEN;
    soundManager.speak(textToSpeak, lang);

    // Turn off speaking indicator after 4 seconds
    setTimeout(() => {
      setIsSpeaking(false);
    }, 4500);
  };

  const handleSelectScreen = (id: ScreenId) => {
    setCurrentScreenId(id);
    setIsListening(id === 'voice_listening');
    triggerAudioGuidance(id);
  };

  const handleSelectScenario = (newScenario: ScenarioType) => {
    setScenario(newScenario);
    if (newScenario === 'main_flow') {
      handleSelectScreen('ready');
    } else if (newScenario === 'restroom_voice') {
      handleSelectScreen('voice_listening');
    } else if (newScenario === 'lost_reroute') {
      handleSelectScreen('rerouting_notice');
    } else if (newScenario === 'emergency_unwell') {
      handleSelectScreen('unwell_help');
    }
  };

  // Screen click handler
  const handleScreenClick = () => {
    if (currentScreen.defaultNextId) {
      handleSelectScreen(currentScreen.defaultNextId);
    }
  };

  // Physical Button Short Click: Triggers voice query ("Listening...")
  const handlePhysicalButtonClick = () => {
    if (currentScreenId === 'voice_listening') {
      // User finished asking question -> goes to restroom answer
      handleSelectScreen('voice_response_restroom');
    } else if (currentScreenId === 'voice_response_restroom') {
      handleSelectScreen('nav_restroom');
    } else {
      setScenario('restroom_voice');
      handleSelectScreen('voice_listening');
    }
  };

  // Physical Button Long Press (1.2s): Triggers Emergency / Unwell help!
  const handlePhysicalButtonLongPress = () => {
    setScenario('emergency_unwell');
    handleSelectScreen('unwell_help');
  };

  // Toggle Auto-play walkthrough
  const handleToggleAutoPlay = () => {
    setIsPlayingAuto(!isPlayingAuto);
  };

  useEffect(() => {
    if (!isPlayingAuto) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = window.setInterval(() => {
      setCurrentScreenId(prev => {
        const nextId = SCREENS_DATA[prev].defaultNextId || 'ready';
        triggerAudioGuidance(nextId);
        return nextId;
      });
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlayingAuto, isMuted, lang]);

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
  };

  // Toggle Language
  const handleToggleLang = () => {
    const nextLang = lang === 'zh' ? 'en' : 'zh';
    setLang(nextLang);
    soundManager.stopSpeech();
  };

  const handleReplayAudio = () => {
    triggerAudioGuidance(currentScreenId);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Bar Contract: 3 zones separated by gap-8 (Brand - 4 Nav Links - 1 Action) */}
      <header className="sticky top-0 z-40 bg-[#0B101E]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md">
            <HeartHandshake className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-white">
            ElderNav
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            · {isZh ? '医院老年穿戴导航' : 'Hospital Wearable UI'}
          </span>
        </div>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => setActiveTab('prototype')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'prototype'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            {isZh ? '硬件交互原型' : 'Device Prototype'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('figma')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'figma'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            {isZh ? 'Figma 12屏画板' : 'Figma 12 Artboards'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'tokens'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            {isZh ? '设计规范与状态' : 'Design Tokens'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guidelines')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'guidelines'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            {isZh ? '适老设计文档' : 'Accessibility Guide'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all cursor-pointer shadow-md active:scale-95 whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isZh ? '导出至 Figma' : 'Export to Figma'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Tab Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-900/90 border-b border-slate-800 p-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('prototype')}
          className={`px-3 py-1.5 rounded-lg ${
            activeTab === 'prototype' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          {isZh ? '穿戴原型' : 'Prototype'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('figma')}
          className={`px-3 py-1.5 rounded-lg ${
            activeTab === 'figma' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          {isZh ? 'Figma画板' : 'Figma'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tokens')}
          className={`px-3 py-1.5 rounded-lg ${
            activeTab === 'tokens' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          {isZh ? '规范' : 'Tokens'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('guidelines')}
          className={`px-3 py-1.5 rounded-lg ${
            activeTab === 'guidelines' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          {isZh ? '文档' : 'Docs'}
        </button>
      </div>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        {/* Tab 1: Interactive Wearable Device Simulator */}
        {activeTab === 'prototype' && (
          <div className="w-full flex flex-col items-center gap-8">
            {/* Top Reassuring Audio Voice Banner */}
            <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 p-3.5 flex items-center justify-between text-xs text-slate-300 shadow-md">
              <div className="flex items-center gap-2.5 truncate pr-2">
                <Volume2 className="w-4 h-4 text-orange-400 shrink-0 animate-pulse" />
                <span className="font-semibold text-white shrink-0">
                  {isZh ? '语音播报：' : 'Audio Guide: '}
                </span>
                <span className="text-slate-300 truncate italic">
                  "{isZh ? currentScreen.audioPromptCN : currentScreen.audioPromptEN}"
                </span>
              </div>
              <button
                type="button"
                onClick={handleReplayAudio}
                className="shrink-0 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-orange-400 font-medium text-[11px] cursor-pointer transition-colors"
              >
                {isZh ? '重播' : 'Play'}
              </button>
            </div>

            {/* Wearable Hardware Front View (Lanyard + 360x360 AMOLED + Large Tactile Button) */}
            <div className="flex flex-col items-center">
              <PhysicalWearableDevice
                screen={currentScreen}
                lang={lang}
                showSafeAreaGuides={showSafeAreaGuides}
                onScreenClick={handleScreenClick}
                onPhysicalButtonClick={handlePhysicalButtonClick}
                onPhysicalButtonLongPress={handlePhysicalButtonLongPress}
                isListening={isListening}
                isSpeaking={isSpeaking}
              />
            </div>

            {/* Workflow Scenario Tabs, Progress Timeline, and Controls */}
            <FlowControls
              currentScreenId={currentScreenId}
              onSelectScreen={handleSelectScreen}
              scenario={scenario}
              onSelectScenario={handleSelectScenario}
              lang={lang}
              onToggleLang={handleToggleLang}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              isPlayingAuto={isPlayingAuto}
              onToggleAutoPlay={handleToggleAutoPlay}
              showSafeAreaGuides={showSafeAreaGuides}
              onToggleSafeAreaGuides={() => setShowSafeAreaGuides(!showSafeAreaGuides)}
              onReplayAudio={handleReplayAudio}
            />

            {/* Accessible Interaction Feature Cards */}
            <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {isZh ? '单一当前行动' : 'Single Current Action'}
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {isZh
                    ? '仅展示当前需要走的一步。不要求老年人背诵全程地图或复杂路线。'
                    : 'Presents only one clear action at a time without multi-level menus.'}
                </p>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  {isZh ? '大号实体物理按键' : 'Tactile Physical Button'}
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {isZh
                    ? '位于屏幕下方直径80mm触觉同心纹按键：短按提问问路，长按1.2秒紧急求助。'
                    : 'Ergonomic large tactile button below display with click and hold behaviors.'}
                </p>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-sky-400" />
                  {isZh ? '温和关怀不催促' : 'Reassuring Tone'}
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {isZh
                    ? '偏离路线温和提示“没关系，我们重新规划路线”，身体不适立即停下休息。'
                    : 'Never scolds; halts navigation if user is unwell and routes back to info desk.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Figma Artboards Canvas View & 1-Click Copy */}
        {activeTab === 'figma' && (
          <FigmaCanvasView
            currentScreenId={currentScreenId}
            onSelectScreen={handleSelectScreen}
            lang={lang}
          />
        )}

        {/* Tab 3: Design System Tokens & Interchangeable Navigation States */}
        {activeTab === 'tokens' && (
          <DesignSystemTokens
            onSelectScreen={(id) => {
              handleSelectScreen(id);
              setActiveTab('prototype');
            }}
            lang={lang}
          />
        )}

        {/* Tab 4: Elderly Accessibility Guidelines & Product Specs */}
        {activeTab === 'guidelines' && <GuidelinesView lang={lang} />}
      </main>

      {/* Export to Figma Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        currentScreenId={currentScreenId}
        lang={lang}
      />
    </div>
  );
}
