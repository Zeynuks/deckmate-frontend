import { Editor } from '../store/types';
import Ajv from 'ajv';
import schema from '../schemas/schema.json';

const ajv = new Ajv({ allErrors: true, verbose: true });

const validateDocument = (editor: Editor): boolean => {
    const validate = ajv.compile(schema);
    console.log('validate');
    const valid = validate(editor);

    if (!valid) {
        console.error('Документ не прошел валидацию:', validate.errors);
    }

    return valid;
};

export { validateDocument };
