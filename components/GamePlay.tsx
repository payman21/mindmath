'use client';

import { useState, useEffect } from 'react';

interface GamePlayProps {
  gameTime: number;
  onGameOver: () => void;
  score: number;
  setScore: (score: number) => void;
  correctAnswers: number;
  setCorrectAnswers: (count: number) => void;
  incorrectAnswers: number;
  setIncorrectAnswers: (count: number) => void;
  onRestart: () => void;
}

export default function GamePlay({
  gameTime,
  onGameOver,
  score,
  setScore,
  correctAnswers,
  setCorrectAnswers,
  incorrectAnswers,
  setIncorrectAnswers,
  onRestart,
}: GamePlayProps) {
  const [timeLeft, setTimeLeft] = useState(gameTime);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onGameOver]);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a, b, result;

    const difficulty = Math.random() < 0.5 ? 'easy' : 'hard';

    do {
      if (difficulty === 'easy') {
        a = Math.floor(Math.random() * 19) + 2; // 2 to 20
        b = Math.floor(Math.random() * 19) + 2; // 2 to 20
      } else {
        a = Math.floor(Math.random() * 90) + 10; // 10 to 99
        b = Math.floor(Math.random() * 90) + 10; // 10 to 99
      }

      switch (operation) {
        case '+':
          result = a + b;
          break;
        case '-':
          [a, b] = [Math.max(a, b), Math.min(a, b)];
          result = a - b;
          break;
        case '*':
          if (difficulty === 'hard') {
            a = Math.floor(Math.random() * 13) + 2; // 2 to 14
            b = Math.floor(Math.random() * 13) + 2; // 2 to 14
          }
          result = a * b;
          break;
        case '/':
          if (difficulty === 'easy') {
            b = Math.floor(Math.random() * 9) + 2; // 2 to 10
            result = Math.floor(Math.random() * 10) + 1; // 1 to 10
            a = b * result;
          } else {
            b = Math.floor(Math.random() * 18) + 2; // 2 to 19
            result = Math.floor(Math.random() * 10) + 1; // 1 to 10
            a = b * result;
          }
          break;
      }
    } while (
      (operation === '/' && (!Number.isInteger(result) || b === 1)) ||
      (operation === '-' && a === b) ||
      a === 1 || b === 1 || result === 1
    );

    setQuestion(`${a} ${operation} ${b} = ?`);
    setAnswer(result.toString());
    setUserAnswer('');
  };

  const handleSubmit = () => {
    if (userAnswer === answer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setScore(score - 2);
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    generateQuestion();
  };

  const handlePass = () => {
    setScore(score - 1);
    generateQuestion();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-semibold mb-4 text-[#00f0ff]">Time left: <span className="text-[#ffbb33]">{timeLeft}</span> seconds</p>
      <p className="text-2xl font-semibold mb-4 text-[#00f0ff]">Score: <span className="text-[#ffbb33]">{score}</span></p>
      <p className="mb-6 text-white">s
        Correct: <span className="text-[#00f0ff] font-bold">{correctAnswers}</span> | 
        Incorrect: <span className="text-[#00f0ff] font-bold">{incorrectAnswers}</span>
      </p>
      <h2 className="text-2xl mb-4 text-white">{question}</h2>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input input-centered mb-4 w-24 text-xl text-blue-900"
        autoFocus
      />
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleSubmit} 
            className="p-3 rounded-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] hover:from-[#22c55e] hover:to-[#4ade80] transition-all duration-300"
            aria-label="Submit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#000000" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button 
            onClick={handlePass} 
            className="p-3 rounded-full bg-gradient-to-r from-[#ff4b4b] to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-[#ff4b4b] transition-all duration-300"
            aria-label="Pass"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#000000" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button 
          onClick={onRestart} 
          className="p-2 rounded-full bg-gradient-to-r from-[#00eaff] to-[#33ddff] hover:from-[#33ddff] hover:to-[#00eaff] transition-all duration-300"
          aria-label="Restart Game"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#000000" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}