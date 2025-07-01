import { Button } from "@mui/material";

interface ButtonCaptureProp {
  startCapture: () => void;
  isCapturing: boolean;
  totalShots: number;
}

const ButtonCapture: React.FC<ButtonCaptureProp> = ({ startCapture, isCapturing, totalShots }) => {
  return (
    <Button
      onClick={startCapture}
      disabled={isCapturing}
      variant="contained"
      size="large"
      fullWidth
      sx={{
        mt: 2,
        py: 1.5,
        background: isCapturing
          ? undefined
          : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: isCapturing
          ? undefined
          : '0 3px 5px 2px rgba(33, 203, 243, .3)',
        '&:hover': {
          background: isCapturing
            ? undefined
            : 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
          boxShadow: isCapturing
            ? undefined
            : '0 4px 8px 3px rgba(33, 203, 243, .4)',
        }
      }}
    >
      {isCapturing ? 'Đang chụp...' : `Bắt đầu chụp ${totalShots} ảnh`}
    </Button>
  )
}

export default ButtonCapture;