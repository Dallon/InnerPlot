import { IsoGrid } from "../utils/IsoGridUtil";
import { useEffect } from "react";

// This is the useEffect to render the isometric tiles using the texture
export const useCreateIsoGrid = (gridContainerRef, texture, tileWidth, tileHeight) => {

    useEffect(() => {
        if (texture) {

            const rows = 50;
            const cols = 50;

            const myIsoGrid = new IsoGrid(rows, cols);  // example, 10 rows and 10 cols
            myIsoGrid.renderTiles(gridContainerRef.current, texture, tileWidth, tileHeight);
        }
    }, [texture]);

}


