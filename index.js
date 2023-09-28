class Graph {
  constructor() {
    this.vertices = {};
  }

  addVertex(vertex) {
    this.vertices[vertex] = vertex;
  }

  addEdge(source, destination) {
    this.vertices[source].push(destination);
  }

  getAdj(vertex) {
    return this.vertices[vertex];
  }
}

const chessBoard = new Graph();
