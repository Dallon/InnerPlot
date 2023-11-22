
import {Assets} from 'pixi.js';

// Initialize PIXI.Assets

export const loadPNGAsTexture = async (pngUrl) => {
    try {

        //Add URL to assets where first param is the asset name, second the link address
            Assets.add({alias:pngUrl, src: pngUrl});
        // Retrieve the loaded texture using PIXI.Assets
        const texture = await Assets.load(pngUrl);

        return texture;
    } catch (error) {
        console.error('Error loading PNG with PIXI.Assets: ', error);
        throw error;
    }
};