import { Buffer } from "buffer";

interface IMap {[key: string]: number; }

const base64Order = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/", "=",
];

const base64Map: IMap = base64Order.reduce((o: IMap, c, i) => {
  o[c] = i;
  return o;
}, {});

const asciiOrder = [
  "+", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "=",
];

const asciiMap: IMap = asciiOrder.reduce((o: IMap, c, i) => {
  o[c] = i;
  return o;
}, {});

const from = (s: string, encoding?: string) => {
  const out = [];
  const base64 = Buffer.from(s, encoding).toString("base64");

  for (let i = 0; i < base64.length; i++) {
    out[i] = asciiOrder[base64Map[base64[i]]];
  }

  return out.join("");
};

const to = (s: string, encoding?: string) => {
  const chars = [];

  for (let i = 0; i < s.length; i++) {
    chars[i] = base64Order[asciiMap[s[i]]];
  }

  return Buffer.from(chars.join(""), "base64").toString(encoding);
};

export default {
  from,
  to,
};

export {
  from,
  to,
};
