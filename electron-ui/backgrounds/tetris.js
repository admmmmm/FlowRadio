/**
 * 真实的俄罗斯方块游戏背景 - 受音乐驱动
 * 核心思想: 游戏逻辑 + 音乐映射 + 视觉特效
 */

const PIXI = require('pixi.js');

// ========== 游戏核心配置 ==========
const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const BLOCK_SIZE = 28;
const EMPTY = 0;

// 方块形状定义
const SHAPES = {
  I: { shape: [[1,1,1,1]], color: 0x00ffff },
  O: { shape: [[1,1],[1,1]], color: 0xffff00 },
  T: { shape: [[0,1,0],[1,1,1]], color: 0xff00ff },
  S: { shape: [[0,1,1],[1,1,0]], color: 0x00ff00 },
  Z: { shape: [[1,1,0],[0,1,1]], color: 0xff0000 },
  L: { shape: [[1,0],[1,0],[1,1]], color: 0xff9500 },
  J: { shape: [[0,1],[0,1],[1,1]], color: 0x0000ff }
};

// ========== 方块类 ==========
class Tetromino {
  constructor(type) {
    this.type = type;
    this.shape = SHAPES[type].shape;
    this.color = SHAPES[type].color;
    this.x = Math.floor((GRID_WIDTH - this.shape[0].length) / 2);
    this.y = -2;
    this.lockDelay = 0;
  }

  getCells() {
    const cells = [];
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col]) {
          cells.push({ x: this.x + col, y: this.y + row });
        }
      }
    }
    return cells;
  }

  rotate() {
    // 简单顺时针旋转
    const newShape = [];
    const rows = this.shape.length;
    const cols = this.shape[0].length;
    for (let col = 0; col < cols; col++) {
      const newRow = [];
      for (let row = rows - 1; row >= 0; row--) {
        newRow.push(this.shape[row][col]);
      }
      newShape.push(newRow);
    }
    this.shape = newShape;
  }
}

// ========== 游戏核心逻辑 ==========
class TetrisCore {
  constructor() {
    this.grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(EMPTY));
    this.current = null;
    this.ghostY = 0;
    
    // 游戏参数（受音乐驱动）
    this.baseGravity = 0.02; // 每帧下落的格子数
    this.gravity = this.baseGravity;
    this.dropAccumulator = 0;
    this.lockDelayMax = 30; // 触底后的延迟帧数
    
    // 统计
    this.linesCleared = 0;
    this.score = 0;
    this.combo = 0;
    
    // 方块生成权重（受音乐影响）
    this.spawnWeights = { I:1, O:1, T:1, S:1, Z:1, L:1, J:1 };
    
