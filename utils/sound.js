/**
 * Web Audio API Procedural Sound Engine for HEADHACKER
 * Zero external audio files required — 100% generated in real-time.
 * Respects browser autoplay policy and user mute preferences.
 */
"use client";

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.ambientGain = null;
    this.humOsc = null;
    this.fanNoise = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    if (typeof window === "undefined") return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Check stored preference
      const storedMute = window.localStorage.getItem("hh_muted");
      this.muted = storedMute === "true";

      this.isInitialized = true;
    } catch {
      // Audio not supported
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("hh_muted", String(this.muted));
    }
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(
        this.muted ? 0 : 0.08,
        this.ctx.currentTime
      );
    }
    return this.muted;
  }

  isMuted() {
    if (typeof window !== "undefined" && !this.isInitialized) {
      return window.localStorage.getItem("hh_muted") === "true";
    }
    return this.muted;
  }

  // --- Ambient Hideout Hum & Electric Atmosphere ---
  startAmbience() {
    this.ensureContext();
    if (!this.ctx || this.ambientGain) return;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.muted ? 0 : 0.07, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      // Low frequency hum (50Hz electrical buzz)
      const hum = this.ctx.createOscillator();
      hum.type = "sine";
      hum.frequency.setValueAtTime(55, this.ctx.currentTime);

      const humFilter = this.ctx.createBiquadFilter();
      humFilter.type = "lowpass";
      humFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

      hum.connect(humFilter);
      humFilter.connect(this.ambientGain);
      hum.start();
      this.humOsc = hum;

      // Computer fan / ventilation noise buffer
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const fanFilter = this.ctx.createBiquadFilter();
      fanFilter.type = "bandpass";
      fanFilter.frequency.setValueAtTime(260, this.ctx.currentTime);
      fanFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const fanGain = this.ctx.createGain();
      fanGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

      whiteNoise.connect(fanFilter);
      fanFilter.connect(fanGain);
      fanGain.connect(this.ambientGain);
      whiteNoise.start();
      this.fanNoise = whiteNoise;
    } catch {
      // Audio node failure
    }
  }

  stopAmbience() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch {}
    }
  }

  // --- Procedural Interaction SFX ---

  playClick() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  playHover() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {}
  }

  playSelect() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playDoorMechanism() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      // Heavy mechanical latch release
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.35);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {}
  }

  playTerminalKey() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      const freq = 600 + Math.random() * 300;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch {}
  }
}

export const sound = new SoundEngine();
