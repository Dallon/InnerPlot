import { AssetManifest } from "../AssetManifest";
import * as PIXI from 'pixi.js';
import { loadPNGAsTexture } from "./loadPNGAsTexture";

export const createContainerBackground = async (containerRef, containerWidth, containerHeight) => {



    const topFrame = AssetManifest.images.UI.UIFrameTop;
    const bottomFrame = AssetManifest.images.UI.UIFrameBottom;
    const leftFrame = AssetManifest.images.UI.UIFrameLeft;
    const rightFrame = AssetManifest.images.UI.UIFrameRight;
    const topLeftCorner = AssetManifest.images.UI.UIFrameTopLeftCorner;
    const topRightCorner = AssetManifest.images.UI.UIFrameTopRightCorner;
    const bottomLeftCorner = AssetManifest.images.UI.UIFrameBottomLeftCorner;
    const bottomRightCorner = AssetManifest.images.UI.UIFrameBottomRightCorner;

    const container = containerRef
    // Assuming textures are loaded and named appropriately
    const topTexture = await loadPNGAsTexture(topFrame.url);
    const bottomTexture = await loadPNGAsTexture(bottomFrame.url);
    const leftTexture = await loadPNGAsTexture(leftFrame.url);
    const rightTexture = await loadPNGAsTexture(rightFrame.url);
    const topLeftTexture = await loadPNGAsTexture(topLeftCorner.url);
    const topRightTexture = await loadPNGAsTexture(topRightCorner.url);
    const bottomLeftTexture = await loadPNGAsTexture(bottomLeftCorner.url);
    const bottomRightTexture = await loadPNGAsTexture(bottomRightCorner.url);

    // Create sprites from textures
    const topSprite = new PIXI.Sprite(topTexture);
    const bottomSprite = new PIXI.Sprite(bottomTexture);
    const leftSprite = new PIXI.Sprite(leftTexture);
    const rightSprite = new PIXI.Sprite(rightTexture);
    const cornerSprites = {
        topLeft: new PIXI.Sprite(topLeftTexture),
        topRight: new PIXI.Sprite(topRightTexture),
        bottomLeft: new PIXI.Sprite(bottomLeftTexture),
        bottomRight: new PIXI.Sprite(bottomRightTexture)
    };
    // Determine the new desired thickness for top and bottom edges
    const edgeThickness = containerHeight * 0.1; // For example, 10% of the container height

    // Scale the top and bottom edges to span the width of the container
    // and set the height to the new thickness
    topSprite.width = bottomSprite.width = containerWidth;
    topSprite.height = bottomSprite.height = edgeThickness;


    // Directly set the height of the left and right edge sprites to containerHeight
    leftSprite.height = rightSprite.height = containerHeight;
    leftSprite.width = leftTexture.width * (containerHeight / leftSprite.texture.height); // maintain aspect ratio
    rightSprite.width = rightTexture.width * (containerHeight / rightSprite.texture.height); // maintain aspect ratio

    // Position the edge sprites   
    leftSprite.position.set(0, 0);
    rightSprite.position.set(containerWidth - rightSprite.width, 0);

    topSprite.position.set(0, 0);
    bottomSprite.position.set(0, containerHeight - edgeThickness);

    // Add the edge sprites to the game container first 
    container.addChild(leftSprite);
    container.addChild(rightSprite);
    container.addChild(topSprite);
    container.addChild(bottomSprite);
   

    // Calculate and maintain aspect ratio for corner sprites
    const cornerAspectRatio = topLeftTexture.width / topLeftTexture.height;
    // Use a consistent size factor based on the smallest dimension of the container
    const cornerSize = Math.min(containerWidth, containerHeight) * 0.18; // Adjust as needed
    // Scale corner sprites based on aspect ratio
    const cornerWidth = cornerSize;
    const cornerHeight = cornerWidth / cornerAspectRatio;

    // Set the size for corner sprites
    cornerSprites.topLeft.width = cornerSprites.topRight.width = cornerWidth;
    cornerSprites.bottomLeft.width = cornerSprites.bottomRight.width = cornerWidth;
    cornerSprites.topLeft.height = cornerSprites.topRight.height = cornerHeight;
    cornerSprites.bottomLeft.height = cornerSprites.bottomRight.height = cornerHeight;

    // Position the corner sprites over the edges
    cornerSprites.topLeft.position.set(-5, -5);
    cornerSprites.topRight.position.set(containerWidth - cornerSprites.topRight.width + 5, -5);
    cornerSprites.bottomLeft.position.set(-5, containerHeight - cornerSprites.bottomLeft.height + 5);
    cornerSprites.bottomRight.position.set(containerWidth - cornerSprites.bottomRight.width + 5, containerHeight - cornerSprites.bottomRight.height + 5);

    // Add the corner sprites on top of the edges in the game container
    container.addChild(cornerSprites.topLeft);
    container.addChild(cornerSprites.topRight);
    container.addChild(cornerSprites.bottomLeft);
    container.addChild(cornerSprites.bottomRight);


    return containerRef;
};
