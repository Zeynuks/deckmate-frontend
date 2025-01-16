import {ImageObject, Size} from '../../../store/types.ts';
import convertImageToBase64 from '../../../utils/convertBase64.ts';
import {useToast} from '../Toast/ToastContext.tsx';
import {useAppActions} from '../../../hooks/useAppActions.ts';
import {useEffect} from 'react';
import {RootState, useAppSelector} from '../../../store/store.ts';

type ImageObjectProps = {
    object: ImageObject;
    size: Size;
    isEditing: boolean;
};
//TODO: Разобраться как вызвать перерендер
export const ImageComponent: React.FC<ImageObjectProps> = ({
                                                               object,
                                                               size,
                                                               isEditing
                                                           }) => {
    const selected = useAppSelector((state: RootState) => state.selected);
    const {setImageObject, setSelected} = useAppActions();
    const {addToast} = useToast();

    const handleFileUpload = (file: File) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            console.error('Выбранный файл не является изображением');
            addToast({
                title: 'Ошибка загрузки',
                description: 'Пожалуйста, выберите файл изображения',
                type: 'error',
            });
            return;
        }


        const img = new Image();
        convertImageToBase64(file)
            .then(base64 => {
                img.src = base64;
            })
            .catch(error => {
                console.error('Ошибка конвертации:', error);
            });

        img.onload = () => {
            const width = img.width;
            const height = img.height;
            URL.revokeObjectURL(img.src);

            const updatedImageObject: ImageObject = {
                ...object,
                size: {
                    width: width,
                    height: height
                },
                src: img.src
            };
            setImageObject(updatedImageObject);
            setSelected(selected.slide, [updatedImageObject.id]);
        };

        img.onerror = () => {
            console.error('Ошибка при загрузке изображения');
            addToast({
                title: 'Ошибка загрузки',
                description: 'Ошибка при загрузке изображения',
                type: 'error',
            });
        };
    };

    useEffect(() => {
        if (isEditing) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';

            fileInput.onchange = (event: Event) => {
                const target = event.target as HTMLInputElement;
                const file = target?.files?.[0];
                if (file) {
                    handleFileUpload(file);
                }
            };

            fileInput.click();
        }
    }, [isEditing]);

    return (
        <svg
            x={-size.width / 2}
            y={-size.height / 2}
            width={size.width}
            height={size.height}
            pointerEvents="auto"
            viewBox={`0 0 ${size.width} ${size.height}`}
            preserveAspectRatio="none"
        >
            <image
                href={object.src}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
            />
        </svg>
    );
};
