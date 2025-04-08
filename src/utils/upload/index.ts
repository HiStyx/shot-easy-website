
import kebabCase from 'lodash.kebabcase'

import { UPLOAD, FILE_TYPE } from './enums'
import { post } from '@utils/request'

import { preprocessImage, randomStr } from './preprocess'

interface IOptions {
  isCompress?: boolean
  isEdit?: boolean
  isH5?: boolean
  maxSize?: number
  asPNG?: boolean
}

/**
 * 参考 DS 上传逻辑,fileType约定如下：INPAINTING_IMAGE: 待编辑图片文件INPAINTING_IMAGE_MASK: 待编辑图片mask文件
 * isCompress - 分辨率超出才压缩，大小在压缩后判断
 * isH5 - pc为2048*2048，H5为1280*1280
 *  * */
export default async function handleUpload(
  imgFile: File,
  fileType: FILE_TYPE,
  otherOptions?: IOptions
) {
  const {
    isCompress = false,
    isH5 = isMobile(),
    maxSize = UPLOAD.BACK_MAX_SIZE,
    asPNG = false
  } = otherOptions || {}
  let file = imgFile
  let ratio = 0.5

  // 最小分辨率限制
  if (16 * 16 > file.size) {
    Promise.reject('Resolution needs to be greater than 16x16 !')
  }

  // 控制缩放像素
  const maxResolution = isH5
    ? UPLOAD.MAX_IMAGE_WIDTH * UPLOAD.MAX_IMAGE_HEIGHT
    : UPLOAD.MAX_IMAGE_WIDTH_PC * UPLOAD.MAX_IMAGE_HEIGHT_PC //区分H5及Pc端分辨率限制
  // 计算缩放比例
  if (file.size > maxResolution) {
    ratio = +(maxResolution / file.size + 0.01).toFixed(2) //+0.01是为了向上取整保证压缩后小于目标像素
  }

  // 1. 压缩图片
  if (isCompress) {
    const blobFile = await preprocessImage(
      imgFile,
      UPLOAD.MAX_IMAGE_WIDTH_PC,
      UPLOAD.MAX_IMAGE_HEIGHT_PC,
      ratio,
      asPNG
    )
    // 转回文件类型
    file = new File([blobFile as Blob], randomStr(8), { type: (blobFile as Blob).type })
  }

  // 压缩后再判断大小，防止高分辨率图片不通过, 上传大小为字节,后台限制为4M
  if (file.size > maxSize) {
    console.log('The file cannot exceed 4 MB!', file)
    return Promise.reject(new Error('The file cannot exceed 4 MB!'))
  }

  // 此处获取的extension必须与压缩后的文件类型一致
  const type = file.type.split('/')[1]

  // 2. 获取S3上传签名，并上传到s3
  const params = {
    file: file,
    fileType: fileType,
    extension: type
  }
  const fileId = await uploadToS3(params)

  return { fileId, file }
}

async function uploadToS3(params) {
  const { file, fileType, extension } = params
  const { data, success, errorMsg } = await post('/users/me/signatures/s3', {
    fileType,
    fileSize: file.size,
    extension
  })
  if (!success) {
    return Promise.reject(new Error(errorMsg))
  }

  // aws 不能多传参数， expire 不要传
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const { url, expire, fileId, ...uploadParams } = data as any
  // FormData 浏览器自动设置
  // aws 没有返回任何内容
  await post(url, getFormData(uploadParams, file, file.type))

  return fileId as string
}

function getFormData(data, file, contentType) {
  const { policy, ...rest } = data
  const fd = new FormData()
  if (contentType) {
    fd.append('content-type', contentType)
  }
  fd.append('Policy', policy)
  for (const field in rest) {
    fd.append(kebabCase(field).replace('xamz', 'x-amz'), rest[field])
  }
  // 要放到最后
  fd.append('file', file)
  return fd
}


// 判断是否是H5
export function isMobile() {
  try {
    ; /Mobi|Android|iPhone/i.test(navigator.userAgent) || document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

export { preprocessImage, randomStr }


