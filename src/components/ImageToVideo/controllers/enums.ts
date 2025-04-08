

// 列表行数： 单列/多列
export enum ListRow {
  SINGLE,
  MULTIPLE
}

// 任务状态
export enum TaskStatus {
  CREATING,
  FAILED,
  SUCCEED,
  WAITING,
  PROHIBITED_CONTENT
}

// 任务分类
export enum TaskCategory {
  ALL = '7000',
  TEXT_TO_VIDEO = '8000',
  IMAGE_TO_VIDEO = '9000'
}

// 业务类型
export enum BizType {
  TEXT_TO_VIDEO = '41',
  IMAGE_TO_VIDEO = '42'
}

// 业务类型转换为任务分类
export const BizType2TaskCategory = {
  [BizType.TEXT_TO_VIDEO]: TaskCategory.TEXT_TO_VIDEO,
  [BizType.IMAGE_TO_VIDEO]: TaskCategory.IMAGE_TO_VIDEO
}
