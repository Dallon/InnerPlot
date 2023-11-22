import { Assets } from 'pixi.js';
import * as PIXI from 'pixi.js';
import { SpriteMetadata } from '../metadata/spriteMetadata';
export const loadSpritesheetAsFrames = async (spritesheetJSONPath, spritesheetImagePath) => {
    try {
      // Load the spritesheet image with Assets API
      Assets.add({ alias: spritesheetImagePath, src: spritesheetImagePath });
  
      // Load JSON manually
      const response = await spritesheetJSONPath;
     
      const spritesheetData = response;
     
      const framesData = spritesheetData.frames;

      // Map frame names to textures
      const baseTexture = await Assets.load( spritesheetImagePath);
       console.log("framesData" + framesData);;

      const frames = Object.keys(framesData).map(frameName => {
        const { frame } = framesData[frameName];
        return new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h)
        );
      });
  
      return frames;
    } catch (error) {
      console.error('Error loading spritesheet:', error);
      throw error;
    }
  };
