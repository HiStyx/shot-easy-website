import React from "react";

interface Props {
  className?: string;
}

const FeedbackEmail: React.FC<Props> = ({ className }) => {
  return (
    <a href={`mailto:${FEEDBACK_EMAIL}`} className={className}>
      {FEEDBACK_EMAIL}
    </a>
  );
};

// 根据环境变量设置feedback邮箱
enum FEEDBACK_EMAILS {
  "img-tools.app" = "feedback@img-tools.app",
  "img-tools.co" = "feedback@img-tools.co",
}

export const FEEDBACK_EMAIL =
  FEEDBACK_EMAILS[import.meta.env.PUBLIC_DOMAIN] ||
  FEEDBACK_EMAILS["img-tools.app"];

export default FeedbackEmail;
