export function GenerateRandomToken(length: number): string {
  let token = "";

  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  let i = 0;
  while (i < length) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
    i++;
  }

  return token;
}
