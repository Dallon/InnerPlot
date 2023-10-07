import { useEffect } from 'react';
import { loadSVGAsTexture } from '../utils/loadSVGAsTexture';

export const useLoadSVG = (url, onTextureLoaded) => {
    useEffect(() => {
        let isMounted = true;
        console.log('useLoadSVG effect started', { url });

        loadSVGAsTexture(url)
            .then(texture => {
                if (!isMounted) return;
                console.log("texture loaded");
                if (onTextureLoaded) {
                    onTextureLoaded(texture);
                  }
            })
            .catch(error => console.error('Error loading SVG:', error));

        return () => {
            isMounted = false;
        };
    }, [url]);

};
