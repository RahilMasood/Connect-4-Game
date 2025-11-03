const ROW_COUNT = 6;
const COLUMN_COUNT = 7;
const WINDOW_LENGTH = 4;

const PLAYER_PIECE = 1;
const AI_PIECE = 2;
const EMPTY = 0;

export function createBoard(): number[][] {
  return Array(ROW_COUNT).fill(0).map(() => Array(COLUMN_COUNT).fill(0));
}

export function dropPiece(board: number[][], row: number, col: number, piece: number): void {
  board[row][col] = piece;
}

export function isValidLocation(board: number[][], col: number): boolean {
  return board[ROW_COUNT - 1][col] === 0;
}

export function getNextOpenRow(board: number[][], col: number): number {
  for (let r = 0; r < ROW_COUNT; r++) {
    if (board[r][col] === 0) {
      return r;
    }
  }
  return 0;
}

export function winningMove(board: number[][], piece: number): boolean {
  for (let c = 0; c < COLUMN_COUNT - 3; c++) {
    for (let r = 0; r < ROW_COUNT; r++) {
      if (
        board[r][c] === piece &&
        board[r][c + 1] === piece &&
        board[r][c + 2] === piece &&
        board[r][c + 3] === piece
      ) {
        return true;
      }
    }
  }

  for (let c = 0; c < COLUMN_COUNT; c++) {
    for (let r = 0; r < ROW_COUNT - 3; r++) {
      if (
        board[r][c] === piece &&
        board[r + 1][c] === piece &&
        board[r + 2][c] === piece &&
        board[r + 3][c] === piece
      ) {
        return true;
      }
    }
  }

  for (let c = 0; c < COLUMN_COUNT - 3; c++) {
    for (let r = 0; r < ROW_COUNT - 3; r++) {
      if (
        board[r][c] === piece &&
        board[r + 1][c + 1] === piece &&
        board[r + 2][c + 2] === piece &&
        board[r + 3][c + 3] === piece
      ) {
        return true;
      }
    }
  }

  for (let c = 0; c < COLUMN_COUNT - 3; c++) {
    for (let r = 3; r < ROW_COUNT; r++) {
      if (
        board[r][c] === piece &&
        board[r - 1][c + 1] === piece &&
        board[r - 2][c + 2] === piece &&
        board[r - 3][c + 3] === piece
      ) {
        return true;
      }
    }
  }

  return false;
}

function evaluateWindow(window: number[], piece: number): number {
  let score = 0;
  const oppPiece = piece === AI_PIECE ? PLAYER_PIECE : AI_PIECE;

  const pieceCount = window.filter(p => p === piece).length;
  const emptyCount = window.filter(p => p === EMPTY).length;
  const oppCount = window.filter(p => p === oppPiece).length;

  if (pieceCount === 4) {
    score += 100;
  } else if (pieceCount === 3 && emptyCount === 1) {
    score += 5;
  } else if (pieceCount === 2 && emptyCount === 2) {
    score += 2;
  }

  if (oppCount === 3 && emptyCount === 1) {
    score -= 4;
  }

  return score;
}

export function scorePosition(board: number[][], piece: number): number {
  let score = 0;

  const centerCol = Math.floor(COLUMN_COUNT / 2);
  const centerArray = board.map(row => row[centerCol]);
  const centerCount = centerArray.filter(p => p === piece).length;
  score += centerCount * 3;

  for (let r = 0; r < ROW_COUNT; r++) {
    const rowArray = board[r];
    for (let c = 0; c < COLUMN_COUNT - 3; c++) {
      const window = rowArray.slice(c, c + WINDOW_LENGTH);
      score += evaluateWindow(window, piece);
    }
  }

  for (let c = 0; c < COLUMN_COUNT; c++) {
    const colArray = board.map(row => row[c]);
    for (let r = 0; r < ROW_COUNT - 3; r++) {
      const window = colArray.slice(r, r + WINDOW_LENGTH);
      score += evaluateWindow(window, piece);
    }
  }

  for (let r = 0; r < ROW_COUNT - 3; r++) {
    for (let c = 0; c < COLUMN_COUNT - 3; c++) {
      const window = [
        board[r][c],
        board[r + 1][c + 1],
        board[r + 2][c + 2],
        board[r + 3][c + 3]
      ];
      score += evaluateWindow(window, piece);
    }
  }

  for (let r = 0; r < ROW_COUNT - 3; r++) {
    for (let c = 0; c < COLUMN_COUNT - 3; c++) {
      const window = [
        board[r + 3][c],
        board[r + 2][c + 1],
        board[r + 1][c + 2],
        board[r][c + 3]
      ];
      score += evaluateWindow(window, piece);
    }
  }

  return score;
}

export function getValidLocations(board: number[][]): number[] {
  const validLocs: number[] = [];
  for (let c = 0; c < COLUMN_COUNT; c++) {
    if (isValidLocation(board, c)) {
      validLocs.push(c);
    }
  }
  return validLocs;
}

function isTerminalNode(board: number[][]): boolean {
  return (
    winningMove(board, PLAYER_PIECE) ||
    winningMove(board, AI_PIECE) ||
    getValidLocations(board).length === 0
  );
}

export function minimax(
  board: number[][],
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean
): [number, number] {
  const validLocations = getValidLocations(board);
  const isTerminal = isTerminalNode(board);

  if (depth === 0 || isTerminal) {
    if (isTerminal) {
      if (winningMove(board, AI_PIECE)) {
        return [0, 1_000_000_000_000];
      } else if (winningMove(board, PLAYER_PIECE)) {
        return [0, -1_000_000_000_000];
      } else {
        return [0, 0];
      }
    } else {
      return [0, scorePosition(board, AI_PIECE)];
    }
  }

  if (maximizingPlayer) {
    let value = -Infinity;
    let column = validLocations[Math.floor(Math.random() * validLocations.length)];

    for (const col of validLocations) {
      const row = getNextOpenRow(board, col);
      const tempBoard = board.map(row => [...row]);
      dropPiece(tempBoard, row, col, AI_PIECE);
      const newScore = minimax(tempBoard, depth - 1, alpha, beta, false)[1];

      if (newScore > value) {
        value = newScore;
        column = col;
      }

      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        break;
      }
    }

    return [column, value];
  } else {
    let value = Infinity;
    let column = validLocations[Math.floor(Math.random() * validLocations.length)];

    for (const col of validLocations) {
      const row = getNextOpenRow(board, col);
      const tempBoard = board.map(row => [...row]);
      dropPiece(tempBoard, row, col, PLAYER_PIECE);
      const newScore = minimax(tempBoard, depth - 1, alpha, beta, true)[1];

      if (newScore < value) {
        value = newScore;
        column = col;
      }

      beta = Math.min(beta, value);
      if (alpha >= beta) {
        break;
      }
    }

    return [column, value];
  }
}
