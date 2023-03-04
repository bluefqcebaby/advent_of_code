import { readFile } from "fs/promises";

const wiresCords: {
  [key: string]: number;
} = {};

type operationTypes = "NOT" | "RSHIFT" | "AND" | "OR" | "LSHIFT" | null;

interface Instruction {
  operation: operationTypes;
  operands: string[];
  result: string;
}

const instructions: Instruction[] = [];

function pushToInstructions({ operation, operands, result }: Instruction) {
  instructions.push({ operation, operands, result });
}

(async () => {
  const input = (await readFile("./input.txt", "utf-8")).split("\n");
  input.forEach((elem) => {
    const arrayOfValues = elem.split(" ");
    switch (arrayOfValues.length) {
      case 5:
        const [firstOperand, operation, secondOperand, , result] =
          arrayOfValues;
        pushToInstructions({
          operation: operation as operationTypes,
          operands: [firstOperand, secondOperand],
          result,
        });
        break;
      case 4:
        const [operation1, operand, , result1] = arrayOfValues;
        pushToInstructions({
          operation: operation1 as operationTypes,
          operands: [operand],
          result: result1,
        });
        break;
      case 3:
        const [operand2, , result3] = arrayOfValues;
        const resolved = parseInt(operand2);
        pushToInstructions({
          operation: null,
          operands: [operand2],
          result: result3,
        });
        !isNaN(resolved) && (wiresCords[result3] = +operand2);
        break;
    }
  });
  // console.log(instructions);
  let i = 0;
  while (true) {
    const elem = instructions[i];
    switch (elem.operation) {
      case "AND":
        if (wiresCords.hasOwnProperty(elem.operands[0])) {
          wiresCords[elem.result] =
            +elem.operands[0] & +elem.operands[1] & 0xffff;
        }
        break;
      case "OR":
        if (
          wiresCords.hasOwnProperty(elem.operands[0]) &&
          wiresCords.hasOwnProperty(elem.operands[1])
        ) {
          wiresCords[elem.result] =
            (+elem.operands[0] | +elem.operands[1]) & 0xffff;
        }
        break;
      case "LSHIFT":
        if (wiresCords.hasOwnProperty(elem.operands[0])) {
          wiresCords[elem.result] =
            (+elem.operands[0] << +elem.operands[1]) & 0xffff;
        }
        break;
      case "NOT":
        if (wiresCords.hasOwnProperty(elem.operands[0])) {
          wiresCords[elem.result] = ~elem.operands[0] & 0xffff;
        }
        break;
      case "RSHIFT":
        if (wiresCords.hasOwnProperty(elem.operands[0])) {
          wiresCords[elem.result] =
            (+elem.operands[0] >> +elem.operands[1]) & 0xffff;
        }
        break;
      case null:
        if (wiresCords.hasOwnProperty(elem.operands[0])) {
          wiresCords[elem.result] = +elem.operands[0];
        }
        break;
    }

    if (wiresCords.hasOwnProperty("a")) {
      console.log(wiresCords.a);
      break;
    }
    i++;
    if (i === input.length) {
      i = 0;
    }
  }
})();
