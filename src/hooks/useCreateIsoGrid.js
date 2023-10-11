import { IsoGrid } from "../utils/IsoGridUtil";
import { useEffect } from "react";
import { useState, useCallback } from 'react';
import { useLoadPNG } from '../hooks/useLoadPNG';

// This is the useEffect to render the isometric tiles using the texture
export const useCreateIsoGrid = (gridContainerRef) => {


    const [texture, setTexture] = useState(null);

    // Define the tile width and height
    const tileWidth = 64; 
    const tileHeight = 64; 

    //declaring the svgURL and the useLoadSVG hook outside the useEffect below
    const pngURL = process.env.PUBLIC_URL + '/squareIsoTest4.png';

        const handleTextureLoaded = useCallback((newlyLoadedTexture) => {
        setTexture(newlyLoadedTexture); 
    }, []);


    const loadedTexture = useLoadPNG(pngURL, handleTextureLoaded);
    useEffect(() => {
        if (texture) {

            const rows = 50;
            const cols = 50;

            const myIsoGrid = new IsoGrid(rows, cols);  // example, 10 rows and 10 cols
            myIsoGrid.renderTiles(gridContainerRef.current, texture, tileWidth, tileHeight);
        }
    }, [texture]);

}


