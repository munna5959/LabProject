let currentMode = "normal";

// ================= MODE =================
function setMode(mode) {
  currentMode = mode;

  document.getElementById("normalCalc")
    .classList.toggle("hidden", mode !== "normal");

  document.getElementById("matrixCalc")
    .classList.toggle("hidden", mode !== "matrix");

  document.getElementById("result").innerText = "";
}

// ================= NORMAL INPUT =================
function press(val) {
  if (currentMode === "normal") {
    document.getElementById("display").value += val;
  } else {
    // matrix input (A focus by default)
    document.getElementById("matrixA").value += val;
  }
}

// ================= NORMAL CALC =================
function calculateNormal() {
  try {
    let expr = document.getElementById("display").value;

    if (!expr.trim()) return;

    expr = expr.replace(/×/g, "*").replace(/÷/g, "/");

    let result = Function("return " + expr)();

    if (!isFinite(result)) throw new Error();

    document.getElementById("display").value = result;

  } catch {
    document.getElementById("display").value = "Error";
  }
}

// ================= CLEAR =================
function clearAll() {
  document.getElementById("display").value = "";
  document.getElementById("matrixA").value = "";
  document.getElementById("matrixB").value = "";
  document.getElementById("result").innerText = "";
}

// ================= BACKSPACE =================
function backspace() {
  if (currentMode === "normal") {
    let d = document.getElementById("display");
    d.value = d.value.slice(0, -1);
  }
}

// ================= NEW ROW =================
function newRow() {
  if (currentMode === "matrix") {
    document.getElementById("matrixA").value += "\n";
  }
}

// ================= MATRIX =================
function parseMatrix(input) {
  if (!input.trim()) throw new Error("Empty input");

  return input.trim().split("\n").map(r =>
    r.trim().split(/\s+/).map(Number)
  );
}

function checkSame(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length)
    throw new Error("Matrix size mismatch");
}

function checkMul(A, B) {
  if (A[0].length !== B.length)
    throw new Error("Invalid multiplication size");
}

function addMatrix(A, B) {
  checkSame(A, B);
  return A.map((r, i) => r.map((v, j) => v + B[i][j]));
}

function subMatrix(A, B) {
  checkSame(A, B);
  return A.map((r, i) => r.map((v, j) => v - B[i][j]));
}

function mulMatrix(A, B) {
  checkMul(A, B);

  let res = [];

  for (let i = 0; i < A.length; i++) {
    res[i] = [];
    for (let j = 0; j < B[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < A[0].length; k++) {
        sum += A[i][k] * B[k][j];
      }
      res[i][j] = sum;
    }
  }

  return res;
}

function displayMatrix(m) {
  return m.map(r => r.join(" ")).join("\n");
}

// ================= CALCULATE MATRIX =================
function calculate(type) {
  try {
    let A = parseMatrix(document.getElementById("matrixA").value);
    let B = parseMatrix(document.getElementById("matrixB").value);

    let result;

    if (type === "add") result = addMatrix(A, B);
    else if (type === "sub") result = subMatrix(A, B);
    else result = mulMatrix(A, B);

    document.getElementById("result").innerText =
      displayMatrix(result);

  } catch (e) {
    document.getElementById("result").innerText =
      "❌ " + e.message;
  }
}

// ================= KEYBOARD SUPPORT =================
document.addEventListener("keydown", (e) => {

  if (currentMode !== "normal") return;

  const display = document.getElementById("display");

  const allowed = "0123456789+-*/().";

  if (allowed.includes(e.key)) {
    display.value += e.key;
  }

  if (e.key === "Enter") {
    e.preventDefault();
    calculateNormal();
  }

  if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  if (e.key === "Escape") {
    display.value = "";
  }
});


function transpose() {
  try {
    let A = parseMatrix(document.getElementById("matrixA").value);

    let result = A[0].map((_, colIndex) =>
      A.map(row => row[colIndex])
    );

    document.getElementById("result").innerText =
      displayMatrix(result);

  } catch (e) {
    document.getElementById("result").innerText =
      "❌ " + e.message;
  }
}


// ================= DETERMINANT =================
function determinant() {
  try {
    let A = parseMatrix(document.getElementById("matrixA").value);

    if (A.length !== A[0].length) {
      throw new Error("Matrix must be square!");
    }

    let det = getDet(A);

    document.getElementById("result").innerText =
      "Determinant = " + det;

  } catch (e) {
    document.getElementById("result").innerText =
      "❌ " + e.message;
  }
}


// recursive determinant
function getDet(matrix) {
  let n = matrix.length;

  if (n === 1) return matrix[0][0];

  if (n === 2) {
    return matrix[0][0]*matrix[1][1] -
           matrix[0][1]*matrix[1][0];
  }

  let det = 0;

  for (let i = 0; i < n; i++) {
    let sub = matrix.slice(1).map(row =>
      row.filter((_, j) => j !== i)
    );

    det += matrix[0][i] * getDet(sub) * (i % 2 === 0 ? 1 : -1);
  }

  return det;
}}

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
