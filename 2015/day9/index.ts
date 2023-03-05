import { readFile } from "fs/promises";

const permutator = <T>(inputArr: T[]) => {
  let result: T[][] = [];

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();

        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

(async () => {
  const input = await readFile("./input.txt", "utf-8");
  const arr = input.split("\n");
  const routes: {
    [key: string]: {
      [key: string]: number;
    };
  } = {};

  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    const [from, , to, , distance] = elem.split(" ");
    routes[from] = {
      ...routes[from],
      [to]: +distance,
    };

    routes[to] = {
      ...routes[to],
      [from]: +distance,
    };
  }
  const allPossibleWays = permutator(Object.keys(routes));
  const distances: number[] = [];
  for (let i = 0; i < allPossibleWays.length; i++) {
    const elem = allPossibleWays[i];
    let sum = 0;
    for (let j = 0; j < elem.length - 1; j++) {
      const town = elem[j];
      const nextTown = elem[j + 1];
      sum += routes[town][nextTown];
    }
    distances.push(sum);
    sum = 0;
  }
  console.log(Math.min(...distances)); // part one
  console.log(Math.max(...distances)); // part two
})();
