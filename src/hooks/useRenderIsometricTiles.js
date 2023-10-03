import { IsoGrid } from "../utils/IsoGridUtil";  
import { useEffect } from "react";

  // This is the useEffect to render the isometric tiles using the texture
  export const useRenderIsometricTiles = (mainContainerRef, texture, tileWidth, tileHeight) => {
    
    useEffect(() => {
        if (texture) {
            const myIsoGrid = new IsoGrid(25, 25);  // example, 10 rows and 10 cols
            myIsoGrid.renderTiles(mainContainerRef.current, texture, tileWidth, tileHeight); 
        }
    }, [texture]);

}


