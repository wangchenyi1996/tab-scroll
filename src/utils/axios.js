/**
 * 封装 axios 请求模块
 */

import axios from 'axios';
import router from '@/router'

// 网络超时时间 10s
axios.defaults.timeout = 10000;

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = '/';
}

// 连续发送多个请求，会中断之前的请求，只会请求一次
let pending = [];
let cancelToken = axios.CancelToken;
let cancelPending = (config) => {
  pending.forEach((item, index) => {
    if (!!config) {
      if (item.u == config.url) {
        item.f(); //取消请求
        pending.splice(index, 1); //移除当前请求记录
      };
    } else {
      item.f(); //取消请求
      pending.splice(index, 1); //移除当前请求记录
    }
  });
};

//axios 请求拦截器
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if (!!token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = token;
  };
  cancelPending(config);
  config.cancelToken = new cancelToken((c) => {
    pending.push({ 'u': config.url, 'f': c });
  });
  return config;
}, err => {
  return Promise.reject(err);
});

//响应拦截器
axios.interceptors.response.use(response => {
  cancelPending(response.config);
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        localStorage.removeItem('token');
        // 重定向到登录页面
        redirectLogin()
        break;
      case 404:
        console.log('接口不存在')
        break;
      case 500:
        console.log('服务端异常，请稍后重试')
        break;
      default:
        return Promise.reject(error)
    }
  }
  return Promise.reject(error) // 返回接口返回的错误信息
});


// 跳转到登录
function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default {
  //封装 axios get请求
  get(url, data) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: data
      }).then((res) => {
        resolve(res.data);
      }, (error) => {
        reject(error)
      })
    })
  },
  //封装 axios post请求
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then((res) => {
        resolve(res.data);
      }, (error) => {
        reject(error)
      })
    })
  }
}
