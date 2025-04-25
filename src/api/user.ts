import request from '@/utils/request';
// 用户登录
export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET',
  });
};

// 用户登出
export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'POST',
  });
};