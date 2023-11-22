import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { setCellStatus } from '../store/slices/gridCellSlice';
import { store } from '../store';
import { AssetManifest } from '../AssetManifest';
import { loadSpritesheetAsFrames } from '../utils/loadSpriteSheetAsFrames';
import { loadSoilSprite } from '../utils/loadSoilSprite';

export const useCreateInteractiveGrid =  (interactiveGridContainerRef) => {

    let soilSpriteFrames;

    //helper function to switch cases when grid cell is clicked.
    const getNextStatus = (currentStatus) => {
        switch (currentStatus) {
            case 'UNTOUCHED':
                return 'TILLED';
        }
    };

    useEffect(() => { 
        console.log(`useCreate Interactive Grid is running`);//debugging

        const rows = 20;  // Match with useCreateIsoGrid rows
        const cols = 20;  // Match with useCreateIsoGrid cols
        const cellHeight = 64;  // Match with tileHeight
        const cellWidth = 64;  // Match with tileWidth

    // Call this function outside or at the start of your useEffect hook
    const setupSoilSprite = async () => {
        // Await the loading of soil sprite frames
        const soilSpriteFrames = await loadSoilSprite();
        if (!soilSpriteFrames) {
          console.error('Failed to load soil sprite frames.');
          return;
        }
        const diagonal = Math.sqrt(2) * cellWidth;
        const currentState = store.getState().gridCells; // Get the current state outside the loop
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = new PIXI.Graphics();
                cell.beginFill(0x000000, 0);  // Black with alpha 1

                // Draw the rectangle at (0,0) since you're going to set its position later
                cell.drawRect(0, 0, cellWidth, cellHeight);
                cell.endFill();

                // Rotate the cell
                cell.rotation = Math.PI / 4;

                // Set the isometric position
                const isoX = (j - i) * diagonal / 2;
                const isoY = (j + i) * diagonal / 2;
                cell.x = isoX;
                cell.y = isoY;
                cell.interactive = true;
                cell.buttonMode = true;
                const hitAreaPoints = [0, 0, cellWidth, 0, cellWidth, cellHeight, 0, cellHeight];
                cell.hitArea = new PIXI.Polygon(hitAreaPoints);
                
                const cellKey = `r${i}c${j}`;
                // Check if the cellKey exists in clickableCells before accessing it
                if (currentState.clickableCells.hasOwnProperty(cellKey)) {
                    const cellData = currentState.clickableCells[cellKey];
                    cell.interactive = true;
                    cell.buttonMode = true;
                    cell.on('pointerdown', () => {
                        const nextStatus = getNextStatus(cellData.status);
                        store.dispatch(setCellStatus({ cellKey, status: nextStatus }));
                        //change the cell color based on the new status
                        cell.clear(); // Clear the previous graphics

                        switch (nextStatus) {
                            case 'TILLED':
                                cell.beginFill(0x00FF00);
                                const soilSprite = new PIXI.AnimatedSprite(soilSpriteFrames);
                                soilSprite.x = cell.x;
                                soilSprite.y = cell.y + cellHeight; // Adjust this as needed
                                soilSprite.animationSpeed = 0.1;
                                soilSprite.scale.set(0.5); // Assuming you want to scale both x and y by the same amount
                                soilSprite.anchor.set(0.5, 1); // Anchor point at the bottom middle
                                soilSprite.loop = false; // Do not loop the animation
                                soilSprite.onComplete = () => {
                                    soilSprite.stop(); // Stop the animation
                                    interactiveGridContainerRef.current.removeChild(soilSprite); // Remove from the container
                                    soilSprite.destroy(); // Destroy the sprite to free up resources
                                };
                                soilSprite.play();
                                interactiveGridContainerRef.current.addChild(soilSprite);
                                break;
                            // Add more cases for different statuses if needed
                            default:
                                cell.beginFill(0x000000, 0); // Default: transparent for untouched
                        }
                        cell.drawRect(0, 0, cellWidth, cellHeight); // Redraw the rectangle with the new color
                        cell.endFill();
                        store.dispatch(setCellStatus({ cellKey, status: nextStatus }));
                    });
                }

                interactiveGridContainerRef.current.addChild(cell);
            }
        }
    };

      setupSoilSprite();

    }, []);
};