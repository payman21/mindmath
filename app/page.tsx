'use client';

import { useState } from 'react';
import { Bangers } from 'next/font/google';
import GameSetup from '../components/GameSetup';
import GamePlay from '../components/GamePlay';
import GameOver from '../components/GameOver';

const bangers = Bangers({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [gameState, setGameState] = useState('setup');
  const [gameTime, setGameTime] = useState(120);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const startGame = (time: number) => {
    setGameTime(time);
    setGameState('play');
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
  };

  const endGame = () => {
    setGameState('over');
  };

  const restartGame = () => {
    setGameState('setup');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#011f34] to-[#00121e] text-white">
      <h1 className={`text-[4.5rem] font-bold mb-10 text-[#ffaa00] ${bangers.className}`}>Mind Math</h1>
      {gameState === 'setup' && <GameSetup onStart={startGame} />}
      {gameState === 'play' && (
        <GamePlay
          gameTime={gameTime}
          onGameOver={endGame}
          score={score}
          setScore={setScore}
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
          incorrectAnswers={incorrectAnswers}
          setIncorrectAnswers={setIncorrectAnswers}
          onRestart={restartGame} // Add this line
        />
      )}
      {gameState === 'over' && (
        <GameOver
          score={score}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          onRestart={restartGame}
        />
      )}
    </main>
  );
}
