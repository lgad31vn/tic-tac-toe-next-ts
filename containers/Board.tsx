import { useState, useEffect } from 'react';
import Square from '../components/Square';

type Player = 'X' | 'O' | 'BOTH' | null;

// calculateWinner take squares as an array of type Player, return Player
const calculateWinner = (squares: Player[]): Player => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // loop through the lines
  for (let i = 0; i < lines.length; i++) {
    // destrcuture a b c from lines sub array
    const [a, b, c] = lines[i];

    // squares[a] = squares[0], squares[b] = squares[1], squares[c] = squares[2]
    // squares[a] can be 'X' || 'Y'
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Board = () => {
  // 9 squares in tic tac toe
  const [squares, setSquares] = useState(Array(9).fill(null));

  // use random to determine the currentPlayer, 1 for X and 0 for O
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
  );

  const [winner, setWinner] = useState<Player>(null);

  // setSquareValue is associated with onClick for Square component
  // user click a square, it would fire off this function
  const setSquareValue = (index: number) => {
    //index = the index of the array a user click
    const newData = squares.map((val, i) => {
      // loop through the squares array, if i == index return currentPlayer
      if (i === index) {
        return currentPlayer;
      }
      // if i!== index, return it's current value
      return val;
    });

    setSquares(newData);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  };

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter((square) => !square).length) {
      setWinner('BOTH');
    }
  });

  return (
    <div className='container' data-tilt>
      <div className='content'>
        <h1>Tic Tac Toe</h1>
        {!winner && <p>Hey {currentPlayer}, it's your turn</p>}
        {winner && winner === 'BOTH' && <p> You're both tie!</p>}
        {winner && winner !== 'BOTH' && <p>Congratulations!! {winner} wins!</p>}

        <div className='grid'>
          {Array(9)
            .fill(null)
            .map((_, i) => {
              return (
                <Square
                  winner={winner}
                  key={i}
                  onClick={() => setSquareValue(i)}
                  value={squares[i]}
                />
              );
            })}
        </div>
        <div className='button-wrap'>
          <button className='reset' onClick={reset}>
            {' '}
            Play Again!{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board;
