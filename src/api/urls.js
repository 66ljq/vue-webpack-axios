import api from './index'

//获取沙盒数据
const querySandbox = (params) => api.post('/operational/analyzeSandbox', params);

export {
  querySandbox
}
