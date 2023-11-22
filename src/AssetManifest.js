//from the docs ---Sprite sheets--Naming convention to let Pixi understand the image format and resolution 
//of the spritesheet via its file name: my-spritesheet{resolution}.{imageFormat}.json

// Import sprites
import blackOakSeedling from './assets/images/blackOakSeedling.png';
import bluePotion from './assets/images/bluePotion.png';
import grass from './assets/images/grass.png';
import bush1SpriteURL from './assets/sprites/bushes/bush1/bush1Spritesheet.png';
import bush1SpriteJSON from './assets/sprites/bushes/bush1/bush1Spritesheet@1x.png.json';
import flower1SpriteURL from './assets/sprites/flowers/flower1/flower1Spritesheet.png';
import flower1SpriteJSON from './assets/sprites/flowers/flower1/flower1Spritesheet@1x.json';
import soil1SpriteURL from './assets/sprites/soils/soil1Spritesheet.png';
import soil1SpriteJSON from './assets/sprites/soils/soil1SpriteSheet@1x.json';

//Import UI elements
import UIFrameTopURL from './assets/images/UIFrameTop.png'; 
import UIFrameBottomURL from './assets/images/UIFrameBottom.png'; 
import UIFrameLeftURL from './assets/images/UIFrameLeft.png'; 
import UIFrameRightURL from './assets/images/UIFrameRight.png'; 
import UIFrameTopLeftCornerURL from './assets/images/UITopLeftCornerSeal.png'; 
import UIFrameTopRightCornerURL from './assets/images/UITopRightCornerSeal.png'; 
import UIFrameBottomLeftCornerURL from './assets/images/UIBottomLeftCornerSeal.png'; 
import UIFrameBottomRightCornerURL from './assets/images/UIBottomRightCornerSeal.png'; 
import UIFrameBackground from './assets/images/paperContainerBackground.png'


// Updated AssetManifest
export const AssetManifest = {
    images: {
        items: {
            blackOakSeedling: blackOakSeedling,
            bluePotion: bluePotion,
        },
        textures: {
            grass: grass
        },
        sprites: {
            //names of sprites are assetKeys in spritesSlice
            bush1Sprite: {
                url: bush1SpriteURL,
                json: bush1SpriteJSON,
            },
            flower1Sprite: {
                url: flower1SpriteURL,
                json: flower1SpriteJSON
            },
            soil1Sprite: {
                url: soil1SpriteURL,
                json:soil1SpriteJSON
            },

        },
        UI: {
            UIFrameTop: {
                url: UIFrameTopURL,
            },
            UIFrameBottom: {
                url: UIFrameBottomURL,
            },
            UIFrameLeft: {
                url: UIFrameLeftURL,
            },
            UIFrameRight: {
                url: UIFrameRightURL,
            },
            UIFrameTopLeftCorner: {
                url: UIFrameTopLeftCornerURL,
            },
            UIFrameTopRightCorner: {
                url: UIFrameTopRightCornerURL,
            },
            UIFrameBottomLeftCorner: {
                url: UIFrameBottomLeftCornerURL,
            },
            UIFrameBottomRightCorner: {
                url: UIFrameBottomRightCornerURL,
            },
            UIFrameBackground: {
                url: UIFrameBackground,
            },


        }

    }
};
