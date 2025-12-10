import * as PIXI from 'pixi.js';
// 使用带内置口型/音频支持的分支版
import { Live2DModel } from 'pixi-live2d-display-lipsyncpatch/cubism4';
import { initMapping } from "./mapping.js";
import { createActionController } from "./action.js";
import { createCharacterManager } from "./character-manager.js";
import { createPanelDev } from "./panel-dev.js";
import { EventSystem } from "@pixi/events";

window.PIXI = PIXI;

// Pixi v7 兼容：为旧 interaction API 提供事件系统
PIXI.Renderer.registerPlugin?.("interaction", EventSystem);

export const defaultCharacterConfigs = [
  {
    id: "hiyori",
    modelJsonUrl: "/live2d/hiyori/hiyori_pro_t11.model3.json",
    scale: 0.5,
    position: { xOffset: -300, yRatio: 0.75 }, // 垂直位置使用比例，水平使用固定偏移
    zIndex: 1,
  },
  {
    id: "mao",
    modelJsonUrl: "/live2d/mao/mao_pro.model3.json",
    scale: 0.4,
    position: { xOffset: 500, yRatio: 0.85 },
    zIndex: 2,
  },
];

let tickerRegistered = false;
function ensureTickerRegistered() {
  if (!tickerRegistered) {
    Live2DModel.registerTicker(PIXI.Ticker);
    tickerRegistered = true;
  }
}

async function loadInitialNLMap(id) {
  try {
    const res = await fetch(`/nl/${id}_nl_map.json`);
    if (!res.ok) throw new Error(`status ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`[live2d] NL map not loaded for ${id}:`, e);
    return {};
  }
}

function createController(manager) {
  const get = (id) => manager.get(id);

  return {
    manager,
    // 纯动作/表情（无音频）
    act(id, input, extra = {}) {
      const c = get(id);
      if (!c) return { ok: false, spec: null };
      return c.actions.act(input, extra);
    },
    actAll(input, extra = {}) {
      return manager.list().map((c) => ({ id: c.id, ...c.actions.act(input, extra) }));
    },
    // 动作 + 音频（sound 通过 motion options 传入，触发口型）
    actWithAudio(id, input, soundUrl, extra = {}) {
      const c = get(id);
      if (!c) return { ok: false, spec: null };
      return c.actions.act(input, { ...extra, sound: soundUrl });
    },
    actAllWithAudio(input, soundUrl, extra = {}) {
      return manager.list().map((c) => ({
        id: c.id,
        ...c.actions.act(input, { ...extra, sound: soundUrl }),
      }));
    },
    setMode(id, mode) {
      const c = get(id);
      if (!c?.mapper) return false;
      c.mapper.setMode(mode === 2 ? 2 : 1);
      return true;
    },
    list() {
      return manager.list().map((c) => ({
        id: c.id,
        mode: c.mapper.mode,
      }));
    },
    stopMotions(id) {
      const c = get(id);
      if (c?.model?.stopMotions) c.model.stopMotions();
    },
  };
}

// ✅ 全局Panel控制变量 - 单一真相源
let globalPanel = null;
let globalEnablePanel = false;  // 默认启用Panel

/**
 * 设置是否启用Panel (必须在initLive2d之前调用)
 */
export function setEnablePanel(enable) {
  globalEnablePanel = enable;
}

/**
 * 切换Panel显示/隐藏
 */
export function togglePanel() {
  if (!globalPanel) {
    console.warn('[Panel] Not created. Enable with enablePanel: true');
    return false;
  }
  globalPanel.visible = !globalPanel.visible;
  return globalPanel.visible;
}

/**
 * 获取Panel状态
 */
export function getPanelState() {
  return {
    created: !!globalPanel,
    visible: globalPanel?.visible || false,
    enablePanel: globalEnablePanel
  };
}

export async function initLive2d({
  canvasId = "canvas",
  characterConfigs = defaultCharacterConfigs,
  persist = true,
  enablePanel = globalEnablePanel  // 使用全局变量作为默认值
} = {}) {
  ensureTickerRegistered();

  const view = document.getElementById(canvasId);
  if (!view) throw new Error(`Canvas element not found: ${canvasId}`);

  const app = new PIXI.Application({
    view,
    resizeTo: window,
    backgroundAlpha: 0,
    antialias: true,
  });
  // 关闭全局交互，避免 pixi7 事件系统访问 isInteractive
  app.stage.eventMode = "none";
  app.stage.interactiveChildren = false;
  app.stage.sortableChildren = true;

  const manager = createCharacterManager();
  const loaded = [];

  const placeModel = (model, cfg) => {
    const { xRatio, yRatio, xOffset, yOffsetFromBottom, x, y } = cfg.position || {};
    
    // X Position: 优先使用 xOffset (距离中心点的偏移), 其次 xRatio
    if (x !== undefined) {
        model.x = x;
    } else if (xOffset !== undefined) {
        model.x = app.renderer.width / 2 + xOffset;
    } else {
        model.x = app.renderer.width * (xRatio ?? 0.5);
    }

    // Y Position: 优先使用 yOffsetFromBottom (距离底部的偏移), 其次 yRatio
    if (y !== undefined) {
        model.y = y;
    } else if (yOffsetFromBottom !== undefined) {
        model.y = app.renderer.height - yOffsetFromBottom;
    } else {
        model.y = app.renderer.height * (yRatio ?? 0.5);
    }
  };

  async function setupCharacter(cfg) {
    const model = await Live2DModel.from(cfg.modelJsonUrl, {
      autoInteract: false,
    });

    model.anchor.set(0.5, 0.5);
    model.scale.set(cfg.scale ?? 0.4);
    model.zIndex = cfg.zIndex ?? 0;
    placeModel(model, cfg);

    app.stage.addChild(model);

    const initialNLMap = await loadInitialNLMap(cfg.id);
    const mapper = await initMapping({
      modelJsonUrl: cfg.modelJsonUrl,
      initialNLMap,
      persist,
    });
    const actions = createActionController(model, mapper);

    const character = { id: cfg.id, model, mapper, actions, app, config: cfg };
    manager.register(character);
    loaded.push(character);
    return character;
  }

  await Promise.all(characterConfigs.map(setupCharacter));

  window.addEventListener("resize", () => {
    loaded.forEach((c) => placeModel(c.model, c.config));
  });

  // 创建Panel
  if (enablePanel) {
    globalPanel = createPanelDev(manager);
  }

  const controller = createController(manager);
  window.live2d = controller;
  controller.app = app;
  controller.togglePanel = togglePanel;
  controller.getPanelState = getPanelState;

  return controller;
}

// 浏览器示例自动初始化：如需关闭，设置 window.LIVE2D_AUTO_INIT = false
if (typeof window !== "undefined" && window.LIVE2D_AUTO_INIT !== false) {
  const autoCanvas = document.getElementById("canvas");
  if (autoCanvas) {
    initLive2d().catch((e) => console.error("[live2d] Auto init failed:", e));
  }
}
