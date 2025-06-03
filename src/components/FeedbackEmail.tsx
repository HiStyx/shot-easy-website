import React from 'react'

interface Props {
  className?: string
}

const FeedbackEmail: React.FC<Props> = ({ className }) => {
  return (
    <a href={`mailto:${FEEDBACK_EMAIL}`} className={className}>
      {FEEDBACK_EMAIL}
    </a>
  )
}

// 根据环境变量设置feedback邮箱
enum FEEDBACK_EMAILS {
  'img-tools.app' = 'feedback@img-tools.app',
  'image-tools.co' = 'feedback@image-tools.co',
  'img-tools.relaxops.cc' = 'feedback@img-tools.app',
  'img-tools-a.relaxops.cc' = 'feedback@image-tools.co',
}

const hostname = window.location.hostname.replace(/^www\./, '')
export const FEEDBACK_EMAIL = FEEDBACK_EMAILS[hostname] || 'img-tools.app'

export default FeedbackEmail
