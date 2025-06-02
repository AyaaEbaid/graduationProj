import React, { createContext, useContext, useState, useEffect } from 'react';

const ImageCraftsmanContext = createContext();

export const ImageCraftsmanProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null); // لتخزين أي أخطاء
  const craftsmanId = localStorage.getItem('craftsmanId'); // ديناميكي
  const baseUrl = 'https://hanshatabhalak.runasp.net'; // الدومين الثابت

  useEffect(() => {
    const fetchImage = async () => {
      if (!craftsmanId) {
        setError('Craftsman ID is missing.');
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/api/Craftsman/${craftsmanId}/getImage?language=en`);
        if (!res.ok) {
          throw new Error(`Failed to fetch image: ${res.status}`);
        }
        const data = await res.json();
        if (data.imageUrl) {
          const fullUrl = `${baseUrl}${data.imageUrl}`;
          setImageUrl(fullUrl);
        } else {
          setError('No image URL returned from API.');
        }
      } catch (err) {
        console.error('Failed to fetch image:', err);
        setError('Failed to load image. Please try again later.');
      }
    };

    fetchImage();
  }, [craftsmanId, baseUrl]); // أضفت baseUrl عشان يتحقق لو اتغير

  const updateImageUrl = (newPath) => {
    if (newPath) {
      const fullUrl = `${baseUrl}${encodeURI(newPath)}`; // استخدام encodeURI لتجنب المشاكل في الترميز
      setImageUrl(fullUrl);
    } else {
      setError('No image path provided for update.');
    }
  };

  return (
    <ImageCraftsmanContext.Provider value={{ imageUrl, updateImageUrl, error }}>
      {children}
    </ImageCraftsmanContext.Provider>
  );
};

export const useImageCraftsman = () => useContext(ImageCraftsmanContext);