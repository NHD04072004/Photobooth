import Webcam from 'react-webcam';

const CustomWebcam = ({
  width = 1200,
  height = 700,
  facingMode = 'user',
  className = 'w-full h-full object-cover rounded-lg shadow-md',
  ...props
}) => {
  const videoConstraints = {
    width,
    height,
    facingMode,
  };

  return (
    <Webcam
      audio={false}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
      className={`${className} transform scale-x-[-1]`} 
      {...props}
    />
  );
};

export default CustomWebcam;
