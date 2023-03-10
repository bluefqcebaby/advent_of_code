import { readFile } from "fs/promises";

(async () => {
  const input = await readFile("./input.txt", "utf-8");
  const arr = input.split("\n");
  const charsLiterals = arr.join("").length;
  let charsInMemory = 0;
  arr.forEach((e, i) => {
    charsInMemory += eval(e).length;
    if (i === arr.length - 1) {
      console.log(charsLiterals - charsInMemory);
    }
  });
  console.log(arr.join().length);
})();

/**
 *
 * PART TWO
 *
 */

(async () => {
  const input = await readFile("./input.txt", "utf-8");
  const arr = input.split("\n");
  const charsLiterals = arr.join("").length;
  let encodedChars = 0;
  arr.forEach((e, i) => {
    encodedChars += JSON.stringify(e).length;
    if (i === arr.length - 1) {
      console.log(encodedChars - charsLiterals);
    }
  });
})();
