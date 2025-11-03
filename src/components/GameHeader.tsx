import { RefreshCw, User, Cpu } from 'lucide-react';

interface GameHeaderProps {
  currentTurn: number;
  isAiThinking: boolean;
  onReset: () => void;
}

export default function GameHeader({ currentTurn, isAiThinking, onReset }: GameHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6">Connect 4</h1>

      <div className="flex items-center justify-center gap-6 mb-6">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentTurn === 0 && !isAiThinking ? 'bg-red-500 text-white scale-110 shadow-lg' : 'bg-white text-gray-700'}`}>
          <User size={20} />
          <span className="font-semibold">You</span>
        </div>

        <div className="w-12 h-1 bg-gray-300 rounded" />

        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentTurn === 1 || isAiThinking ? 'bg-yellow-400 text-gray-900 scale-110 shadow-lg' : 'bg-white text-gray-700'}`}>
          <Cpu size={20} />
          <span className="font-semibold">AI</span>
        </div>
      </div>

      {isAiThinking && (
        <div className="text-blue-700 font-medium animate-pulse mb-4">
          AI is thinking...
        </div>
      )}

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-blue-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all mx-auto"
      >
        <RefreshCw size={20} />
        New Game
      </button>
    </div>
  );
}
