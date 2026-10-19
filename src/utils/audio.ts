/**
 * Reassuring Audio Guidance & Chime Generator
 * - Web Audio API for gentle hospital chimes
 * - Web Speech API for voice guidance in Chinese & English
 */

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a calm, gentle two-tone chime (C5 -> E5) before speech
   */
  public playChime(type: 'guide' | 'alert' | 'success' | 'click' = 'guide') {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === 'click') {
        // Subtle tactile button tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
        return;
      }

      if (type === 'alert') {
        // Warm low warning tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(392, now); // G4
        osc.frequency.setValueAtTime(330, now + 0.2); // E4
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
        return;
      }

      // Pleasant reassuring two-tone hospital ding-dong (C5 -> E5)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      const freq1 = type === 'success' ? 523.25 : 587.33; // D5
      const freq2 = type === 'success' ? 783.99 : 659.25; // E5

      osc1.frequency.setValueAtTime(freq1, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc2.frequency.setValueAtTime(freq2, now + 0.16);
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.18, now + 0.16);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.38);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.65);
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  /**
   * Speak speech prompt with calming pace
   */
  public speak(text: string, lang: 'zh' | 'en' = 'zh') {
    if (this.isMuted || typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
      utterance.rate = 0.92; // Slightly slower, reassuring for elderly
      utterance.pitch = 1.05; // Gentle and clear

      // Try finding preferred natural voices
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const targetVoice = voices.find(v =>
          lang === 'zh'
            ? v.lang.includes('zh') || v.lang.includes('cmn')
            : v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Siri') || v.name.includes('Google'))
        );
        if (targetVoice) {
          utterance.voice = targetVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis unsupported
    }
  }

  public stopSpeech() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundManager = new SoundManager();
