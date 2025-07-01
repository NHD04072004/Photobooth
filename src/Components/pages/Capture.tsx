import CustomWebcam from "../ui/Webcam";

const Capture = () => {
  const width = window.innerHeight * 0.8;
  const height = window.innerHeight * 0.8;

  return (
    <>
      <div className="my-10 mx-7">
        <CustomWebcam width={width} height={height} totalShots={5} isCapture={true} />
      </div>
    </>
  )
}

export default Capture;