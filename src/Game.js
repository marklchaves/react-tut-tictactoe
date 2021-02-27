import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import Board from "./Board";
import { calculateWinner, Reset } from "./utils";

export default class Game extends React.Component {
  state = {
    history: [this.resetBoard()],
    xIsNext: true,
    stepNumber: 0
  };

  resetBoard() {
    return {
      squares: Array(9).fill(null)
    };
  }

  handleReset() {
    this.setState({
      history: [this.resetBoard()],
      xIsNext: true,
      stepNumber: 0
    });
  }

  handleClick(i) {
    //const history = this.state.history;
    // Move back in history. New moves will erase
    // old history's future moves.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // If game over or square taken, then bail.
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>{" "}
        </li>
      );
    });

    let status;
    if (winner) {
      status = winner + " is the Winner!";
    } else {
      status = (this.state.xIsNext ? "X" : "O") + "'s Move";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <Reset onClick={() => this.handleReset()} />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
