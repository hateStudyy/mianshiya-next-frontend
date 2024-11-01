// 默认用户
import AccessEnum from "@/access/accessEnum";

const DEFAULT_USER: API.LoginUserVO = {
  userName: "未登录",
  userProfile: "暂无简介",
  userAvatar: "/assets/notLoginUser.png",
  userRole: AccessEnum.NOT_LOGIN,
};

export default DEFAULT_USER;
