'use client';

import { useState } from 'react';

interface GameSetupProps {
  onStart: (time: number) => void;
}

export default function GameSetup({ onStart }: GameSetupProps) {
  const [time, setTime] = useState(120);

  return (
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-2xl mb-2 text-white">Set Game Time</h2> {/* Changed mb-4 to mb-2 */}
      <div className="flex justify-center"> {/* Added flex container */}
        <input
          type="range"
          min="30"
          max="120"
          step="30"
          value={time}
          onChange={(e) => setTime(parseInt(e.target.value))}
          className="w-4/5 mb-2 appearance-none bg-gradient-to-r from-[#00eaff] to-[#33ddff] h-2 rounded-full" // Changed w-full to w-4/5
          style={{
            WebkitAppearance: 'none',
            outline: 'none',
          }}
        />
      </div>
      <style jsx>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%; 
          background: #ffaa00;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffaa00;
          cursor: pointer;
        }
      `}</style>
      <p className="mb-8 text-[#ffbb33]">{time} seconds</p>
      <div className="mb-6 text-sm text-white">
        <h3 className="font-bold mb-2">Scoring Rules:</h3>
        <ul className="list-disc list-inside">
          <li>Correct answer: +1 point</li>
          <li>Incorrect answer: -2 points</li>
          <li className="flex items-center justify-center">
            Pass
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1 inline" fill="none" viewBox="0 0 24 24" stroke="#ff4b4b" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            : -1 point
          </li>
        </ul>
        <p className="mt-2 text-[#00f0ff]">Answer as many questions as you can,</p>
        <p className="mt-0 text-[#00f0ff]"> before time runs out!</p>
      </div>
      <button 
        onClick={() => onStart(time)} 
        className="p-3 rounded-full bg-gradient-to-r from-[#00eaff] to-[#33ddff] hover:from-[#33ddff] hover:to-[#00eaff] transition-all duration-300"
        aria-label="Start Game"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#000000" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
}