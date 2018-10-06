import { Buffer } from 'buffer'

const Base64Order = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/', '='
]

const Base64Map = Base64Order.reduce((o, c, i) => {
  o[c] = i
  return o
}, {})

const AsciiOrder = [
  '+', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '='
]

const AsciiMap = AsciiOrder.reduce((o, c, i) => {
  o[c] = i
  return o
}, {})

const from = (string, encoding) => {
  const out = []
  const base64 = Buffer.from(string, encoding).toString('base64')

  for (let i = 0; i < base64.length; i++) {
    out[i] = AsciiOrder[Base64Map[base64[i]]]
  }

  return out.join('')
}

const to = (string, encoding) => {
  const chars = []

  for (let i = 0; i < string.length; i++) {
    chars[i] = Base64Order[AsciiMap[string[i]]]
  }

  return Buffer.from(chars.join(''), 'base64').toString(encoding)
}

export default {
  from,
  to
}

export {
  from,
  to
}
