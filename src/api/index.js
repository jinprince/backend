import myAxios from './myAxios';
import {BASE_URL} from "../config"
//登录请求
export const reqLogin=(username,password)=>myAxios.post(`${BASE_URL}/login`,{username,password})