// we cant be sure if unknown will be a string so theres a problem with userName = userInput
// if we change :unknown to :any, problem disappears
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  // while (true) {}
}

generateError(`An error occured!`, 500);
