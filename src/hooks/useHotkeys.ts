import {useEffect} from 'react';

interface Options {
    enabled?: boolean;
}

type KeyCombination = string[];

export function useHotkeys(
    keys: KeyCombination,
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

            const match = (targetKeys: string[]) =>
                targetKeys.length === downedKeys.size && targetKeys.every(k => downedKeys.has(k));

            for (const keyCombo of keys) {
                const targetKeys = parseKeys(keyCombo);
                if (match(targetKeys)) {
                    callback(event);
                    break;
                }
            }
        };

        window.addEventListener('keydown', handler);

        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, [keys, callback, enabled]);
}
