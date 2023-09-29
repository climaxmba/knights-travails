class Vertex {
  constructor(value) {
    this.value = value;
    this.adjVertices = [];
  }

  addAdjVertex(...vertices) {
    vertices.forEach((vertex) => {
      if (vertex) this.adjVertices.push(vertex);
    });
  }
}

class ChessBoard {
  constructor(length = 8) {
    this.vertices = {};
    this.#initBoard(length);
  }

  addVertex(value) {
    this.vertices[value] = new Vertex(value);
  }

  find(coord = [0, 0]) {
    return this.vertices[coord.toString()];
  }

  shortestKnightPath(currPos = "0,0", destPos = "7,7", queue = [], visited = new Set()) {
    if (!queue.length || currPos === destPos) return visited;

    visited.add(currPos);
    const readyVertex = queue.shift();

    queue.push(...readyVertex.adjVertices);
    return this.shortestKnightPath(currPos, destPos, queue, visited);
  }

  #initBoard(length) {
    // Add verticies
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.addVertex(`${i},${j}`);
      }
    }

    // Add edges
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.vertices[`${i},${j}`].addAdjVertex(
          this.vertices[`${i + 2},${j + 1}`],
          this.vertices[`${i + 2},${j - 1}`],
          this.vertices[`${i - 2},${j + 1}`],
          this.vertices[`${i - 2},${j - 1}`],
          this.vertices[`${i + 1},${j + 2}`],
          this.vertices[`${i + 1},${j - 2}`],
          this.vertices[`${i - 1},${j + 2}`],
          this.vertices[`${i - 1},${j - 2}`]
        );
      }
    }
  }
}

(function knightMoves(from = [0, 0], to = [3, 3]) {
  const chessBoard = new ChessBoard();
  console.log(chessBoard.shortestKnightPath(from.toString(), to.toString()));
})();
