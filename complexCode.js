// Filename: complexCode.js
// Content: Implementation of a complex data structure and algorithms for manipulating the data

/*
  A complex data structure representing a graph with nodes and edges. 
  Each node has a unique identifier and can be connected to other nodes via directed edges.
  The graph supports operations like adding nodes, adding edges, removing nodes, removing edges, 
  finding shortest path, and finding all connected nodes.
*/

class Graph {
  constructor() {
    this.nodes = new Map(); // Map to hold nodes
    this.edges = new Map(); // Map to hold edges
  }

  addNode(nodeId, value) {
    if (!this.nodes.has(nodeId)) {
      this.nodes.set(nodeId, { value, edges: new Map() });
    }
  }

  removeNode(nodeId) {
    if (this.nodes.has(nodeId)) {
      const node = this.nodes.get(nodeId);
      this.nodes.delete(nodeId);

      // Remove all connected edges
      for (const edge of node.edges.keys()) {
        this.edges.get(edge.from).delete(edge.to);
      }
    }
  }

  addEdge(from, to, weight) {
    if (!this.nodes.has(from) || !this.nodes.has(to)) {
      throw new Error("Invalid node(s).");
    }

    const edge = { from, to, weight };
    if (!this.edges.has(from)) {
      this.edges.set(from, new Map([[to, edge]]));
    } else {
      this.edges.get(from).set(to, edge);
    }

    this.nodes.get(from).edges.set(edge, true);
  }

  removeEdge(from, to) {
    if (!this.nodes.has(from) || !this.nodes.has(to)) {
      return;
    }

    const edge = this.edges.get(from)?.get(to);
    if (edge) {
      this.edges.get(from).delete(to);
      this.nodes.get(from).edges.delete(edge);
    }
  }

  findShortestPath(start, end) {
    if (!this.nodes.has(start) || !this.nodes.has(end)) {
      throw new Error("Invalid start and/or end node.");
    }

    const distances = new Map(); // Map to hold minimum distances
    const previous = new Map(); // Map to hold previous node in the path
    const heap = new BinaryHeap();

    // Initialize distances and heap
    for (const node of this.nodes.keys()) {
      if (node === start) {
        distances.set(node, 0);
        heap.insert(0, node);
      } else {
        distances.set(node, Infinity);
        heap.insert(Infinity, node);
      }
      previous.set(node, null);
    }

    // Dijkstra's algorithm
    while (!heap.isEmpty()) {
      const current = heap.extractMin();

      if (current === end) {
        // Build path from start to end
        const path = [];
        let node = end;
        while (node) {
          path.unshift(node);
          node = previous.get(node);
        }
        return { path, distance: distances.get(end) };
      }

      const neighbors = this.edges.get(current);
      if (neighbors) {
        for (const [to, edge] of neighbors.entries()) {
          const altDistance = distances.get(current) + edge.weight;
          if (altDistance < distances.get(to)) {
            distances.set(to, altDistance);
            previous.set(to, current);
            heap.updateDistance(to, altDistance);
          }
        }
      }
    }

    throw new Error("No path found.");
  }

  getAllConnectedNodes(nodeId) {
    if (!this.nodes.has(nodeId)) {
      throw new Error("Invalid node.");
    }

    const connectedNodes = new Set();
    const stack = [nodeId];
    while (stack.length > 0) {
      const current = stack.pop();
      connectedNodes.add(current);

      const neighbors = this.edges.get(current);
      if (neighbors) {
        for (const to of neighbors.keys()) {
          if (!connectedNodes.has(to)) {
            stack.push(to);
          }
        }
      }
    }

    return Array.from(connectedNodes);
  }
}

class BinaryHeap {
  constructor() {
    this.heap = [];
  }

  // Insert a new element with a given distance
  insert(distance, node) {
    this.heap.push({ distance, node });
    this.bubbleUp(this.heap.length - 1);
  }

  // Extract the element with the minimum distance
  extractMin() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return min.node;
  }

  // Update the distance of an existing element
  updateDistance(node, distance) {
    const index = this.heap.findIndex((elem) => elem.node === node);
    if (index !== -1 && distance < this.heap[index].distance) {
      this.heap[index].distance = distance;
      this.bubbleUp(index);
    }
  }

  // Check if the heap is empty
  isEmpty() {
    return this.heap.length === 0;
  }

  // Maintain heap property by bubbling up the element at given index
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].distance <= this.heap[index].distance) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // Maintain heap property by bubbling down the element at given index
  bubbleDown(index) {
    const length = this.heap.length;
    while (index < length) {
      let smallestIndex = index;
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 2;

      if (
        leftIndex < length &&
        this.heap[leftIndex].distance < this.heap[smallestIndex].distance
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < length &&
        this.heap[rightIndex].distance < this.heap[smallestIndex].distance
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex === index) {
        break;
      }

      this.swap(index, smallestIndex);
      index = smallestIndex;
    }
  }

  // Swap two elements in the heap
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
}

// Sample usage

const graph = new Graph();

graph.addNode("A", 10);
graph.addNode("B", 20);
graph.addNode("C", 30);
graph.addNode("D", 40);

graph.addEdge("A", "B", 5);
graph.addEdge("B", "C", 8);
graph.addEdge("C", "D", 12);
graph.addEdge("A", "D", 15);

console.log(graph.findShortestPath("A", "D"));
console.log(graph.getAllConnectedNodes("A"));

graph.removeNode("B");
console.log(graph.findShortestPath("A", "D"));
console.log(graph.getAllConnectedNodes("A"));