/**
 * Created by hjs on 2019-09-17
 */
import axios from 'axios';
import qs from 'querystring';

/**
 * 网络请求工具类
 */
export default class httpUtil {
  // 这里的url参数即是基础的接口域名:https://www.wanandroid.com。定义在service目录下的setAxios.js
  static get(url, params) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = await qs.stringify(params);
        let res = null;
        if (!params) {
          res = await axios.get(url);
        } else {
          res = await axios.get(url + '?' + query);
        }
        resolve(res);
      } catch (error) {
        const errorMsg = `请求报错路径: ${url} \n请求报错信息: ${error}`;
        console.log(errorMsg);
        reject(error);
      }
    });
  }

  static post(url, params) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.post(url, params);
        resolve(res);
      } catch (error) {
        const errorMsg = `请求报错路径: ${url} \n请求报错信息: ${error}`;
        console.log(errorMsg);
        reject(error);
      }
    });
  }
}
