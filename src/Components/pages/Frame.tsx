import { useState } from 'react';
import { useNavigate } from 'react-router';
import DynamicFrame from '../ui/DynamicFrame';
import BackNextButton from '../ui/BackNextButton';
import type { Frame } from '../../interface';

const frameData = [
  {
    id: 'frame2x6',
    label: 'Khung 2×6',
    width: 600,
    height: 1800,
    price: 70000,
    cols: 1,
    options: [
      {
        id: '8b593ab3-2215-479d-95d7-1b92cb337f97',
        label: '2×6 – 3 ảnh',
        cols: 1,
        rows: 3,
        ratio: 3 / 1,
      },
      {
        id: '81b364b7-30d2-4132-b79b-bb32675e4c84',
        label: '2×6 – 4 ảnh',
        cols: 1,
        rows: 4,
        ratio: 3 / 1,
      },
    ],
  },
  {
    id: 'frame4x6',
    label: 'Khung 4×6',
    width: 1200,
    height: 1800,
    price: 100000,
    cols: 2,
    options: [
      {
        id: 'ff27fe6f-a1f2-402e-ac1a-7c4c67a22c7d',
        label: '4×6 – 4 ảnh',
        cols: 2,
        rows: 2,
        ratio: 3 / 2,
      },
      {
        id: '752f8dfc-c540-41ab-bd08-5e91365d23bc',
        label: '4×6 – 5 ảnh',
        cols: 2,
        rows: 3,
        ratio: 3 / 2,
      }
    ],
  },
];

const FramePage = () => {
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState<Frame>();

  const handleSelect = (frame: Frame) => {
    setSelectedFrame(frame);
  };

  const handleNext = () => {
    if (!selectedFrame) {
      alert('Vui lòng chọn một khung ảnh!');
      return;
    }

    localStorage.setItem('selectedFrame', JSON.stringify(selectedFrame));

    navigate(`/frame/${selectedFrame.id}`);
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FFFBEA] p-10 flex flex-col justify-between">
      <h1 className="text-6xl mb-8 ">Chọn khung ảnh</h1>

      <div className="flex justify-center items-end gap-x-32">
        {frameData.map(frame => (
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
            <p className="text-3xl">{frame.price.toLocaleString()} VND</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <BackNextButton onBack={handleBack} onNext={handleNext} />
      </div>
    </div>
  );
};

export default FramePage;