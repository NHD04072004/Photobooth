import { useParams } from "react-router";
import CustomWebcam from "../ui/Webcam";

const CapturePage = () => {
  const width = window.innerHeight * 0.8;
  const height = window.innerHeight * 0.8;

  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-5xl mb-6">
        Chụp Ảnh Với Khung
      </h1>

      <div className="rounded-2xl shadow-xl overflow-hidden  ">
        <CustomWebcam
          width={width}
          height={height}
          totalShots={5}
          isCapture={true}
        />
      </div>
    </div>
  );
};

export default CapturePage;
