// 简化的渲染器 - 仅测试基本功能
console.log('[Renderer] Starting basic test...');

// 测试 1: PixiJS
try {
    const PIXI = require('pixi.js');
    console.log('✅ PixiJS loaded:', PIXI.VERSION);
} catch (error) {
    console.error('❌ PixiJS failed:', error);
}

// 测试 2: 创建应用
try {
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x000000,
        resizeTo: window
    });
    document.getElementById('app-container').appendChild(app.view);
    console.log('✅ PIXI Application created');
} catch (error) {
    console.error('❌ PIXI Application failed:', error);
}

// 测试 3: 显示测试文本
try {
    const text = new PIXI.Text('FlowRadio UI Test', {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0x00ff00,
        align: 'center'
    });
    text.anchor.set(0.5);
    text.x = window.innerWidth / 2;
    text.y = window.innerHeight / 2;
    app.stage.addChild(text);
    console.log('✅ Test text added');
} catch (error) {
    console.error('❌ Test text failed:', error);
}

console.log('[Renderer] Basic test complete');
