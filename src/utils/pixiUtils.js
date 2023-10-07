// pixiUtils.js
import * as PIXI from 'pixi.js';


export const addPixiObject = (object, container) => {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(object.type === 'tree' ? 0x00FF00 : 0xFF0000);
    graphics.drawCircle(object.x, object.y, 10);
    graphics.endFill();

    container.addChild(graphics);
};

export const centerContainer = (parentContainer, childContainer) => {
    const parentCenterX = parentContainer.width / 2;
    const parentCenterY = parentContainer.height / 2;
    const childCenterX = childContainer.width / 2;
    const childCenterY = childContainer.height / 2;

    childContainer.x = parentCenterX - childCenterX;
    childContainer.y = parentCenterY - childCenterY;
};





