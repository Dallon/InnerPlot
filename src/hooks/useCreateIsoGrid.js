import { IsoGrid } from "../utils/IsoGridUtil";
import { useEffect } from "react";
import { useState, useCallback } from 'react';
import { useLoadPNG } from '../hooks/useLoadPNG';
import { AssetManifest } from "../AssetManifest";

// This is the useEffect to render the isometric tiles using the texture
export const useCreateIsoGrid = (gridContainerRef, texture) => {


    

    // Define the tile width and height
    const tileWidth = 64; 
    const tileHeight = 64; 


    useEffect(() => {
        console.log(`useCreateIsoGrid is running`);//debugging
        let isMounted = true; // Flag to track mounting
        if (texture) {

            const rows = 20;
            const cols = 20;

            const myIsoGrid = new IsoGrid(rows, cols);  // example, 10 rows and 10 cols
            myIsoGrid.renderTiles(gridContainerRef.current, texture, tileWidth, tileHeight);
        }
        return () => {
            isMounted = false; // Set the flag to false when the component unmounts
        };
    }, [texture]);

}


