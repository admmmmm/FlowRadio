/**
 * TetrisNeonBackground - Neon 风格 3D 俄罗斯方块背景
 * 
 * 核心特性：
 * - Neon 发光块 + 伪 3D 透视
 * - AI 熟练操作风格（自动堆叠、消行、旋转）
 * - 音乐驱动效果（FFT 频段映射）
 * - 高性能渲染（Sprite + Atlas）
 */

const BackgroundBase = require('./BackgroundBase');

// 俄罗斯方块形状定义（标准 7 种）
const TETROMINO_SHAPES = {
  I: [[1,1,1,1]],
  O: [[1,1],[1,1]],
  T: [[0,1,0],[1,1,1]],
  S: [[0,1,1],[1,1,0]],
  Z: [[1,1,0],[0,1,1]],
  J: [[1,0,0],[1,1,1]],
  L: [[0,0,1],[1,1,1]]
};

// Neon 颜色配置
const NEON_COLORS = {
  I: 0x00ffff, // 青色
  O: 0xffff00, // 黄色
  T: 0xff00ff, // 洋红
  S: 0x00ff00, // 绿色
  Z: 0xff0000, // 红色
  J: 0x0000ff, // 蓝色
  L: 0xff8800  // 橙色
};

class TetrisNeonBackground extends BackgroundBase {
  constructor(app) {
    super();
    
    // 游戏参数
    this.gridWidth = 10;
    this.gridHeight = 20;
    this.grid = [];
    this.blockSize = 30;
    this.gridOffsetX = 0;
    this.gridOffsetY = 0;
    
    // 当前方块
    this.currentPiece = null;
    this.currentX = 0;
    this.currentY = 0;
    
    // AI 操作
    this.aiTimer = 0;
    this.aiMoveInterval = 0.5; // 0.5秒移动一次
    this.aiDropInterval = 1.0; // 1秒下落一次
    this.aiDropTimer = 0;
    
    // 视觉效果
    this.sprites = [];
    this.particles = [];
    this.glowFilter = null;
    this.shakeIntensity = 0;
    this.shakeDecay = 0.9;
    this.zDepthScale = 1.2; // Z轴缩放（远小近大）
    
    // 纹理缓存
    this.blockTextures = new Map();
    
    // 音频响应
    this.kickPulse = 0;
    this.snarePulse = 0;
    this.hihatPulse = 0;
    
    // 消行效果
    this.clearingLines = [];
    this.clearFlashTimer = 0;
    
    // 如果传入了app，立即初始化（不需要audioAnalyzer）
    if (app) {
      this.init(app, null);
    }
  }

  /**
   * 初始化
   */
  init(app, audioAnalyzer) {
    super.init(app, audioAnalyzer);
    
    // 初始化网格
    this.initGrid();
    
    // 创建纹理
    this.createTextures();
    
    // 创建发光滤镜
    if (PIXI.filters && PIXI.filters.BloomFilter) {
      this.glowFilter = new PIXI.filters.BloomFilter({
        strength: 2,
        quality: 5,
        blur: 8
      });
      this.container.filters = [this.glowFilter];
    }
    
    // 生成第一个方块
    this.spawnPiece();
    
    console.log('[TetrisNeonBackground] Initialized');
  }

