import DynamicFrame from '../ui/DynamicFrame';
import NextButton from '../ui/NextButton';
import BackButton from '../ui/BackButton';
const Frame = () => {
  return (
    <>
    <div className="min-h-screen bg-[#FFFBEA] p-10 flex flex-col justify-between">
      <h1 className='text-6xl mb-8'>Chọn khung ảnh</h1>
      <div className="flex justify-center items-end gap-x-32 ">
      <div className="flex flex-col items-center gap-6">
        <DynamicFrame colsNumber={1} itemsLength={4} width={250} ratio='2/1' />
        <p className='text-3xl'>70,000 VND</p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <DynamicFrame colsNumber={2} itemsLength={6} width={250} ratio='2/1' />
        <p className='text-3xl'>100,000 VND</p>
      </div>
    </div>
        <div className="flex justify-between  ">
        <BackButton />
        <NextButton />
      </div>
      </div>
    </>
  );
};


export default Frame;