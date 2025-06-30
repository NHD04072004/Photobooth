import { useNavigate } from 'react-router';
import Webcam from 'react-webcam';
import DynamicFrame from './DynamicFrame';

const videoConstraints = {
  width: 320,
  height: 240,
  facingMode: 'user',
};

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/camera');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div
        onClick={handleStart}
        className="flex flex-col items-center justify-center text-center space-y-4 cursor-pointer"
      >
        {/* Logo */}
        <div className="text-xl text-gray-700">Logo shop</div>

        {/* Webcam */}
        <div className="relative w-[320px] h-[240px]">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Text */}
        <h1 className="text-4xl font-bold text-black">Chạm để bắt đầu</h1>
      </div>
    </section>

  );
};

export default Home;
