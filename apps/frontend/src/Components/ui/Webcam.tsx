import type React from 'react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import CountDown from './CountDown';
import ButtonCapture from './ButtonCapture';
import ImagesGallery from './ImagesGallery';

interface CustomWebcamProp {
  width: number;
  height: number;
  facingMode?: string;
  totalShots?: number;
  countdownSeconds?: number;
  isCapture?: boolean;
}

const CustomWebcam: React.FC<CustomWebcamProp> = ({
  width,
  height,
  facingMode = 'user',
  totalShots = 4,
  countdownSeconds = 5,
  isCapture = false
}) => {
  const videoConstraints = {
    width,
    height,
    facingMode,
  };

  const webcamRef = useRef<Webcam | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const startCapture = async () => {
    setImages([]);
    setIsCapturing(true);

    for (let i = 0; i < totalShots; i++) {
      for (let t = countdownSeconds; t >= 1; t--) {
        setCountdown(t);
        await sleep(1000);
      }

      setCountdown(null);

      // Chụp ảnh
      if (webcamRef.current) {
        const image = webcamRef.current.getScreenshot();
        if (image) {
          setImages((prev) => [...prev, image]);
          console.log(`📸 Ảnh ${i + 1} đã chụp`);
          console.log(image)
        }
      }

      await sleep(500);
    }

    setIsCapturing(false);
  };

  return (
    <div className="flex gap-6">
      {/* Webcam Section */}
      <div className="relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored={true}
          width={width}
          height={height}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          className="object-cover rounded-lg border shadow-lg"
        />

        {countdown && <CountDown countdown={countdown} />}

        {isCapture && (
          <ButtonCapture startCapture={startCapture} isCapturing={isCapturing} totalShots={totalShots} />
        )}
      </div>

      {/* Images Gallery Section */}
      {images.length > 0 && (
        <ImagesGallery images={images} totalShots={totalShots} width={width} height={height}/>
      )}
    </div>
  );
};

export default CustomWebcam;