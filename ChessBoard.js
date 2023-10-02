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

  getVertex(coord = [0, 0]) {
    return this.vertices[coord.toString()];
  }

  shortestKnightPath(from, to) {
    return this.#mapKnightPath(from, to).map((elem) =>
      // Convert the array of strings to an array of array of integers
      elem.vertex.value.split(",").map((val) => parseInt(val))
    );
  }

  #mapKnightPath(
    searchPos = "0,0",
    destPos = "7,7",
    queue = [{ vertex: this.getVertex(searchPos), prev: this.getVertex(searchPos) }],
    visited = new Set()
  ) {
    visited.add(searchPos);
    if (!queue.length) return;

    // Get the next square from the queue
    const readyElem = queue.shift();
    if (readyElem.vertex.value === destPos)
      return [{ vertex: readyElem.vertex, prev: readyElem.prev }];

    // Enqueue the adjacent visitable squares
    for (let i = 0; i < readyElem.vertex.adjVertices.length; i++) {
      if (!visited.has(readyElem.vertex.adjVertices[i].value))
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

    // Concatenate the output, if the next square was visited from this square
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