module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openingBrackets = new Set();
  const closingBrackets = new Set();
  const bracketPairs = {};

  for (const [open, close] of bracketsConfig) {
    openingBrackets.add(open);
    closingBrackets.add(close);
    bracketPairs[close] = open;
  }

  for (const char of str) {
    if (openingBrackets.has(char)) {
      if (closingBrackets.has(char)) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      } else {
        stack.push(char);
      }
    } else if (closingBrackets.has(char)) {
      if (stack.length === 0 || stack.pop() !== bracketPairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
