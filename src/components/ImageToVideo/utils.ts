
/**
 * 验证上传的图片文件
 * @param file 图片文件
 * @throws {Error} 当图片不符合要求时抛出错误
 */
export const validateImageFile = async (file: File) => {
  // 验证文件格式
  const [type, ext] = file.type.split('/')


  if (type !== 'image' || !['jpeg', 'jpg', 'png'].includes(ext)) {
    throw new Error('Please upload JPG/JPEG/PNG format only.')
  }

  // 验证文件大小
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Please upload an image no larger than 10MB.')
  }

  // 验证图片尺寸比例
  const img = new Image()
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })

  const aspectRatio = img.width / img.height
  if (aspectRatio < 0.4 || aspectRatio > 2.5) {
    throw new Error('The aspect ratio of the uploaded image should be between 2:5 and 5:2.')
  }
}


// 格式化时间
export const formatTime = (timestamp: string) => {
  const date = new Date(+timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}/${month}/${day} at ${hours}:${minutes}`
}
