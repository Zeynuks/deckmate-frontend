function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('Не удалось конвертировать изображение.');
            }
        };
        reader.onerror = error => reject(error);
    });
}

export default convertImageToBase64;