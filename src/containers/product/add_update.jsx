import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select,message} from 'antd'
import PicturesWall from './picture_wall'
import RichTextEditor from "./rich-text-editor"
import {connect} from "react-redux";
import {reqCategoryList,reqProductAdd,reqProdById,reqUpdateProd} from "../../api"

const {Item} = Form
const {Option} = Select

@connect(
  state=>(
    {categoryList:state.categoryList,
    productList:state.productList
    }
    ),
  {}
)
@Form.create()
class AddUpdate extends Component {
     pictureWall = React.createRef();
     richTextEditor=React.createRef()
     state={
      categoryList:[],
      operaType:"add",
      categoryId:'',
      name:'',
      desc:'',
      price:'',
      detail:'',
      imgs:[],
      _id:''
     }
     getProductList=async(id)=>{
      const result=await reqProdById(id);
      const {status,data,msg}=result;
      console.log(data)
      if(status===0){
        this.setState({...data})
        this.pictureWall.current.setFileList(data.imgs);
        this.richTextEditor.current.setRichText(data.detail);
      }else{
        message.error(msg,1)
      }
   }
    componentDidMount(){
      // console.log(this.props.categoryList)
      const {categoryList,productList}=this.props;
      const {id}=this.props.match.params;
      if(categoryList.length) this.setState({categoryList})
      else this.getCategoryList()
      if(id){
        this.setState({operaType:'update'})
        if(productList.length){
          let result=productList.find((item)=>{
            return item._id===id;
          })
          // console.log(result)
          if(result){
          this.setState({...result})
          this.pictureWall.current.setFileList(result.imgs);
          this.richTextEditor.current.setRichText(result.detail);
          }
        }else{
          // console.log(111)
          this.getProductList(id);
        }
      }
    }
  

    getCategoryList=async()=>{
      let result=await reqCategoryList()
      const {status,data,msg}=result;
      if(status===0){
        this.setState({categoryList:data})
      }else{
        message.error(msg,1)
      }
    }


    handleSubmit=async(event)=>{
      event.preventDefault()
      // console.log(111)
        let imgs=this.pictureWall.current.getImgArr();
        let detail=this.richTextEditor.current.getDetail();
        // console.log(detail)
      this.props.form.validateFields(async(err,value) => {
        const values={...value,imgs,detail}
        // console.log(values)
        // let result=await reqProductAdd(values);
        let result;
        const {operaType,_id}=this.state;
        if(operaType==="add"){
           result=await reqProductAdd(values);
        }else{
            result=await reqUpdateProd({...values,_id});
        }
        // console.log(result)
        const {status,msg}=result;
        if(status===0){
          operaType==="add"?message.success("??????????????????"):message.success("??????????????????")
          this.props.history.replace("/admin/prod_about/product")
        }else{
          message.error(msg,1);
        }

       if(err) return
      });

    }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {categoryList,operaType,name,desc,price,detail,imgs,categoryId}=this.state;
    return (
        <Card 
          title={
            <div>
              <Button type="link" onClick={this.props.history.goBack}>
                <Icon type="arrow-left"/>
                <span>??????</span>
              </Button>
              <span>{operaType==="add"?"????????????":"????????????"}</span>
            </div>}
        >
          <Form 
            labelCol={{md:2}}
            wrapperCol={{md:7}}
            onSubmit={this.handleSubmit}
          >
            <Item label="????????????">
              {
                getFieldDecorator('name', {
                  initialValue:name || '',
                  rules: [{required: true, message: '?????????????????????' }],
                })(
                  <Input
                    placeholder="????????????"
                  />
                )
              }
            </Item>
            <Item label="????????????">
              {getFieldDecorator('desc', {
                initialValue:desc || '',
                rules: [
                  { required: true, message: '?????????????????????' },
                ],
              })(
                <Input
                  placeholder="????????????"
                />
              )}
            </Item>
            <Item label="????????????">
              {getFieldDecorator('price', {
                initialValue:price || '',
                rules: [
                  { required: true, message: '?????????????????????' },
                ],
              })(
                <Input
                  placeholder="????????????"
                  addonAfter="???"
                  prefix="???"
                  type="number"
                />
              )}
            </Item>
            <Item label="????????????">
              {getFieldDecorator('categoryId', {
                initialValue:categoryId||'',
                rules: [
                  { required: true, message: '?????????????????????' },
                ],
              })(
                <Select>
                  <Option value="">???????????????</Option>
                  {
                    categoryList.map((item)=>{
                      return (
                        <Option key={item._id} value={item._id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </Item>
            <Item  label="????????????" wrapperCol={{md:12}}>
             <PicturesWall ref={this.pictureWall}/>
            </Item>
            <Item label="????????????" wrapperCol={{md:16}}>
           <RichTextEditor ref={this.richTextEditor}/>
            </Item>
            <Button type="primary" htmlType="submit">??????</Button>
          </Form>
        </Card>
    )
  }
}

export default AddUpdate
