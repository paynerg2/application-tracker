// useWindowDimensions.js
// Adapted from https://www.codegrepper.com/code-examples/javascript/how+to+get+screen+width+in+react+js

import { useState, useEffect } from 'react';

interface Dimensions {
    width: number | null;
    height: number | null;
}

function useWindowDimensions() {
    const hasWindow = typeof window !== 'undefined';

    const getWindowDimensions = (): Dimensions => {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    };

    const [windowDimensions, setWindowDimensions] = useState<Dimensions>(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
}

export default useWindowDimensions;
