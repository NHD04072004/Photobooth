import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DynamicFrame from '../ui/DynamicFrame';
import BackNextButton from '../ui/BackNextButton';
import type { Frame } from '../../interface';
import { getAllFrames } from '../../api/frame';
import Swal from 'sweetalert2';

const FramePage = () => {
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState<Frame>();
  const [frameData, setFrameData] = useState<Frame[]>();

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const data = await getAllFrames();
        setFrameData(data);
      } catch (error) {
        console.error('Error fetching frames:', error);
      }
    };

    fetchFrames();
  }, []);

  const handleSelect = (frame: Frame) => {
    setSelectedFrame(frame);
  };

  const handleNext = () => {
    if (!selectedFrame) {
    Swal.fire({
      icon: 'warning',
      title: 'Bạn chưa chọn khung ảnh!',
      text: 'Vui lòng chọn một khung ảnh trước khi tiếp tục.',
      confirmButtonText: 'Tôi hiểu',
      confirmButtonColor: '#e63946',
    });
    return;
  }

  localStorage.setItem('selectedFrame', JSON.stringify(selectedFrame));
  navigate(`/frame/${selectedFrame.id}`);
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen p-5 flex flex-col justify-between">
      <h1 className="text-6xl mb-8 ">Chọn khung ảnh</h1>

      <div className="flex justify-center mt-10 items-end gap-x-32">
        {frameData && frameData.map(frame => (
          <div
            key={frame.id}
            className="flex flex-col items-center gap-6 cursor-pointer"
            onClick={() => handleSelect(frame)}
          >
            <DynamicFrame
              colsNumber={frame.cols}
              itemsLength={frame.cols * 4}
              width={100}
              ratio={1.5}
              isSelected={selectedFrame && selectedFrame.id === frame.id}
            />
            <p className="text-3xl"> VND</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between ">
        <BackNextButton onBack={handleBack} onNext={handleNext} />
      </div>
    </div>
  );
};

export default FramePage;