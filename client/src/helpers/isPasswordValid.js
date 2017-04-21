export function isPasswordValid(password) {
  // Regular Expressions to test
  const nowwhiteSpace = !/\s/g.test(password);
  const oneCapital = /[A-Z]/g.test(password);
  const specialCharacter = /[^]/g.test(password);
  const lengthCheck = password.length > 7;
  // Not whitespace
  return nowwhiteSpace && oneCapital && specialCharacter && lengthCheck;
}

export function isUsernameValid(username) {
  const lengthCheck = username.length > 3;
  const nowwhiteSpace = !/\s/g.test(username);

  return lengthCheck && nowwhiteSpace;
}
