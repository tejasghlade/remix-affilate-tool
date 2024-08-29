import { useState } from 'react';


type InputSliderProps = {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
};

const InputSlider = ({
  value,
  setValue,
  min = 0,
  max = 100,
}: InputSliderProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    setTooltipPosition({ left: offsetX });
  };

  return (
    <div className="relative w-full">
      <input
        className="w-full  custom-slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      />
      {tooltipVisible && (
        <div
          className="absolute bg-gray-700 text-white text-xs rounded py-1 px-2"
          style={{ top: '-30px', left: `${tooltipPosition.left}px`, transform: 'translateX(-50%)' }}
        >
          {value}
        </div>
      )}
    </div>
  );
};



export default InputSlider;