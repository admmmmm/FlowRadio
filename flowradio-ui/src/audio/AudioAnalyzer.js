/**
 * AudioAnalyzer - 高性能音频分析器
 * 支持实时 FFT、节奏检测、频段分析
 */

class AudioAnalyzer {
  constructor(sourceStream = null) {
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.bufferLength = 0;
    this.source = null;
    
    // 节奏检测参数
    this.beatThreshold = 1.3;
    this.beatDecayRate = 0.98;
    this.beatMinInterval = 200; // ms
    this.lastBeatTime = { kick: 0, snare: 0, hihat: 0 };
    this.energyHistory = [];
    this.historySize = 43; // ~1秒历史 (assuming 60fps)
    
    // 频段能量
    this.kickEnergy = 0;
    this.snareEnergy = 0;
    this.hihatEnergy = 0;
    this.averageEnergy = 0;
    
    if (sourceStream) {
      this.init(sourceStream);
    }
  }

  /**
   * 初始化音频分析器
   * @param {MediaStream|HTMLAudioElement|AudioNode} source 音频源
   */
  init(source) {
    try {
      // 创建音频上下文
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      
      // 创建分析器节点
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.8;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      
      // 连接音频源
      if (source instanceof MediaStream) {
        this.source = this.audioContext.createMediaStreamSource(source);
      } else if (source instanceof HTMLAudioElement || source instanceof HTMLMediaElement) {
        this.source = this.audioContext.createMediaElementSource(source);
      } else if (source.connect) {
        // 已经是 AudioNode
        this.source = source;
      } else {
        throw new Error('Unsupported audio source type');
      }
      
      this.source.connect(this.analyser);
      // 注意：不连接到 destination，避免回声
      
      console.log('[AudioAnalyzer] Initialized successfully');
    } catch (error) {
      console.error('[AudioAnalyzer] Initialization failed:', error);
    }
  }

  /**
   * 获取当前音量 (0-1)
   * @returns {number}
   */
  getVolume() {
    if (!this.analyser) return 0;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    
    let sum = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      sum += this.dataArray[i];
    }
    
