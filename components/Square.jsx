export const Square = ({ x, y, onSquareClick, children }) => {
  const isLightSquare = (x + y) % 2 === 0;
  return (
  <div className="square"
   style={{ backgroundColor: isLightSquare ? 'aliceblue' : 'rgba(75, 89, 195, 0.964)' }}
   onClick={onSquareClick}
  >
    {children} {/* Render the piece inside the square */}
  </div>
  );
};


