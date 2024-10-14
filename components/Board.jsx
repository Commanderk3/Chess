import { useState } from 'react';
import { Square } from './Square';

const initialBoardSetup = [
  [
    { piece: 'Rook', type: 'Black' },
    { piece: 'Knight', type: 'Black' },
    { piece: 'Bishop', type: 'Black' },
    { piece: 'Queen', type: 'Black' },
    { piece: 'King', type: 'Black' },
    { piece: 'Bishop', type: 'Black' },
    { piece: 'Knight', type: 'Black' },
    { piece: 'Rook', type: 'Black' }
  ],
  Array(8).fill({ piece: 'Pawn', type: 'Black', first: true }), // White pawns
  Array(8).fill(null), 
  Array(8).fill(null), 
  Array(8).fill(null), 
  Array(8).fill(null), 
  Array(8).fill({ piece: 'Pawn', type: 'White', first: true }), // Black pawns
  [
    { piece: 'Rook', type: 'White' },
    { piece: 'Knight', type: 'White' },
    { piece: 'Bishop', type: 'White' },
    { piece: 'Queen', type: 'White' },
    { piece: 'King', type: 'White' },
    { piece: 'Bishop', type: 'White' },
    { piece: 'Knight', type: 'White' },
    { piece: 'Rook', type: 'White' }
  ]
];


