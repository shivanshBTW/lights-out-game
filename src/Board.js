import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 4,
    ncols: 4
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
  }

  createBoard() {
    let value; // by default
    let board = [...Array(this.props.nrows)].map(e => Array(this.props.ncols).fill(value));

    for (let i = 0; i < this.props.nrows; i++) {
      for (let j = 0; j < this.props.ncols; j++) {
        board[i][j] = Math.floor(Math.random() * 2) ? true : false;
      }
    }
    console.log(board);
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

  /** Render game board or winning message. */

  render() {
    let keyR = -1;
    return (
      <div>
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
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <p>
          {this.state.hasWon ? `Congratulations!!! You managed to turn off every light :D` : ``}
        </p>
      </div>
    );
  }
}

export default Board;
