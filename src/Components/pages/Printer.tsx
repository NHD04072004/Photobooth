import { useNavigate } from "react-router";
import BackNextButton from "../ui/BackNextButton";
import { useEffect, useState } from "react";
import { getComposedImage } from "../../api/images";

const PrinterPage = () => {
  const navigate = useNavigate();
  const [composedImage, setComposedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComposedImage = async () => {
      try {
        const imageBlob = await getComposedImage();
        const imageUrl = URL.createObjectURL(imageBlob);
        setComposedImage(imageUrl);
      } catch (error) {
        console.error("Failed to fetch composed image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComposedImage();
  }, []);
  const handleBack = () => {
    navigate("/select-image");
  };
  const handlePrint = () => {
    if (composedImage) {
      console.log("In ảnh:", composedImage);
    } else {
      console.error("Không có ảnh để in.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-5xl mb-6">In Ảnh Đã Chọn</h1>
      {loading ? (
        <p>Đang tải ảnh...</p>
      ) : (
        <div className="rounded-2xl shadow-xl overflow-hidden">
          {composedImage ? (
            <img src={composedImage} alt="Composed" className="w-full h-auto" />
          ) : (
            <p>Không có ảnh để hiển thị.</p>
          )}
        </div>
      )}
      <div className="mt-6">
        <BackNextButton onBack={handleBack} onNext={handlePrint} />
      </div>
    </div>
  );
};
export default PrinterPage;
