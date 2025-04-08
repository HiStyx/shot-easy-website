import { BizType, TaskStatus } from './enums'

export interface ILocaleFile {
  url: string
  file?: File
  fileId?: string
}

export interface FnCreateParams {
  category: BizType
  prompt: string
  localeFile: ILocaleFile
  duration: number
}

export interface ParamsCreateImageToVideo {
  duration: number
  fileId: string
  prompt: string
}

export interface ParamsCreateTextToVideo {
  prompt: string
  duration: number
}

export interface ResCreateTask {
  progress: {
    index: number
    left: number
    progress: number
  }
  taskId: string
}


export interface IContentAudit {
  allowDisplayNsfw: boolean
  tips: string
}

export interface IFileInfo {
  allowFeedbackNegativeDescription: boolean
  feedback: boolean
  fileId: number
  fileUrl: string
  illegal: boolean
  nsfw: boolean
  outputId: string
}

export interface IProgress {
  index: number
  left: number
  progress: number
}

export interface ISize {
  height: number
  width: number
}

export interface IMaterial {
  coverUrl: string
  durationMs: number
  fileUrl: string
  fileId: string
  size: ISize
  status: number
  type: number
}

export interface IImageSize {
  height: number
  heightRatio: number
  name: string
  width: number
  widthRatio: number
}

export interface IStyle {
  beta: boolean
  id: number
  imageSizes: IImageSize[]
  name: string
  url: string
  vipType: number
}

export interface ITargetFace {
  id: number
  status: number
  type: number
  url: string
}

export interface ITaskInputSetting {
  durationMs: number
  faceId: number
  generatePersonType: number
  generatePersonTypeName: string
  height: number
  material: IMaterial
  originImageInfo: string
  resultCount: number
  scale: number
  seed: number
  style: IStyle
  targetFace: ITargetFace
  text: string
  weight: number
  width: number
}

export interface ResTaskDetail {
  categoryId?: BizType
  contentAudit?: IContentAudit
  cover?: string
  createdAt: string
  duration?: number
  faceEnhance?: boolean
  fileInfos?: IFileInfo[]
  fileType?: number
  materialId?: string
  modelVersion?: number
  modelVersionName?: string
  progress: IProgress
  removeObject?: boolean
  resultCount?: number
  status: TaskStatus
  taskId: string
  taskInputSetting?: ITaskInputSetting
  text?: string
  type?: number
}


export interface ICharge {
  adConsumption: string
  freeConsumption: string
  creditConsumption: string
  status: number
  actions: number[]
  riskControlCode: number
  riskControlCdSeconds: number
}


export interface IFeedbackLabel {
  id: string
  labelText: string
}

export interface IProcessingTask {
  taskId: string;
  type: number;
  resultCount: number;
  status: TaskStatus;
  faceShiftResult: null;
  cover: null;
  progress: IProgress;
  expired: string;
  isPermanent: boolean;
  text: string;
  height: number;
  width: number;
  categoryId: string;
  nsfw: boolean;
  illegal: boolean;
  fileType: string | null;
  duration: number | null;
  materialId: string;
}

export interface ITaskDetail {
  taskId: string;
  type: number;
  status: TaskStatus;
  fileInfos: IFileInfo[];
  text: string;
  resultCount: number;
  progress: IProgress;
  taskInputSetting: ITaskInputSetting;
  categoryId: string;
  contentAudit: {
    allowDisplayNsfw: boolean;
    tips: string;
  };
  removeObject: boolean;
  materialId: string;
  duration: number | null;
  fileType: number;
  modelVersionName: string | null;
  modelVersion: number;
  faceEnhance: boolean;
}
