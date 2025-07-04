import { useNavigate } from "react-router";
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
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>In ảnh</title>
            </head>
            <body>
              <img src="${composedImage}" style="width: 50%; height: auto;" />
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } else {
      alert("Không có ảnh để in!");
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
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Quay Lại
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          In Ảnh
        </button>
      </div>
    </div>
  );
};
export default PrinterPage;
