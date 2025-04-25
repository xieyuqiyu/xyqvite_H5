import axios, {type AxiosInstance,type AxiosRequestConfig,type AxiosResponse } from 'axios';

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '', // 基础 URL，可根据环境变量配置
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 默认请求头
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么，比如添加 Token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 添加认证头
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    const { data } = response;
    if (data.code !== 200) {
      // 根据后端返回的状态码处理错误
      console.error('Response Error:', data.message || 'Error');
      return Promise.reject(data.message || 'Error');
    }
    return data; // 返回处理后的数据
  },
  (error) => {
    // 处理响应错误
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

// 封装通用请求方法
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return service.request<T>(config); // 使用配置发起请求
};

export default request; // 导出请求方法