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

//获取商品列表请求
export const reqProductList=(pageNum,pageSize)=>myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})

//更新商品状态
export const reqUpdateProductStatus=(productId,status)=>myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})

//搜索商品列表
export const reqProductSearch=(pageNum,pageSize,searchType,keyWord)=>
{
    // console.log(pageNum,pageSize,searchType,keyWord)
return myAxios.get(`${BASE_URL}/manage/product/search`,{params:{[searchType]:keyWord,pageNum,pageSize}})
}

//根据商品ID获取商品
export const reqProdById=(productId)=>myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})

//删除图片
export const reqremovePicture=(name)=>myAxios.post(`${BASE_URL}/manage/img/delete`,{name})

//添加商品
export const reqProductAdd=({categoryId,name,desc,price,detail,imgs})=>myAxios.post(`${BASE_URL}/manage/product/add`,{categoryId,name,desc,price,detail,imgs})

// 更新商品
export const reqUpdateProd=(productObj)=>myAxios.post(`${BASE_URL}/manage/product/update`,{...productObj})

//请求列表用户所有数据
export const reqRoleList=()=>myAxios.get(`${BASE_URL}/manage/role/list`)

//添加角色
export const reqRoleAdd=(roleName)=>myAxios.post(`${BASE_URL}/manage/role/add`,{roleName})

// 更新角色(给角色设置权限)/manage/role/update
export const reqAuthRole = (roleObj)=> myAxios.post(`${BASE_URL}/manage/role/update`,{...roleObj,auth_time:Date.now()})
