import React, { Component } from 'react';
import { Button, Card, Icon,message,Table } from 'antd';
import {reqCategoryList} from '../../api';
class Category extends Component {
        state={
            categoryList:[]
        }
        getCategoryList=async()=>{
            let result= await reqCategoryList();
            let {status,data,msg}=result;
            if(status===0) this.setState({categoryList:data})
            else message.error(msg,1)
           
        }
        componentDidMount(){
            this.getCategoryList();
        }

   
    render() {
        const dataSource =this.state.categoryList;
          
          const columns = [
            {
              title: '分类名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              dataIndex: 'categoryName',
              key: 'age',
              width: '25%',
              align:'center',
              render:()=>{return <Button type="link">添加分类</Button>}
            },
          
          ];
        return (
                <Card extra={<Button type="primary"><Icon type="plus-circle" />添加</Button>} >
                   <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" pagination={{pageSize:5}}/>;
                </Card>
            
        );
    }
}

export default Category;
