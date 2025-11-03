import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameHeader from './components/GameHeader';
import GameModal from './components/GameModal';
import { minimax, createBoard, dropPiece, isValidLocation, getNextOpenRow, winningMove, getValidLocations } from './game/logic';

const PLAYER = 0;
const AI = 1;
const PLAYER_PIECE = 1;
const AI_PIECE = 2;

function App() {
  const [board, setBoard] = useState(createBoard());
  const [currentTurn, setCurrentTurn] = useState(PLAYER);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'ai' | 'draw' | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentTurn(Math.random() < 0.5 ? PLAYER : AI);
    setGameOver(false);
    setWinner(null);
    setIsAiThinking(false);
  };

  const handleColumnClick = (col: number) => {
    if (gameOver || currentTurn !== PLAYER || isAiThinking) return;

    if (isValidLocation(board, col)) {
      const row = getNextOpenRow(board, col);
      const newBoard = board.map(row => [...row]);
      dropPiece(newBoard, row, col, PLAYER_PIECE);
      setBoard(newBoard);

      if (winningMove(newBoard, PLAYER_PIECE)) {
        setGameOver(true);
        setWinner('player');
        return;
      }

      if (getValidLocations(newBoard).length === 0) {
        setGameOver(true);
        setWinner('draw');
        return;
      }

      setCurrentTurn(AI);
    }
  };

  useEffect(() => {
    if (currentTurn === AI && !gameOver) {
      setIsAiThinking(true);

      setTimeout(() => {
        const [col] = minimax(board, 4, -Infinity, Infinity, true);

        if (isValidLocation(board, col)) {
          const row = getNextOpenRow(board, col);
          const newBoard = board.map(row => [...row]);
          dropPiece(newBoard, row, col, AI_PIECE);
          setBoard(newBoard);

          if (winningMove(newBoard, AI_PIECE)) {
            setGameOver(true);
            setWinner('ai');
            setIsAiThinking(false);
            return;
          }

          if (getValidLocations(newBoard).length === 0) {
            setGameOver(true);
            setWinner('draw');
            setIsAiThinking(false);
            return;
          }

          setCurrentTurn(PLAYER);
        }
        setIsAiThinking(false);
      }, 600);
    }
  }, [currentTurn, board, gameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <GameHeader
        currentTurn={currentTurn}
        isAiThinking={isAiThinking}
        onReset={resetGame}
      />
      <GameBoard
        board={board}
        onColumnClick={handleColumnClick}
        disabled={currentTurn !== PLAYER || isAiThinking || gameOver}
      />
      <GameModal
        winner={winner}
        isOpen={gameOver}
        onPlayAgain={resetGame}
      />
    </div>
  );
}

export default App;
