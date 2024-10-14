const handleMove = (rowIndex, colIndex) => {
  // Case 1: If a piece is selected and the user clicks the same square -> Deselect it
  if (selectedPiece && rowIndex === selectedPiece.position[0] && colIndex === selectedPiece.position[1]) {
    setSelectedPiece(null);
    setValidMoves(null);  // Clear any valid moves
    return; // Exit the function early
  }

  // Case 2: If a piece is selected and the user clicks a valid move -> Move the piece
  if (selectedPiece) {
    const startRow = selectedPiece.position[0];
    const startCol = selectedPiece.position[1];

    const newBoard = [...board];

    // Check if the clicked square is a valid move
    if (validMoves.some(([moveRow, moveCol]) => moveRow === rowIndex && moveCol === colIndex)) {
      // Move the selected piece to the new position
      newBoard[rowIndex][colIndex] = { piece: selectedPiece.piece, type: selectedPiece.type };
      newBoard[startRow][startCol] = null;

      // Clear the '*' highlights from the board
      validMoves.forEach(([moveRow, moveCol]) => {
        if (newBoard[moveRow][moveCol] && newBoard[moveRow][moveCol].piece === "*") {
          newBoard[moveRow][moveCol] = null; // Clear highlight
        }
      });

      // Reset state after move
      setValidMoves(null);
      setBoard(newBoard);  
      setSelectedPiece(null);
      return; // Exit the function early after a move
    }
  }

  // Case 3: If no piece is selected or selecting another piece -> Select the new piece
  if (board[rowIndex][colIndex]) {
    const initialPosition = board[rowIndex][colIndex];
    
    // Set the selected piece
    setSelectedPiece({
      piece: initialPosition.piece,
      type: initialPosition.type,
      position: [rowIndex, colIndex],
    });

    // If it's a rook, calculate valid moves
    if (initialPosition.piece === 'Rook') {
      Rook(rowIndex, colIndex);  // This function will calculate the valid moves and highlight them
    }
    
    console.log(`Selected piece: ${initialPosition.piece} at ${rowIndex}, ${colIndex}`);
  }
};
