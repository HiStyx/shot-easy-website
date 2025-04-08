import { UPLOAD, UPLOAD_RULES } from './enums'

/**
 * 上传图片之前对图片进行预处理：裁剪、压缩
 */
export function preprocessImage(file, maxWidth, maxHeight, downsamplingRatio, usePNG = false) {
  return new Promise((resolve, reject) => {
    let loadImage
    Promise.all([
      import('blueimp-load-image/js/load-image'),
      import('blueimp-load-image/js/load-image-iptc-map'),
      import('blueimp-load-image/js/load-image-exif-map'),
      import('blueimp-load-image/js/load-image-orientation')
    ])
      .then((ret) => {
        const [mod] = ret
        const opts = {
          maxWidth,
          maxHeight,
          canvas: true,
          // 设置成 window.devicePixelRatio 后像素可能超过 1280
          pixelRatio: 1,
          downsamplingRatio,
          orientation: true,
          imageSmoothingEnabled: true,
          meta: true
        }
        // image: img
        // imageHead:
        // ArrayBuffer(3244)
        // originalHeight: 1080
        // originalWidth: 1920
        loadImage = mod.default
        return loadImage(file, opts)
      })
      .then((data) => {
        console.debug(data.image.width, data.image.height)
        if (data.imageHead) {
          if (data.exif) {
            console.debug(`EXIF=${data.exif[0x0112]}`)
            // Reset Exif Orientation data:
            loadImage.writeExifData(data.imageHead, data, 'Orientation', 1)
          }
        } else {
          console.debug('No image head')
        }
        data.image.toBlob(
          function (blob) {
            if (!blob) {
              throw new Error(`Empty file`)
            }

            if (data.imageHead && data.exif) {
              loadImage.replaceHead(blob, data.imageHead, function (newBlob) {
                resolve(newBlob)
              })
            } else {
              resolve(blob)
            }
          },
          usePNG && file.type === 'image/png' ? 'image/png' : 'image/jpeg'
        )
      })
      .catch((e) => reject(e))
  })
}

/*生成随机字符串*/
export function randomStr(length: number) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

/**
 * 文件选中时校验类型和大小
 * ios video/quicktime mov
 * input file 类型限制，在这里做检测
 * 常见 mime types：
 * https://github.com/Jam3/ios-video-test/blob/master/lib/mime-types.json
 */
export function validateInputFile({ type, size, name }) {
  if (type === 'image/gif') {
    if (size > UPLOAD.MAX_GIF_SIZE * 1024 * 1024) {
      return UPLOAD_RULES.GIF_SIZE_ERROR
    }
  } else if (type.includes('image') || type.includes('heic') || type.includes('heif')) {
    if (size > UPLOAD.MAX_IMAGE_SIZE * 1024 * 1024) {
      return UPLOAD_RULES.IMAGE_SIZE_ERROR
    }
  } else if (type.includes('video')) {
    const maxSize = UPLOAD.MAX_VIDEO_SIZE_BETA * 1024 * 1024
    if (size > maxSize) {
      return UPLOAD_RULES.VIDEO_SIZE_ERROR
    }
    if (!UPLOAD.ALLOWED_VIDEO_TYPES.some((i) => type.includes(i))) {
      return UPLOAD_RULES.FILE_FORMAT_ERROR
    }
  } else {
    if (!UPLOAD.ALLOWED_EXTS.includes(getExtentison(name)?.toLowerCase())) {
      return UPLOAD_RULES.FILE_FORMAT_ERROR
    }
  }
}
// 预览获取文件信息时校验:主要为视频
export function validatePreviewFile({ duration, width, height, videoWidth, videoHeight }) {
  if (duration) {
    /**
     * 编码格式不支持，无法预览，直接放过
     */
    if (videoHeight === 0 && videoWidth === 0) {
      return UPLOAD_RULES.FILE_FORMAT_ERROR
    }

    if (
      videoHeight > UPLOAD.MAX_VIDEO_HEIGHT ||
      videoWidth > UPLOAD.MAX_VIDEO_WIDTH ||
      videoHeight < UPLOAD.MIN_VIDEO_HEIGHT ||
      videoWidth < UPLOAD.MIN_VIDEO_WIDTH
    ) {
      return UPLOAD_RULES.VIDEO_METRIC_ERROR
    }

    // add a therehold
    const maxDuration = UPLOAD.MAX_DURATION_BETA * 60
    if (Math.floor(duration) > maxDuration) {
      return UPLOAD_RULES.VIDEO_DURATION_ERROR
    }
  } else {
    // 此宽高为媒体渲染的宽高
    if (width > UPLOAD.MAX_IMAGE_WIDTH || height > UPLOAD.MAX_IMAGE_HEIGHT) {
      return UPLOAD_RULES.IMAGE_METRIC_ERROR
    }
  }
}

export function getExtentison(filename) {
  let ext = filename?.split('.').pop()
  if (ext) {
    if (ext === 'apng') ext = 'gif'
    return ext.toLowerCase()
  }
}
