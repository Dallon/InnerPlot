// usePixiGrid.js
import { useEffect } from 'react';
import * as PIXI from 'pixi.js';

export const usePixiGrid = (gridContainer, screenWidth, screenHeight, cellSize) => {
  useEffect(() => {
    const drawGrid = (gridContainer, screenWidth, screenHeight, cellSize) => {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0xAAAAAA, 0.5);
        
        for(let x = 0; x < screenWidth; x += cellSize) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, screenHeight);
        }
        
        for(let y = 0; y < screenHeight; y += cellSize) {
            graphics.moveTo(0, y);
            graphics.lineTo(screenWidth, y);
        }
        if(gridContainer){
        gridContainer.addChild(graphics);
        }
          
    };

    drawGrid(gridContainer, screenWidth, screenHeight, cellSize);
  }, [gridContainer, screenWidth, screenHeight, cellSize]);
};