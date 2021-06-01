import axios from "axios";
import qs from "querystring";
import {message} from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css"
const instance=axios.create({
    // baseURL:"http://localhost:3000",
    timeout:4000,
});
//请求拦截器
instance.interceptors.request.use((config)=>{
    NProgress.start();
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
    message.error(error.message,1);
    return new Promise(()=>{})
})
export default instance;