class Vertex {
  constructor(value) {
    this.value = value;
    this.adjVertices = [];
  }

  addAdjVertex(...vertices) {
    vertices.forEach(vertex => {
      if (vertex) this.adjVertices.push(vertex);
    })
  }
}

class Graph {
  constructor() {
    this.vertices = {};
  }

  addVertex(value) {
    this.vertices[value] = new Vertex(value);
  }

  addEdge(source, destination) {
    this.vertices[source].adjVertices.push(this.vertices[destination]);
  }

  getAdj(vertex) {
    return this.vertices[vertex].adjVertices;
  }
}

class ChessBoard extends Graph {
  constructor(length = 8) {
    super();
    this.#initBoard(length);
  }

  #initBoard(length) {
    // Add verticies
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.addVertex(`${i}, ${j}`);
      }
    }

    // Add edges
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.vertices[`${i}, ${j}`].addAdjVertex(
          this.vertices[`${i + 2}, ${j + 1}`],
          this.vertices[`${i + 2}, ${j - 1}`],
          this.vertices[`${i - 2}, ${j + 1}`],
          this.vertices[`${i - 2}, ${j - 1}`],
          this.vertices[`${i + 1}, ${j + 2}`],
          this.vertices[`${i + 1}, ${j - 2}`],
          this.vertices[`${i - 1}, ${j + 2}`],
          this.vertices[`${i - 1}, ${j - 2}`]
        );
      }
    }
  }
}

const chessBoard = new ChessBoard();
console.log(chessBoard);
