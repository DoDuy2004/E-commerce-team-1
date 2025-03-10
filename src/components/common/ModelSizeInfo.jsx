import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ModelSizeInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white px-4 py-2 rounded-md shadow-md flex items-center gap-2 text-sm font-medium"
      >
        Model is wearing sizes M and S.
        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md border p-4 text-sm">
          <p className="text-gray-400 font-semibold mb-2">Model size</p>
          <div className="grid grid-cols-2 gap-y-2 text-gray-700">
            <span>Height</span> <span className="text-right">174 cm / 70"</span>
            <span>Bust</span> <span className="text-right">77 cm / 30"</span>
            <span>Waist</span> <span className="text-right">60 cm / 24"</span>
            <span>Hips</span> <span className="text-right">90 cm / 35"</span>
            <span>Top / Bottom</span> <span className="text-right">M / S</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSizeInfo;
