'use client';

interface GameOverProps {
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  onRestart: () => void;
}

export default function GameOver({
  score,
  correctAnswers,
  incorrectAnswers,
  onRestart,
}: GameOverProps) {
  return (
    <div className="text-center p-8" style={{ fontSize: '0.8em' }}>
      <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Game Over</h2>
      <div className="mb-8">
        <p className="text-2xl font-semibold mb-2 text-[#00f0ff]">Final Score</p>
        <p className="text-5xl font-bold mb-3 text-[#ffbb33]">{score}</p>
      </div>
      <div className="text-lg mb-5">
        <p className="mb-1 text-[#00f0ff]">Correct Answers: <span className="font-bold text-[#00f0ff]">{correctAnswers}</span></p>
        <p className="text-[#00f0ff]">Incorrect Answers: <span className="font-bold text-[#00f0ff]">{incorrectAnswers}</span></p>
      </div>
      <button 
        onClick={onRestart} 
        className="p-3 rounded-full bg-gradient-to-r from-[#00eaff] to-[#33ddff] hover:from-[#33ddff] hover:to-[#00eaff] transition-all duration-300"
        aria-label="Play Again"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#000000" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
}