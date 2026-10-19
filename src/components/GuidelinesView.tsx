import React from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  Compass,
  Mic,
  Maximize2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface GuidelinesViewProps {
  lang: 'zh' | 'en';
}

export const GuidelinesView: React.FC<GuidelinesViewProps> = ({ lang }) => {
  const isZh = lang === 'zh';

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto pb-12 text-slate-300 text-xs sm:text-sm">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center gap-2 text-orange-400 font-bold text-sm tracking-wider uppercase">
          <HeartHandshake className="w-4 h-4" />
          <span>{isZh ? '适老医疗硬件人机交互规范' : 'Elderly Healthcare Hardware UI Guidelines'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isZh
            ? '医院场景老年人智能导航穿戴设备交互设计规范'
            : 'Wearable Hospital Smart Navigation Device Interface Guidelines'}
        </h1>
        <p className="text-slate-400 max-w-3xl leading-relaxed text-sm">
          {isZh
            ? '本设备专为行动不便、对智能手机或复杂院内环境感到焦虑的老年患者打造。设备由导医护士协助佩戴并配置当日目的地，全流程通过温和清晰的语音引导与 360×360 px 圆形高对比度屏幕进行路线指引与流程提醒。'
            : 'Designed to assist elderly patients in navigating hospital environments safely and calmly, combining gentle audio guidance with a high-contrast 360x360 circular screen.'}
        </p>
      </div>

      {/* Grid of Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Accessibility for Seniors */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '1. 老年人无障碍与交互原则' : '1. Elderly Accessibility Principles'}
            </h2>
          </div>

          <ul className="space-y-3 leading-relaxed text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '单一当前行动原则：' : 'Single Current Action: '}</strong>
                {isZh
                  ? '每屏严格只高亮一个当前需要执行的动作（如“请直行”或“请乘电梯到5楼”），绝不让老人背诵或预览后续复杂路线。'
                  : 'Displays only the immediate next action to prevent cognitive overload.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '大号字号与超高对比：' : 'Large Text & Contrast: '}</strong>
                {isZh
                  ? '主指令字号 28~32px（对比度 >14:1 AAA），辅助说明 16~18px。针对老花眼与白内障患者做字形光学强化。'
                  : 'Primary headline 28-32px with >14:1 WCAG AAA contrast ratio.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '箭头必须配文本：' : 'Arrows Always Paired with Text: '}</strong>
                {isZh
                  ? '严禁单独出现孤立的箭头图标，必须附带生活化文本指令（如“路口请右转”）。'
                  : 'Never display directional arrows alone without written confirmation.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '生活化地标语言：' : 'Conversational Landmarks: '}</strong>
                {isZh
                  ? '禁止使用“向东/向西北”等抽象方位，使用“经过便民药房后右转”、“在身旁的自助机报到”等身边参照物。'
                  : 'Avoids abstract compass directions in favor of tangible hospital landmarks.'}
              </span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Safety & Non-Diagnostic Boundaries */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '2. 医疗边界与安全红线' : '2. Medical & Safety Boundaries'}
            </h2>
          </div>

          <ul className="space-y-3 leading-relaxed text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '严禁提供医疗诊断：' : 'No Medical Diagnosis: '}</strong>
                {isZh
                  ? '设备严格限定于物理路线指引与就医流程提醒，绝对不提供病情诊断、用药建议或检查指标解读。'
                  : 'Strictly restricted to navigation and process guidance; never diagnoses conditions.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '身体不适立即停步：' : 'Halts on Unwell Alert: '}</strong>
                {isZh
                  ? '若老人表示身体不适或长按求助按键，设备立即提示“请停下休息片刻”，切断赶路指引，协助联系医护人员。'
                  : 'Halts route guidance immediately when unwell is reported, prompting rest and staff response.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '人工服务台兜底机制：' : 'Information Desk Fallback: '}</strong>
                {isZh
                  ? '若发生路径迷失或定位信号不准，温和提示“没关系，我们重新规划路线”，无法校准时由人工服务台进行接力。'
                  : 'Reassuring tone when lost; gracefully returns user to 1st floor information desk.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '不假设老人精通智能设备：' : 'Do Not Assume Tech Fluency: '}</strong>
                {isZh
                  ? '在自助机报到界面醒目标注“如需帮助请联系身旁工作人员”，尊重老年人习惯。'
                  : 'Always includes reminders that nearby human staff can assist with self-service machines.'}
              </span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Hardware Interaction & Physical Button */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Mic className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '3. 大号实体按键的人机工程学' : '3. Large Tactile Physical Button'}
            </h2>
          </div>

          <div className="space-y-3 leading-relaxed text-slate-300">
            <p>
              {isZh
                ? '老年人在就医过程中往往双手颤抖或视力欠佳，复杂的触屏手势或多层菜单极易造成挫败感。因此设备配备位于屏幕正下方的直径 80mm 超大触觉实体按键：'
                : 'Touch gestures can be frustrating for elderly users. ElderNav features an 80mm tactile button directly below the circular display:'}
            </p>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-orange-400 font-bold">{isZh ? '短按 (Tap)' : 'Tap (Short Click)'}</span>
                <span className="text-slate-300">{isZh ? '启动语音助手：“请讲，我在听…”（问路如找洗手间）' : 'Activate Voice: "I\'m listening..."'}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-slate-850 pt-2">
                <span className="text-rose-400 font-bold">{isZh ? '长按 1.2秒 (Long Press)' : 'Hold (1.2s)'}</span>
                <span className="text-slate-300">{isZh ? '紧急求助：停步休息并触发医护通知' : 'Emergency Help: Halt navigation & alert staff'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 4: Visual Language & Frosted Glass */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '4. 视觉语言与毛玻璃美学' : '4. Frosted Glass Aesthetics'}
            </h2>
          </div>

          <ul className="space-y-3 leading-relaxed text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '深邃海军蓝画布 (#0A1124)：' : 'Deep Navy Canvas: '}</strong>
                {isZh
                  ? '沉稳低眩光，相比白色刺眼强光，在医院室内灯光下更柔和护眼。'
                  : 'Calming, non-glaring background ideal for indoor hospital lighting.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '暖橙色焦点 (#F97316)：' : 'Beacon Orange Accent: '}</strong>
                {isZh
                  ? '用于核心前进/转弯箭头与关键步骤，具备极强穿透力与方向指引性。'
                  : 'Concentrated accent color for turn arrows and immediate action.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
              <span>
                <strong className="text-white">{isZh ? '毛玻璃分层规范：' : 'Frosted Glass Hierarchy: '}</strong>
                {isZh
                  ? '仅将毛玻璃模糊效果（Apple blur）应用于辅助标签（如顶部目的地、状态通知），核心指示箭头与主标题使用清晰纯色背景，确保文字绝对清晰不虚焦。'
                  : 'Blur applied only to secondary badges; core directions sit on solid high-contrast grounds.'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
