// This utility function can be used to handle planting a new sprite
const plantSeed = (cellX, cellY, textureURL, assetKey, dispatch) => {
    // Generate a unique ID for the new sprite
    const newSpriteId = Date.now().toString(); // or another method to generate unique IDs

    // Create a new PIXI sprite object
    const newSprite = new PIXI.Sprite.from(textureURL);

    // Set the position for the new sprite
    newSprite.x = cellX;
    newSprite.y = cellY;

    // Add the new sprite to the PIXI container
    spriteContainerRef.current.addChild(newSprite);

    // Prepare the payload for the reducer
    const payload = {
      id: newSpriteId,
      x: cellX,
      y: cellY,
      url: textureURL,
      assetKey: assetKey
    };

    // Dispatch the action to add the sprite to the Redux store
    dispatch(spriteSlice.actions.plantNewSeed(payload));
};
