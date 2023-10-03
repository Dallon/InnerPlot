import { useEffect } from 'react';
import * as PIXI from 'pixi.js';

export const useLoadSVG = (url, container, onTextureLoaded) => {
    useEffect(() => {
        let isMounted = true;
        console.log('useLoadSVG effect started', { url, container });

        loadSVGAsTexture(url)
            .then(texture => {
                if (!isMounted) return;
                console.log("texture loaded");
                if (onTextureLoaded) {
                    onTextureLoaded(texture);
                  }
            })
            .catch(error => console.error('Error loading SVG:', error));

        return () => {
            isMounted = false;
        };
    }, [url, container]);
    
    
    
    const loadSVGAsTexture = async (svgUrl) => {
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
        console.log("canvas dimensions" + canvas.height, canvas.width);
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('2D context not available');
        ctx.drawImage(loadedImg, 0,0);
      
        return PIXI.Texture.from(canvas);
    } catch (error) {
        console.error('Error loading and rendering SVG: ', error);
        throw error;
    }
};

};
