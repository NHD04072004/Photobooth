import { useNavigate } from 'react-router';

const Frame = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen px-8 py-6 flex flex-col justify-between bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Chọn khung ảnh</h1>
      </div>
      <div className="flex justify-center mb-6">
        <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500">
          Ảnh minh hoạ
        </div>
      </div>
      <div className="flex justify-center gap-16 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-40 bg-teal-700 border border-black rounded-sm"></div>
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold">Khung cơ bản</p>
            <p className="text-xs text-gray-700">70.000 VND</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-32 h-40 bg-teal-700 border border-black rounded-sm"></div>
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold">Khung cao cấp</p>
            <p className="text-xs text-gray-700">100.000 VND</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={() => navigate('/')} className="text-2xl font-bold">
          Quay lại
        </button>
        <button
          onClick={() => navigate('/select-print-frame')} 
          className="text-2xl font-bold"
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default Frame;
