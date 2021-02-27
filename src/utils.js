export const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };
  
  export const Reset = (props) => {
    return (
      <button className="reset" onClick={props.onClick}>
        Reset
      </button>
    );
  };
  
  export const Square = (props) => {
    return (
      <button className="square" onClick={props.onClick}>
        {/* Display X or O in the square. */}
        {props.value}
      </button>
    );
  };
  