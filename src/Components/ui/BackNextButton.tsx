import Button from '@mui/material/Button';

interface BackNextButtonProp {
  onNext?: () => void;
  onBack?: () => void;
}
const BackNextButton: React.FC<BackNextButtonProp> = ({ onNext, onBack }) => {
  return (
    <div className='flex justify-between w-full'>
      <Button variant="outlined" onClick={onBack} 
      sx={{
            backgroundColor: '#FFFBEA',
            borderRadius : '8px',
            color: '#1F3A63',              
            fontFamily: 'serif'
        }}>Quay lại</Button>
      <Button variant="contained" onClick={onNext}   
      sx={{
            backgroundColor: '#FFFBEA',
            borderRadius : '8px',
            color: '#1F3A63',              
            fontFamily: 'serif'
        }}>Tiếp theo</Button>
    </div>
  );
}
export default BackNextButton;