import { randomStr } from './upload/preprocess'

export function downloadFile(url: string, filename?: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || randomStr(8)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
