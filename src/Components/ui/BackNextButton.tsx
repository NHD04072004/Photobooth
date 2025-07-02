import Button from '@mui/material/Button';

interface BackNextButtonProp {
  onNext?: () => void;
  onBack?: () => void;
}
const BackNextButton: React.FC<BackNextButtonProp> = ({ onNext, onBack }) => {
  return (
    <div className='flex justify-between w-full'>
      <Button variant="outlined" onClick={onBack}>Quay lại</Button>
      <Button variant="contained" onClick={onNext} className='!bg-red'>Tiếp theo</Button>
    </div>
  );
}
export default BackNextButton;