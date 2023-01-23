import md5 from "blueimp-md5";

const input = "ckczppom";

let i = 0;
while (true) {
  if (md5(`${input}${i}`).startsWith("000000")) {
    console.log(i);
    break;
  } else {
    i++;
  }
}
