import { HistoryType } from '../utils/history.ts';
import React from 'react';

const defaultHistory: HistoryType = {
    undo: () => undefined,
    redo: () => undefined,
};

export const HistoryContext: React.Context<HistoryType> = React.createContext(defaultHistory);