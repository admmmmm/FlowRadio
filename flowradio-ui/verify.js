/**
 * 项目验证脚本
 * 运行前检查所有必需文件和依赖
 */

const fs = require('fs');
const path = require('path');

const checks = [
  {
    name: 'package.json',
    test: () => fs.existsSync('./package.json'),
    fix: 'package.json 缺失，请重新创建项目'
  },
  {
    name: 'src/main.js',
    test: () => fs.existsSync('./src/main.js'),
    fix: '主进程文件缺失'
  },
  {
    name: 'src/renderer.js',
    test: () => fs.existsSync('./src/renderer.js'),
    fix: '渲染进程文件缺失'
  },
  {
    name: 'public/index.html',
    test: () => fs.existsSync('./public/index.html'),
    fix: 'HTML 文件缺失'
  },
  {
    name: 'node_modules',
    test: () => fs.existsSync('./node_modules'),
    fix: '依赖未安装，请运行: npm install'
  },
  {
    name: 'pixi.js',
    test: () => fs.existsSync('./node_modules/pixi.js'),
    fix: 'PixiJS 未安装，请运行: npm install pixi.js@7.4.2'
  },
  {
    name: 'src/backgrounds/TetrisNeonBackground.js',
    test: () => fs.existsSync('./src/backgrounds/TetrisNeonBackground.js'),
    fix: 'Neon Tetris 背景文件缺失'
  }
];

console.log('🔍 FlowRadio UI 项目验证\n');

let allPassed = true;
let checkIndex = 1;

for (const check of checks) {
  const passed = check.test();
  const status = passed ? '✅' : '❌';
  
  console.log(`[${checkIndex}/${checks.length}] ${status} ${check.name}`);
  
  if (!passed) {
    console.log(`    💡 解决方案: ${check.fix}`);
    allPassed = false;
  }
  
  checkIndex++;
}

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('✅ 所有检查通过！可以运行: npm start');
} else {
  console.log('❌ 部分检查失败，请按提示修复后重试');
  process.exit(1);
}
