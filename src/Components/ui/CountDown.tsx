interface CountDownProp {
  countdown: number;
}

const CountDown: React.FC<CountDownProp> = ({ countdown }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <span className="text-6xl font-bold text-[#FFFBEA]">
        {countdown}
      </span>
    </div>
  )
}

export default CountDown;