import fs from "fs/promises";

(async function () {
  let input = await fs.readFile("./input.txt", "utf-8");

  const reebonToWrapPresent = (l, w) => 2 * l + 2 * w;
  const reebonToBow = (l, w, h) => l * w * h;

  let result1 = 0;
  const arr = input.split("\n");

  for (let i = 0; i < arr.length; i++) {
    const rawDimensions = arr[i].split("x");
    const dimensions = {
      l: +rawDimensions[0],
      w: +rawDimensions[1],
      h: +rawDimensions[2],
    };
    const { l, w, h } = dimensions;
    const [min, secondMin] = [l, w, h].sort((a, b) => a - b);
    const wrapPresent = reebonToWrapPresent(min, secondMin);
    const bowPresent = reebonToBow(l, w, h);
    const sum = bowPresent + wrapPresent;
    result1 += sum;
  }
  console.log(result1);
})();
