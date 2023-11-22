// utils/loadSoilSprite.js
import { AssetManifest } from '../AssetManifest';
import { loadSpritesheetAsFrames } from './loadSpriteSheetAsFrames';

export const loadSoilSprite = async () => {
  try {
    const spriteAsset = AssetManifest.images.sprites.soil1Sprite;
    const frames = await loadSpritesheetAsFrames(spriteAsset.json, spriteAsset.url);
    frames.reverse();//due to weird glitch that the frames are in reverse.
    return frames;
  } catch (error) {
    console.error('Error in loading soil sprite:', error);
    return [];
  }
};
