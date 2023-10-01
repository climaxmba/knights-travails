const ChessBoard = require("./ChessBoard");

(function knightMoves(from = [3, 3], to = [0, 5]) {
  const chessBoard = new ChessBoard();
  console.log(chessBoard.shortestKnightPath(from.toString(), to.toString()));
})();
