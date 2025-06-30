interface DynamicFrameProp {
  colsNumber: number;
  itemsLength: number;
  ratio: string;
  width: number;
}

const DynamicFrame: React.FC<DynamicFrameProp> = ({ colsNumber, itemsLength, width, ratio }) => {
  return (
    <div className={`relative bg-black grid p-[5px] gap-[5px] h-fit w-fit`} style={{ gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))` }}>
      {Array.from({ length: itemsLength }).map((_, i) => (
        <div key={i} className="col-span-1 bg-white" style={{ width: width, aspectRatio: ratio }}></div>
      ))}

      <div className={`w-full`} style={{ gridColumn: `span ${colsNumber} / span ${colsNumber}` }}>
        <div className="bg-white aspect-square w-4 ml-auto"> </div>
      </div>
    </div>
  )
}

export default DynamicFrame;