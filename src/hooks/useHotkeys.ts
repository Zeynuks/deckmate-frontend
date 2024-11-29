import { useEffect } from 'react';

interface Options {
    enabled?: boolean;
}

type KeyCombination = string | string[];

export function useHotkeys(
    keys: KeyCombination,
    callback: (event: KeyboardEvent) => void,
    options: Options = {}
) {
    const { enabled = true } = options;

    useEffect(() => {
        if (!enabled) return;

        const parseKeys = (keyCombo: string) =>
            keyCombo
                .toLowerCase()
                .split('+')
                .map(k => k.trim());

        const handler = (event: KeyboardEvent) => {
            const downedKeys = new Set<string>();

            if (event.ctrlKey) downedKeys.add('control');
            if (event.shiftKey) downedKeys.add('shift');
            if (event.altKey) downedKeys.add('alt');
            if (event.metaKey) downedKeys.add('meta');

            const key = event.key.toLowerCase();
            downedKeys.add(key);

            const match = (targetKeys: string[]) =>
                targetKeys.length === downedKeys.size &&
                targetKeys.every(k => downedKeys.has(k));

            const keysArray = Array.isArray(keys) ? keys : [keys];

            for (const keyCombo of keysArray) {
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
