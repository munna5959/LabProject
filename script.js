function parseMatrix(input) {
  return input.trim().split("\n").map(row =>
    row.trim().split(" ").map(Number)
  );
}

function addMatrix(A, B) {
  return A.map((row, i) =>
    row.map((val, j) => val + B[i][j])
  );
}

function subMatrix(A, B) {
  return A.map((row, i) =>
    row.map((val, j) => val - B[i][j])
  );
}

function mulMatrix(A, B) {
  let result = [];

  for (let i = 0; i < A.length; i++) {
    result[i] = [];
    for (let j = 0; j < B[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < B.length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }

  return result;
}

function displayMatrix(matrix) {
  return matrix.map(row => row.join(" ")).join("\n");
}

function calculate(type) {
  try {
    let A = parseMatrix(document.getElementById("matrixA").value);
    let B = parseMatrix(document.getElementById("matrixB").value);
    let result;

    if (type === "add") result = addMatrix(A, B);
    if (type === "sub") result = subMatrix(A, B);
    if (type === "mul") result = mulMatrix(A, B);

    document.getElementById("result").innerText = displayMatrix(result);

  } catch (e) {
    document.getElementById("result").innerText = "Invalid input!";
  }
}