    // 事件回调
    this.onLineClear = null;
    this.onCombo = null;
  }

  spawnPiece() {
    // 根据权重选择方块
    const types = Object.keys(this.spawnWeights);
    const totalWeight = types.reduce((sum, t) => sum + this.spawnWeights[t], 0);
    let rand = Math.random() * totalWeight;
    
    for (const type of types) {
      rand -= this.spawnWeights[type];
      if (rand <= 0) {
        this.current = new Tetromino(type);
        this.updateGhost();
        return;
      }
    }
  }

  canMove(piece, dx, dy) {
    for (const cell of piece.getCells()) {
      const newX = cell.x + dx;
      const newY = cell.y + dy;
      
      if (newX < 0 || newX >= GRID_WIDTH || newY >= GRID_HEIGHT) {
        return false;
      }
      if (newY >= 0 && this.grid[newY][newX] !== EMPTY) {
        return false;
      }
    }
    return true;
  }

  movePiece(dx, dy) {
    if (!this.current) return false;
    if (this.canMove(this.current, dx, dy)) {
      this.current.x += dx;
      this.current.y += dy;
      this.updateGhost();
      return true;
    }
    return false;
  }

  rotatePiece() {
    if (!this.current) return false;
    const originalShape = this.current.shape;
    this.current.rotate();
    
    // 简单wall kick
    if (!this.canMove(this.current, 0, 0)) {
      // 尝试左右移动
      if (!this.canMove(this.current, -1, 0)) {
        if (!this.canMove(this.current, 1, 0)) {
          this.current.shape = originalShape; // 还原
          return false;
        } else {
          this.current.x += 1;
        }
      } else {
        this.current.x -= 1;
      }
    }
    this.updateGhost();
    return true;
  }

  updateGhost() {
    if (!this.current) return;
    this.ghostY = this.current.y;
    while (this.canMove(this.current, 0, this.ghostY - this.current.y + 1)) {
      this.ghostY++;
    }
  }

  hardDrop() {
    if (!this.current) return;
    this.current.y = this.ghostY;
    this.lockPiece();
  }

  lockPiece() {
    if (!this.current) return;
    
    for (const cell of this.current.getCells()) {
      if (cell.y >= 0 && cell.y < GRID_HEIGHT) {
        this.grid[cell.y][cell.x] = this.current.color;
      }
    }
    
    const linesCleared = this.clearLines();
    if (linesCleared > 0) {
      this.combo++;
      if (this.onLineClear) {
        this.onLineClear(linesCleared, this.combo);
      }
    } else {
      this.combo = 0;
    }
    
    this.current = null;
  }

  clearLines() {
    let cleared = 0;
    for (let y = GRID_HEIGHT - 1; y >= 0; y--) {
      if (this.grid[y].every(cell => cell !== EMPTY)) {
        this.grid.splice(y, 1);
        this.grid.unshift(Array(GRID_WIDTH).fill(EMPTY));
        cleared++;
        y++;
      }
    }
    
    if (cleared > 0) {
      const scores = [0, 100, 300, 500, 800];
      this.score += scores[cleared] || 0;
      this.linesCleared += cleared;
    }
    
    return cleared;
  }

  update() {
    if (!this.current) {
      this.spawnPiece();
      return;
    }

    this.dropAccumulator += this.gravity;
    
    while (this.dropAccumulator >= 1) {
      if (this.canMove(this.current, 0, 1)) {
        this.current.y++;
        this.current.lockDelay = 0;
        this.dropAccumulator -= 1;
      } else {
        // 触底，开始锁定延迟
        this.current.lockDelay++;
        if (this.current.lockDelay >= this.lockDelayMax) {
          this.lockPiece();
        }
        break;
      }
    }
  }
}

// ========== 音频分析器 ==========
class AudioAnalyzer {
  constructor() {
    this.rms = 0;
    this.bass = 0;
    this.beat = false;
    this.lastRms = 0;
    this.beatCooldown = 0;
  }

  update(analyser) {
    if (!analyser) {
      this.rms = Math.random() * 0.3; // 模拟数据
      this.bass = Math.random() * 0.5;
      this.beat = Math.random() > 0.95;
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);
    
    // 计算 RMS
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const v = (dataArray[i] - 128) / 128;
      sum += v * v;
    }
    this.rms = Math.sqrt(sum / dataArray.length);
    
    // 简单节拍检测
    const onset = this.rms - this.lastRms;
    this.lastRms = this.rms;
    
    if (onset > 0.02 && this.beatCooldown <= 0) {
      this.beat = true;
      this.beatCooldown = 15;
    } else {
      this.beat = false;
      this.beatCooldown = Math.max(0, this.beatCooldown - 1);
    }
    
    // 获取低频能量
    analyser.getByteFrequencyData(dataArray);
    const bassBins = Math.floor(dataArray.length * 0.08);
    let bassSum = 0;
    for (let i = 0; i < bassBins; i++) {
      bassSum += dataArray[i];
    }
    this.bass = bassSum / (bassBins * 255);
  }
}

// ========== Sprite对象池 ==========
class SpritePool {
  constructor(texture) {
    this.texture = texture;
    this.pool = [];
  }

