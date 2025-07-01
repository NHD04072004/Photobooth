import type React from 'react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import CountDown from './CountDown';

interface CustomWebcamProp {
  width: number;
  height: number;
  facingMode?: string;
  totalShots?: number;
  countdownSeconds?: number;
}

const CustomWebcam: React.FC<CustomWebcamProp> = ({
  width,
  height,
  facingMode = 'user',
  totalShots = 4,
  countdownSeconds = 5,
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
    <div className="relative w-fit">
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={true}
        width={width}
        height={height}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        className="object-cover rounded-lg border"
      />

      {countdown && <CountDown countdown={countdown} />}

      <button
        onClick={startCapture}
        disabled={isCapturing}
        className={`mt-2 px-4 py-2 rounded w-full ${isCapturing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
      >
        ▶️ {isCapturing ? 'Đang chụp...' : `Bắt đầu chụp ${totalShots} ảnh`}
      </button>
    </div>
  );
};

export default CustomWebcam;
