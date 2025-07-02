import type { FrameOption } from "../../interface";
import DynamicFrame from "./DynamicFrame";

const ImagePreviewPopup = ({ images, onClose, frame }: {frame: FrameOption, images: string[]; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <DynamicFrame images={images} colsNumber={frame.cols} ratio={frame.ratio} itemsLength={frame.rows * frame.cols} width={100} />
      </div>
    </div>
  );
}

export default ImagePreviewPopup;