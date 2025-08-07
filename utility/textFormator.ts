export function toCamelCase(str: any): string {
  if (!str) return "";

  return str
    .toLowerCase()
    .split(" ")
    .map((word: string, index: number) =>
      index == 0 ? word : word.at(0)?.toUpperCase() + word.slice(1)
    )
    .join();
}

export function toTitleCase(str: any): string {
  if (!str) return "";
  let format = str
    .split(" ")
    .map(
      (word: string, index: number) =>
        word.at(0)?.toUpperCase() + word.slice(1) + " "
    );
  return format;
}
