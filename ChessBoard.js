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

  shortestKnightPath(from, to) {
    return this.#mapKnightPath(from, to).map((elem) =>
      // Convert the array of strings to an array of array of integers
      elem.vertex.value.split(",").map((val) => parseInt(val))
    );
  }

  #mapKnightPath(
    currPos = "0,0",
    destPos = "7,7",
    queue = [{ vertex: this.find(currPos), prev: this.find(currPos) }],
    visited = new Set()
  ) {
    visited.add(currPos);
    if (!queue.length) return;

    const readyElem = queue.shift();
    if (currPos === destPos)
      return [{ vertex: this.find(currPos), prev: readyElem.prev }];

    for (let i = 0; i < readyElem.vertex.adjVertices.length; i++) {
      queue.push({
        vertex: readyElem.vertex.adjVertices[i],
        prev: readyElem.vertex,
      });
    }

    const next = this.#mapKnightPath(
      readyElem.vertex.value,
      destPos,
      queue,
      visited
    );

    if (next[0].prev === readyElem.vertex) return [readyElem].concat(...next);
    return next;
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

module.exports = ChessBoard;