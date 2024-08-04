/* 
parse and tokenize this python code
    result = add(2, subtract(4, 2))
    print(result)
*/
enum TokenTypes {
  PAREN = "PAREN",
  VAR = "VAR",
}

// The tokenize function takes in an input string
// and returns an array of token objects
function tokenizer(input: string): {}[] {
  // Cursor
  let currentPosition = 0;
  const tokens: {}[] = [];

  // End when we reach the end of the input
  while (currentPosition < input.length) {
    // Set the current char
    const currentChar = input[currentPosition];
    console.debug(`Current char (pos ${currentPosition}): `, currentChar);

    // DETECT parentheses
    // Open parentheses
    if (currentChar === "(") {
      const newToken = {
        type: TokenTypes.PAREN,
        value: "(",
      };
      console.debug(`Detected ${JSON.stringify(newToken, null, 2)}\n`);
      tokens.push(newToken);

      // Move cursor forwards
      currentPosition += 1;

      continue;
    }

    // Close parentheses
    if (currentChar === ")") {
      const newToken = {
        type: TokenTypes.PAREN,
        value: ")",
      };
      console.debug(`Detected ${JSON.stringify(newToken, null, 2)}\n`);
      tokens.push(newToken);

      // Move cursor forwards
      currentPosition += 1;

      continue;
    }

    // DETECT whitespace
    // This will just separate different identifiers
    // but it isn't an actual token
    if (currentChar === " ") {
      console.debug("Detected whitespace");
      currentPosition += 1;
      continue;
    }

    // Detect an identifier
    // First check if we have a letter a-zA-z
    if (/^[a-z0-9]+$/i.test(currentChar)) {
      // Start of an identifier
      const identifierBuffer: string[] = [];

      while (currentPosition < input.length) {
        // Need a new holder of current char
        const newCurrentChar = input[currentPosition];

        // whitespace -> move on
        if (newCurrentChar === " ") {
          currentPosition++;
          continue;
        }

        const nextChar = input[currentPosition + 1];

        // DETECT variable
        if (currentPosition < input.length - 1 && nextChar === "=") {
          const newToken = {
            type: TokenTypes.VAR,
            value: identifierBuffer.join(""),
          };
          tokens.push(newToken);
          currentPosition++;
          break;
        }

        // DETECT function
        if (currentPosition < input.length - 1 && nextChar === "(") {
          const newToken = {
            type: TokenTypes.VAR,
            value: identifierBuffer.join(""),
          };
          tokens.push(newToken);
          currentPosition++;
          break;
        }

        // Add to identifierBuffer
        identifierBuffer.push(newCurrentChar);
        currentPosition++;
      }
    }

    // DEFAULT ALWAYS MOVE FORWARDS TO AVOID INF LOOP
    currentPosition++;
    console.log("\n");
  }

  return tokens;
}

const pythonInputCode = `result = add(2, subtract(4, 2))
print(result)`;
const tokens = tokenizer(pythonInputCode);
console.log(
  `===\n\n~~~~~~INPUT:\n\n${pythonInputCode}\n\n~~~~~~~OUTPUT:\n\n${JSON.stringify(
    tokens,
    null,
    2
  )}`
);

console.log("\n===");
