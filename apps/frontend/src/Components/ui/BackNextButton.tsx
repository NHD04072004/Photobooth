// src/components/ui/NextButton.tsx
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface BackNextButtonProp {
  onNext ?: ()=> void;
  onBack ?: ()=> void;
}
const BackNextButton : React.FC<BackNextButtonProp> = ({
  onNext,
  onBack,
})=>{
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={onNext}>Tiếp theo</Button>
      <Button variant="outlined" onClick={onBack}>Quay lại</Button>
    </Stack>
  );
}
export default BackNextButton;