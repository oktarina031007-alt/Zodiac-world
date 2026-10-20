/**
 * Zodiac World Audio Engine
 * Pure Web Audio API Synthesizer (BGM, Sound Effects, and Cute Cartoon Voice)
 * + Web Speech API (Bloo's Indonesian Voice)
 * 100% self-contained, no external mp3 assets that could fail to load.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private voiceGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmTimeout: number | null = null;
  private currentSpeech: SpeechSynthesisUtterance | null = null;
  private chatterInterval: number | null = null;
  
  public musicEnabled = true;
  public sfxEnabled = true;
  public voiceEnabled = true;
  public masterVolume = 0.8;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.bgmGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();
        this.voiceGain = this.ctx.createGain();
        this.updateVolumes();
        this.bgmGain.connect(this.ctx.destination);
        this.sfxGain.connect(this.ctx.destination);
        this.voiceGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public updateVolumes() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.musicEnabled ? this.masterVolume * 0.28 : 0, now);
    }
    if (this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? this.masterVolume * 0.65 : 0, now);
    }
    if (this.voiceGain) {
      this.voiceGain.gain.setValueAtTime(this.voiceEnabled ? this.masterVolume * 0.55 : 0, now);
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    this.updateVolumes();
    if (enabled && !this.isBgmPlaying) {
      this.startBgm();
    } else if (!enabled && this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    this.updateVolumes();
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    this.updateVolumes();
    if (!enabled) {
      this.stopSpeaking();
    }
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    this.updateVolumes();
  }

  // --- Sound Effects ---

  public playSfx(type: 'click' | 'magic' | 'star' | 'correct' | 'wrong' | 'unlock' | 'levelUp' | 'blooGiggle' | 'touch') {
    if (!this.sfxEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'click': {
        // Cute bubble pop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'touch': {
        // Bloo bouncy touch boop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(1020, now + 0.15);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      case 'star': {
        // Bright coin / star ping
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }

      case 'correct': {
        // 1. Cute cartoon vocal "Yay!" formant chirp
        const vocalOsc = this.ctx.createOscillator();
        const vocalGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        vocalOsc.type = 'triangle';
        vocalOsc.frequency.setValueAtTime(420, now);
        vocalOsc.frequency.exponentialRampToValueAtTime(980, now + 0.18);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(900, now);
        filter.frequency.exponentialRampToValueAtTime(2400, now + 0.18);
        filter.Q.setValueAtTime(3.5, now);

        vocalGain.gain.setValueAtTime(0.35, now);
        vocalGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

        vocalOsc.connect(filter);
        filter.connect(vocalGain);
        vocalGain.connect(this.sfxGain);
        vocalOsc.start(now);
        vocalOsc.stop(now + 0.22);

        // 2. Triumphant magical glockenspiel / starlight chime arpeggio: C5 -> G5 -> C6 -> E6
        const notes = [523.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + 0.05 + idx * 0.08);

          gain.gain.setValueAtTime(0.35, now + 0.05 + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.005, now + 0.05 + idx * 0.08 + 0.55);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now + 0.05 + idx * 0.08);
          osc.stop(now + 0.05 + idx * 0.08 + 0.55);
        });
        break;
      }

      case 'wrong': {
        // Soft, cute cartoon "boop" (non-scary, gentle and playful)
        const boop1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        boop1.type = 'sine';
        boop1.frequency.setValueAtTime(440, now);
        boop1.frequency.exponentialRampToValueAtTime(320, now + 0.12);

        gain1.gain.setValueAtTime(0.28, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        boop1.connect(gain1);
        gain1.connect(this.sfxGain);
        boop1.start(now);
        boop1.stop(now + 0.12);

        // Gentle second friendly bubble "boop"
        const boop2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        boop2.type = 'sine';
        boop2.frequency.setValueAtTime(350, now + 0.1);
        boop2.frequency.exponentialRampToValueAtTime(260, now + 0.22);

        gain2.gain.setValueAtTime(0.22, now + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.24);

        boop2.connect(gain2);
        gain2.connect(this.sfxGain);
        boop2.start(now + 0.1);
        boop2.stop(now + 0.24);
        break;
      }

      case 'magic':
      case 'unlock': {
        // Sparkling celestial ascending arpeggio
        const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        arpeggio.forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);

          gain.gain.setValueAtTime(0.3, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.07 + 0.5);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.5);
        });
        break;
      }

      case 'levelUp': {
        // Royal level up fanfare
        const notes = [440, 554.37, 659.25, 880, 1108.73];
        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);

          gain.gain.setValueAtTime(0.35, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.6);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.6);
        });
        break;
      }

      case 'blooGiggle': {
        // Cute vibrato giggle chirp
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.linearRampToValueAtTime(950, now + 0.08);
        osc.frequency.linearRampToValueAtTime(800, now + 0.14);
        osc.frequency.linearRampToValueAtTime(1050, now + 0.22);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }
    }
  }

  // --- Procedural Cute Cartoon Voice Beeps / Syllables ---
  // Guarantees Bloo is ALWAYS audible even if device has no Indonesian TTS installed!
  private playCuteChatterSyllable() {
    if (!this.voiceEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.voiceGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Cute pentatonic chatter pitch
    const pitches = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];
    const freq = pitches[Math.floor(Math.random() * pitches.length)];

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.15, now + 0.08);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.Q.setValueAtTime(2.5, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.voiceGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // --- Procedural Magical Background Music ---
  public startBgm() {
    if (!this.musicEnabled || this.isBgmPlaying) return;
    this.initCtx();
    this.isBgmPlaying = true;
    this.playNextBgmMeasure();
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimeout) {
      window.clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  private playNextBgmMeasure() {
    if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;

    // Peaceful cosmic lullaby melody in C-Major Pentatonic
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const patterns = [
      [0, 2, 3, 5, 3, 2],
      [2, 3, 4, 3, 2, 0],
      [3, 4, 5, 4, 3, 1],
      [0, 3, 2, 4, 3, 0],
    ];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    const noteDuration = 0.42;
    const now = this.ctx.currentTime;

    pattern.forEach((noteIdx, i) => {
      if (!this.ctx || !this.bgmGain) return;
      const freq = pentatonic[noteIdx];
      const noteTime = now + i * noteDuration;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.18, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + noteDuration * 1.5);

      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(noteTime);
      osc.stop(noteTime + noteDuration * 1.5);
    });

    const totalTimeMs = pattern.length * noteDuration * 1000;
    this.bgmTimeout = window.setTimeout(() => {
      if (this.isBgmPlaying) {
        this.playNextBgmMeasure();
      }
    }, totalTimeMs);
  }

  // --- Indonesian Bloo Voice (Web Speech API + Audio Chatter Fallback) ---
  public speakBloo(
    text: string, 
    onStart?: () => void, 
    onEnd?: () => void,
    onWord?: () => void
  ) {
    this.stopSpeaking();

    if (!this.voiceEnabled) {
      if (onStart) onStart();
      const duration = Math.min(text.length * 50, 2400);
      window.setTimeout(() => {
        if (onEnd) onEnd();
      }, duration);
      return;
    }

    this.initCtx();

    // Start cute cartoon syllables in sync with speech
    let chatterCount = 0;
    const maxChatter = Math.min(Math.max(4, Math.floor(text.length / 5)), 16);
    this.chatterInterval = window.setInterval(() => {
      this.playCuteChatterSyllable();
      if (onWord) onWord();
      chatterCount++;
      if (chatterCount >= maxChatter) {
        if (this.chatterInterval) {
          clearInterval(this.chatterInterval);
          this.chatterInterval = null;
        }
      }
    }, 140);

    const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window && !!window.speechSynthesis;

    if (!hasSpeech) {
      if (onStart) onStart();
      setTimeout(() => {
        if (onEnd) onEnd();
      }, Math.max(1200, maxChatter * 140));
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const cleanedText = text.replace(/[💙✨⭐🎉]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      
      utterance.lang = 'id-ID';
      utterance.pitch = 1.38; // Sweet, cute cartoon pitch
      utterance.rate = 1.05;  // Cheerful cadence
      utterance.volume = this.masterVolume;

      // Try finding Indonesian voice
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('Indonesia'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onboundary = () => {
        if (onWord) onWord();
      };

      utterance.onend = () => {
        this.currentSpeech = null;
        if (this.chatterInterval) {
          clearInterval(this.chatterInterval);
          this.chatterInterval = null;
        }
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.currentSpeech = null;
        if (this.chatterInterval) {
          clearInterval(this.chatterInterval);
          this.chatterInterval = null;
        }
        if (onEnd) onEnd();
      };

      this.currentSpeech = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onStart) onStart();
      setTimeout(() => {
        if (onEnd) onEnd();
      }, 1500);
    }
  }

  public stopSpeaking() {
    if (this.chatterInterval) {
      clearInterval(this.chatterInterval);
      this.chatterInterval = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.currentSpeech = null;
  }
}

export const sound = new SoundEngine();
