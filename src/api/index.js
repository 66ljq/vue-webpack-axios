import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
import qs from 'qs'
import {Modal, notification} from 'ant-design-vue'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法类型不正确',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    notification.error({
      message: `请求错误 ${status}`,
      description: errorText,
      duration: 4
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
      duration: 4
    });
  }

  return Promise.reject(error);
};

//创建axios实例
const instance = axios.create({
  // baseURL: 'http://115.159.92.239:8071/zjh', // api的base_url
  baseURL: process.env.BASE_URL,
  timeout: 900000,   // 请求超时时间
})

//请求拦截器
instance.interceptors.request.use( config => {
    // 在发送请求之前做些什么
    // 根据各自情况加入token-安全携带,我这每一个都要token，所以都是true
    if (true) {
      // 让每个请求携带token
      if (!(config.data instanceof FormData)) {
        config.data = {
          ...config.data,
          userId: '00000001',
          token: 'adsadsafcdscd',
        };
      } else {
        config.data.append('userId', '1');
        config.data.append('token', 'adsadsafcdscd');
      }
    }
    //一定要返回
    return config;
  },
  error => {
    // 请求错误处理
    Promise.reject(error);
  }
)

//响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return errorHandler(error);
});

//post请求
const post = function (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, params)
            .then(res=> {
                 resolve(res.data);
            }).catch(error => {reject(error);})
    });
}

//postForm请求 -- Form data请求
const postForm = function (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, qs.stringify(params))
      .then(res=> {
        resolve(res.data);
      }).catch(error => {reject(error);})
  });
}

//get请求
const get = function (url, params) {
  return new Promise((resolve, reject) => {
    instance({
      url: url,
      method: 'get',
      params: params
    }).then(res=> {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  });
}

//暴露post、get方法
export default {post, postForm, get}
