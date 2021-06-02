import React, { Component } from 'react';
import {Button, Card, Icon, message, Table, Modal,Form,Input } from 'antd';
import { reqAddCategory, reqCategoryList,reqUpdateCategory } from '../../api';
import { PAGESIZE } from "../../config/index";
const {Item}=Form;

@Form.create()
class Category extends Component {
    state = {
        categoryList: [],
        visible:false,//控制弹窗的显示和隐藏
        operType:'',//新增或者修改
        isLoading:true,
        modalCurrentValue:'',//是否处于加载中
        modalCurrentId:''
    }
    componentDidMount() {
        this.getCategoryList();
    }
    //增加分类
      toAdd=async(value)=>{
          let result=await reqAddCategory(value.categoryName);
          const {status,data,msg}=result;
          if(status===0){
              message.success("新增商品分类成功")
              let categoryList=[...this.state.categoryList];
              categoryList.unshift(data);
                this.setState({
                    categoryList
                })
                this.setState({visible:false});
                this.props.form.resetFields()
          }
          if(status===1){
            message.error(msg,1)
          }

      }
      //修改分类
      toUpdate=async(value,id)=>{
        let result =await reqUpdateCategory(id,value.categoryName);
        const {status,msg}=result;
        if(status===0){
          message.success("修改成功",1);
          this.getCategoryList();
          this.setState({visible:false});
          this.props.form.resetFields()
        }else{
          message.error(msg,1)
        }

      }

    //获取商品分类列表
    getCategoryList = async () => {
        let result = await reqCategoryList();
        this.setState({
            isLoading:false
        })
        let { status, data, msg } = result;
        if (status === 0) this.setState({ categoryList: data.reverse()})
        else message.error(msg, 1)
    }
    //弹框
    //用于新增弹框
    //点击
    showAdd = () => {
        this.setState({
          operType:'add',
          visible: true,
          modalCurrentValue:'',
          modalCurrentId:''
        });
      };
      showUpdate = (item) => {
        // console.log(item);
        const {_id,name}=item;
        this.setState({
          operType:'update',
          visible: true,
          modalCurrentValue:name,
          modalCurrentId:_id

        });
      };
      handleOk = ()=> {
        // console.log(e);
        const {operType,modalCurrentId}=this.state;
        this.props.form.validateFields(async(err,value) => {
            if(err){
                message.warning("表单输入有误,请检查",1)
                return
            }
            console.log(value);
            if(operType==="add") this.toAdd(value)
            if(operType==="update") this.toUpdate(value,modalCurrentId)
           
        })
      };
      handleCancel = e => {
        // console.log(e);
        this.props.form.resetFields()
        this.setState({
          visible: false,
        });
      };
    


    render() {
        const {getFieldDecorator} = this.props.form;
        const dataSource = this.state.categoryList;
        let {operType,visible,isLoading,modalCurrentValue}=this.state;
        const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                // dataIndex: 'categoryName',
                key: 'age',
                width: '25%',
                align: 'center',
                render: (item) => { return <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button> }
            },

        ];
        return (
            <div>
                <Card extra={<Button type="primary" onClick={this.showAdd}><Icon type="plus-circle"/>添加</Button>} >
                    <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" pagination={{ pageSize: PAGESIZE,showQuickJumper:true }} loading={isLoading}/>;
                </Card>
                <Modal
                    title={operType==="add"?"新增分类":"修改分类"}
                    visible={visible}
                    onOk={this.handleOk}
                    okText="确定"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                >
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
              getFieldDecorator('categoryName',{
             initialValue:modalCurrentValue,
             rules: [
                  { required: true, message:'分类名必须写！'}, 
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入分类名" 
                />
              )}
            </Item>
          </Form>
                </Modal>
            </div>
        );
    }
}

export default Category;
 