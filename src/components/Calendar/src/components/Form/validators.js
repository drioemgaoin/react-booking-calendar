export function required(value) {
  return !value ? ['This field cannot be empty'] : [];
}
