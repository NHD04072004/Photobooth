import type React from 'react';
import Webcam from 'react-webcam';

interface CustomWebcamProp {
  width: number;
  height: number;
  facingMode?: string;
}

const CustomWebcam: React.FC<CustomWebcamProp> = ({ width, height, facingMode = 'user' }) => {
  const videoConstraints = {
    width,
    height,
    facingMode,
  };

  return (
    <Webcam
      audio={false}
      mirrored={true}
      screenshotFormat="image/png"
      videoConstraints={videoConstraints}
      className="object-cover rounded-lg"
    />
  );
};

export default CustomWebcam;