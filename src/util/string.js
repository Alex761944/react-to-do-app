export function toPascalCase(string) {
  return string
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}
