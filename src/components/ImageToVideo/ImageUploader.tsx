import React from 'react'
import {useDropzone} from 'react-dropzone'
import { useMemoizedFn } from 'ahooks'
import alert from '@components/Toast'
import { useImageToVideo } from './controllers/context'
import { validateImageFile } from './utils'
import { AddIcon, DeleteIcon, ExchangeIcon } from './Icons'

const ImageUploader: React.FC = () => {
  const { localeFile, setLocaleFile } = useImageToVideo()

  const onDrop = useMemoizedFn(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      try {
        await validateImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setLocaleFile({
            url: reader.result as string,
            file
          })
        }
        reader.readAsDataURL(file)
      } catch (err) {
        alert.info(err.message)
      }
    }
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    multiple: false
  })

  return (
    <div className="h-0 flex-1 cursor-pointer rounded-xl bg-primary-500/10 p-2" {...getRootProps()}>
      <div
        className={`flex h-full flex-col items-center justify-center rounded-xl border border-dashed ${
          isDragActive ? 'border-primary' : 'border-primary-500/40'
        } ${localeFile?.url ? 'border-transparent' : ''}`}
      >
        <input {...getInputProps()} />
        {localeFile?.url ? (
          <div className="relative h-full w-full">
            <img src={localeFile.url} alt="" className="h-full w-full object-contain" />
            <div className="absolute right-0 top-0 flex justify-end gap-x-2">
              <Button>
                <ExchangeIcon className="h-3 w-3 text-primary-500" />
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  setLocaleFile({
                    url: '',
                    file: null
                  })
                }}
              >
                <DeleteIcon className="h-4 w-4 text-primary-500" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <AddIcon className="h-8 w-8 text-primary-500" />
            <div
              className={`text-sm font-normal ${
                isDragActive ? 'text-primary-500/40' : 'text-primary-500'
              }`}
            >
              Drag / Click to upload new photo
            </div>
          </>
        )}
      </div>
    </div>
  )
}

interface ButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <div
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-primary-500/20 text-primary-500 hover:bg-primary-500/10 active:bg-primary-500/30"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ImageUploader
