import { NoColors } from "three";

const solutionState = [
  Array(9).fill('Blue'),
  Array(9).fill('Green'),
  Array(9).fill('Orange'),
  Array(9).fill('White'),
  Array(9).fill('Red'),
  Array(9).fill('Yellow')
];

const state = {
  0: {
    0: [0, 0],
    1: null,
    2: null,
    3: [3, 2],
    4: [4, 6],
    5: null
  },
  1: {
    0: [0, 1],
    1: null,
    2: null,
    3: null,
    4: [4, 7],
    5: null
  },
  2: {
    0: [0, 2],
    1: [1, 0],
    2: null,
    3: null,
    4: [4, 8],
    5: null
  },
  3: {
    0: [0, 3],
    1: null,
    2: null,
    3: [3, 5],
    4: null,
    5: null
  },
  4: {
    0: [0, 4],
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  },
  5: {
    0: [0, 5],
    1: [1, 3],
    2: null,
    3: null,
    4: null,
    5: null
  },
  6: {
    0: [0, 6],
    1: null,
    2: null,
    3: [3, 8],
    4: null,
    5: [5, 0]
  },
  7: {
    0: null,
    1: null,
    2: null,
    3: [3, 1],
    4: [4, 3],
    5: null
  },
  8: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: [4, 4],
    5: null
  },
  9: {
    0: null,
    1: [1, 1],
    2: null,
    3: null,
    4: [4, ]
  }
};
