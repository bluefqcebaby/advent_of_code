import fs from "fs/promises";
(async function () {
  const input = await fs.readFile("./input.txt", "utf-8");
  // const housesWithGifts = [`0|0`];

  // let cords = {
  //   x: 0,
  //   y: 0,
  // };

  // for (let i = 0; i < input.length; i++) {
  //   const direction = input[i];
  //   switch (direction) {
  //     case ">":
  //       cords.x += 1;
  //       break;
  //     case "<":
  //       cords.x -= 1;
  //       break;
  //     case "v":
  //       cords.y -= 1;
  //       break;
  //     case "^":
  //       cords.y += 1;
  //       break;
  //   }
  //   const { x, y } = cords;
  //   if (!housesWithGifts.includes(`${x}|${y}`)) {
  //     housesWithGifts.push(`${x}|${y}`);
  //   }
  // }

  /**
   *
   * second part
   *
   */

  const housesWithGifts = [`0|0`];

  let santaCords = {
    x: 0,
    y: 0,
  };

  let roboCords = {
    x: 0,
    y: 0,
  };

  const calcDirection = (obj, value) => {
    switch (value) {
      case ">":
        obj.x += 1;
        break;
      case "<":
        obj.x -= 1;
        break;
      case "v":
        obj.y -= 1;
        break;
      case "^":
        obj.y += 1;
        break;
    }
  };

  for (let i = 0; i < input.length; i++) {
    const direction = input[i];
    let x, y;
    if (i % 2 === 0) {
      calcDirection(santaCords, direction);
      [x, y] = [santaCords.x, santaCords.y];
    } else {
      calcDirection(roboCords, direction);
      [x, y] = [roboCords.x, roboCords.y];
    }

    if (!housesWithGifts.includes(`${x}|${y}`)) {
      housesWithGifts.push(`${x}|${y}`);
    }
  }

  console.log(housesWithGifts.length);
})();
