import fs from "fs/promises";
/**
 *
 * FIRST PART
 *
 */
// (async () => {
//   const result = Array.from({ length: 1000 }, () =>
//     new Array(1000).fill(false)
//   );
//   const data = await fs.readFile("./input.txt", "utf-8");
//   const iterateThroughResult = (value, cords) => {
//     const [x1, y1, x2, y2] = cords; // 0, 0, 2, 2
//     for (let i = x1; i <= x2; i++) {
//       for (let j = y1; j <= y2; j++) {
//         result[i][j] = value ?? !result[i][j];
//       }
//     }
//   };
//   const array = data.split("\n");
//   array.forEach((elem) => {
//     const [x1, y1, x2, y2] = elem.match(/\d+/g).map((elem) => +elem);
//     if (elem.startsWith("turn off")) {
//       iterateThroughResult(false, [x1, y1, x2, y2]);
//     }
//     if (elem.startsWith("turn on")) {
//       iterateThroughResult(true, [x1, y1, x2, y2]);
//     }
//     if (elem.startsWith("toggle")) {
//       iterateThroughResult(null, [x1, y1, x2, y2]);
//     }
//   });

//   let sum = result.reduce((acc, val) => {
//     return acc + val.filter((elem) => elem === true).length;
//   }, 0);
//   console.log(sum);
// })();
/**
 *
 * SECOND PART
 *
 */

(async () => {
  const result = Array.from({ length: 1000 }, () => new Array(1000).fill(0));
  const data = await fs.readFile("./input.txt", "utf-8");
  const iterateThroughResult = (value, cords) => {
    const [x1, y1, x2, y2] = cords; // 0, 0, 2, 2
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        if (value === 0 && result[i][j] > 0) {
          result[i][j] -= 1;
        } else {
          result[i][j] += value;
        }
      }
    }
  };
  const array = data.split("\n");
  array.forEach((elem) => {
    const [x1, y1, x2, y2] = elem.match(/\d+/g).map((elem) => +elem);
    if (elem.startsWith("turn off")) {
      iterateThroughResult(0, [x1, y1, x2, y2]);
    }
    if (elem.startsWith("turn on")) {
      iterateThroughResult(1, [x1, y1, x2, y2]);
    }
    if (elem.startsWith("toggle")) {
      iterateThroughResult(2, [x1, y1, x2, y2]);
    }
  });

  let sum = result.reduce((acc, val) => {
    return acc + val.reduce((acc, val) => acc + val, 0);
  }, 0);
  console.log(sum);
})();
