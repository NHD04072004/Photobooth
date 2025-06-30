import { useNavigate } from 'react-router';

const PrintFrame= () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen px-8 py-6 bg-white flex flex-col justify-between">
      <div className="flex justify-center relative">
        <h1 className="text-3xl font-bold">Chọn khung in 2/2</h1>
        <span className="absolute left-0 top-1 text-sm">Slide 1 2x6</span>
      </div>
      <div className="flex justify-center items-end gap-20">
        <div className="flex flex-col items-center">
          <div className="w-40 h-64 bg-teal-700 border border-black flex items-center justify-center text-white text-sm">
            Khung chụp 3 ảnh
          </div>
          <p className="mt-2 text-sm">70,000 VND</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-40 h-64 bg-teal-700 border border-black flex items-center justify-center text-white text-sm">
            Khung chụp 4 ảnh
          </div>
          <p className="mt-2 text-sm">100,000 VND</p>
        </div>
      </div>
      <div className="flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="text-3xl font-bold"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default PrintFrame;
