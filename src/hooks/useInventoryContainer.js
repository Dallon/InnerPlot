// useInventoryContainer.js
import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { handleInventoryClick } from '../store/thunks/handleInventoryClickThunk';
import { useDispatch } from 'react-redux';
import { createContainerBackground } from '../utils/createContainerBackground';
import { AssetManifest } from '../AssetManifest';
import { loadPNGAsTexture } from '../utils/loadPNGAsTexture';
const items = createSelector(
  state => state.inventory.byId,
  byId => Object.values(byId),
);

export const useInventoryContainer = (appRef, inventoryContainerRef) => {
  const itemsArray = useSelector(items);
  const inventoryOpen = useSelector(state => state.inventory.isInventoryOpen);
  const dispatch = useDispatch();



  // Ensure the inventory container is initialized once
  useEffect(() => {
    if (!appRef.current) return;

    const initInventoryContainer = async () => {
      inventoryContainerRef.current = new PIXI.Container();
      inventoryContainerRef.current.interactive = true;
      inventoryContainerRef.current.buttonMode = true;



    let isDragging = false;
    let previousPointerPosition = null;

    // When the user presses down on the container
    inventoryContainerRef.current.on('pointerdown', (event) => {
      isDragging = true;
      previousPointerPosition = event.data.getLocalPosition(inventoryContainerRef.current.parent);
    });

    // When the user moves the pointer
    inventoryContainerRef.current.on('pointermove', (event) => {
      if (isDragging) {
        const currentPointerPosition = event.data.getLocalPosition(inventoryContainerRef.current.parent);
        const dx = currentPointerPosition.x - previousPointerPosition.x;
        const dy = currentPointerPosition.y - previousPointerPosition.y;
        inventoryContainerRef.current.x += dx;
        inventoryContainerRef.current.y += dy;
        previousPointerPosition = currentPointerPosition;
      }
    });

    // When the user releases the pointer
    inventoryContainerRef.current.on('pointerup', endDrag).on('pointerupoutside', endDrag);

    function endDrag() {
      isDragging = false;
    }

    const graphics = new PIXI.Graphics();
    const containerWidth = 500;
    const containerHeight = 300;

      // Load and set the background image
      try {
        const bgTexture = await loadPNGAsTexture(AssetManifest.images.UI.UIFrameBackground.url);
        const bgSprite = new PIXI.Sprite(bgTexture);
        bgSprite.width = containerWidth;  // Set to your container's width
        bgSprite.height = containerHeight; // Set to your container's height
        inventoryContainerRef.current.addChild(bgSprite);
      } catch (error) {
        console.error('Error loading background image: ', error);
      }
      
   

    inventoryContainerRef.current.addChildAt(graphics, 0);
    appRef.current.stage.addChild(inventoryContainerRef.current);

    // Use the utility function to add a background and frame to the container
    createContainerBackground(inventoryContainerRef.current, containerWidth, containerHeight);
    inventoryContainerRef.current.sortableChildren = true;
  };

  initInventoryContainer();
  }, [appRef]); // Only depends on appRef

  // Handle opening and updating of inventory items
  useEffect(() => {
    if (!inventoryContainerRef.current) return;

    // Manage visibility and interactivity
    inventoryContainerRef.current.visible = inventoryOpen;
    inventoryContainerRef.current.interactive = inventoryOpen;

    // When inventory is opened or items change, update the items
    if (inventoryOpen) {
      // Clear previous items, leaving only the background and frame
      const childrenToRemove = inventoryContainerRef.current.children.filter((child) => child.isItemSprite);
      childrenToRemove.forEach((child) => inventoryContainerRef.current.removeChild(child));



      // Add new items
      itemsArray.forEach((item, index) => {
        const sprite = PIXI.Sprite.from(item.url);
        sprite.width = 50;
        sprite.height = 50;
        sprite.isItemSprite = true;
        const row = Math.floor(index / 10);
        const col = index % 10;
        sprite.x = col * 55 + 30; // Add padding to x-coordinate
        sprite.y = row * 55 + 30; // Add padding to y-coordinate

        // Set the sprite to be interactive and button-like
        sprite.interactive = true;
        sprite.buttonMode = true;

        // Add a pointerdown event listener to handle clicks
        sprite.on('pointerdown', () => {
          dispatch(handleInventoryClick(item));
        });
        inventoryContainerRef.current.addChild(sprite);

        if (item.quantity > 1) {
          const quantityText = new PIXI.Text(item.quantity.toString(), { fontSize: 12, fill: 0xFFFFFF });
          quantityText.x = sprite.x + 40;
          quantityText.y = sprite.y + 40;
          inventoryContainerRef.current.addChild(quantityText);
        }
      });
    }
  }, [inventoryOpen, itemsArray]); // Depends on inventoryOpen and itemsArray
};
