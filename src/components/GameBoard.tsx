import { Circle } from 'lucide-react';

interface GameBoardProps {
  board: number[][];
  onColumnClick: (col: number) => void;
  disabled: boolean;
}

export default function GameBoard({ board, onColumnClick, disabled }: GameBoardProps) {
  const renderCell = (value: number, rowIdx: number, colIdx: number) => {
    let cellColor = 'bg-white';

    if (value === 1) {
      cellColor = 'bg-red-500';
    } else if (value === 2) {
      cellColor = 'bg-yellow-400';
    }

    return (
      <div
        key={`${rowIdx}-${colIdx}`}
        className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
      >
        <div className={`absolute inset-2 rounded-full ${cellColor} shadow-inner transition-all duration-300 ${value !== 0 ? 'scale-100' : 'scale-95'}`} />
      </div>
    );
  };

  return (
    <div className="bg-blue-600 rounded-2xl shadow-2xl p-4 sm:p-6">
      <div className="grid grid-cols-7 gap-2">
        {board.slice().reverse().map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const actualRowIdx = board.length - 1 - rowIdx;
            return (
              <button
                key={`${actualRowIdx}-${colIdx}`}
                onClick={() => onColumnClick(colIdx)}
                disabled={disabled}
                className={`relative ${!disabled ? 'hover:bg-blue-500 cursor-pointer' : 'cursor-not-allowed'} rounded-lg transition-colors duration-200`}
              >
                {renderCell(cell, actualRowIdx, colIdx)}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
