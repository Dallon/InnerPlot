// utils/loadSoilSprite.js
import { AssetManifest } from '../AssetManifest';
import { loadSpritesheetAsFrames } from './loadSpriteSheetAsFrames';
import { SpriteMetadata } from '../metadata/spriteMetadata';

export const loadSoilSprite = async () => {
    let soilSpriteFrames;
  try {
    
    const spriteAsset = AssetManifest.images.sprites.soil1Sprite; // Replace 'soil' with the actual key for your soil sprite
    soilSpriteFrames = await loadSpritesheetAsFrames(spriteAsset.json, spriteAsset.url);
    // If your spritesheet is not reversed, you can remove the next line
    soilSpriteFrames.reverse();
    return soilSpriteFrames;
} catch (error) {
    console.error('Error in loading soil sprite:', error);
}
};