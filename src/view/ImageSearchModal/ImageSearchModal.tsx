import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import styles from './ImageSearchModal.module.css';
import { useToast } from '../components/Toast/ToastContext';
import {Typography} from '../components/Typography/Typography.tsx';

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

interface ProgressiveImageProps {
    lowSrc: string;
    highSrc: string;
    alt: string;
    onClick: () => void;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ lowSrc, highSrc, alt, onClick }) => {
    const [src, setSrc] = useState(lowSrc);
    const [loadingHigh, setLoadingHigh] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = highSrc;
        img.onload = () => {
            setSrc(highSrc);
            setLoadingHigh(false);
        };
    }, [highSrc]);

    return (
        <img
            src={src}
            alt={alt}
            onClick={onClick}
            className={styles.progressiveImage + (loadingHigh ? ` ${styles.loadingHigh}` : '')}
        />
    );
};

const ImageSearchModal: React.FC<ImageSearchModalProps> = ({ isOpen, onClose, onSelectImage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [images, setImages] = useState<UnsplashImage[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { addToast } = useToast();
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    const abortControllerRef = useRef<AbortController | null>(null);

    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 100);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const fetchImages = async (p: number, term: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        try {
            setLoading(true);
            let response: AxiosResponse;
            if (term.trim().length > 0) {
                response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: { query: term, page: p, per_page: 12 },
                    headers: { Authorization: `Client-ID ${accessKey}` },
                    signal: abortControllerRef.current.signal,
                });
                const newImages: UnsplashImage[] = response.data.results;
                setImages((prev) => (p === 1 ? newImages : [...prev, ...newImages]));
                setHasMore(newImages.length === 12);
            } else {
                response = await axios.get('https://api.unsplash.com/photos', {
                    params: { page: p, per_page: 12, order_by: 'latest' },
                    headers: { Authorization: `Client-ID ${accessKey}` },
                    signal: abortControllerRef.current.signal,
                });
                const newImages: UnsplashImage[] = response.data;
                setImages((prev) => (p === 1 ? newImages : [...prev, ...newImages]));
                setHasMore(newImages.length === 12);
            }
        } catch (e) {
            if (!axios.isCancel(e)) {
                addToast({
                    title: 'Ошибка',
                    description: 'Не удалось загрузить изображения.',
                    type: 'error',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setImages([]);
            setSearchTerm('');
            setPage(1);
            setHasMore(true);
            return;
        }
        setImages([]);
        setPage(1);
        setHasMore(true);
    }, [isOpen, debouncedTerm]);

    useEffect(() => {
        if (isOpen) {
            fetchImages(page, debouncedTerm);
        }
    }, [page, isOpen, debouncedTerm]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isOpen) return;
        setImages([]);
        setPage(1);
        setHasMore(true);
    };

    const handleScroll = () => {
        if (containerRef.current && hasMore && !loading) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                setPage((prev) => prev + 1);
            }
        }
    };

    const handleSelectImage = async (imageUrl: string, alt?: string) => {
        try {
            setLoading(true);
            const response = await axios.get(imageUrl, { responseType: 'blob' });
            const blob = response.data;
            const fileName = alt ? `${alt}.jpg` : 'unsplash.jpg';
            addToast({
                title: 'Загрузка завершена',
                description: 'Изображение успешно добавлено',
                type: 'success',
            });
            onSelectImage(blob, fileName);
            onClose();
        } catch {
            addToast({
                title: 'Ошибка',
                description: 'Ошибка при загрузке изображения',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&#10005;</button>
                <Typography variant={'menuTitle'}>Find images</Typography>

                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Enter search query"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </form>
                <div ref={containerRef} className={styles.masonryContainer} onScroll={handleScroll}>
                    {images.map((image) => (
                        <div key={image.id} className={styles.masonryItem}>
                            <ProgressiveImage
                                lowSrc={image.urls.small}
                                highSrc={image.urls.regular}
                                alt={image.alt_description || 'Unsplash'}
                                onClick={() => handleSelectImage(image.urls.regular, image.alt_description)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSearchModal;
