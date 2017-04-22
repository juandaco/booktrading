export function isPasswordValid(password) {
  // Regular Expressions to test
  // const noWhiteSpace = !/\s/g.test(password);
  // const oneCapital = /[A-Z]/g.test(password);
  // const specialCharacter = /[^]/g.test(password);
  // const lengthCheck = password.length > 7;
  // Not whitespace
  // return noWhiteSpace && oneCapital && specialCharacter && lengthCheck;
  return true;
}

export function isUsernameValid(username) {
  const lengthCheck = username.length > 3;
  const noWhiteSpace = !/\s/g.test(username);

  return lengthCheck && noWhiteSpace;
}
