import React, { useState } from 'react';
import { useImageCraftsman } from '../../Context/ImageCraftsmanContext';
import defaultImage from '../../assets/profile.png';

const CraftsmanEdits = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { imageUrl, updateImageUrl } = useImageCraftsman();
  const craftsmanId = localStorage.getItem('craftsmanId');

  const handleUpload = async () => {
    if (!file || !craftsmanId) {
      setError('Please select a file and ensure craftsman ID is available.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file); // تأكد إن الـ file موجود
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://hanshatabhalak.runasp.net/api/Craftsman/${11}/uploadImage?language=en`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // جرب نلقط رسالة الخطأ
        throw new Error(`Upload failed with status ${response.status}: ${errorText || 'Bad Request'}`);
      }

      const result = await response.json();
      updateImageUrl(result.data);
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Craftsman Edits</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {imageUrl && (
        <img
          src={imageUrl || defaultImage}
          alt="Craftsman"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
      )}

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="bg-teal-600 text-white px-4 py-2 mt-2 rounded disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
};

export default CraftsmanEdits;