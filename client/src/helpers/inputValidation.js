export function isPasswordValid(password) {
  // Regular Expressions to test
  const noWhiteSpace = !/\s/g.test(password);
  const oneCapital = /[A-Z]/g.test(password);
  const lengthCheck = password.length > 7;
  return noWhiteSpace && oneCapital && lengthCheck;
}

export function isUsernameValid(username) {
  const lengthCheck = username.length > 3;
  const noWhiteSpace = !/\s/g.test(username);

  return lengthCheck && noWhiteSpace;
}
