/**
 * 背景测试脚本
 * 在控制台中运行此脚本来验证背景功能
 */

// 测试 1: 检查 Pixi.js 是否正确加载
console.log('=== 测试 1: Pixi.js 加载 ===');
try {
  const PIXI = require('pixi.js');
  console.log('✅ Pixi.js 版本:', PIXI.VERSION);
  console.log('✅ Pixi.js 加载成功');
} catch (error) {
  console.error('❌ Pixi.js 加载失败:', error.message);
}

// 测试 2: 检查背景管理器是否可用
console.log('\n=== 测试 2: 背景管理器 ===');
try {
  const { BackgroundManager } = require('./backgrounds/manager.js');
  console.log('✅ BackgroundManager 加载成功');
  console.log('✅ BackgroundManager 类型:', typeof BackgroundManager);
} catch (error) {
  console.error('❌ BackgroundManager 加载失败:', error.message);
}

// 测试 3: 检查俄罗斯方块背景
console.log('\n=== 测试 3: 俄罗斯方块背景 ===');
try {
  const { TetrisBackground } = require('./backgrounds/tetris.js');
  console.log('✅ TetrisBackground 加载成功');
  console.log('✅ TetrisBackground 类型:', typeof TetrisBackground);
} catch (error) {
  console.error('❌ TetrisBackground 加载失败:', error.message);
}

// 测试 4: 检查 DOM 容器
console.log('\n=== 测试 4: DOM 容器 ===');
const container = document.getElementById('dynamic-background');
if (container) {
  console.log('✅ #dynamic-background 容器存在');
  console.log('   - 宽度:', container.offsetWidth);
  console.log('   - 高度:', container.offsetHeight);
  console.log('   - z-index:', window.getComputedStyle(container).zIndex);
} else {
  console.error('❌ #dynamic-background 容器不存在');
}

// 测试 5: 检查 Live2D 容器
console.log('\n=== 测试 5: Live2D 容器 ===');
const live2dContainer = document.getElementById('live2d-container');
if (live2dContainer) {
  console.log('✅ #live2d-container 容器存在');
  console.log('   - z-index:', window.getComputedStyle(live2dContainer).zIndex);
} else {
  console.error('❌ #live2d-container 容器不存在');
}

// 测试 6: 检查全局变量
console.log('\n=== 测试 6: 全局变量 ===');
console.log('backgroundManager:', typeof backgroundManager !== 'undefined' ? '✅ 已定义' : '❌ 未定义');
console.log('audioContext:', typeof audioContext !== 'undefined' ? (audioContext ? '✅ 已初始化' : '⚠️ 已定义但未初始化') : '❌ 未定义');
console.log('analyser:', typeof analyser !== 'undefined' ? (analyser ? '✅ 已初始化' : '⚠️ 已定义但未初始化') : '❌ 未定义');

// 测试 7: 手动初始化测试
console.log('\n=== 测试 7: 手动初始化 ===');
console.log('提示: 如果背景未自动初始化，在控制台运行以下命令:');
console.log('');
console.log('const { BackgroundManager } = require("./backgrounds/manager.js");');
console.log('backgroundManager = new BackgroundManager("dynamic-background");');
console.log('backgroundManager.init("tetris").then(() => console.log("✅ 背景已初始化"));');
console.log('');

// 测试 8: 性能检测
console.log('\n=== 测试 8: 性能检测 ===');
console.log('requestAnimationFrame 可用:', typeof requestAnimationFrame !== 'undefined' ? '✅ 是' : '❌ 否');
console.log('Performance API 可用:', typeof performance !== 'undefined' ? '✅ 是' : '❌ 否');

console.log('\n=== 所有测试完成 ===');
console.log('如果所有测试都通过，背景应该能正常工作。');
console.log('如果看不到方块，请检查:');
console.log('1. 控制台是否有错误信息');
console.log('2. #dynamic-background 容器是否包含 canvas 元素');
console.log('3. 尝试手动调用: backgroundManager.updateWithMusic(0.8)');
