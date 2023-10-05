import * as PIXI from 'pixi.js';

export const loadSVGAsTexture = async (svgUrl) => {
    try {
        const response = await fetch(svgUrl);
        const svgString = await response.text();

        // Create a Data URL from the SVG string
        const dataURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

        // Create an Image object
        const img = new Image();

        // Load the image asynchronously
        const loadedImg = await new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = dataURL;
        });

        // Create a canvas and draw the loaded image onto it
        const canvas = document.createElement('canvas');
        canvas.width = loadedImg.width;
        canvas.height = loadedImg.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('2D context not available');
        ctx.drawImage(loadedImg, 0,0);
      
        return PIXI.Texture.from(canvas);
    } catch (error) {
        console.error('Error loading and rendering SVG: ', error);
        throw error;
    }
};


