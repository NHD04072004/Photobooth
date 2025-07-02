import { useNavigate } from 'react-router';
import picperfect from "../../assets/picperfect.png";
import CustomWebcam from '../ui/Webcam';

const HomePage = () => {
  const navigate = useNavigate();

  const width = window.innerWidth * 0.8;
  const height = window.innerHeight * 0.6;

  const handleStart = () => {
    navigate('/frame');
  };

  return (
    <div className="flex flex-col items-center text-center gap-4 bg-[#FFFBEA]">
      <img
        src={picperfect}
        alt="Logo"
        className="w-[300px] h-auto bg-[#FFFBEA]"
      />
      <CustomWebcam width={width} height={height} />

      <button
        onClick={handleStart}
        className="px-8 py-3 border-2 border-[#1F3A63] text-[#1F3A63] font-bold text-3xl rounded-full hover:bg-[#1F3A63]/10 cursor-pointer"
      >
        Chạm để bắt đầu
      </button>
    </div>
  );
};

export default HomePage;