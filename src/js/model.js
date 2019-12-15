// import { NoColors } from 'three';
// import isEqual from 'lodash.isequal';
const isEqual = require('lodash.isequal');

const solutionState = [
  Array(9).fill('Blue'),
  Array(9).fill('Green'),
  Array(9).fill('Orange'),
  Array(9).fill('White'),
  Array(9).fill('Red'),
  Array(9).fill('Yellow')
];

const state = {
  /* First Layer Top Row*/
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

  /* First Layer Middle Row */
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

  /* First Layer Bottom Row */
  6: {
    0: [0, 6],
    1: null,
    2: null,
    3: [3, 8],
    4: null,
    5: [5, 0]
  },
  7: {
    0: [0, 7],
    1: null,
    2: null,
    3: null,
    4: null,
    5: [5, 1]
  },
  8: {
    0: [0, 8],
    1: [1, 6],
    2: null,
    3: null,
    4: null,
    5: [5, 2]
  },

  /* Second Layer Top Row */
  9: {
    0: null,
    1: null,
    2: null,
    3: [3, 1],
    4: [4, 3],
    5: null
  },
  10: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: [4, 4],
    5: null
  },
  11: {
    0: null,
    1: [1, 1],
    2: null,
    3: null,
    4: [4, 5],
    5: null
  },

  /* Second Layer Middle Row */
  12: {
    0: null,
    1: null,
    2: null,
    3: [3, 4],
    4: null,
    5: null
  },
  13: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  },
  14: {
    0: null,
    1: [1, 4],
    2: null,
    3: null,
    4: null,
    5: null
  },

  /* Second Layer Bottom Row */
  15: {
    0: null,
    1: null,
    2: null,
    3: [3, 7],
    4: null,
    5: [5, 3]
  },
  16: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: [5, 4]
  },
  17: {
    0: null,
    1: [1, 7],
    2: null,
    3: null,
    4: null,
    5: [5, 5]
  },

  /* Third Layer Top Row */
  18: {
    0: null,
    1: null,
    2: [2, 3],
    3: [3, 0],
    4: [4, 0],
    5: null
  },
  19: {
    0: null,
    1: null,
    2: [2, 1],
    3: null,
    4: [4, 1],
    5: null
  },
  20: {
    0: null,
    1: [1, 2],
    2: [2, 0],
    3: null,
    4: [4, 2],
    5: null
  },

  /* Third Layer Middle Row */
  21: {
    0: null,
    1: null,
    2: [2, 5],
    3: [3, 3],
    4: null,
    5: null
  },
  22: {
    0: null,
    1: null,
    2: [2, 4],
    3: null,
    4: null,
    5: null
  },
  23: {
    0: null,
    1: [1, 5],
    2: [2, 3],
    3: null,
    4: null,
    5: null
  },

  /* Third Layer Bottom Row */
  24: {
    0: null,
    1: null,
    2: [2, 8],
    3: [3, 6],
    4: null,
    5: [5, 6]
  },
  25: {
    0: null,
    1: null,
    2: [2, 7],
    3: null,
    4: null,
    5: [5, 7]
  },
  26: {
    0: null,
    1: [1, 8],
    2: [2, 6],
    3: null,
    4: null,
    5: [5, 8]
  }
};

function cubesAreUnique(obj) {
  const cubes = Object.values(obj);
  const uniqueValues = cubes.filter(cube => cubes.filter(q => isEqual(cube, q)))
    .length;
  console.log(`Cubes are all unique: ${uniqueValues === cubes.length}`);
}

function sidesAreUnique(obj) {
  const cubes = Object.values(obj);
  const visibleSides = [];
  cubes.forEach(cube => {
    const sides = Object.values(cube);
    sides.forEach(side => {
      if (side !== null) {
        visibleSides.push(side);
      }
    });
  });

  const uniqueSides = visibleSides.filter(side =>
    visibleSides.filter(cyde => isEqual(side, cyde))
  );

  console.log(
    `Sides are all unique: ${uniqueSides.length === visibleSides.length}`
  );
}

sidesAreUnique(state);
cubesAreUnique(state);
