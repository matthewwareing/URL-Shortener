const alphaNum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const base = 62

function encode(num) {
  let encoded = ''
  while(num) {
    let remainder = num % base
    num = Math.floor(num / base)
    encoded = alphaNum[remainder].toString() + encoded
  }
  return encoded
}

function decode(str) {
  let decoded = 0
  while(str) {
    let index = alphaNum.indexOf(str[0])
    let power = str.length - 1
    decoded += index * (Math.pow(base, power))
    str = str.substring(1)
  }
  return decoded
}

module.exports.encode = encode
module.exports.decode = decode