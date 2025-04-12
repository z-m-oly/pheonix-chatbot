export default function toTittleCase(text) {
  return text
    .split(' ')
    .map((i) => i.replace(i[0], i[0].toUpperCase()))
    .join(' ');
}
