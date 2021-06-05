import React, { Component } from 'react';
import { Button, Card,Icon,List, message } from 'antd';


import './detail.less'
import { connect } from 'react-redux';
import {reqCategoryList, reqProdById} from "../../api"
const {Item} =List;

@connect(
    state =>({
        productList:state.productList,
        categoryList:state.categoryList
    })

)
class Detail extends Component {
    state={
        categoryId:'',
        categoryName:'',
        desc:'',
        detail:'',
        imgs:[],
        name:'',
        price:'',
        isLoading:true
    }
    getProdById=async(id)=>{
        let result=await reqProdById(id);
        const {status,data,msg}=result
        if(status===0){
            this.categoryId=data.categoryId
            this.setState({...data})
        }
        else message.error(msg)
    }
    getCateoryList=async()=>{
        let result =await reqCategoryList();
        const {status,data,msg}=result;
        if(status===0){
            let result=data.find((item)=>{
                return item._id===this.categoryId;
            })
            if(result) this.setState({categoryName:result.name,isLoading:false})
            else message.error(msg)
        }
    }
    

    componentDidMount(){
        const {id}=this.props.match.params;
        // console.log(this.props,this.props.productList)
        const reduxProdList=this.props.productList;
        const reduxCateList=this.props.categoryList;
        if(reduxProdList.length){
        let result=reduxProdList.find((item)=>{
            return item._id===id;
        })
        // console.log(result);
        if(result){
            this.categoryId=result.categoryId;
            const {desc,detail,imgs,name,price}=result;
            this.setState({
                desc,detail,imgs,name,price
            })
        }
    }else{
        this.getProdById(id)
    }
    if(reduxCateList.length){
      let result=reduxCateList.find((item)=>item._id===this.categoryId)
      this.setState({categoryName:result.name,isLoading:false})
    }else{
        this.getCateoryList()
    }
}
    render() {
        const {categoryName,desc,detail,imgs,name,price}=this.state;
        return (
            // <div>
            //     {/* 商品详情{this.props.match.params.id} */}
            // </div>
            <Card title=
            {<div>
                <Button type="link" onClick={()=>{this.props.history.goBack()}}>
                <Icon type="arrow-left" style={{fontSize:"20px"}} />
                <span>商品列表</span>
                </Button>
            </div>}>
             <List loading={this.state.isLoading}>
                 <Item>
                     <span className="prod-name">商品名称: </span>
                     <span>{name}</span>
                 </Item>  
                 <Item>
                     <span className="prod-name">商品描述: </span>
                     <span>{desc}</span>
                 </Item>  
                 <Item>
                     <span className="prod-name">商品价格: </span>
                     <span>{price}</span>
                 </Item>  
                 <Item>
                     <span className="prod-name">所属分类: </span>
                     <span>{categoryName}	</span>
                 </Item> 
                 <Item>
                     <span className="prod-name">商品图片: </span>
                     <span>{
                         imgs.map((item,index)=>{
                             return<img key={index}src={`/upload/${item}`} alt="商品图片" style={{width:'200px'}}/>
                         })
                         }</span>
                 </Item> 
                 <Item>
                     <span className="prod-name">商品详情: </span>
                     <span dangerouslySetInnerHTML={{__html:detail}}></span>
                 </Item>  
             </List>
            </Card>
        );
    }
}
export default Detail;
