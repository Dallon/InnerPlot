import * as PIXI from 'pixi.js';
export class IsoGrid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.initializeGrid();
    }

    // Initialize the grid with default values
    initializeGrid() {
        let grid = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            grid[i] = new Array(this.cols).fill(0);
        }
        return grid;
    }

    // Get value at a specific position
    getValue(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return this.grid[row][col];
        }
        return null; // Return null for out-of-bounds queries
    }

    // Set value at a specific position
    setValue(row, col, value) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.grid[row][col] = value;
        }
    }


    // Create an isometric tile sprite
     createIsometricTile(texture, x, y, tileWidth, tileHeight) {
        
        const tileSprite = new PIXI.Sprite(texture);
      

        tileSprite.width = tileWidth;
        tileSprite.height = tileHeight;

        tileSprite.rotation = Math.PI / 4;

        tileSprite.x = x;
        tileSprite.y = y;

        return tileSprite;
    }


    // Method to render the isometric tiles on a PIXI container
    renderTiles(container, texture, tileWidth, tileHeight) {
        const diagonal = Math.sqrt(2) * tileWidth;  // tileWidth = tileHeight because it's a square

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                // Calculate the isometric position
                const isoX = (col - row) * diagonal / 2;
                const isoY = (col + row) * diagonal / 2;
                // Create a tile using the loaded texture and position it
                const tile = this.createIsometricTile(texture, isoX, isoY, tileWidth, tileHeight);

                // Add the tile sprite to the provided container
                container.addChild(tile);
            }
        }
    }
}