export const Board = () => {
  const [board, setBoard] = useState(initialBoardSetup); //2-D MATRIX 
  const [selectedPiece, setSelectedPiece] = useState(null); //selectedPiece = {piece:"" position:[]}
  const [validMoves, setValidMoves] = useState(null);




  //When we click on a Square either it will have a piece or it won't. But in both cases handleClick is used
  const handleMove = (rowIndex, colIndex) => {
    if (selectedPiece) {
      const startRow = selectedPiece.position[0];
      const startCol = selectedPiece.position[1];
  
      const newBoard = [...board];
  
      // Check if validMoves exists and if the move is valid
      if (validMoves && validMoves.some(([moveRow, moveCol]) => moveRow === rowIndex && moveCol === colIndex)) {
        // Move the selected piece to the new position
        newBoard[rowIndex][colIndex] = { piece: selectedPiece.piece, type: selectedPiece.type };
        newBoard[startRow][startCol] = null;
  
        // Clear the '*' highlights from the board
        validMoves.forEach(([moveRow, moveCol]) => {
          if (newBoard[moveRow][moveCol] && newBoard[moveRow][moveCol].piece === "*") {
            newBoard[moveRow][moveCol] = null;
          }
        });
  
        setValidMoves(null);
        setBoard(newBoard);  
        setSelectedPiece(null);
      }
    } else if (board[rowIndex][colIndex]) {
      const initialPosition = board[rowIndex][colIndex];
      setSelectedPiece({
        piece: initialPosition.piece,
        type: initialPosition.type,
        position: [rowIndex, colIndex],
        first: initialPosition.first ?? false,
      });
  
      if (initialPosition.piece === 'Pawn' && initialPosition.type === 'White') {
        WhitePawn(rowIndex, colIndex);
      }
      else if (initialPosition.piece === 'Pawn' && initialPosition.type === 'Black') {
        BlackPawn(rowIndex, colIndex);
      }
      else if (initialPosition.piece === 'Rook') {
        Rook(rowIndex, colIndex);
      }
      else if (initialPosition.piece === 'Knight') {
        Knight(rowIndex, colIndex);
      }
      else if (initialPosition.piece === 'Bishop') {
        Bishop(rowIndex, colIndex);
      }
      
  
      console.log(`Selected piece: ${initialPosition.piece} at ${rowIndex}, ${colIndex}`);
    }
  };
  
  const WhitePawn = (x, y) => {
    const newBoard = [...board];
    const moves = [];

    newBoard[x - 1][y] = { piece: "*", type: null };
    moves.push([x - 1, y]);
    if (newBoard[x][y].first) {
      newBoard[x - 2][y] = { piece: "*", type: null };
      moves.push([x - 2, y]);
    } 
    // TODO: Add logic for capturing diagonally (if needed)
    setValidMoves(moves);
    setBoard(newBoard);
  };

  const BlackPawn = (x, y) => {
    const newBoard = [...board];
    const moves = [];

    newBoard[x + 1][y] = { piece: "*", type: null};
    moves.push([x + 1, y]);
    if (newBoard[x][y].first) {
      newBoard[x + 2][y] = { piece: "*", type: null };
      moves.push([x + 2, y]);
    }  
    // TODO: Add logic for capturing diagonally (if needed)
    setValidMoves(moves);
    setBoard(newBoard);
  };
  
  const Rook = (x, y) => {
    const newBoard = [...board];
    const moves = [];
  
    let i = x + 1;
    while (i < 8 && !board[i][y]) {
      newBoard[i][y] = { piece: "*", type: null }; 
      moves.push([i, y]);
      i++;
    }
    if (i < 8 && newBoard[i][y].type !== newBoard[x][y].type) {
      moves.push([i, y]);
      console.log("Captured");
    }
  
    i = x - 1;
    while (i >= 0 && !board[i][y]) {
      newBoard[i][y] = { piece: "*", type: null }; 
      moves.push([i, y]);
      i--;
    }
    if (i >= 0 && newBoard[i][y].type !== newBoard[x][y].type) {
      moves.push([i, y]);
      console.log("Captured");
    }
  

    let j = y + 1;
    while (j < 8 && !board[x][j]) {
      newBoard[x][j] = { piece: "*", type: null }; 
      moves.push([x, j]);
      j++;
    }
    if (j < 8 && newBoard[x][j].type !== newBoard[x][y].type) {
      moves.push([x, j]);
      console.log("Captured");
    }
  
    j = y - 1;
    while (j >= 0 && !board[x][j]) {
      newBoard[x][j] = { piece: "*", type: null }; 
      moves.push([x, j]);
      j--;
    }
    if (j >= 0 && newBoard[x][j].type !== newBoard[x][y].type) {
      moves.push([x, j]);
      console.log("Captured");
    }
  
    setValidMoves(moves);
    setBoard(newBoard);
  };

  const Knight = (x, y) => {
    const newBoard = [...board];
    const moves = [];
    const tiles = [[x+1, y+2],[x+2, y+1],[x-1, y+2],[x-2, y+1],[x+1, y-2],[x+2, y-1],[x-1, y-2],[x-2, y-1]];
    tiles.forEach(([row, col]) => {
      if (row < 8 && row >= 0 && col < 8 && col >= 0) {
        if (!newBoard[row][col]) {
          moves.push([row, col]);
          newBoard[row][col] = { piece: "*", type: null };
        } else if (newBoard[row][col].type !== newBoard[x][y].type) {
          moves.push([row, col]);
        }
      }
    });
    setValidMoves(moves);
    setBoard(newBoard);   
  };

  const Bishop = (x, y) => {
    const newBoard = [...board];
    const moves = [];

    let i = x + 1;
    let j = y + 1;
    while (i < 8 && j < 8 && !board[i][j]) {
      newBoard[i][j] = { piece: "*", type: null }; 
      moves.push([i, j]);
      i++; j++;
    }

    i = x + 1;
    j = y - 1;
    while (i < 8 && j >= 0 && !board[i][j]) {
      newBoard[i][j] = { piece: "*", type: null }; 
      moves.push([i, j]);
      i++; j--;
    }

    i = x - 1;
    j = y - 1;
    while (i >= 0 && j >= 0 && !board[i][j]) {
      newBoard[i][j] = { piece: "*", type: null }; 
      moves.push([i, j]);
      i--; j--;
    }

    i = x - 1;
    j = y + 1;
    while (i >= 0 && j < 8 && !board[i][j]) {
      newBoard[i][j] = { piece: "*", type: null }; 
      moves.push([i, j]);
      i--; j++;
    }

    setValidMoves(moves);
    setBoard(newBoard);
  }
  

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            x={rowIndex}
            y={colIndex}
            onSquareClick={() => handleMove(rowIndex, colIndex)}
          >
            {square ? (square.piece ? square.piece : null) : null} 
            {/*REMEMBER return is called whenever board array changes. JS cant render null data so conditions are used to avoid error*/}
          </Square>
        ))
      )}
    </div>
  );
  
};


  