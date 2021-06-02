import myAxios from './myAxios';
import {BASE_URL} from "../config"
//登录请求
export const reqLogin=(username,password)=>myAxios.post(`${BASE_URL}/login`,{username,password})
//获取商品列表请求
export const reqCategoryList = ()=> myAxios.get(`${BASE_URL}/manage/category/list`)

//新增商品分类
export const reqAddCategory=(categoryName)=>myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})
//更新商品分类
//新增商品分类
export const reqUpdateCategory=(categoryId,categoryName)=>myAxios.post(`${BASE_URL}/manage/category/add`,{categoryId,categoryName})