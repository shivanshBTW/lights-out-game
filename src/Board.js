import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 3,
    ncols: 3
  };
  constructor(props) {
    super(props);
    // console.log(myGrid);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  createBoard() {
    let value; // by default
    let board = [...Array(this.props.nrows)].map(e => Array(this.props.ncols).fill(value));

    for (let i = 0; i < this.props.nrows; i++) {
      for (let j = 0; j < this.props.ncols; j++) {
        board[i][j] = Math.floor(Math.random() * 2) ? true : false;
        // board[i][j] = false;
      }
    }
    // console.log(board);
    return board;
  }

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x + 1);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y - 1, x);

    let hasWon = true;
    board.map(r => {
      return r.map(c => {
        console.log(c);
        if (c) {
          hasWon = false;
        }
        return 0;
      });
    });
    this.setState({ board, hasWon });
  }

  resetGame(e) {
    this.setState({
      hasWon: false,
      board: this.createBoard()
    });
  }

  /** Render game board or winning message. */

  render() {
    let keyR = -1;
    return (
      <div>
        {this.state.hasWon ? (
          <div>
            <p>
              <span className="neon">You </span>
              <span className="flux">win</span>
            </p>
          </div>
        ) : (
          <div>
            <p>
              <span className="neon">LIGHTS </span>
              <span className="flux">OUT</span>
            </p>
          </div>
        )}

        <table className="Board">
          <tbody>
            {this.state.board.map(r => {
              keyR++;
              let keyC = -1;
              return (
                <tr key={keyR}>
                  {r.map(c => {
                    keyC++;
                    return (
                      <Cell
                        flipCellsAroundMe={this.flipCellsAround}
                        isLit={c}
                        cellCoords={`${keyR}-${keyC}`}
                        key={`${keyR}-${keyC}`}
                        isWon={this.state.hasWon}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.hasWon ? (
          <div className="winMessage">
            Congratulations!!!You managed to turn every light off!!!😄
          </div>
        ) : (
          ''
        )}
        <button className="resetGame" onClick={this.resetGame}>
          Reset
        </button>
      </div>
    );
  }
}

export default Board;
