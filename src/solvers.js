/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  let startTime = (new Date).getTime();
  let permutations = [];

  let helper = function(path) {
    if (path.length === n) {
      // let board = new Board({n:n});
      // for (let i = 0; i < path.length; i++) {
      //   board.togglePiece(path[i][0], path[i][1]);
      // }
      // if (board.hasAnyRooksConflicts() === false) {
        permutations.push(path);
      //}
    } else {
      let nextStep = [];
      if (path.length === 0) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            nextStep.push([i,j]);
          }
        }
      } else {
        for (let i = (path[path.length-1][0] + 1); i < n; i++) {
          for (let j = 0; j < n; j++) {
            let shouldPush = true;
            for (let k = 0; k < path.length; k++) {
              if (j === path[path.length - 1 - k][1]) {
                shouldPush = false;
                break;
              }
            }
            if (shouldPush) {
              nextStep.push([i,j]);
            }
          }
        }
      }
      let copy = path.slice();
      copy.push(nextStep[0]);
      helper(copy);
    }
  }

  helper([]);

  console.log(permutations);
  let coordinateSolution = permutations[0];
  //return permutations[0];

  let resultBoard = new Board({n: n});
  for (let i = 0; i < coordinateSolution.length; i++) {
    resultBoard.togglePiece(coordinateSolution[i][0], coordinateSolution[i][1]);
  }
  let endTime = (new Date).getTime();
  console.log('Runtime was ' + (endTime - startTime));
  return resultBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let startTime = (new Date).getTime();
  let permutations = [];

  let helper = function(path) {
    if (path.length === n) {

      // let board = new Board({n:n});
      // for (let i = 0; i < path.length; i++) {
      //   board.togglePiece(path[i][0], path[i][1]);
      // }
      // if (board.hasAnyRooksConflicts() === false) {
      permutations.push(path);
      let mirroredPath = [];
      if (n > 1 && n % 2 === 0) {
        for (let i = 0; i < n; i++) {
          mirroredPath.push([i, n - 1 - path[i][1]]);
        }
        permutations.push(mirroredPath);
      }
    } else {
      let nextStep = [];
      let endColumn = n % 2 === 0 ? Math.ceil(n/2) : n;
      if (path.length === 0) {
        for (let j = 0; j < endColumn; j++) {
          nextStep.push([0,j]);
        }
      } else {
        let rowIndex = path[path.length - 1][0] + 1;
        //for (let i = (path[path.length-1][0] + 1); i < path[path.length - 1][0] + 2; i++) {
          for (let j = 0; j < n; j++) {
            let shouldPush = true;
            for (let k = 0; k < path.length; k++) {
              if (j === path[path.length - 1 - k][1]) {
                shouldPush = false;
                break;
              }
            }
            if (shouldPush) {
              nextStep.push([rowIndex,j]);
            }
          }
      }
      for (let i = 0; i < nextStep.length; i++) {
        let copy = path.slice();
        copy.push(nextStep[i]);
        helper(copy);
      }
    }
  }
  //debugger;
  helper([]);
  let solutionCount = permutations.length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  let endTime = (new Date).getTime();
  console.log('Runtime was ' + (endTime - startTime));
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let startTime = (new Date).getTime();
  let permutations = [];

  let helper = function(path) {
    if (path.length === n) {
      // let board = new Board({n:n});
      // for (let i = 0; i < path.length; i++) {
      //   board.togglePiece(path[i][0], path[i][1]);
      // }
      // if (board.hasAnyQueensConflicts() === false) {
      permutations.push(path);
    } else {
      let nextStep = [];
      if (path.length === 0) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            nextStep.push([i,j]);
          }
        }
      } else {
        //for (let i = (path[path.length-1][0] + 1); i < n; i++) {
          let rowIndex = path[path.length - 1][0] + 1;
          for (let j = 0; j < n; j++) {
            let shouldPush = true;
            for (let k = 0; k < path.length; k++) {
              if (j === path[path.length-1-k][1] ||
                 (rowIndex - path[path.length-1-k][0] === j - path[path.length-1-k][1]) ||
                 (rowIndex - path[path.length-1-k][0] === path[path.length-1-k][1] - j)) {
                shouldPush = false;
                break;
              }
            }
            if (shouldPush === true) {
              nextStep.push([rowIndex,j]);
            }
          }
      }
      for (let i = 0; i < nextStep.length; i++) {
        let copy = path.slice();
        copy.push(nextStep[i]);
        helper(copy);
      }
    }
  }

  helper([]);
  if (permutations.length === 0) {
    return (new Board({n:n})).rows();
  }
  let coordinateSolution = permutations[0];

  let resultBoard = new Board({n: n});
  for (let i = 0; i < coordinateSolution.length; i++) {
    resultBoard.togglePiece(coordinateSolution[i][0], coordinateSolution[i][1]);
  }
  let endTime = (new Date).getTime();
  console.log('Runtime was ' + (endTime - startTime));
  return resultBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let startTime = (new Date).getTime();
  let permutations = [];

  let helper = function(path) {
    if (path.length === n) {
      // let board = new Board({n:n});
      // for (let i = 0; i < path.length; i++) {
      //   board.togglePiece(path[i][0], path[i][1]);
      // }
      // if (board.hasAnyQueensConflicts() === false) {
      permutations.push(path);
      if (n > 1 && n % 2 === 0) {
        let mirroredPath = [];
        for (let i = 0; i < n; i++) {
          mirroredPath.push([i, n - 1 - path[i][1]]);
        }
        permutations.push(mirroredPath);
      }
    } else {
      let nextStep = [];
      let endColumn = n % 2 === 0 ? Math.ceil(n/2) : n;
      if (path.length === 0) {
        for (let j = 0; j < endColumn; j++) {
          nextStep.push([0,j]);
        }
      } else {
        for (let i = (path[path.length-1][0] + 1); i < n; i++) {
          for (let j = 0; j < n; j++) {
            let shouldPush = true;
            for (let k = 0; k < path.length; k++) {
              if (j === path[path.length-1-k][1] ||
                 (i - path[path.length-1-k][0] === j - path[path.length-1-k][1]) ||
                 (i - path[path.length-1-k][0] === path[path.length-1-k][1] - j)) {
                shouldPush = false;
                break;
              }
            }
            if (shouldPush === true) {
              nextStep.push([i,j]);
            }
          }
        }
      }
      for (let i = 0; i < nextStep.length; i++) {
        let copy = path.slice();
        copy.push(nextStep[i]);
        helper(copy);
      }
    }
  }

  helper([]);
  let solutionCount = permutations.length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  let endTime = (new Date).getTime();
  console.log('Runtime was ' + (endTime - startTime));
  return solutionCount;
};
