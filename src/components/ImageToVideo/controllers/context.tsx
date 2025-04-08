import React, { createContext, useContext, useReducer,type Dispatch } from 'react'
import { reducer, initialState, type ImageToVideoState, type ImageToVideoAction } from './reducer'
import { BizType } from './enums'
import type { ILocaleFile, ITaskDetail } from './interfaces'

const StateContext = createContext<ImageToVideoState | undefined>(undefined)
const DispatchContext = createContext<Dispatch<ImageToVideoAction> | undefined>(undefined)

export function ImageToVideoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useImageToVideoState() {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('useImageToVideoState must be used within a ImageToVideoProvider')
  }
  return context
}

export function useImageToVideoDispatch() {
  const context = useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useImageToVideoDispatch must be used within a ImageToVideoProvider')
  }
  return context
}

// 提供类似 zustand 的 actions 接口
export function useImageToVideo() {
  const state = useImageToVideoState()
  const dispatch = useImageToVideoDispatch()

  return {
    ...state,
    setTaskCategory: (category: BizType) => 
      dispatch({ type: 'SET_CATEGORY', payload: category }),
    setPrompt: (prompt: string) => 
      dispatch({ type: 'SET_PROMPT', payload: prompt }),
    setLocaleFile: (localeFile: ILocaleFile) => 
      dispatch({ type: 'SET_FILE', payload: localeFile }),
    setGenerating: (generating: boolean) => 
      dispatch({ type: 'SET_GENERATING', payload: generating }),
    setShowNotEnoughModal: (showNotEnoughModal: boolean) => 
      dispatch({ type: 'SET_SHOW_NOT_ENOUGH_MODAL', payload: showNotEnoughModal }),
    setTaskDetail: (taskDetail: ITaskDetail) => 
      dispatch({ type: 'SET_TASK_DETAIL', payload: taskDetail }),
    reset: () => dispatch({ type: 'RESET' })
  }
} 