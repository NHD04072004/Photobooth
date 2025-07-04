import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DynamicFrame from "../ui/DynamicFrame";
import BackNextButton from "../ui/BackNextButton";
import type { FrameOption } from "../../interface";
import { postSelectedFrame } from "../../api/frame";

const FrameChildrenPage = () => {
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState<FrameOption>();
  const [frameOptions, setFrameOptions] = useState<FrameOption[]>([]);

  useEffect(() => {
    const frameFamily = localStorage.getItem("frameFamily");
    if (frameFamily) {
      setFrameOptions(JSON.parse(frameFamily).options);
    }
  }, []);

  const handleSelect = (frame: FrameOption) => {
    setSelectedFrame(frame);
  };

  const handleNext = async () => {
    if (!selectedFrame) {
      alert("Vui lòng chọn một khung ảnh!");
      return;
    }

    localStorage.setItem("optionFrame", JSON.stringify(selectedFrame));
    localStorage.setItem("frameOptionId", selectedFrame.id);
    const res = await postSelectedFrame();
    localStorage.setItem('selectedFrame', JSON.stringify(res));
    navigate(`/capture/${selectedFrame.id}`);
  };

  const handleBack = () => {
    navigate("/frame");
  };

  return (
    <div className="min-h-screen p-5 flex flex-col justify-between">
      <h1 className="text-6xl mb-8 ">Chọn Khung Ảnh</h1>

      <div className="flex justify-center mt-10 items-end gap-x-32">
        {frameOptions &&
          frameOptions.length > 0 &&
          frameOptions.map((frame) => (
            <div
              key={frame.id}
              className="flex flex-col items-center gap-6 cursor-pointer"
              onClick={() => handleSelect(frame)}
            >
              <DynamicFrame
                colsNumber={frame.cols}
                itemsLength={frame.cols * frame.rows}
                width={100}
                ratio={1.5}
                isSelected={selectedFrame && selectedFrame.id === frame.id}
              />
            </div>
          ))}
      </div>

      <div className="flex justify-between mt-10">
        <BackNextButton onBack={handleBack} onNext={handleNext} />
      </div>
    </div>
  );
};

export default FrameChildrenPage;
