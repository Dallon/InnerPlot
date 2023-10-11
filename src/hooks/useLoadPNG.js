import { useEffect } from 'react';
import { loadPNGAsTexture } from '../utils/loadPNGAsTexture';

export const useLoadPNG = (url, onTextureLoaded) => {
    useEffect(() => {
        let isMounted = true;
        console.log('useLoadPNG effect started', { url });

        loadPNGAsTexture(url)
            .then(texture => {
                if (!isMounted) return;
                console.log("texture loaded");
                if (onTextureLoaded) {
                    onTextureLoaded(texture);
                  }
            })
            .catch(error => console.error('Error loading PNG:', error));

        return () => {
            isMounted = false;
        };
    }, [url]);

};
