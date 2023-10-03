// pixiUtils.js
import * as PIXI from 'pixi.js';

export const addPixiObject = (object, stage) => {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(object.type === 'tree' ? 0x00FF00 : 0xFF0000);
    graphics.drawCircle(object.x, object.y, 10);
    graphics.endFill();
    stage.addChild(graphics);
};


