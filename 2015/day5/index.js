import fs from "fs/promises";

// const niceStrings = [];

// const threeVowelsCheck = string => ((string.match(/[aeiou]/g) || []).length >= 3 ? 1 : 0);
// const doubleLetterCheck = string => {
//   let success = false;
//   for (let i = 1; i < string.length; i++) {
//     const prevLetter = string[i - 1];
//     const letter = string[i];
//     if (prevLetter === letter) {
//       success = true;
//       break;
//     }
//   }
//   return success ? 1 : 0;
// };

// const naughtyStringsCheck = string =>
//   string.match(/(ab)|(cd)|(pq)|(xy)/g)?.length ? 0 : 1;

// (async function () {
//   const input = await fs.readFile("./input.txt", "utf-8");
//   const arr = input.split("\n");
//   arr.forEach(elem => {
//     let goodSigns = 0;
//     goodSigns += threeVowelsCheck(elem);
//     goodSigns += doubleLetterCheck(elem);
//     goodSigns += naughtyStringsCheck(elem);

//     if (goodSigns === 3) {
//       console.log(elem);
//       niceStrings.push(elem);
//     }
//   });
//   console.log(niceStrings.length);
// })();

/**
 *
 * second half
 *
 */

const niceStrings = [];

const doubleLetterTwice = string => {
  let success = false;
  for (let i = 0; i < string.length - 2; i++) {
    const pair = string.slice(0 + i, 2 + i);
    const searchStr = string.slice(2 + i);

    if (searchStr.includes(pair)) {
      success = true;
      break;
    }
  }
  return success ? 1 : 0;
};

const letterBetween = string => {
  let success = false;
  for (let i = 2; i < string.length; i++) {
    const prevLetter = string[i - 2];
    const letter = string[i];
    if (prevLetter === letter) {
      success = true;
      break;
    }
  }
  return success ? 1 : 0;
};
let result = 0;
(async function () {
  const input = await fs.readFile("./input.txt", "utf-8");
  const arr = input.split("\n");
  arr.forEach(elem => {
    let goodSigns = 0;
    goodSigns += letterBetween(elem);
    if (goodSigns === 0) {
      return;
    }
    goodSigns += doubleLetterTwice(elem);

    if (goodSigns === 2) {
      result++;
    }
  });
  console.log(result);
})();
