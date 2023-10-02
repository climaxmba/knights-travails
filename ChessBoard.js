class Square {
  constructor(coord) {
    this.coord = coord;
    this.adjSquares = [];
  }

  addAdjSquares(...squares) {
    squares.forEach((square) => {
      if (square) this.adjSquares.push(square);
    });
  }
}

class ChessBoard {
  constructor(length = 8) {
    this.squares = {};
    this.#initBoard(length);
  }

  addSquare(coord) {
    this.squares[coord] = new Square(coord);
  }

  getSquare(coord = [0, 0]) {
    return this.squares[coord.toString()];
  }

  shortestKnightPath(from, to) {
    return this.#mapKnightPath(from, to).map((elem) =>
      // Convert the array of strings to an array of array of integers
      elem.square.coord.split(",").map((val) => parseInt(val))
    );
  }

  #mapKnightPath(
    searchPos = "0,0",
    destPos = "7,7",
    queue = [{ square: this.getSquare(searchPos), prev: this.getSquare(searchPos) }],
    visited = new Set()
  ) {
    visited.add(searchPos);
    if (!queue.length) return;

    // Get the next square from the queue
    const readyElem = queue.shift();
    if (readyElem.square.coord === destPos)
      return [{ square: readyElem.square, prev: readyElem.prev }];

    // Enqueue the adjacent visitable squares
    for (let i = 0; i < readyElem.square.adjSquares.length; i++) {
      if (!visited.has(readyElem.square.adjSquares[i].coord))
        queue.push({
          square: readyElem.square.adjSquares[i],
          prev: readyElem.square,
        });
    }

    const next = this.#mapKnightPath(
      readyElem.square.coord,
      destPos,
      queue,
      visited
    );

    // Concatenate the output, if the next square was visited from this square
    if (next[0].prev === readyElem.square) return [readyElem].concat(...next);
    return next;
  }

  #initBoard(length) {
    // Add verticies
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.addSquare(`${i},${j}`);
      }
    }

    // Add edges
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.squares[`${i},${j}`].addAdjSquares(
          this.squares[`${i + 2},${j + 1}`],
          this.squares[`${i + 2},${j - 1}`],
          this.squares[`${i - 2},${j + 1}`],
          this.squares[`${i - 2},${j - 1}`],
          this.squares[`${i + 1},${j + 2}`],
          this.squares[`${i + 1},${j - 2}`],
          this.squares[`${i - 1},${j + 2}`],
          this.squares[`${i - 1},${j - 2}`]
        );
      }
    }
  }
}

module.exports = ChessBoard;