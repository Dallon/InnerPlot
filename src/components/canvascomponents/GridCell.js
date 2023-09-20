import * as PIXI from 'pixi.js';

const GridCell = ({ x, y, cellSize, properties }) => {
  if (!appRef.current || !stageRef.current) return;
  const container = new PIXI.Container();

  const graphics = new PIXI.Graphics();
  graphics.lineStyle(1, 0xAAA, 0.5);
  graphics.drawRect(x, y, cellSize, cellSize);

  container.addChild(graphics);

  // you could potentially add more logic here based on properties
  // for example, you might fill the cell based on properties

  return container;
};

export default GridCell;