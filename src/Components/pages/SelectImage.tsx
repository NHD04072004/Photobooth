import React, { useState } from "react";
import ImagePreviewPopup from "../ui/ImagePreviewPopup";

const SelectImagePage = () => {
  const images = localStorage.getItem('images')
    ? JSON.parse(localStorage.getItem('images') || '[]') : [];

  const frame = localStorage.getItem('selectedFrame')
    ? JSON.parse(localStorage.getItem('selectedFrame') || '{}') : null;

  // State để lưu danh sách index ảnh đã chọn theo thứ tự chọn
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Xử lý khi click vào ảnh
  const handleSelect = (index: number) => {
    setSelectedIndexes((prev) => {
      if (prev.includes(index)) {
        // Nếu đã chọn thì bỏ chọn và cập nhật lại thứ tự
        return prev.filter((i) => i !== index);
      } else {
        // Nếu chưa chọn thì thêm vào cuối mảng
        return [...prev, index];
      }
    });
  };

  // Xử lý khi bấm nút xác nhận
  const handleConfirm = () => {
    const selectedImages = selectedIndexes.map((i) => images[i]);
    console.log(selectedImages);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEA] p-10 flex flex-col justify-between">
      <h1 className="text-6xl mb-8">Chọn ảnh</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center items-end">
        {images && images.length > 0 && images.map((image: string, index: number) => {
          const selectedOrder = selectedIndexes.indexOf(index);
          return (
            <div key={index} className="flex flex-col items-center gap-6 cursor-pointer relative" onClick={() => handleSelect(index)}>
              <div
                className="relative flex items-center justify-center bg-white border-2 rounded-lg shadow-md"
                style={{
                  width: '240px',
                  aspectRatio: frame ? frame.ratio : 1.5,
                  borderColor: selectedOrder !== -1 ? '#3b82f6' : '#e5e7eb',
                  boxShadow: selectedOrder !== -1 ? '0 4px 20px rgba(59,130,246,0.2)' : undefined,
                  transition: 'all 0.2s',
                }}
              >
                <img
                  src={image}
                  alt={`Ảnh ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                  style={{ aspectRatio: frame ? frame.ratio : 1.5 }}
                />
                {selectedOrder !== -1 && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {selectedOrder + 1}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 justify-center mt-8">
        <button
          className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-all"
          onClick={handlePreview}
          disabled={selectedIndexes.length === 0}
        >
          Preview
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
          onClick={handleConfirm}
          disabled={selectedIndexes.length === 0}
        >
          Xác nhận
        </button>
      </div>
      {showPreview && (
        <ImagePreviewPopup
          images={selectedIndexes.map((i) => images[i])}
          onClose={handleClosePreview}
          frame={frame}
        />
      )}
    </div>
  );
};

export default SelectImagePage;