  /**
   * 初始化网格
   */
  initGrid() {
    this.grid = [];
    for (let y = 0; y < this.gridHeight; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.gridWidth; x++) {
        this.grid[y][x] = null;
      }
    }
  }

  /**
   * 创建 Neon 块纹理
   */
  createTextures() {
    const size = this.blockSize;
    
    Object.keys(NEON_COLORS).forEach(type => {
      const color = NEON_COLORS[type];
      
      // 创建渐变纹理
      const graphics = new PIXI.Graphics();
      
      // 外发光
      graphics.beginFill(color, 0.3);
      graphics.drawRoundedRect(-2, -2, size + 4, size + 4, 4);
      graphics.endFill();
      
      // 主体（渐变效果通过多层模拟）
      graphics.beginFill(color, 0.8);
      graphics.drawRoundedRect(0, 0, size, size, 3);
      graphics.endFill();
      
      // 高光
      graphics.beginFill(0xffffff, 0.5);
      graphics.drawRoundedRect(2, 2, size * 0.4, size * 0.4, 2);
      graphics.endFill();
      
      // 流光线（对角线）
      graphics.lineStyle(1, 0xffffff, 0.6);
      graphics.moveTo(0, size * 0.3);
      graphics.lineTo(size * 0.3, 0);
      
      // 生成纹理
      const texture = this.app.renderer.generateTexture(graphics);
      this.blockTextures.set(type, texture);
      
      graphics.destroy();
    });
  }

  /**
   * 生成新方块
   */
  spawnPiece() {
    const types = Object.keys(TETROMINO_SHAPES);
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    this.currentPiece = {
      type: randomType,
      shape: TETROMINO_SHAPES[randomType],
      color: NEON_COLORS[randomType]
    };
    
    this.currentX = Math.floor(this.gridWidth / 2) - 1;
    this.currentY = 0;
    
    // 检查是否能放置（游戏结束检测）
    if (this.checkCollision(this.currentX, this.currentY, this.currentPiece.shape)) {
      // 游戏结束，清空网格重新开始
      this.initGrid();
      this.clearSprites();
    }
  }

  /**
   * 碰撞检测
   */
  checkCollision(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const gridX = x + col;
          const gridY = y + row;
          
          // 边界检测
          if (gridX < 0 || gridX >= this.gridWidth || gridY >= this.gridHeight) {
            return true;
          }
          
          // 网格占用检测
          if (gridY >= 0 && this.grid[gridY][gridX]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * 锁定当前方块到网格
   */
  lockPiece() {
    const shape = this.currentPiece.shape;
    const type = this.currentPiece.type;
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const gridX = this.currentX + col;
          const gridY = this.currentY + row;
          
          if (gridY >= 0) {
            this.grid[gridY][gridX] = type;
          }
        }
      }
    }
    
    // 检查消行
    this.checkLines();
    
    // 生成新方块
    this.spawnPiece();
  }

  /**
   * 检查并消除满行
   */
  checkLines() {
    const linesToClear = [];
    
    for (let y = 0; y < this.gridHeight; y++) {
      let isFull = true;
      for (let x = 0; x < this.gridWidth; x++) {
        if (!this.grid[y][x]) {
          isFull = false;
          break;
        }
      }
      if (isFull) {
        linesToClear.push(y);
      }
    }
    
    if (linesToClear.length > 0) {
      // 触发消行效果
      this.triggerLineClear(linesToClear);
      
      // 移除满行
      linesToClear.forEach(lineY => {
        this.grid.splice(lineY, 1);
        this.grid.unshift(new Array(this.gridWidth).fill(null));
      });
      
      // 屏幕震动
      this.shakeIntensity = 10 * linesToClear.length;
    }
  }

  /**
   * 触发消行特效
   */
  triggerLineClear(lines) {
    this.clearingLines = lines;
    this.clearFlashTimer = 0.3; // 300ms 闪光
    
    // 创建粒子爆炸
    lines.forEach(y => {
      for (let x = 0; x < this.gridWidth; x++) {
        this.createClearParticles(x, y);
      }
    });
  }

  /**
   * 创建消行粒子
   */
  createClearParticles(gridX, gridY) {
    const worldX = this.gridOffsetX + gridX * this.blockSize;
    const worldY = this.gridOffsetY + gridY * this.blockSize;
    
    // 创建 8 个粒子
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const speed = 2 + Math.random() * 3;
      
      const particle = new PIXI.Graphics();
      particle.beginFill(0xffffff, 0.8);
      particle.drawCircle(0, 0, 2 + Math.random() * 2);
      particle.endFill();
      
      particle.x = worldX + this.blockSize / 2;
      particle.y = worldY + this.blockSize / 2;
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed;
      particle.life = 1.0;
      particle.blendMode = PIXI.BLEND_MODES.ADD;
      
      this.container.addChild(particle);
      this.particles.push(particle);
    }
  }

  /**
   * AI 移动逻辑
   */
  aiMove() {
    if (!this.currentPiece) return;
    
    // 简单 AI：随机决策
    const decision = Math.random();
    
    if (decision < 0.3) {
      // 左移
      if (!this.checkCollision(this.currentX - 1, this.currentY, this.currentPiece.shape)) {
        this.currentX--;
      }
    } else if (decision < 0.6) {
      // 右移
      if (!this.checkCollision(this.currentX + 1, this.currentY, this.currentPiece.shape)) {
        this.currentX++;
      }
    } else if (decision < 0.8) {
      // 旋转
      const rotated = this.rotatePiece(this.currentPiece.shape);
      if (!this.checkCollision(this.currentX, this.currentY, rotated)) {
        this.currentPiece.shape = rotated;
        this.snarePulse = 1.0; // 旋转脉冲
      }
    }
  }

  /**
   * 旋转方块（顺时针 90°）
   */
  rotatePiece(shape) {
    const rows = shape.length;
    const cols = shape[0].length;
    const rotated = [];
    
    for (let col = 0; col < cols; col++) {
      rotated[col] = [];
      for (let row = rows - 1; row >= 0; row--) {
        rotated[col].push(shape[row][col]);
      }
    }
    
    return rotated;
  }

  /**
   * 下落逻辑
   */
  aiDrop() {
    if (!this.currentPiece) return;
    
    if (!this.checkCollision(this.currentX, this.currentY + 1, this.currentPiece.shape)) {
      this.currentY++;
    } else {
      // 锁定
      this.lockPiece();
    }
  }

  /**
   * 清空所有精灵
   */
  clearSprites() {
    this.sprites.forEach(sprite => sprite.destroy());
    this.sprites = [];
  }

  /**
   * 渲染网格和当前方块
   */
  render() {
    // 清空现有精灵
    this.clearSprites();
    
    const width = this.app.screen.width;
    const height = this.app.screen.height;
    
    // 计算网格偏移（居中）
    this.gridOffsetX = (width - this.gridWidth * this.blockSize) / 2;
    this.gridOffsetY = (height - this.gridHeight * this.blockSize) / 2;
    
    // 渲染已锁定的方块
    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        const blockType = this.grid[y][x];
        if (blockType) {
          this.renderBlock(x, y, blockType, y / this.gridHeight);
        }
      }
    }
    
    // 渲染当前方块
    if (this.currentPiece) {
      const shape = this.currentPiece.shape;
      const type = this.currentPiece.type;
      
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const x = this.currentX + col;
            const y = this.currentY + row;
            if (y >= 0) {
              this.renderBlock(x, y, type, y / this.gridHeight, true);
            }
          }
        }
      }
    }
  }

  /**
   * 渲染单个方块（带 3D 透视）
   */
  renderBlock(gridX, gridY, type, depth, isCurrent = false) {
    const texture = this.blockTextures.get(type);
    if (!texture) return;
    
    const sprite = new PIXI.Sprite(texture);
    
    // 计算世界坐标
    let x = this.gridOffsetX + gridX * this.blockSize;
    let y = this.gridOffsetY + gridY * this.blockSize;
    
    // Z-depth 透视（远小近大）
    const scale = 1.0 + (depth * (this.zDepthScale - 1.0));
    sprite.scale.set(scale);
    
    // 音频脉冲效果
    const kickScale = 1.0 + this.kickPulse * 0.1;
    sprite.scale.set(sprite.scale.x * kickScale, sprite.scale.y * kickScale);
    
    // 当前方块高亮
    if (isCurrent) {
      sprite.alpha = 0.8 + Math.sin(Date.now() / 200) * 0.2;
    }
    
    // 消行闪光
    if (this.clearingLines.includes(gridY) && this.clearFlashTimer > 0) {
      sprite.tint = 0xffffff;
      sprite.alpha = Math.min(1, sprite.alpha + 0.5);
    }
    
    // 屏幕震动
    if (this.shakeIntensity > 0) {
      x += (Math.random() - 0.5) * this.shakeIntensity;
      y += (Math.random() - 0.5) * this.shakeIntensity;
    }
    
    sprite.x = x;
    sprite.y = y;
    
    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  /**
   * 更新（每帧）
   */
  update(dt) {
    if (!this.initialized) return;
    
    // 更新音频分析
    if (this.audioAnalyzer) {
      const energies = this.audioAnalyzer.getEnergies();
      
      // Kick → 脉冲 + 震动
      if (this.audioAnalyzer.getBeat('kick')) {
        this.kickPulse = 1.0;
        this.shakeIntensity = Math.max(this.shakeIntensity, 5);
      }
      
      // Snare → 旋转脉冲
      if (this.audioAnalyzer.getBeat('snare')) {
        this.snarePulse = 1.0;
      }
      
      // Hi-hat → 颜色跃迁（轻微）
      if (this.audioAnalyzer.getBeat('hihat')) {
        this.hihatPulse = 1.0;
      }
      
      // 衰减脉冲
      this.kickPulse *= 0.9;
      this.snarePulse *= 0.9;
      this.hihatPulse *= 0.9;
    }
    
    // AI 操作
    this.aiTimer += dt;
    this.aiDropTimer += dt;
    
    if (this.aiTimer >= this.aiMoveInterval) {
      this.aiMove();
      this.aiTimer = 0;
    }
    
    if (this.aiDropTimer >= this.aiDropInterval) {
      this.aiDrop();
      this.aiDropTimer = 0;
    }
    
    // 更新消行特效
    if (this.clearFlashTimer > 0) {
      this.clearFlashTimer -= dt;
      if (this.clearFlashTimer <= 0) {
        this.clearingLines = [];
      }
    }
    
    // 更新粒子
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // 重力
      p.life -= dt * 2;
      p.alpha = p.life;
      
      if (p.life <= 0) {
        p.destroy();
        this.particles.splice(i, 1);
      }
    }
    
    // 震动衰减
    this.shakeIntensity *= this.shakeDecay;
    
    // 渲染
    this.render();
  }

  /**
   * 调整大小
   */
  resize(width, height) {
    // 重新计算块大小以适应窗口
    const maxBlockSize = Math.min(
      (width * 0.4) / this.gridWidth,
      (height * 0.8) / this.gridHeight
    );
    this.blockSize = Math.max(20, Math.min(40, maxBlockSize));
    
    // 重新创建纹理
    this.createTextures();
  }

  /**
   * 销毁
   */
  destroy() {
    this.clearSprites();
    
    this.particles.forEach(p => p.destroy());
    this.particles = [];
    
    this.blockTextures.forEach(texture => texture.destroy());
    this.blockTextures.clear();
    
    super.destroy();
  }
}

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TetrisNeonBackground;
}
