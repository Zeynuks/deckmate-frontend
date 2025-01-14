import {useEffect} from 'react';

interface Options {
    enabled?: boolean;
}

export enum KeyCodes {
    ctrlZ = 'control+KeyZ',
    ctrlShiftZ = 'control+shift+KeyZ',
    ctrlY = 'control+KeyY',
    metaZ = 'meta+KeyZ',
    metaShiftZ = 'meta+shift+KeyZ',
    metaY = 'meta+KeyY',
    delete = 'Delete',
    arrowLeft = 'ArrowLeft',
    arrowRight = 'ArrowRight',
    arrowUp = 'ArrowUp',
    arrowDown = 'ArrowDown',
    escape = 'Escape',
    enter = 'Enter',
}

export function useHotkeys(
    combinations: KeyCodes[],
    callback: (event: KeyboardEvent) => void,
    options: Options = {}
) {
    const {enabled = true} = options;

    useEffect(() => {
        if (!enabled) return;

        const parseKeys = (keyCombo: string) =>
            keyCombo
                .split('+')
                .map(k => k.trim());

        const handler = (event: KeyboardEvent) => {
            const downedKeys = new Set();
            if (event.ctrlKey) downedKeys.add('control');
            if (event.shiftKey) downedKeys.add('shift');
            if (event.altKey) downedKeys.add('alt');
            if (event.metaKey) downedKeys.add('meta');

            const key = event.code;
            downedKeys.add(key);

            for (const combination of combinations) {
                const targetKeys = parseKeys(combination);
                if (targetKeys.length === downedKeys.size && targetKeys.every(k => downedKeys.has(k))) {
                    callback(event);
                    break;
                }
            }
        };

        window.addEventListener('keydown', handler);

        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, [combinations, callback, enabled]);
}
