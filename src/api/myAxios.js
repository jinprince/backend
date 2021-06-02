import axios from "axios";
import qs from "querystring";
import {message} from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css"
import store from "../redux/store";
import {createDeleteUserInfoAction} from "../redux/action_creators/login_action";
const instance=axios.create({
    // baseURL:"http://localhost:3000",
    timeout:4000,
});
//请求拦截器
instance.interceptors.request.use((config)=>{
    NProgress.start();
    const {token}=store.getState().userInfo;
    // console.log(token);
    if (token) {
        // config当前请求的配置
        config.headers['Authorization'] = 'atguigu_' + token
      }
    const {method,data}=config;
    if(method.toLowerCase()==="post"){
        if(data instanceof Object){
               config.data=qs.stringify(data); 
        }
    }

    return config;

},function(error){
    return Promise.reject(error);
})

//响应拦截器
instance.interceptors.response.use((response)=>{
    NProgress.done();
   //请求若成功
    return response.data
},
(error)=>{
    //响应若失败了
    if(error.response.status===401){
        message.error("身份已过期,请重新登录",1);
        //分发一个action
        // store.dispatch(createDeleteUserInfoAction());
    }else{
        message.error(error.message,1)
    }
    // message.error(error.message,1);
    return new Promise(()=>{})
})
export default instance;