#!/usr/bin/env node
/**
 * 预运行验证脚本
 * 在启动应用前检查所有依赖和配置
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(50));
console.log('FlowRadio 预运行验证');
console.log('='.repeat(50));

let hasErrors = false;

// 1. 检查 package.json
console.log('\n[1/6] 检查 package.json...');
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = require(packagePath);
  console.log('✅ package.json 存在');
  
  // 检查 Pixi.js 版本
  if (pkg.dependencies && pkg.dependencies['pixi.js']) {
    const pixiVersion = pkg.dependencies['pixi.js'];
    if (pixiVersion.startsWith('^7') || pixiVersion.startsWith('7')) {
      console.log(`✅ Pixi.js 版本正确: ${pixiVersion}`);
    } else {
      console.error(`❌ Pixi.js 版本错误: ${pixiVersion} (需要 v7.x)`);
      console.error('   请运行: npm install pixi.js@7.4.2');
      hasErrors = true;
    }
  } else {
    console.error('❌ 未找到 pixi.js 依赖');
    hasErrors = true;
  }
} else {
  console.error('❌ package.json 不存在');
  hasErrors = true;
}

// 2. 检查必要文件
console.log('\n[2/6] 检查必要文件...');
const requiredFiles = [
  'index.html',
  'main.js',
  'renderer.js',
  'style.css',
  'backgrounds/manager.js',
  'backgrounds/tetris.js'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ 缺少文件: ${file}`);
    hasErrors = true;
  }
});

// 3. 检查 node_modules
console.log('\n[3/6] 检查 node_modules...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules 存在');
  
  // 检查 Pixi.js
  const pixiPath = path.join(nodeModulesPath, 'pixi.js');
  if (fs.existsSync(pixiPath)) {
    console.log('✅ pixi.js 已安装');
    
    // 检查版本
    const pixiPkgPath = path.join(pixiPath, 'package.json');
    if (fs.existsSync(pixiPkgPath)) {
      const pixiPkg = JSON.parse(fs.readFileSync(pixiPkgPath, 'utf8'));
      if (pixiPkg.version.startsWith('7')) {
        console.log(`✅ Pixi.js 实际版本: ${pixiPkg.version}`);
      } else {
        console.error(`❌ Pixi.js 版本不兼容: ${pixiPkg.version}`);
        console.error('   请运行: npm uninstall pixi.js && npm install pixi.js@7.4.2');
        hasErrors = true;
      }
    }
  } else {
    console.error('❌ pixi.js 未安装');
    console.error('   请运行: npm install pixi.js@7.4.2');
    hasErrors = true;
  }
} else {
  console.error('❌ node_modules 不存在');
  console.error('   请运行: npm install');
  hasErrors = true;
}

// 4. 检查语法（简单检查）
console.log('\n[4/6] 检查代码语法...');
try {
  require('./backgrounds/tetris.js');
  console.log('✅ tetris.js 语法正确');
} catch (error) {
  console.error('❌ tetris.js 语法错误:', error.message);
  hasErrors = true;
}

try {
  require('./backgrounds/manager.js');
  console.log('✅ manager.js 语法正确');
} catch (error) {
  console.error('❌ manager.js 语法错误:', error.message);
  hasErrors = true;
}

// 5. 检查 HTML 结构
console.log('\n[5/6] 检查 HTML 结构...');
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  
  if (html.includes('id="dynamic-background"')) {
    console.log('✅ #dynamic-background 容器存在');
  } else {
    console.error('❌ 缺少 #dynamic-background 容器');
    hasErrors = true;
  }
  
  if (html.includes('id="live2d-container"')) {
    console.log('✅ #live2d-container 容器存在');
  } else {
    console.warn('⚠️  缺少 #live2d-container 容器（Live2D 功能将不可用）');
  }
  
  if (html.includes('src="renderer.js"') && !html.includes('type="module"')) {
    console.log('✅ renderer.js 使用正确的加载方式');
  } else {
    console.error('❌ renderer.js 加载方式不正确');
    console.error('   应该是: <script src="renderer.js"></script>');
    console.error('   不应该是: <script type="module" src="renderer.js"></script>');
    hasErrors = true;
  }
}

// 6. 检查 CSS
console.log('\n[6/6] 检查 CSS...');
const cssPath = path.join(__dirname, 'style.css');
if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, 'utf8');
  
  if (css.includes('#dynamic-background')) {
    console.log('✅ #dynamic-background 样式已定义');
  } else {
    console.warn('⚠️  缺少 #dynamic-background 样式');
  }
  
  if (!css.startsWith('cd*')) {
    console.log('✅ CSS 语法正确');
  } else {
    console.error('❌ CSS 语法错误（以 "cd*" 开头）');
    hasErrors = true;
  }
}

// 总结
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ 验证失败！请修复上述错误后再运行。');
  console.log('\n建议的修复步骤:');
  console.log('1. npm install pixi.js@7.4.2');
  console.log('2. 检查并修复上述文件问题');
  console.log('3. 重新运行此验证脚本: node verify.js');
  process.exit(1);
} else {
  console.log('✅ 所有检查通过！可以安全启动应用。');
  console.log('\n运行应用:');
  console.log('  npm start');
  console.log('\n或使用完整启动脚本:');
  console.log('  .\\start.ps1  (从项目根目录)');
  process.exit(0);
}
