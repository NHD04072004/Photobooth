interface ImagesGalleryProp {
  images: any;
  totalShots: number;
  width: number;
  height: number;
}

const ImagesGallery: React.FC<ImagesGalleryProp> = ({ images, totalShots, width, height }) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-700">
          Ảnh đã chụp ({images.length}/{totalShots})
        </h3>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          {images.map((img: Base64URLString, index: number) => (
            <div
              key={index}
              className="relative group cursor-pointer"
            >
              <img
                src={img}
                alt={`shot-${index + 1}`}
                className="h-[200px] object-cover rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 hover:border-blue-300"
                style={{ aspectRatio: width / height }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ImagesGallery;