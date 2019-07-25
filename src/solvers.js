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

  var permutations = [];

  var helper = function(path) {
    if (path.length === n) {
      var board = new Board({n:n});
      for (let i = 0; i < path.length; i++) {
        board.togglePiece(path[i][0], path[i][1]);
      }
      if (board.hasAnyRooksConflicts() === false) {
        permutations.push(path);
      }
    } else {
      var nextStep = [];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (path.length === 0) {
            nextStep.push([i,j]);
          } else if (i > path[path.length-1][0]) {
            nextStep.push([i,j]);
          }
        }
      }
      for (var i = 0; i < nextStep.length; i++) {
        var copy = path.slice();
        copy.push(nextStep[i]);
        helper(copy);
      }
    }
  }

  helper([]);

  let coordinateSolution = permutations[0];
  //return permutations[0];

  let resultBoard = new Board({n: n});
  for (let i = 0; i < coordinateSolution.length; i++) {
    resultBoard.togglePiece(coordinateSolution[i][0], coordinateSolution[i][1]);
  }
  return resultBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let startTime = (new Date).getTime();
  let permutations = [];

  let helper = function(path) {
    if (path.length === n) {
      let board = new Board({n:n});
      for (let i = 0; i < path.length; i++) {
        board.togglePiece(path[i][0], path[i][1]);
      }
      if (board.hasAnyRooksConflicts() === false) {
        permutations.push(path);
      }
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
            if (path.length === 0) {
              nextStep.push([i,j]);
            } else if (j !== path[path.length-1][1]) {
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

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  let endTime = (new Date).getTime();
  console.log('Runtime was ' + (endTime - startTime));
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var permutations = [];

  var helper = function(path) {
    if (path.length === n) {
      var board = new Board({n:n});
      for (let i = 0; i < path.length; i++) {
        board.togglePiece(path[i][0], path[i][1]);
      }
      if (board.hasAnyQueensConflicts() === false) {
        permutations.push(path);
      }
    } else {
      var nextStep = [];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (path.length === 0) {
            nextStep.push([i,j]);
          } else if (i > path[path.length-1][0]) {
            nextStep.push([i,j]);
          }
        }
      }
      for (var i = 0; i < nextStep.length; i++) {
        var copy = path.slice();
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
  //return permutations[0];

  let resultBoard = new Board({n: n});
  for (let i = 0; i < coordinateSolution.length; i++) {
    resultBoard.togglePiece(coordinateSolution[i][0], coordinateSolution[i][1]);
  }
  return resultBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var permutations = [];

  var helper = function(path) {
    if (path.length === n) {
      var board = new Board({n:n});
      for (let i = 0; i < path.length; i++) {
        board.togglePiece(path[i][0], path[i][1]);
      }
      if (board.hasAnyQueensConflicts() === false) {
        permutations.push(path);
      }
    } else {
      var nextStep = [];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (path.length === 0) {
            nextStep.push([i,j]);
          } else if (i > path[path.length-1][0]) {
            nextStep.push([i,j]);
          }
        }
      }
      for (var i = 0; i < nextStep.length; i++) {
        var copy = path.slice();
        copy.push(nextStep[i]);
        helper(copy);
      }
    }
  }

  helper([]);
  var solutionCount = permutations.length; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
