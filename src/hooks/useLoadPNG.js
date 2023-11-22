import { useEffect } from 'react';

import { loadPNGAsTexture } from '../utils/loadPNGAsTexture';
//used in the background grid creation process, not item creation process
export const useLoadPNG = (url, onTextureLoaded) => {

    useEffect(() => {
        let isMounted = true;
        console.log('useLoadPNG effect started', { url });
        
        loadPNGAsTexture(url)
            .then(texture => {
                if (!isMounted) return;
                
                if (onTextureLoaded) {
                    onTextureLoaded(texture);
                    console.log("texture loaded");
                  }
            })
            .catch(error => console.error('Error loading PNG:', error));

        return () => {
            isMounted = false;
        };
    }, [url]);

};

