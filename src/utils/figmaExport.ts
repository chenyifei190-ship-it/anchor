import { ScreenData } from '../types/navigation';
import { SCREENS_DATA, ALL_SCREEN_IDS } from '../data/screensData';

/**
 * Generates an SVG code for a given screen.
 * When copied and pasted into Figma, Figma translates groups, paths, rects, circles, and text
 * directly into editable Figma vector frames and text layers!
 */
export function generateScreenSvg(screen: ScreenData, lang: 'zh' | 'en' = 'zh'): string {
  const isZh = lang === 'zh';
  const title = isZh ? screen.titleCN : screen.titleEN;
  const primary = isZh ? screen.primaryInstructionCN : screen.primaryInstructionEN;
  const secondary = isZh ? (screen.secondaryInstructionCN || '') : (screen.secondaryInstructionEN || '');
  const destination = isZh ? (screen.destinationTagCN || '') : (screen.destinationTagEN || '');
  const buttonPrompt = isZh ? screen.buttonPromptCN : screen.buttonPromptEN;

  // Render SVG graphics according to graphicType
  let graphicSvg = '';

  switch (screen.graphicType) {
    case 'ready_badge':
      graphicSvg = `
        <!-- Graphic: Heart Clinic Badge -->
        <g id="Graphic_Ready">
          <circle cx="180" cy="155" r="46" fill="#1E293B" stroke="#F97316" stroke-width="3" />
          <path d="M180 172s-22-13.5-22-26a12 12 0 0 1 20-9l2 2 2-2a12 12 0 0 1 20 9c0 12.5-22 26-22 26z" fill="#F97316" />
        </g>`;
      break;

    case 'arrow_straight':
      graphicSvg = `
        <!-- Graphic: Straight Forward Arrow -->
        <g id="Graphic_Straight_Arrow">
          <circle cx="180" cy="155" r="48" fill="#1E293B" stroke="#334155" stroke-width="2" />
          <path d="M180 125 L180 185 M160 145 L180 125 L200 145" stroke="#F97316" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </g>`;
      break;

    case 'arrow_turn_right':
      graphicSvg = `
        <!-- Graphic: Turn Right Arrow with Intersection -->
        <g id="Graphic_Turn_Right">
          <circle cx="180" cy="155" r="48" fill="#1E293B" stroke="#334155" stroke-width="2" />
          <!-- Intersection Road Grid -->
          <line x1="150" y1="180" x2="150" y2="155" stroke="#64748B" stroke-width="6" stroke-linecap="round" />
          <!-- Big Right Arrow -->
          <path d="M150 180 L150 155 Q150 142 165 142 L198 142 M186 130 L202 142 L186 154" stroke="#F97316" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </g>`;
      break;

    case 'elevator_5':
      graphicSvg = `
        <!-- Graphic: Elevator with Big 5 -->
        <g id="Graphic_Elevator_5">
          <rect x="135" y="115" width="90" height="80" rx="14" fill="#1E293B" stroke="#F97316" stroke-width="3" />
          <!-- Elevator Doors Line -->
          <line x1="180" y1="117" x2="180" y2="193" stroke="#334155" stroke-width="2" stroke-dasharray="3 3" />
          <!-- Huge Number 5 -->
          <text x="180" y="172" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" text-anchor="middle">5</text>
        </g>`;
      break;

    case 'arrow_exit_left':
      graphicSvg = `
        <!-- Graphic: Exit Elevator & Turn Left -->
        <g id="Graphic_Exit_Left">
          <circle cx="180" cy="155" r="48" fill="#1E293B" stroke="#334155" stroke-width="2" />
          <!-- Elevator exit indicator -->
          <path d="M205 180 L205 155 Q205 142 190 142 L158 142 M170 130 L154 142 L170 154" stroke="#F97316" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </g>`;
      break;

    case 'kiosk_checkin':
      graphicSvg = `
        <!-- Graphic: Check-in Kiosk -->
        <g id="Graphic_Kiosk">
          <circle cx="180" cy="155" r="48" fill="#1E293B" stroke="#22C55E" stroke-width="3" />
          <path d="M165 155 L175 165 L198 143" stroke="#22C55E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </g>`;
      break;

    case 'lab_blood':
      graphicSvg = `
        <!-- Graphic: Blood Test Lab Step -->
        <g id="Graphic_Lab">
          <circle cx="180" cy="155" r="48" fill="#1E293B" stroke="#F97316" stroke-width="3" />
          <text x="180" y="148" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#94A3B8" text-anchor="middle">2F</text>
          <path d="M180 178s-10-6-10-12a10 10 0 0 1 20 0c0 6-10 12-10 12z" fill="#EF4444" />
        </g>`;
      break;

    case 'voice_waveform':
      graphicSvg = `
        <!-- Graphic: Microphone & Sound Wave -->
        <g id="Graphic_Soundwave">
          <circle cx="180" cy="155" r="46" fill="#1E293B" stroke="#38BDF8" stroke-width="3" />
          <!-- Mic icon -->
          <rect x="174" y="140" width="12" height="20" rx="6" fill="#38BDF8" />
          <path d="M168 152a12 12 0 0 0 24 0" stroke="#38BDF8" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <line x1="180" y1="165" x2="180" y2="172" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
          <!-- Waveform ripples -->
          <path d="M152 155 Q145 142 145 155 T138 155" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"/>
          <path d="M208 155 Q215 142 215 155 T222 155" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"/>
        </g>`;
      break;

    case 'restroom_confirm':
    case 'restroom_walk':
      graphicSvg = `
        <!-- Graphic: Restroom Accessible Icon -->
        <g id="Graphic_Restroom">
          <circle cx="180" cy="155" r="48" fill="#1E293B" stroke="#38BDF8" stroke-width="3" />
          <circle cx="173" cy="138" r="5" fill="#38BDF8" />
          <path d="M168 147 h10 v22 h-10 z" fill="#38BDF8" rx="2" />
          <circle cx="188" cy="138" r="5" fill="#FB923C" />
          <path d="M182 147 L194 147 L191 169 L185 169 z" fill="#FB923C" />
        </g>`;
      break;

    case 'reroute_compass':
      graphicSvg = `
        <!-- Graphic: Rerouting Calm Compass -->
        <g id="Graphic_Reroute">
          <circle cx="180" cy="155" r="48" fill="#1E293B" stroke="#FBBF24" stroke-width="3" />
          <path d="M180 130 L188 155 L180 150 L172 155 Z" fill="#F97316" />
          <path d="M180 180 L172 155 L180 160 L188 155 Z" fill="#64748B" />
        </g>`;
      break;

    case 'info_desk':
      graphicSvg = `
        <!-- Graphic: Info Desk Guide -->
        <g id="Graphic_Info_Desk">
          <circle cx="180" cy="155" r="48" fill="#1E293B" stroke="#F97316" stroke-width="3" />
          <rect x="156" y="148" width="48" height="24" rx="4" fill="#334155" />
          <circle cx="180" cy="138" r="7" fill="#F8FAFC" />
          <text x="180" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="bold" fill="#F8FAFC" text-anchor="middle">HELP</text>
        </g>`;
      break;

    case 'unwell_rest':
      graphicSvg = `
        <!-- Graphic: Stop & Rest / Help -->
        <g id="Graphic_Unwell_Help">
          <circle cx="180" cy="155" r="48" fill="#450A0A" stroke="#EF4444" stroke-width="3" />
          <!-- Pause Bars & Red Cross -->
          <rect x="168" y="140" width="8" height="30" rx="3" fill="#EF4444" />
          <rect x="184" y="140" width="8" height="30" rx="3" fill="#EF4444" />
        </g>`;
      break;

    case 'complete_star':
      graphicSvg = `
        <!-- Graphic: Visit Complete Star -->
        <g id="Graphic_Complete">
          <circle cx="180" cy="155" r="48" fill="#064E3B" stroke="#10B981" stroke-width="3" />
          <path d="M180 135 L184 148 L198 148 L187 156 L191 169 L180 161 L169 169 L173 156 L162 148 L176 148 Z" fill="#34D399" />
        </g>`;
      break;
  }

  // Generate complete SVG formatted for Figma import
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad_${screen.id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#15213F" />
      <stop offset="100%" stop-color="#090E1A" />
    </radialGradient>
    
    <!-- Frosted Glass Pill Filter -->
    <filter id="glassBlur_${screen.id}" x="0" y="0" width="200%" height="200%" filterUnits="userSpaceOnUse">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>

  <!-- Frame: 360x360 Circular Display -->
  <g id="Frame_${screen.id}" clip-path="url(#circleClip_${screen.id})">
    <clipPath id="circleClip_${screen.id}">
      <circle cx="180" cy="180" r="180" />
    </clipPath>

    <!-- Base Circular AMOLED Background -->
    <circle cx="180" cy="180" r="180" fill="url(#bgGrad_${screen.id})" />

    <!-- Safe Area Visual Circle (Ø310px) -->
    <circle cx="180" cy="180" r="155" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" opacity="0.25" />

    <!-- Auxiliary Destination Pill (Frosted Glass) -->
    ${
      destination
        ? `
    <g id="Pill_Destination">
      <rect x="80" y="38" width="200" height="32" rx="16" fill="#1E293B" fill-opacity="0.75" stroke="#475569" stroke-opacity="0.4" stroke-width="1" />
      <text x="180" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#E2E8F0" text-anchor="middle" letter-spacing="0.5">${escapeXml(destination)}</text>
    </g>`
        : ''
    }

    <!-- Central Directional / Landmark Graphic -->
    ${graphicSvg}

    <!-- Primary Instruction Text (Large & High Contrast) -->
    <g id="Text_Primary_Instruction">
      <text x="180" y="244" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" text-anchor="middle">${escapeXml(primary)}</text>
    </g>

    <!-- Secondary Instruction Text -->
    ${
      secondary
        ? `
    <g id="Text_Secondary_Instruction">
      <text x="180" y="274" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8" text-anchor="middle">${escapeXml(secondary)}</text>
    </g>`
        : ''
    }

    <!-- Physical Button Affordance / Bottom Hint -->
    <g id="Hint_Button_Prompt">
      <rect x="75" y="304" width="210" height="26" rx="13" fill="#0F172A" fill-opacity="0.8" stroke="#334155" stroke-width="1" />
      <circle cx="92" cy="317" r="4" fill="#F97316" />
      <text x="185" y="321" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#CBD5E1" text-anchor="middle">${escapeXml(buttonPrompt)}</text>
    </g>
  </g>
</svg>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates a complete Figma FigJam / Canvas multi-board SVG with all 12 screens laid out
 * side-by-side with artboard labels and connection wires.
 */
export function generateAllScreensCanvasSvg(lang: 'zh' | 'en' = 'zh'): string {
  const cols = 4;
  const cardW = 360;
  const cardH = 430;
  const gapX = 80;
  const gapY = 90;
  const padding = 60;

  const totalRows = Math.ceil(ALL_SCREEN_IDS.length / cols);
  const totalWidth = padding * 2 + cols * cardW + (cols - 1) * gapX;
  const totalHeight = padding * 2 + totalRows * cardH + (totalRows - 1) * gapY;

  let framesMarkup = '';

  ALL_SCREEN_IDS.forEach((id, index) => {
    const screen = SCREENS_DATA[id];
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = padding + col * (cardW + gapX);
    const y = padding + row * (cardH + gapY);

    const screenSvg = generateScreenSvg(screen, lang);
    const innerContent = screenSvg.substring(screenSvg.indexOf('<g id="Frame_'), screenSvg.lastIndexOf('</svg>'));

    framesMarkup += `
      <!-- Artboard ${screen.orderNumber}: ${screen.id} -->
      <g id="Artboard_${screen.id}" transform="translate(${x}, ${y})">
        <!-- Artboard Header Label in Figma -->
        <text x="0" y="-14" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#94A3B8">${escapeXml(lang === 'zh' ? screen.titleCN : screen.titleEN)}</text>
        
        <!-- Screen 360x360 Content -->
        ${innerContent}
      </g>
    `;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" fill="#0B0F19" xmlns="http://www.w3.org/2000/svg">
  <rect width="${totalWidth}" height="${totalHeight}" fill="#0A0E1A" />
  
  <!-- Canvas Title -->
  <text x="${padding}" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF">ElderNav · Hospital Smart Wearable Navigation Interface (360×360 Circular AMOLED)</text>
  <text x="${padding}" y="56" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#64748B">Editable Vector Artboards for Figma — All text, layers, icons &amp; safe areas</text>

  <!-- Artboards Grid -->
  ${framesMarkup}
</svg>`;
}

/**
 * Copies given SVG string into system clipboard.
 */
export async function copySvgToClipboard(svgString: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(svgString);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Downloads a text/svg file locally to user's computer.
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'image/svg+xml') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
