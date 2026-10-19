import React from 'react';
import { ScreenId, ScenarioType } from '../types/navigation';
import { SCREENS_DATA } from '../data/screensData';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Languages,
  ShieldAlert,
  Mic,
  Compass,
  CheckCircle2,
  HelpCircle,
  Eye
} from 'lucide-react';

interface FlowControlsProps {
  currentScreenId: ScreenId;
  onSelectScreen: (id: ScreenId) => void;
  scenario: ScenarioType;
  onSelectScenario: (scenario: ScenarioType) => void;
  lang: 'zh' | 'en';
  onToggleLang: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isPlayingAuto: boolean;
  onToggleAutoPlay: () => void;
  showSafeAreaGuides: boolean;
  onToggleSafeAreaGuides: () => void;
  onReplayAudio: () => void;
}

export const FlowControls: React.FC<FlowControlsProps> = ({
  currentScreenId,
  onSelectScreen,
  scenario,
  onSelectScenario,
  lang,
  onToggleLang,
  isMuted,
  onToggleMute,
  isPlayingAuto,
  onToggleAutoPlay,
  showSafeAreaGuides,
  onToggleSafeAreaGuides,
  onReplayAudio
}) => {
  const isZh = lang === 'zh';
  const currentScreen = SCREENS_DATA[currentScreenId];

  // Scenario screen lists
  const scenarioScreens: Record<ScenarioType, ScreenId[]> = {
    main_flow: [
      'ready',
      'straight',
      'turn_right',
      'elevator_up',
      'exit_elevator_left',
      'arrived_checkin',
      'next_task_exam',
      'visit_complete_return'
    ],
    restroom_voice: ['ready', 'voice_listening', 'voice_response_restroom', 'nav_restroom'],
    lost_reroute: ['straight', 'rerouting_notice', 'return_info_desk'],
    emergency_unwell: ['straight', 'unwell_help']
  };

  const activeList = scenarioScreens[scenario];
  const currentIndex = activeList.indexOf(currentScreenId);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectScreen(activeList[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeList.length - 1) {
      onSelectScreen(activeList[currentIndex + 1]);
    } else {
      // Loop or go to next default
      onSelectScreen(currentScreen.defaultNextId);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-3">
      {/* Scenario Selector Tabs */}
      <div className="bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-1 shadow-lg overflow-x-auto">
        <button
          type="button"
          onClick={() => onSelectScenario('main_flow')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            scenario === 'main_flow'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{isZh ? '就诊主流程 (8步)' : 'Main Clinic Route'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectScenario('restroom_voice')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            scenario === 'restroom_voice'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>{isZh ? '分支: 按键找洗手间' : 'Voice: Restroom'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectScenario('lost_reroute')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            scenario === 'lost_reroute'
              ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{isZh ? '分支: 偏离重规划' : 'Reroute to Desk'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectScenario('emergency_unwell')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
            scenario === 'emergency_unwell'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{isZh ? '分支: 不适求助' : 'Emergency Help'}</span>
        </button>
      </div>

      {/* Primary Step Navigator & Timeline Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 flex flex-col gap-3 shadow-lg">
        {/* Step Indicator & Replay Prompt */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {isZh ? currentScreen.titleCN : currentScreen.titleEN}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-orange-400 font-mono">
              Step {currentIndex >= 0 ? currentIndex + 1 : 1} / {activeList.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onReplayAudio}
            className="flex items-center gap-1 text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
            title="Replay Voice Guidance"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isZh ? '重播语音' : 'Replay Voice'}</span>
          </button>
        </div>

        {/* Step Progress Pill Indicator Bar */}
        <div className="flex items-center gap-1.5 w-full">
          {activeList.map((id, idx) => {
            const isCurrent = id === currentScreenId;
            const isPassed = idx < currentIndex;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectScreen(id)}
                className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-orange-500 shadow-sm scale-y-125'
                    : isPassed
                    ? 'bg-slate-600 hover:bg-slate-500'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={SCREENS_DATA[id].titleCN}
              />
            );
          })}
        </div>

        {/* Interactive Playback & Navigation Controls */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
          {/* Step Backwards */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              currentIndex <= 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isZh ? '上一步' : 'Prev'}</span>
          </button>

          {/* Center: Auto-play Walkthrough Simulator */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleAutoPlay}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                isPlayingAuto
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isPlayingAuto ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{isZh ? '暂停自动播放' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>{isZh ? '自动演示流程' : 'Auto Play'}</span>
                </>
              )}
            </button>
          </div>

          {/* Step Forwards */}
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-sm cursor-pointer transition-colors"
          >
            <span>
              {currentIndex === activeList.length - 1
                ? isZh
                  ? '重置回起点'
                  : 'Restart'
                : isZh
                ? '下一步'
                : 'Next'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auxiliary Settings Bar: Sound, Language, Safe Area Toggle */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {/* Mute Voice Audio */}
          <button
            type="button"
            onClick={onToggleMute}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              isMuted ? 'text-rose-400 bg-rose-500/10' : 'text-slate-300 hover:text-white bg-slate-800/60'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isMuted ? (isZh ? '语音已静音' : 'Muted') : (isZh ? '语音引导开启' : 'Voice Audio On')}</span>
          </button>

          {/* Bilingual Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-sky-400" />
            <span>{isZh ? '中文 (Natural)' : 'English'}</span>
          </button>
        </div>

        {/* Circular Safe Area Guide Toggle */}
        <button
          type="button"
          onClick={onToggleSafeAreaGuides}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
            showSafeAreaGuides
              ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white bg-slate-800/60'
          }`}
          title="Toggle 360px Circular Display Safe Area Overlay"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isZh ? '圆形安全区标尺' : 'Safe Area'}</span>
        </button>
      </div>
    </div>
  );
};