    return sum / (this.bufferLength * 255);
  }

  /**
   * 获取 RMS (均方根) 音量 - 更精确的音量测量
   * @returns {number}
   */
  getRMS() {
    if (!this.analyser) return 0;
    
    this.analyser.getByteTimeDomainData(this.dataArray);
    
    let sum = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      const normalized = (this.dataArray[i] - 128) / 128;
      sum += normalized * normalized;
    }
    
    return Math.sqrt(sum / this.bufferLength);
  }

  /**
   * 获取 FFT 频谱数据
   * @returns {Uint8Array}
   */
  getFFT() {
    if (!this.analyser) return new Uint8Array(0);
    
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  /**
   * 获取归一化的频谱数据 (0-1)
   * @returns {Float32Array}
   */
  getFFTNormalized() {
    if (!this.analyser) return new Float32Array(0);
    
    this.analyser.getByteFrequencyData(this.dataArray);
    const normalized = new Float32Array(this.bufferLength);
    
    for (let i = 0; i < this.bufferLength; i++) {
      normalized[i] = this.dataArray[i] / 255;
    }
    
    return normalized;
  }

  /**
   * 更新频段能量（每帧调用）
   */
  updateEnergies() {
    if (!this.analyser) return;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    
    // 频段划分 (基于 44.1kHz 采样率)
    // Kick: 60-250 Hz (bin ~3-13)
    // Snare: 200-600 Hz (bin ~10-31)
    // Hi-hat: 5kHz-10kHz (bin ~256-512)
    
    const binSize = this.audioContext.sampleRate / this.analyser.fftSize;
    
    // Kick (低频)
    let kickSum = 0;
    const kickStart = Math.floor(60 / binSize);
    const kickEnd = Math.floor(250 / binSize);
    for (let i = kickStart; i < kickEnd; i++) {
      kickSum += this.dataArray[i];
    }
    this.kickEnergy = kickSum / (kickEnd - kickStart) / 255;
    
    // Snare (中频)
    let snareSum = 0;
    const snareStart = Math.floor(200 / binSize);
    const snareEnd = Math.floor(600 / binSize);
    for (let i = snareStart; i < snareEnd; i++) {
      snareSum += this.dataArray[i];
    }
    this.snareEnergy = snareSum / (snareEnd - snareStart) / 255;
    
    // Hi-hat (高频)
    let hihatSum = 0;
    const hihatStart = Math.floor(5000 / binSize);
    const hihatEnd = Math.floor(10000 / binSize);
    for (let i = hihatStart; i < hihatEnd && i < this.bufferLength; i++) {
      hihatSum += this.dataArray[i];
    }
    this.hihatEnergy = hihatSum / (hihatEnd - hihatStart) / 255;
    
    // 平均能量
    let totalSum = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      totalSum += this.dataArray[i];
    }
    this.averageEnergy = totalSum / this.bufferLength / 255;
    
    // 更新历史记录
    this.energyHistory.push(this.averageEnergy);
    if (this.energyHistory.length > this.historySize) {
      this.energyHistory.shift();
    }
  }

  /**
   * 检测节拍
   * @param {string} type - 'kick' | 'snare' | 'hihat' | 'any'
   * @returns {boolean}
   */
  getBeat(type = 'any') {
    if (!this.analyser) return false;
    
    this.updateEnergies();
    
    const now = performance.now();
    let energy = 0;
    let lastBeat = 0;
    
    switch (type) {
      case 'kick':
        energy = this.kickEnergy;
        lastBeat = this.lastBeatTime.kick;
        break;
      case 'snare':
        energy = this.snareEnergy;
        lastBeat = this.lastBeatTime.snare;
        break;
      case 'hihat':
        energy = this.hihatEnergy;
        lastBeat = this.lastBeatTime.hihat;
        break;
      case 'any':
      default:
        energy = this.averageEnergy;
        lastBeat = Math.max(
          this.lastBeatTime.kick,
          this.lastBeatTime.snare,
          this.lastBeatTime.hihat
        );
        break;
    }
    
    // 计算历史平均能量
    let avgEnergy = 0;
    if (this.energyHistory.length > 0) {
      const sum = this.energyHistory.reduce((a, b) => a + b, 0);
      avgEnergy = sum / this.energyHistory.length;
    }
    
    // 节拍检测：当前能量 > 阈值 * 平均能量
    const isBeat = energy > avgEnergy * this.beatThreshold;
    const enoughTimePassed = now - lastBeat > this.beatMinInterval;
    
    if (isBeat && enoughTimePassed) {
      if (type === 'kick' || type === 'any') this.lastBeatTime.kick = now;
      if (type === 'snare' || type === 'any') this.lastBeatTime.snare = now;
      if (type === 'hihat' || type === 'any') this.lastBeatTime.hihat = now;
      return true;
    }
    
    return false;
  }

  /**
   * 获取频段能量
   * @returns {{ kick: number, snare: number, hihat: number, average: number }}
   */
  getEnergies() {
    return {
      kick: this.kickEnergy,
      snare: this.snareEnergy,
      hihat: this.hihatEnergy,
      average: this.averageEnergy
    };
  }

  /**
   * 获取特定频率范围的能量
   * @param {number} minFreq - 最低频率 (Hz)
   * @param {number} maxFreq - 最高频率 (Hz)
   * @returns {number} 0-1
   */
  getFrequencyRangeEnergy(minFreq, maxFreq) {
    if (!this.analyser) return 0;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    
    const binSize = this.audioContext.sampleRate / this.analyser.fftSize;
    const startBin = Math.floor(minFreq / binSize);
    const endBin = Math.floor(maxFreq / binSize);
    
    let sum = 0;
    for (let i = startBin; i < endBin && i < this.bufferLength; i++) {
      sum += this.dataArray[i];
    }
    
    return sum / (endBin - startBin) / 255;
  }

  /**
   * 销毁分析器
   */
  destroy() {
    if (this.source) {
      this.source.disconnect();
    }
    if (this.analyser) {
      this.analyser.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.source = null;
  }
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioAnalyzer;
}
