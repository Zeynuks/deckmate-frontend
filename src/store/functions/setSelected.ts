import { Editor, Selected} from '../types.ts';

export function setSelected(editor: Editor, newSelected: Selected): Editor {
    return {
        ...editor,
        selected: newSelected
    };

}