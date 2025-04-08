import { BizType } from './enums'
import type { ILocaleFile, ITaskDetail } from './interfaces'

export interface ImageToVideoState {
  category: BizType
  prompt: string
  localeFile: ILocaleFile
  generating: boolean
  duration: number
  showNotEnoughModal: boolean
  taskDetail: ITaskDetail | null
}

export type ImageToVideoAction =
  | { type: 'SET_CATEGORY'; payload: BizType }
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'SET_FILE'; payload: ILocaleFile }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_SHOW_NOT_ENOUGH_MODAL'; payload: boolean }
  | { type: 'SET_TASK_DETAIL'; payload: ITaskDetail }
  | { type: 'RESET' }

export const initialState: ImageToVideoState = {
  category: BizType.IMAGE_TO_VIDEO,
  prompt: '',
  localeFile: {
    url: '',
    file: null
  },
  generating: false,
  duration: 5,
  showNotEnoughModal: false,
  taskDetail: null
}

export function reducer(state: ImageToVideoState, action: ImageToVideoAction): ImageToVideoState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload
      }
    case 'SET_PROMPT':
      return {
        ...state,
        prompt: action.payload
      }
    case 'SET_FILE':
      return {
        ...state,
        localeFile: action.payload
      }
    case 'SET_GENERATING':
      return {
        ...state,
        generating: action.payload
      }
    case 'SET_SHOW_NOT_ENOUGH_MODAL':
      return {
        ...state,
        showNotEnoughModal: action.payload
      }
    case 'SET_TASK_DETAIL':
      return {
        ...state,
        taskDetail: action.payload
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
} 