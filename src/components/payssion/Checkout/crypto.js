import JSEncrypt from 'jsencrypt'

export default class JSEncryptExt extends JSEncrypt {
  constructor(options) {
    super(options)
  }

  encrypt(str) {
    try {
      // @ts-ignore
      const maxByteLength = ((this.getKey().n.bitLength() + 7) >> 3) - 11
      let i = 0
      const byteArr = []
      while (i <= str.length - 1) {
        const c = str.charCodeAt(i)
        if (c < 128) {
          byteArr.push(str[i])
        } else if (c > 127 && c < 2048) {
          byteArr.push(null, str[i])
        } else {
          byteArr.push(null, null, str[i])
        }
        i++
      }

      if (byteArr.length <= maxByteLength) {
        return hex2b64(this.getKey().encrypt(str))
      } else {
        // long plain text encrypt
        let cipherStrSum = ''
        while (byteArr.length > 0) {
          let offset = maxByteLength
          while (byteArr[offset - 1] === null) {
            offset = offset - 1
          }
          const text = byteArr
            .slice(0, offset)
            .filter((i) => i !== null)
            .join('')
          cipherStrSum += this.getKey().encrypt(text)
          byteArr.splice(0, offset)
        }
        return hex2b64(cipherStrSum)
      }
    } catch (error) {
      return false
    }
  }

  decrypt(cipherText) {
    try {
      const hexText = b64tohex(cipherText)
      // @ts-ignore
      const maxLength = this.getKey().n.bitLength() / 4

      if (hexText.length <= maxLength) {
        return this.getKey().decrypt(hexText)
      } else {
        // long cipher text decrypt
        const arr = hexText.match(new RegExp('.{1,' + maxLength + '}', 'g'))
        const plainText = arr.reduce((acc, cur) => {
          return acc + this.getKey().decrypt(cur)
        }, '')

        return plainText
      }
    } catch (error) {
      return false
    }
  }
}

const b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const b64pad = '='
const BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz'

function int2char(n) {
  return BI_RM.charAt(n)
}

export function hex2b64(str) {
  let i
  let c
  let ret = ''
  for (i = 0; i + 3 <= str.length; i += 3) {
    c = parseInt(str.substring(i, i + 3), 16)
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63)
  }
  if (i + 1 == str.length) {
    c = parseInt(str.substring(i, i + 1), 16)
    ret += b64map.charAt(c << 2)
  } else if (i + 2 == str.length) {
    c = parseInt(str.substring(i, i + 2), 16)
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4)
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad
  }
  return ret
}

export function b64tohex(s) {
  let ret = ''
  let i
  let k = 0
  let slop = 0
  for (i = 0; i < s.length; ++i) {
    if (s.charAt(i) == b64pad) {
      break
    }
    const v = b64map.indexOf(s.charAt(i))
    if (v < 0) {
      continue
    }
    if (k == 0) {
      ret += int2char(v >> 2)
      slop = v & 3
      k = 1
    } else if (k == 1) {
      ret += int2char((slop << 2) | (v >> 4))
      slop = v & 0xf
      k = 2
    } else if (k == 2) {
      ret += int2char(slop)
      ret += int2char(v >> 2)
      slop = v & 3
      k = 3
    } else {
      ret += int2char((slop << 2) | (v >> 4))
      ret += int2char(v & 0xf)
      k = 0
    }
  }
  if (k == 1) {
    ret += int2char(slop << 2)
  }
  return ret
}
