import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { composeImage } from "../../api/images";

const PrinterPage = () => {
  const navigate = useNavigate();
  const [composedImage, setComposedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleComposeImages = async () => {
    const sessionId = localStorage.getItem("sessionId");
    const selectedImages = JSON.parse(
      localStorage.getItem("selectedImages") || "[]"
    );

    if (!sessionId || selectedImages.length === 0) {
      console.log("Chưa chọn ảnh hoặc chưa có session!");
      navigate("/select-image");
      return;
    }
    try {
      setLoading(true);
      const result = await composeImage();
      console.log(result);
      const blob = await result.blob();
      const imageUrl = URL.createObjectURL(blob);
      localStorage.setItem("composedImage", imageUrl);
      if (result.error) {
        console.error("Error composing image:", result.error);
        return;
      }
      setComposedImage(result.composed_image);
      console.log("Composed image:", result.composed_image);
    } catch (error) {
      console.error("Error during image composition:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleComposeImages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBEA] gap-4">
      <h1 className="text-4xl font-bold text-[#1F3A63]">Ảnh Đã Ghép</h1>

      {loading ? (
        <p className="text-2xl">Đang xử lý ảnh...</p>
      ) : composedImage ? (
        <img
          src={composedImage}
          alt="Composed Result"
          className="max-w-[90%] rounded-lg shadow-lg"
        />
      ) : (
        <p className="text-xl">Không có ảnh để hiển thị</p>
      )}

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 border-2 border-[#1F3A63] text-[#1F3A63] font-bold text-xl rounded-full hover:bg-[#1F3A63]/10 cursor-pointer mt-4"
      >
        Quay lại Trang Chủ
      </button>
    </div>
  );
};
export default PrinterPage;
