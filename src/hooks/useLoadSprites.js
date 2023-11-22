import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { AssetManifest } from '../AssetManifest';
import { loadSpritesheetAsFrames } from '../utils/loadSpriteSheetAsFrames';
import { store } from '../store';
import { useMemo } from 'react';
import { SpriteMetadata } from '../metadata/spriteMetadata';

export const useLoadSprites = (containerRef, itemContainerRefs) => {

  const initialState = store.getState();
  const spritesFromState = useMemo(() => {
    return Object.values(initialState.spriteState.objects.byId);
  }, [store.getState().spriteState.objects.byId]);


  useEffect(() => {
    console.log(`useLoadSprites hook is running`);//debugging
    console.log(spritesFromState);
    spritesFromState.forEach(async (spriteData) => {
      if (!itemContainerRefs[spriteData.id]) {
        const newSpriteContainer = new PIXI.Container();
        newSpriteContainer.interactive = true;
        itemContainerRefs[spriteData.id] = newSpriteContainer;
      }
      const spriteContainer = itemContainerRefs[spriteData.id];

      const isoX = (spriteData.x - spriteData.y) / 2;
      const isoY = (spriteData.x + spriteData.y) / 2;

      const spriteAsset = AssetManifest.images.sprites[spriteData.assetKey];
      const spriteMetaDat = SpriteMetadata[spriteData.assetKey];

      if (spriteAsset) {
        try {

          const frames = await loadSpritesheetAsFrames(spriteAsset.json, spriteAsset.url);
          frames.reverse(); //the Leshy texture packer loads frames backwards...
          const animatedSprite = new PIXI.AnimatedSprite(frames);
          animatedSprite.x = isoX;
          animatedSprite.y = isoY;
          animatedSprite.name = spriteData.id;
          animatedSprite.animationSpeed = spriteMetaDat.initialAnimationSpeed;
          animatedSprite.scale.x = 1;
          animatedSprite.scale.y = 1;
          animatedSprite.loop = false;
          //this sets the animation from the middle point bottom pixel value of the image
          animatedSprite.anchor.set(0.5, 1);
          animatedSprite.play();
          
          spriteContainer.addChild(animatedSprite);
          containerRef.current.addChild(spriteContainer);
        } catch (error) {
          console.error('Error in loading sprite:', error);
        }
      }
    });
  }, []);
};