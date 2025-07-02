import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface BackButtonProp {
  onBack ?: ()=> void;
}
const BackButton : React.FC<BackButtonProp> = ({
  onBack,
})=>{
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={onBack}>Quay lại</Button>
    </Stack>
  );
}
export default BackButton;