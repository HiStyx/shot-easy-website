import { post, get, del } from '@utils/request'

import { BizType, TaskCategory } from './enums'
import type { ParamsCreateImageToVideo, ResCreateTask, ParamsCreateTextToVideo, ResTaskDetail, ICharge, IFeedbackLabel, IProcessingTask, ITaskDetail } from './interfaces'

// 创建图片转视频任务
export const createImageToVideoTask = async (params: ParamsCreateImageToVideo) => {
  const res = await post('/users/me/models/image2video/tasks', params)
  return res.data as ResCreateTask
}

// 创建文生视频任务
export const createTextToVideoTask = async (params: ParamsCreateTextToVideo) => {
  const res = await post('/users/me/models/text2video/tasks', params)
  return res.data as ResCreateTask
}

// 获取任务列表(子项包含详情)
export const getTaskList = async ({ limit, offset, category }: { limit: number, offset: number, category: TaskCategory }) => {
  const res = await get('/users/me/tasks/details', {
    limit,
    offset,
    category
  })

  return res.data as ResTaskDetail[]
}

// 获取进行中的任务
export const getProcessingTaskList = async ({ taskIds }: { taskIds: string[] }) => {
  const res = await get('/v1/users/me/tasks/processing', {
    taskIds,
    category: '7000'
  })
  return res.data as ResTaskDetail[]
}

// 删除任务
export async function deleteTask(taskId: string) {
  const json = await del(`/users/me/tasks/${taskId}`)
  return json
}

// 获取业务收费
export const getBizCharge = async (category: BizType, duration: number) => {
  const res = await get('/equities/biz-charge', {
    category,
    'item.duration': duration
  })
  return res.data as ICharge
}

// 获取反馈标签
export const getFeedbackLabels = async (bizId: string) => {
  const res = await get('/feedback-labels', {
    bizId,
    feedbackType: 0
  })
  return res.data as IFeedbackLabel[]
}

// 提交反馈
export const submitFeedback = async (bizId: string, good: boolean) => {
  const res = await post(`/users/me/feedback/${bizId}`, {
    bizId,
    feedbackLabelBizType: '0',
    feedbackType: '0',
    good
  })
  return res.data
}

// 提交反馈描述
export const submitFeedbackDescribe = async (bizId: string, description: string, labelIds: string[]) => {
  const res = await post(`/users/me/feedback/${bizId}/describe`, {
    bizId,
    feedbackLabelBizType: '0',
    feedbackType: '0',
    labelIds,
    description
  })
  return res.data
}


// 获取进行中的任务
export async function getProcessingTask(taskId: string) {
  const res = await get<IProcessingTask[]>('/users/me/tasks/processing', { taskIds: [taskId] })
  return res.data
}


// 查询指定任务
export const getTaskDetails = async (taskId: string) => {
  const res = await get<ITaskDetail>(`/users/me/tasks/${taskId}`)
  return res.data
}
