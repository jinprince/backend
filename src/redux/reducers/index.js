import {combineReducers} from "redux"
import loginReducer from "./login_reducer";
import menuReducer from "./menu_reducer";
import productReducer from "./product_reducer";
import categroyReducer from "./category_reducer";
export default combineReducers({
    userInfo: loginReducer,
    title:menuReducer,
    productList:productReducer,
    categoryList:categroyReducer,
})