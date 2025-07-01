import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Webcam from 'react-webcam';
import picperfect from "../../assets/picperfect.png";

const videoConstraints = {
  width: 1000,
  height: 1000,
  facingMode: 'user',
};

const Home = () => {
  const navigate = useNavigate();

  const [width, setWidth] = useState(1200);   
  const [height, setHeight] = useState(700); 

  
  useEffect(() => {
    const fetchDimensions = async () => {
      
      const response = {
        width: 1200,
        height: 700,
      };

      setWidth(response.width);
      setHeight(response.height);
    };

    fetchDimensions();
  }, []);

  const handleStart = () => {
    navigate('/frame');
    navigate('/frame');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFFBEA]">
      <div className="flex flex-col items-center justify-center text-center space-y-6 cursor-pointer">
        <img src={picperfect} alt="Logo" className="w-[60%] max-w-md h-auto bg-[#FFFBEA] p-2 rounded-lg" />
        <div className="w-[1200px] h-[700px] relative">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <button onClick={handleStart} className="px-8 py-3 border-2 border-[#1F3A63] text-[#1F3A63] font-bold text-3xl rounded-full hover:bg-[#1F3A63]/10 transition duration-200 mt-4">
          Chạm để bắt đầu
        </button>
      </div>
    </section>
  );
};

export default Home;
