import axios from "axios";

export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:7888/api/hy66',
    timeout: 5000
  })

  instance.interceptors.request.use(res => {
    return res
  },error => {

  })

  return instance(config)

}