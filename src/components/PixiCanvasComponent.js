import React, { useRef, useEffect, useContext } from 'react';
import * as PIXI from 'pixi.js';
import { useLoadItems } from '../hooks/useLoadItems';
import { useLoadSprites } from '../hooks/useLoadSprites';
import { useContainerConnections } from '../hooks/useContainerConnections';
import { useCreateInventoryIcon } from '../hooks/useCreateInventoryIcon';
import AppContext from '../contexts/AppContext';
import { memo } from 'react';

const PixiCanvasComponent =  React.memo(({texture}) => {
  const { appRef } = useContext(AppContext);
  const pixiContainerRef = useRef(null);

  const renderCount = useRef(0);
  //create a reference for the mainContainer
  const mainContainerRef = useRef(new PIXI.Container());

  //create a reference for the objectsContainer
  const objectsContainerRef = useRef(new PIXI.Container());

  //create a reference to the item container for each item
  const itemContainerRefs = useRef();

  //connect the app -> stage -> viewport -> main container -> grid container
  useContainerConnections(mainContainerRef, objectsContainerRef, texture);

  //create the inventory Icon
  useCreateInventoryIcon();

  // Use the hook to load and display items on the object container
  useLoadItems(objectsContainerRef, itemContainerRefs);
  // useRemoveItems(objectsContainerRef, itemContainerRefs);

  //use hook to load and display sprites on the object container
  useLoadSprites(objectsContainerRef, itemContainerRefs);

  
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log(`PixiCanvasComponent render count: ${renderCount.current}`);

  });


  mainContainerRef.name = 'mainContainer';

  objectsContainerRef.name = 'objectsContainer';

  useEffect(() => {
    if (appRef.current && pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(appRef.current.view);
    }
  }, [appRef]); // This effect depends on appRef

  return <div ref={pixiContainerRef} id="pixi-container" />;

})

export default PixiCanvasComponent;