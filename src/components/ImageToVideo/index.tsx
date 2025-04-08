import React from 'react'
import { useMemoizedFn } from 'ahooks'

import Action from './Action'
import Form from './Form'
import Tabs from './Tabs'
import PromptInput from './TextArea'
import { BizType } from './controllers/enums'
import useBizCharge from './useBizCharge'
import useHandlers from './useHandlers'
import Loading from './Loading'
import Result from './Result'
import { useImageToVideo } from './controllers/context'
import { ImageToVideoProvider } from './controllers/context'
import ImageUploader from './ImageUploader'
import { downloadFile } from '@utils/download'

const ImageToVideo = () => {
  const { create } = useHandlers()
  const {
    category,
    setTaskCategory,
    prompt,
    setPrompt,
    localeFile,
    generating,
    duration,
    taskDetail,
    setTaskDetail
  } = useImageToVideo()

  const isLoggedIn = !!localStorage.getItem('user')
  const { charge } = useBizCharge({ category, duration, isLoggedIn })

  // 是否是图片转视频
  const isImage2Video = category === BizType.IMAGE_TO_VIDEO
  // 是否禁用提交按钮
  const disabled = !prompt.trim() || (isImage2Video && !localeFile.url)

  // 提交表单
  const handleSubmit = useMemoizedFn((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoggedIn) {
      location.href = '/login?from=/image-to-video'
    } else {
      create({
        category,
        prompt,
        localeFile,
        duration
      })
    }
  })

  // 切换tab
  const onTabChange = useMemoizedFn((v: BizType) => {
    setTaskCategory(v)
  })

  const handleSave = useMemoizedFn((data, e) => {
    e.preventDefault()
    e.stopPropagation()
    downloadFile(data?.fileInfos[0].fileUrl)
  })


  return (
    <Form onSubmit={handleSubmit}>
      <Tabs value={category} onChange={onTabChange} />
      <div className="flex h-[calc(100%-128px)] flex-col gap-4 xl:h-[calc(100%-152px)] xl:px-6">
        {isImage2Video && <ImageUploader />}
        <PromptInput
          placeholder="Input a prompt to create a dynamic video—unleash your imagination now!"
          value={prompt}
          onChange={setPrompt}
          maxLength={2000}
          className="flex-1"
        />
      </div>
      <Action disabled={disabled} generating={generating} charge={charge} />
      {generating && <Loading />}
      {taskDetail && <Result
        onSave={(e) => handleSave(taskDetail, e)}
        previewUrl={taskDetail.fileInfos[0]?.fileUrl}
        onTryAgain={e => {
          e.preventDefault()
          e.stopPropagation()
          setTaskDetail(null)
        }}
        onClose={() => setTaskDetail(null)} />}
    </Form>
  )
}

const ImageToVideoPage = () => {
  return (
    <ImageToVideoProvider>
      <ImageToVideo />
    </ImageToVideoProvider>
  )
}

export default ImageToVideoPage

