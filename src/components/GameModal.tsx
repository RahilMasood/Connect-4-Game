import { Trophy, Users } from 'lucide-react';

interface GameModalProps {
  winner: 'player' | 'ai' | 'draw' | null;
  isOpen: boolean;
  onPlayAgain: () => void;
}

export default function GameModal({ winner, isOpen, onPlayAgain }: GameModalProps) {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (winner) {
      case 'player':
        return {
          title: 'You Win!',
          icon: <Trophy className="w-16 h-16 text-red-500" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
        };
      case 'ai':
        return {
          title: 'AI Wins!',
          icon: <Trophy className="w-16 h-16 text-yellow-500" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
        };
      case 'draw':
        return {
          title: "It's a Draw!",
          icon: <Users className="w-16 h-16 text-blue-500" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-500',
        };
      default:
        return {
          title: 'Game Over',
          icon: null,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500',
        };
    }
  };

  const content = getModalContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${content.bgColor} rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 ${content.borderColor} transform animate-bounce-in`}>
        <div className="flex flex-col items-center gap-4">
          {content.icon}
          <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
          <button
            onClick={onPlayAgain}
            className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