  obtain() {
    if (this.pool.length > 0) {
      const sprite = this.pool.pop();
      sprite.visible = true;
      return sprite;
    }
    return new PIXI.Sprite(this.texture);
  }

  release(sprite) {
    sprite.visible = false;
    this.pool.push(sprite);
  }
}

// ========== 主背景类 ==========
class TetrisBackground {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.app = null;
    this.core = null;
    this.analyzer = null;
    this.spritePool = null;
    
    // 渲染层
    this.gridContainer = null;
    this.activeSprites = [];
    
    // 视觉效果
    this.pulseStrength = 0;
    this.bloomIntensity = 0.5;
    this.cameraShake = { x: 0, y: 0 };
    
    // AI玩家参数
    this.autoMoveTimer = 0;
    this.autoMoveDelay = 30; // 每30帧操作一次
    
    this.isActive = false;
  }

  async init() {
    // 创建Pixi应用
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x0a0e27,
      antialias: true
    });
    
    this.container.appendChild(this.app.view);
    
    // 创建方块纹理
    this.blockTexture = this.createBlockTexture();
    this.spritePool = new SpritePool(this.blockTexture);
    
    // 初始化游戏核心
    this.core = new TetrisCore();
    this.analyzer = new AudioAnalyzer();
    
    // 设置事件监听
    this.core.onLineClear = (lines, combo) => this.onLineClear(lines, combo);
    
    // 创建容器
    this.gridContainer = new PIXI.Container();
    this.gridContainer.x = (window.innerWidth - GRID_WIDTH * BLOCK_SIZE) / 2;
    this.gridContainer.y = (window.innerHeight - GRID_HEIGHT * BLOCK_SIZE) / 2;
    this.app.stage.addChild(this.gridContainer);
    
    // 添加bloom滤镜
    try {
      const bloomFilter = new PIXI.filters.BloomFilter();
      bloomFilter.blur = 8;
      bloomFilter.quality = 4;
      bloomFilter.strength = 1;
      this.gridContainer.filters = [bloomFilter];
      this.bloomFilter = bloomFilter;
    } catch (e) {
      console.warn('Bloom filter不可用:', e);
    }
    
    this.isActive = true;
    this.app.ticker.add(() => this.update());
    
    console.log('✅ 真实俄罗斯方块背景已初始化');
  }

  createBlockTexture() {
    const size = BLOCK_SIZE;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // 渐变填充
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(2, 2, size - 4, size - 4);
    
    // 边框
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, size - 2, size - 2);
    
    return PIXI.Texture.from(canvas);
  }

  update() {
    if (!this.isActive || !this.core) return;
    
    // 更新音频分析（如果有analyser则使用，否则模拟）
    this.analyzer.update(window.analyser);
    
    // 音乐→游戏映射
    this.updateGameWithMusic();
    
    // AI自动玩游戏
    this.updateAI();
    
    // 更新游戏逻辑
    this.core.update();
    
    // 渲染
    this.render();
    
    // 视觉效果衰减
    this.pulseStrength *= 0.92;
    this.cameraShake.x *= 0.8;
    this.cameraShake.y *= 0.8;
  }

  updateGameWithMusic() {
    const { rms, bass, beat } = this.analyzer;
    
    // 1. 基于音量调整重力
    this.core.gravity = this.core.baseGravity * (1 + rms * 2);
    
    // 2. 强节拍时触发软降
    if (beat && this.core.current) {
      const dropChance = Math.min(0.7, bass + rms);
      if (Math.random() < dropChance) {
        this.core.movePiece(0, 1);
      }
      this.pulseStrength = Math.min(1, this.pulseStrength + 0.8);
    }
    
    // 3. bass影响I型方块权重
    this.core.spawnWeights.I = 1 + bass * 3;
    this.core.spawnWeights.T = 1 + rms * 1.5;
    
    // 4. 音量影响发光强度
    if (this.bloomFilter) {
      this.bloomFilter.strength = 0.5 + rms * 2;
    }
    
    // 5. 极强节拍触发硬降
    if (beat && bass > 0.6 && Math.random() < 0.3) {
      if (this.core.current) {
        this.core.hardDrop();
      }
    }
  }

  updateAI() {
    if (!this.core.current) return;
    
    this.autoMoveTimer++;
    if (this.autoMoveTimer < this.autoMoveDelay) return;
    
    this.autoMoveTimer = 0;
    
    // 简单AI：随机移动和旋转
    const action = Math.random();
    if (action < 0.3) {
      this.core.movePiece(-1, 0); // 左移
    } else if (action < 0.6) {
      this.core.movePiece(1, 0);  // 右移
    } else if (action < 0.8) {
      this.core.rotatePiece();    // 旋转
    }
    // 20%概率不操作
  }

  render() {
    // 回收所有sprite
    this.activeSprites.forEach(s => this.spritePool.release(s));
    this.activeSprites = [];
    
    const scale = 1 + this.pulseStrength * 0.1;
    
    // 渲染网格中的方块
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (this.core.grid[y][x] !== EMPTY) {
          const sprite = this.spritePool.obtain();
          sprite.x = x * BLOCK_SIZE;
          sprite.y = y * BLOCK_SIZE;
          sprite.tint = this.core.grid[y][x];
          sprite.alpha = 0.9;
          sprite.scale.set(scale);
          this.gridContainer.addChild(sprite);
          this.activeSprites.push(sprite);
        }
      }
    }
    
    // 渲染当前方块
    if (this.core.current) {
      // Ghost piece (阴影)
      const ghostCells = this.core.current.getCells();
      const ghostOffset = this.core.ghostY - this.core.current.y;
      for (const cell of ghostCells) {
        if (cell.y + ghostOffset >= 0) {
          const sprite = this.spritePool.obtain();
          sprite.x = cell.x * BLOCK_SIZE;
          sprite.y = (cell.y + ghostOffset) * BLOCK_SIZE;
          sprite.tint = this.core.current.color;
          sprite.alpha = 0.2;
          this.gridContainer.addChild(sprite);
          this.activeSprites.push(sprite);
        }
      }
      
      // 当前方块
      for (const cell of ghostCells) {
        if (cell.y >= 0) {
          const sprite = this.spritePool.obtain();
          sprite.x = cell.x * BLOCK_SIZE;
          sprite.y = cell.y * BLOCK_SIZE;
          sprite.tint = this.core.current.color;
          sprite.alpha = 0.95;
          sprite.scale.set(scale);
          this.gridContainer.addChild(sprite);
          this.activeSprites.push(sprite);
        }
      }
    }
    
    // 相机抖动
    this.gridContainer.x = (window.innerWidth - GRID_WIDTH * BLOCK_SIZE) / 2 + this.cameraShake.x;
    this.gridContainer.y = (window.innerHeight - GRID_HEIGHT * BLOCK_SIZE) / 2 + this.cameraShake.y;
  }

  onLineClear(lines, combo) {
    // 触发视觉特效
    this.pulseStrength = Math.min(2, lines * 0.5);
    this.cameraShake.x = (Math.random() - 0.5) * lines * 8;
    this.cameraShake.y = (Math.random() - 0.5) * lines * 8;
    
    console.log(`🎮 消除 ${lines} 行! Combo x${combo}`);
  }

  updateWithMusic(intensity) {
    // 保留接口兼容性
    if (this.analyzer) {
      this.analyzer.rms = intensity;
    }
  }

  destroy() {
    this.isActive = false;
    if (this.app) {
      this.app.destroy(true, { children: true, texture: true });
      this.app = null;
    }
    console.log('✅ 俄罗斯方块背景已销毁');
  }
}

module.exports = { TetrisBackground };
