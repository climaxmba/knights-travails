const ChessBoard = require("./ChessBoard");

function knightMoves(from = [3, 3], to = [0, 5]) {
  const path = new ChessBoard().shortestKnightPath(
    from.toString(),
    to.toString()
  );
  
  console.log(
    `You made it in ${
      path.length === 1 ? path.length + " move" : path.length + " moves"
    }!  Here's your path:`
  );
  path.forEach((coord) => console.log(coord));
}

// Tests
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
