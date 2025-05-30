const domains = [
  "pixdrive.net",
  "imgshare.me",
  "vidshare.org",
  "fbshare.net",
  "ggshare.org",
  "whalsapp.com",
  "ailand.to",
  "ailand.best",
  "r.faceplay.in",
  "r.faceplay.me",
  "r.faceplay.info",
  "r.faceplay.fun",
];

// 获取一个随机的重定向URL
export const getRandomRedirectUrl = (queryString: string) => {
  const randomIndex = Math.floor(Math.random() * domains.length);
  return `http://${domains[randomIndex]}/r/transmission?${queryString}`;
};
