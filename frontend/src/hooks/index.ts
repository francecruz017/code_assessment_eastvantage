import { useEffect, useRef } from 'react';

export const useEffectOnce = (effect: () => void | (() => void), deps?: any[]) => {
    const effectCalled = useRef(false);

    useEffect(() => {
        if (!effectCalled.current) {
            effectCalled.current = true;
            return effect();
        }

        return () => { };
    }, deps);
}