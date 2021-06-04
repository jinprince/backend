import {SAVE_CATEGORY_LIST} from "../action_types";

export const createSaveCategoryListAction=(value)=>{
   return { type:SAVE_CATEGORY_LIST,data:value}
}