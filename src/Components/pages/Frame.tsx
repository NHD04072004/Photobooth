import DynamicFrame from '../ui/DynamicFrame';

const Frame = () => {
  return (
    <>
      <DynamicFrame colsNumber={1} itemsLength={4} width={100} ratio='2/1' />

      <DynamicFrame colsNumber={2} itemsLength={6} width={100} ratio='2/1' />
    </>
  );
};


export default Frame;
