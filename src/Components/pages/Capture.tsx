import { useNavigate, useParams } from "react-router";
import BackNextButton from "../ui/BackNextButton";
import CustomWebcam from "../ui/Webcam";
import { useState } from "react";

const CapturePage = () => {
  const { id } = useParams();

  const [images, setImages] = useState<string[]>([]);

  const frame = localStorage.getItem('selectedFrame')
    ? JSON.parse(localStorage.getItem('selectedFrame') || '{}') : null;

  const width = window.innerHeight * 0.8;
  const height = width * frame.ratio;

  const totalShots = frame.cols * frame.rows;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/frame/${id}`);
  };

  const handleNext = () => {
    if(images.length === 0) {
      alert('Vui lòng chụp ảnh trước khi tiếp tục!');
      return;
    }

    localStorage.setItem('images', JSON.stringify(images));
    navigate(`/select-image`);
  };

  return (
    <>
      <div className="my-10 mx-7">
        <CustomWebcam width={width} height={height} totalShots={totalShots} isCapture={true} images={images} setImages={setImages} />
      </div>

      <BackNextButton onBack={handleBack}  onNext={handleNext} />
    </>
  )
}

export default CapturePage;