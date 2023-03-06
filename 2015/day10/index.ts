let input = "1113122113";
const getEyeView = (input: string) => {
  let answer = "";
  let count = 1;
  for (let i = 0; i < input.length; i++) {
    const elem = input[i];
    const nextElem = input[i + 1] ?? null;
    if (elem !== nextElem) {
      answer += `${count}${elem}`;
      count = 1;
    } else {
      count++;
    }
  }
  return answer;
};

// for (let i = 0; i < 40; i++) {
//   // part one
//   input = getEyeView(input);
// }
for (let i = 0; i < 50; i++) {
  // part two
  input = getEyeView(input);
}

console.log(input.length);
