import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ImageSearchModal.module.css';
import { useToast } from '../components/Toast/ToastContext';

interface ImageSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectImage: (fileBlob: Blob, fileName: string) => void;
}

interface UnsplashImage {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    alt_description?: string;
}

const ImageSearchModal: React.FC<ImageSearchModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               onSelectImage,
                                                           }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [images, setImages] = useState<UnsplashImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { addToast } = useToast();

    const fetchImages = async (query: string) => {
        try {
            setLoading(true);
            setError('');
            const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query,
                    per_page: 12,
                },
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
            });
            setImages(response.data.results);
            if (response.data.results.length === 0) {
                addToast({
                    title: 'Ничего не найдено',
                    description: `По запросу "${query}" нет изображений`,
                    type: 'warning',
                });
            }
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке изображений');
            addToast({
                title: 'Ошибка',
                description: 'Не удалось загрузить изображения. Попробуйте позже.',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && searchTerm.trim().length > 0) {
            fetchImages(searchTerm);
        }
        if (!isOpen) {
            setImages([]);
            setSearchTerm('');
            setError('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            fetchImages(searchTerm);
        }
    };

    const handleSelectImage = async (imageUrl: string, alt?: string) => {
        try {
            setLoading(true);
            const response = await axios.get(imageUrl, { responseType: 'blob' });
            const blob = response.data;
            const fileName = alt ? `${alt}.jpg` : 'unsplash.jpg';
            addToast({
                title: 'Изображение выбрано',
                description: `Файл "${fileName}" добавлен в редактор`,
                type: 'success',
            });
            onSelectImage(blob, fileName);
            onClose();
        } catch {
            setError('Ошибка при загрузке изображения');
            addToast({
                title: 'Ошибка',
                description: 'Не удалось загрузить изображение. Попробуйте ещё раз.',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &#10005;
                </button>
                <h2 className={styles.title}>Поиск изображений на Unsplash</h2>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Введите поисковой запрос"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        Найти
                    </button>
                </form>
                {loading && <p className={styles.loading}>Загрузка...</p>}
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.imagesGrid}>
                    {images.map((image) => (
                        <img
                            key={image.id}
                            src={image.urls.small}
                            alt={image.alt_description || 'Unsplash image'}
                            className={styles.imageItem}
                            onClick={() =>
                                handleSelectImage(image.urls.regular, image.alt_description)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSearchModal;
