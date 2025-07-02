// src/components/ui/NextButton.tsx
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface NextButtonProp {
  onNext ?: ()=> void;
}
const NextButton : React.FC<NextButtonProp> = ({
  onNext,
})=>{
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={onNext}>Tiếp theo</Button>
    </Stack>
  );
}
export default NextButton;