function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {/* Display X or O in the square. */}
      {props.value}
    </button>
  );
}

function Reset(props) {
  return (
    <button className="reset" onClick={props.onClick}>
      Reset
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetBoard();
  }

  resetBoard() {
    return {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }
  
  handleReset() {
    this.setState(this.resetBoard());
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    // If game over or square taken, then bail.
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status;
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      status = winner + " is the Winner!";
    } else {
      status = (this.state.xIsNext ? "X" : "O") + "'s Move";
    }

    return (
      <div className="game-table">
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <Reset
            onClick={() => this.handleReset()}
          />
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

/** Helpers */

function calculateWinner(squares) {
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
}