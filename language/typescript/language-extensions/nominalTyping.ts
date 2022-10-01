// __brand는 관례
type ValidatedInputString = string & { __brand: "User Input Post Validation" };

// We're just _telling_ TypeScript that it's true.
const validateUserInput = (input: string) => {
  const simpleValidatedInput = input.replace(/\</g, "≤");
  return simpleValidatedInput as ValidatedInputString;
};

const printName = (name: ValidatedInputString) => {
  console.log(name);
};

const input = "alert('bobby tables')";
const validatedInput = validateUserInput(input);
printName(validatedInput);
