import React, { Component } from 'react';
import { Card,Button,Icon,Select,Input,Table, message } from 'antd';
import {PAGESIZE} from "../../config/index"
import {reqProductList,reqUpdateProductStatus} from "../../api";
const { Option } = Select;

class Product extends Component {
    state={
        productList:[],
        total:'',
        current:1
    }
        getProductList=async(number=1)=>{
            let result=await reqProductList(number,PAGESIZE)
            console.log(result)
               const {status,msg,data}=result;
               if(status===0){
                    this.setState({
                        productList:data.list,
                        total:data.total,
                        current:data.pageNum
                       
                    })
                }
        }
   componentDidMount(){
     this.getProductList();
   }
   updateProdStatus=async({_id,status})=>{
       let productList=[...this.state.productList];
      if(status===1) status=2
      else status=1
       let result=await reqUpdateProductStatus(_id,status)
    //    console.log(result);
    if(result.status===0){
        message.success("更新商品状态成功")
        productList.map((item)=>{
            if(item._id===_id){
                item.status=status
                return item
            }
            return item
        })
        this.setState({
            productList
        })
    }else{
        message.error("更新商品状态失败")
    }
   }

    render() {
        const dataSource =this.state.productList
        const {total,current} =this.state;
          
          const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              width: "20%",
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              key: 'price',
              align:"center",
              width: "10%",
              render:(price)=>'￥'+price
            },
            {
                title: '状态',
                // dataIndex: 'status',
                key: 'status',
                align:"center",
                width: "10%",
                render:(item)=>{
                    return(
                        <div>
                            <Button type={item.status===1?"danger":"primary"} onClick={()=>{this.updateProdStatus(item)}}>{item.status===1?"下架":"上架"}</Button><br/>
                            <span>{item.status===1?"在售":"已停售"}</span>
                        </div>
                    )

                }
            },
              {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                align:"center",
                width: "10%",
                render:()=>{
                    return (
                        <div>
                            <Button type="link">详情</Button><br/>
                            <Button type="link">修改</Button>
                        </div>
                    )
                }
              },
          ];
        return (
            <Card title={
                <div>
                <Select defaultValue="name">
                    <Option value="name">按名称搜索</Option>
                    <Option value="desc">按描述搜索</Option>
                </Select>
                <Input
                style={{margin:'0px 10px',width:'20%'}} 
                placeholder="请输入搜索关键字"
                allowClear
                />
                <Button type="primary"><Icon type="search"/>搜索</Button>
                </div>
            }
             extra={<Button type="primary"><Icon type="plus-circle"/>添加商品</Button>}
             >
           <Table 
           dataSource={dataSource} 
           columns={columns}
           bordered
           rowKey="_id"
           pagination={{
               total,
               pageSize:PAGESIZE,
               current:current,
               onChange:this.getProductList
           }
           }
           />
            </Card>
        );
    }
}

export default Product;
